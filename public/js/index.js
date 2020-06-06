const buttonSearch = document.querySelector(".contet__button");
const modal = document.querySelector("#modal");
const close = document.querySelector(".close__page");

buttonSearch.addEventListener("click", () => modal.classList.toggle("hide"));
close.addEventListener("click", () => modal.classList.toggle("hide"));
