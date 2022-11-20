const d = document;
import menu from "./menu";
import form from "./form";

console.log("Proyect", import.meta.env.VITE_NAME);
console.log("API", import.meta.env.VITE_BACK_API);

/* Cuando finaliza load */
d.addEventListener("DOMContentLoaded", (e) => {
  menu();
  form("#form-subscribe");
  form("#form-contact");
});
