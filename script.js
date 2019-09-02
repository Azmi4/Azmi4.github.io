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