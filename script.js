var hamburgerMenu = document.querySelector('#hamburgerMenu');
var hamburgerButton = document.querySelector('#hamburgerButton');
var navItem = document.querySelector('.nav__link');

function openHamburgerMenu() {
    hamburgerMenu.classList.add('active');
    hamburgerButton.classList.add('active');
}
function closeHamburgerMenu() {
    hamburgerMenu.classList.remove('active');
    hamburgerButton.classList.remove('active');
}

hamburgerButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (hamburgerButton.classList.contains('active')) {
        hamburgerMenu.classList.add('fadeOut');
        setTimeout(() => {
            closeHamburgerMenu();
            hamburgerMenu.classList.remove('fadeOut');
        }, 400);
    } else {
        openHamburgerMenu()
    }
});

hamburgerMenu.addEventListener('click', function (e) {
    e.preventDefault;
    if (e.target.classList.contains('nav__link')) {
        closeHamburgerMenu();
    }
});
//////////////////////////////////////////////////////

// слайд
slider();

function slider() {
    const sliderLeftButton = document.querySelector('.scrool__left');
    const sliderRightButton = document.querySelector('.scrool__right');
    const slider = document.querySelector('#slider');
    const slides = document.querySelectorAll('.slider__item');
    const slide = document.querySelector('.slider__item');

    let minRight = 0;
    let step = slide.offsetWidth;
    let maxRight = (slides.length - 1) * slide.offsetWidth;
    let currentRight = 0;

    slider.style.right = currentRight;

    function leftMove() {
        if (currentRight > minRight) {
            currentRight -= step;
            slider.style.right = currentRight + "px";
        } else {
            currentRight = maxRight;
            slider.style.right = maxRight + "px";
        }
    }

    function rightMove() {
        if (currentRight < maxRight) {
            currentRight += step;
            slider.style.right = currentRight + "px";
        } else {
            currentRight = minRight;
            slider.style.right = minRight + "px";
        }
    }

    sliderLeftButton.addEventListener('click', function() {
        leftMove();
    });

    sliderRightButton.addEventListener('click', function() {
        rightMove();
    });
}
///////////////////////////////////////////////////////////////////

// состав
var compositionMenu = document.querySelector('#compositionMenu');

function openCompositionMenu() {
    compositionMenu.classList.add('active');
}

function closeCompositionMenu() {
    compositionMenu.classList.remove('active');
}

compositionMenu.addEventListener('click', function (e) {
    e.preventDefault();
    if (compositionMenu.classList.contains('active')) {
        closeCompositionMenu();
    } else {
        openCompositionMenu();
    }
});