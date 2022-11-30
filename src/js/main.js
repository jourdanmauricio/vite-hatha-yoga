const d = document;
import menu from "./menu";
import form from "./form";
import api from "./api";

/* Cuando finaliza load */
d.addEventListener("DOMContentLoaded", (e) => {
  menu();
  form("#form-subscribe");
  form("#form-contact");
  api();
});
