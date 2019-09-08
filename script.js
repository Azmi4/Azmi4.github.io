// Полноэкранное меню
var hamburgerMenu = document.querySelector("#hamburgerMenu");
var hamburgerButton = document.querySelector("#hamburgerButton");
var navItem = document.querySelector(".nav__link");

function openHamburgerMenu() {
  hamburgerMenu.classList.add("active");
  hamburgerButton.classList.add("active");
}
function closeHamburgerMenu() {
  hamburgerMenu.classList.remove("active");
  hamburgerButton.classList.remove("active");
}

hamburgerButton.addEventListener("click", function(e) {
  e.preventDefault();
  if (hamburgerButton.classList.contains("active")) {
    hamburgerMenu.classList.add("fadeOut");
    setTimeout(() => {
      closeHamburgerMenu();
      hamburgerMenu.classList.remove("fadeOut");
    }, 400);
  } else {
    openHamburgerMenu();
  }
});

hamburgerMenu.addEventListener("click", function(e) {
  e.preventDefault;
  if (e.target.classList.contains("nav__link")) {
    closeHamburgerMenu();
  }
});
//////////////////////////////////////////////////////

// Слайд
slider();

function slider() {
  const sliderLeftButton = document.querySelector(".scrool__left");
  const sliderRightButton = document.querySelector(".scrool__right");
  const slider = document.querySelector("#slider");
  const slides = document.querySelectorAll(".slider__item");
  const slide = document.querySelector(".slider__item");

  let minRight = 0;
  let currentRight = 0;
  let step = slide.offsetWidth;
  let maxRight = (slides.length - 1) * slide.offsetWidth;
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

  sliderLeftButton.addEventListener("click", function() {
    leftMove();
  });

  sliderRightButton.addEventListener("click", function() {
    rightMove();
  });
}
///////////////////////////////////////////////////////////////////

// Состав
var compositionMenuButtons = document.querySelectorAll(".composition");

function openCompositionMenu() {
  compositionMenu.classList.add("active");
}

function closeCompositionMenu() {
  compositionMenu.classList.remove("active");
}

for (let i = 0; i < compositionMenuButtons.length; i++) {
  const compositionMenu = compositionMenuButtons[i];
  compositionMenu.addEventListener("click", function(e) {
    e.preventDefault();
    if (compositionMenu.classList.toggle("active")) {
      closeCompositionMenu();
    } else {
      openCompositionMenu();
    }
  });
}
////////////////////////////////////////////////////////////////////

// Команда
var teamAccordeon = document.querySelector(".accordeon");

teamAccordeon.addEventListener("click", function(e) {
  e.preventDefault();

  var teamCard = document.querySelectorAll(".accordeon__item");
  var target = e.target.closest("li");

  if (!target) return;

  if (!target.classList.contains("ac-active")) {
    for (var card of teamCard) {
      card.classList.remove("ac-active");
    }
    target.classList.add("ac-active");
  } else {
    target.classList.remove("ac-active");
  }
});
//////////////////////////////////////////////////////////////////////////

// Меню
var menuAccordeon = document.querySelector(".accordeon_menu");

menuAccordeon.addEventListener("click", function(e) {
  e.preventDefault();

  var menuCard = document.querySelectorAll(".menu__item");
  var target = e.target.closest("li");

  if (!target) return;

  if (!target.classList.contains("menu-active")) {
    for (var card of menuCard) {
      card.classList.remove("menu-active");
    }
    target.classList.add("menu-active");
  } else {
    target.classList.remove("menu-active");
  }
});
////////////////////////////////////////////////////////////////////////////

// Форма + Модальное окно
const myForm = document.querySelector("#myForm");
const order = document.querySelector("#order");
const formRow = document.querySelector(".form__row-block");

order.addEventListener("click", function(event) {
  event.preventDefault();
  if (validateForm(myForm)) {
    let data = new FormData();
    data.append("name", myForm.elements.name.value);
    data.append("phone", myForm.elements.phone.value);
    data.append("comment", myForm.elements.comment.value);
    data.append("to", "my@gmail.com");
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(data);
    xhr.addEventListener("load", () => {
      if (xhr.response.status) {
        const element = document.createElement("div");
        formRow.appendChild(element);
        element.classList.add("message__modal");

        const element2 = document.createElement("div");
        element.appendChild(element2);
        element2.classList.add("message__send");

        const element3 = document.createElement("div");
        element2.appendChild(element3);
        element3.classList.add("message__text");
        element3.textContent = "Сообщение отправлено";

        const element4 = document.createElement("button");
        element2.appendChild(element4);
        element4.classList.add("btn");
        element4.textContent = "Закрыть";

        element4.addEventListener("click", function() {
          formRow.removeChild(element);
        });
      }
      order.disabled = false;
    });
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
  if (!field.checkValidity()) {
    field.nextElementSibling.textContent = field.validationMessage;
    return false;
  } else {
    field.nextElementSibling.textContent = "";
    return true;
  }
}
///////////////////////////////////////////////////////////////////////////////////

// ОТЗЫВЫ
var modalRev = document.querySelector(".popup-reviews");
var modalTitle = document.querySelector(".popup-reviews__title");
var modalText = document.querySelector(".popup-reviews__text");
const revList = document.querySelector(".reviews__list");
const revClose = document.querySelector(".popup-reviews__close");
revClose.addEventListener("click", function(e) {
  e.preventDefault();
  modalRev.style.display = "none";
  document.body.style.overflow = "initial";
});
revList.addEventListener("click", function(e) {
  e.preventDefault();
  modalRev.style.display = "flex";
  document.body.style.overflow = "hidden";
  var target = e.target.closest("button");
  modalTitle.innerText = target.parentNode.firstChild.nextSibling.textContent;
  modalText.innerText = target.previousElementSibling.innerText;
});
///////////////////////////////////////////////////////////////////////////////

