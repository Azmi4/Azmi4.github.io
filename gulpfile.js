const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require("gulp-rm");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const svgo = require("gulp-svgo");
const svgSprite = require("gulp-svg-sprite");
const gulpif = require("gulp-if");

const env = process.env.NODE_ENV;

const { DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS } = require("./gulp.config");

sass.compiler = require("node-sass");

task("clean", () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task("copy:html", () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task("copy:fonts", () => {
  return src("src/fonts/*").pipe(dest("dist/fonts"));
});

task("styles", () => {
  return src([...STYLES_LIBS, "src/styles/main.scss"])
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      gulpif(
        env === "dev",
        autoprefixer({
          overrideBrowserslist: ["last 2 versions"],
          cascade: false
        })
      )
    )
    .pipe(gulpif(env === "prod", gcmq()))
    .pipe(gulpif(env === "prod", cleanCSS()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest("dist/css"))
    .pipe(reload({ stream: true }));
});

task("scripts", () => {
  return src([...JS_LIBS, "src/scripts/*.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.js", { newLine: ";" }))
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest("dist"))
    .pipe(reload({ stream: true }));
});

task("icons", () => {
  return src("src/image/icons/*.svg")
    .pipe(
      svgo({
        plugins: [
          {
            removeAttrs: {
              attrs: "(style|width|height|data.*)"
            }
          }
        ]
      })
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg"
          }
        }
      })
    )
    .pipe(dest("dist/image/svg-sprite"));
});

task("copy:image", () => {
  return src("src/image/**/*.*").pipe(dest("dist/image"));
});

task("server", () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});

task("watch", () => {
  watch("./src/styles/**/*.scss", series("styles"));
  watch("./src/*.html", series("copy:html"));
  watch("./src/scripts/*.js", series("scripts"));
  watch("./src/images/icons/*.svg", series("icons"));
  watch("./src/fonts/*", series("copy:fonts"));
});

task(
  "default",
  series(
    "clean",
    parallel(
      "copy:html",
      "copy:fonts",
      "styles",
      "scripts",
      "icons",
      "copy:image"
    ),
    parallel("watch", "server")
  )
);

task(
  "build",
  series(
    "clean",
    parallel(
      "copy:html",
      "copy:fonts",
      "styles",
      "scripts",
      "icons",
      "copy:image"
    )
  )
);
