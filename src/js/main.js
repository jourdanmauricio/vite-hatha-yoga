// import "../../css/style.css";

// import javascriptLogo from "./javascript.svg";
// import { setupCounter } from "../../counter.js";

// document.querySelector("#app").innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;

// setupCounter(document.querySelector("#counter"));

/************/
/*   Menu   */
/************/
const menuHamIcon = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");

menuHamIcon.addEventListener("click", toggleMobileMenu);

window.addEventListener("mouseup", function (event) {
  if (event.target != mobileMenu && event.target != menuHamIcon) {
    mobileMenu.classList.add("inactive");
  }
});

function toggleMobileMenu(e) {
  mobileMenu.classList.toggle("inactive");
  e.stopPropagation();
}

/******************/
/*   Suscribete   */
/******************/
const $form = document.querySelector(".suscribe__form");
const $inputs = document.querySelectorAll(".suscribe__input");

$inputs.forEach((input) => {
  const $span = document.createElement("span");
  $span.id = input.name;
  $span.textContent = input.title;
  $span.classList.add("suscribe__error", "suscribe__none");
  input.insertAdjacentElement("afterend", $span);
});

function valiteSuscribe(input) {
  let pattern = input.pattern || input.dataset.pattern;

  if (input.value !== "") {
    let regex = new RegExp(pattern);
    return regex.exec(input.value);
  } else {
    return null;
  }
}

document.addEventListener("keyup", (e) => {
  if (e.target.matches(".suscribe__form input")) {
    const $input = document.getElementsByName(e.target.name)[0];
    document.getElementById($input.name).classList.remove("is-active");

    if ($input.value == "") {
      $input.classList.remove("suscribe__input--error");
    } else {
      const validate = valiteSuscribe($input);
      validate != null
        ? $input.classList.remove("suscribe__input--error")
        : $input.classList.add("suscribe__input--error");
    }
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  $inputs.forEach((input) => {
    const validate = valiteSuscribe(input);
    validate
      ? document.getElementById(input.name).classList.remove("is-active")
      : document.getElementById(input.name).classList.add("is-active");
  });
});
