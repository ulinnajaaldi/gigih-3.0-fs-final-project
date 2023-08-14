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

export const getYoutubeEmbedUrl = (url) => {
  const youtubeUrl = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  const id = youtubeUrl[2].split(/[^0-9a-z_-]/i);
  return `https://www.youtube.com/embed/${id[0]}`;
};

export const convertToRupiah = (number) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);

  return rupiah;
};
