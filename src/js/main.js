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

console.log("Proyect", import.meta.env.VITE_NAME);
console.log("API", import.meta.env.VITE_BACK_API);

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
const $form = document.querySelector(".subscribe__form");
const $inputs = document.querySelectorAll(".subscribe__input");

$inputs.forEach((input) => {
  const $span = document.createElement("span");
  $span.id = input.name;
  $span.textContent = input.title;
  $span.classList.add("subscribe__error", "hidde");
  input.insertAdjacentElement("afterend", $span);
});

function valitesubscribe(input) {
  let pattern = input.pattern || input.dataset.pattern;

  if (input.value !== "") {
    let regex = new RegExp(pattern);
    return regex.exec(input.value);
  } else {
    return null;
  }
}

document.addEventListener("keyup", (e) => {
  if (e.target.matches(".subscribe__form input")) {
    const $input = document.getElementsByName(e.target.name)[0];
    document.getElementById($input.name).classList.remove("is-active");

    if ($input.value == "") {
      $input.classList.remove("subscribe__input--error");
    } else {
      const validate = valitesubscribe($input);
      validate != null
        ? $input.classList.remove("subscribe__input--error")
        : $input.classList.add("subscribe__input--error");
    }
  }
});

document.addEventListener("submit", async (e) => {
  const $spinner = document.querySelector("#spinner");
  const $subscriptionRta = document.querySelector("#subscription-rta");
  console.log($spinner);
  e.preventDefault();
  let formError = false;
  $inputs.forEach((input) => {
    const validate = valitesubscribe(input);
    if (validate) {
      document.getElementById(input.name).classList.remove("is-active");
      formError = true;
    } else {
      document.getElementById(input.name).classList.add("is-active");
    }
  });
  if (!formError) return;

  $form.classList.add("hidde");
  $spinner.classList.remove("hidde");

  const newSubscriber = {
    name: $form[0].value,
    email: $form[1].value,
    status: "Activo",
  };

  const API_URL = `${import.meta.env.VITE_BACK_API}/subscribers`;
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSubscriber),
  });

  $spinner.classList.add("hidde");

  let msg;
  if (res.status === 200 || res.status === 201) {
    // const data = await res.json();
    // console.log("data", data);
    msg = "Gracias por suscribirte a nuestro newsletter!!!";
  } else {
    // console.log(`Error: ${res.status} - ${res.statusText}`);
    msg = "Error en suscripción. Inténtalo más tarde";
  }
  console.log(msg);
  $subscriptionRta.innerHTML = msg;
});
