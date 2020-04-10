"use string"

const header = document.querySelector('.page-header');
const button = document.querySelector('.page-header__toggle');
const nav = document.querySelector('.nav');
const navButtons = document.querySelectorAll('.nav__item');

const toogleMenu = (evt) => {
  evt.preventDefault();
  header.classList.toggle('page-header--open');
  header.classList.toggle('page-header--close');
};

header.classList.remove('page-header--no-js');
header.classList.add('page-header--close');
nav.classList.remove('nav--no-js')
nav.classList.add('nav--js');

button.addEventListener('click', toogleMenu);

navButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    if (header.classList.contains('page-header--open')) {
      toogleMenu(evt);
    }
  });
});


const tourLinks = document.querySelectorAll('.tour-list__link');
const tourCards = document.querySelectorAll('.tour-card');
const tourIcons = document.querySelectorAll('.tour')

tourCards.forEach((card) => {
  card.classList.add('tour-card--hidden');
});
tourLinks[0].classList.add('tour-list__link--active');
tourCards[0].classList.remove('tour-card--hidden');

const changeCards = (index) => {
  tourLinks.forEach((button) => {
    button.classList.remove('tour-list__link--active');
  });
  tourCards.forEach((card) => {
    card.classList.add('tour-card--hidden');
  });

  tourLinks[index].classList.add('tour-list__link--active');
  tourCards[index].classList.remove('tour-card--hidden');
};

tourLinks.forEach((element, index) => {
  element.addEventListener('click', (evt) => {
    evt.preventDefault();
    changeCards(index);
  });
});

tourIcons.forEach((element, index) => {
  element.addEventListener('click', () => {
    changeCards(index);
  });
});




const callbackForm = document.querySelector('.callback__form')
const buttonsBuy = document.querySelectorAll('.button--buy-now');
const modal = document.querySelector('.modal');
const modalButtonClose = modal.querySelector('.modal__close');
const modalForm = modal.querySelector('.modal__form');
const modalInputTel = modal.querySelector('.modal__input--tel')
const modalSuccess = modal.querySelector('.modal__success');

const closeModal = () => {
  modal.classList.remove('modal--show');
  modalSuccess.classList.remove('modal__success--show');
};

const isEscHandler = (evt) => {
  if (evt.code === 'Escape') {
    evt.preventDefault();
    closeModal();

    document.removeEventListener('keydown', isEscHandler);
  }
};

buttonsBuy.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.classList.add('modal--show');
    modalInputTel.focus();

    document.addEventListener('keydown', isEscHandler);
  });
});

modalButtonClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeModal();
});

modal.addEventListener('click', (evt) => {
  if (evt.target === modal) {
    evt.preventDefault();
    closeModal();
  }
});

modalForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  modalSuccess.classList.add('modal__success--show');
  modalForm.reset();
});

callbackForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  modal.classList.add('modal--show');
  modalSuccess.classList.add('modal__success--show');
  callbackForm.reset();

  document.addEventListener('keydown', isEscHandler);
});
