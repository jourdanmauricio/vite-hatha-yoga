const d = document;
import menu from "./menu";
import form from "./form";
import settings from "./settings";
import api from "./api";
import scrollSpy from "./scroll_spy";

/* Cuando finaliza load */
d.addEventListener("DOMContentLoaded", (e) => {
  menu();
  form("#form-subscribe");
  form("#form-contact");
  settings();
  api();
  scrollSpy();
});
