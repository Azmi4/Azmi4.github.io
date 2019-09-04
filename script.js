// Полноэкранное меню
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

// Слайд
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

// Состав
var compositionMenuButtons = document.querySelectorAll('.composition');

function openCompositionMenu() {
    compositionMenu.classList.add('active');
}

function closeCompositionMenu() {
    compositionMenu.classList.remove('active');
}

for (let i = 0; i < compositionMenuButtons.length; i++) {
    const compositionMenu = compositionMenuButtons[i];
    compositionMenu.addEventListener('click', function (e) {
        e.preventDefault();
        if (compositionMenu.classList.toggle('active')) {
            closeCompositionMenu();
        } else {
            openCompositionMenu();
        }
    });
}
////////////////////////////////////////////////////////////////////

// Команда
var teamAccordeon = document.querySelector('.accordeon');

teamAccordeon.addEventListener('click', function(e) {
    e.preventDefault();

    var teamCard = document.querySelectorAll('.accordeon__item');
    var target = e.target.closest('li');

    if (!target) return;

    if (!target.classList.contains('active')) {
        for (var card of teamCard) {
            card.classList.remove('active');
        }
        target.classList.add('active');
    } else {
        target.classList.remove('active');
    }
});
//////////////////////////////////////////////////////////////////////////

// Меню
var menuAccordeon = document.querySelector('.accordeon__menu');

menuAccordeon.addEventListener('click', function(e) {
    e.preventDefault();

    var menuCard = document.querySelectorAll('.menu__item');
    var target = e.target.closest('li');

    if (!target) return;

    if (!target.classList.contains('active')) {
        for (var card of menuCard) {
            card.classList.remove('active');
        }
        target.classList.add('active');
    } else {
        target.classList.remove('active');
    }
});
////////////////////////////////////////////////////////////////////////////

// Форма
const myForm = document.querySelector('#myForm');
const order = document.querySelector('#order');

order.addEventListener('click', function (e) {
    e.preventDefault();

    if (validateForm(myForm)) {
        const data = {
            name: myForm.elements.name.value,
            phone: myForm.elements.name.value,
            comment: myForm.elements.name.value
        };

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(JSON.stringify(data));
    }
});

function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
        valid = false;
    }

    if (!validateField(form.elements.phone)) {
        valid = false;
    }

    if (!validateField(form.elements.comment)) {
        valid = false;
    }

    return valid;
}

function validateField(field) {
        field.nextElementSibling.textContent = field.validationMessage;
        return field.checkValidity();
}