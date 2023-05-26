export function loginResetClick(item1: string, item2: string) {
  const emailTooltip = document.getElementById('tooltip-email') as HTMLElement;
  const emailBorder = document.getElementById('email') as HTMLElement;

  const passwordBorder = document.getElementById('password') as HTMLElement;

  item2.length < 8 ? passwordBorder.classList.add('error') : emailBorder.classList.remove('error');

  item1.length < 8
    ? emailTooltip.classList.add('visible')
    : emailTooltip.classList.remove('visible');
}

export function modalAppear() {
  const modalBox = document.getElementById('validation') as HTMLElement;

  modalBox.classList.add('visible');
  setTimeout(() => {
    modalBox.classList.remove('visible');
  }, 900);
}

export function passwordCheck(password: string) {
  const characterlength = document.getElementById('length') as HTMLElement;
  const lowerCase = document.getElementById('lower') as HTMLElement;
  const upperCase = document.getElementById('upper') as HTMLElement;
  const numeric = document.getElementById('number') as HTMLElement;

  const number = new RegExp('(?=.*[0-9])');
  const length = new RegExp('(?=.{8,})');
  const lower = new RegExp('(?=.*[a-z])');
  const upper = new RegExp('(?=.*[A-Z])');

  number.test(password) ? numeric.classList.add('pass') : numeric.classList.remove('pass');

  lower.test(password) ? lowerCase.classList.add('pass') : lowerCase.classList.remove('pass');

  upper.test(password) ? upperCase.classList.add('pass') : upperCase.classList.remove('pass');

  length.test(password)
    ? characterlength.classList.add('pass')
    : characterlength.classList.remove('pass');
}

export const passwordView = (id: string) => {
  const passwordInput = document.getElementById(id) as HTMLInputElement;
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
};
