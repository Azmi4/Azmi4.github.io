var hamburgerMenu = document.querySelector('#hamburgerMenu');
var hamburgerButton = document.querySelector('#hamburgerButton');

hamburgerButton = addEventListener('click', function (e) {
    e.preventDefault();
    hamburgerMenu.classList.add('active');
    hamburgerButton.classList.add('active');
})
