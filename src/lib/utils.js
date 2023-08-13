import { toast } from "react-toastify";

export const toastNotify = ({ type, message }) => {
  return toast[type](message);
};

export const debounce = (fn, delay = 100) => {
  let timeoutID;

  return (...args) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...args), delay);
  };
};
