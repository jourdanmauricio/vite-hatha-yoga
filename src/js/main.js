const d = document;
import menu from "./menu";
import form from "./form";

/* Cuando finaliza load */
d.addEventListener("DOMContentLoaded", (e) => {
  menu();
  form("#form-subscribe");
  form("#form-contact");
});
