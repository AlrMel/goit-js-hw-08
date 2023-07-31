import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

fromLocalStorage();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  const localStorageData = {
    email: refs.input.value,
    message: refs.textarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localStorageData));
}

function fromLocalStorage() {
  const storageValue = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!storageValue) {
    return;
  }
  refs.input.value = storageValue.email;
  refs.textarea.value = storageValue.message;
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
  refs.form.reset();
}
