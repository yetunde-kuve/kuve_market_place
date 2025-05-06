// import validator from 'validator';
var validator = require("validator");

export function validateInput(
  key: string,
  showPopup: Function,
  errorMessage?: string,
  ignorePassword?: boolean
): boolean {
  let box = document.getElementById(key) as HTMLInputElement;
  let value = box.value.trim();
  box.blur();
  if (value.length == 0) {
    showPopup(errorMessage ?? `Enter your ${key.toLowerCase()}`);
    box.focus();
    return false;
  }
  if (key == "Username") {
    if (value.length < 3) {
      showPopup("Username too short");
      box.focus();
      return false;
    }
  }
  if (key == "Email") {
    if (!validator.isEmail(value)) {
      showPopup(`Please enter a valid email address`);
      return false;
    }
  }
  if (key.includes("Password") && ignorePassword != true) {
    if (value.length < 6) {
      showPopup("Password too short");
      box.focus();
      return false;
    }

    // if (!RegExp("[A-Z]").test(value)) {
    //   showPopup("Password should contain a capital letter");
    //   box.focus();
    //   return false;
    // }

    if (!RegExp("[0-9]").test(value)) {
      showPopup("Password should contain a number");
      box.focus();
      return false;
    }
  }

  return true;
}
export function validateInputLength(
  key: string,
  minLength: number,
  showPopup: Function,
  errorMessage?: string
): boolean {
  let box = document.getElementById(key) as HTMLInputElement;
  let value = box.value.trim();
  box.blur();
  if (value.length < minLength) {
    showPopup(errorMessage ?? `${key} is too short`);
    box.focus();
    return false;
  }
  return true;
}

export function getInputValue(key: string): string {
  let box = document.getElementById(key) as HTMLInputElement;
  let value = box.value.trim();
  return value;
}

export function getInputLength(key: string): number {
  let box = document.getElementById(key) as HTMLInputElement;
  let value = box.value.trim();
  return value.length;
}

export function getInput(key: string): any {
  let box = document.getElementById(key) as HTMLInputElement;
  return box;
}
