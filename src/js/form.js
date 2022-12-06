const d = document;

export default function form(form) {
  const $form = d.querySelector(form);
  const $inputs = d.querySelectorAll(`${form} .form__input`);

  function valiteSubmit(input) {
    let pattern = input.pattern || input.dataset.pattern;

    if (!input.required && !pattern) {
      return "OK";
    }

    if (input.required && input.value === "") {
      return "required";
    }

    let regex = new RegExp(pattern);
    return regex.exec(input.value) === null ? "error" : "OK";
  }

  async function processForm() {
    const $spinner = d.querySelector(`${form} ~ div #spinner`);
    const $formRta = d.querySelector(`${form} ~ div #form-rta`);

    $form.classList.add("hidde");
    $spinner.classList.remove("hidde");

    let API_URL;
    let obj;
    if (form === "#form-subscribe") {
      obj = {
        name: $form[0].value,
        email: $form[1].value,
        status: "Activo",
      };
      API_URL = `${import.meta.env.VITE_BACK_API}/subscribers`;
    }

    if (form === "#form-contact") {
      obj = {
        name: $form[0].value,
        email: $form[1].value,
        phone: $form[2].value,
        comment: $form[3].value,
      };
      API_URL = `${import.meta.env.VITE_BACK_API}/comments`;
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    $spinner.classList.add("hidde");

    let msg;

    if (form === "#form-subscribe") {
      if (res.status === 200 || res.status === 201) {
        msg = "Gracias por suscribirte a nuestro newsletter!!!";
      } else {
        msg = "Error en suscripción. Inténtalo más tarde";
      }
    }

    if (form === "#form-contact") {
      if (res.status === 200 || res.status === 201) {
        msg = "Gracias por tu comentario. En breve nos pondremos en contacto.";
      } else {
        msg = "Error enviando el formulario. Inténtalo más tarde";
      }
    }
    $formRta.innerHTML = msg;

    setTimeout(() => {
      $formRta.innerHTML = "";
      $form.reset();
      $form.classList.remove("hidde");
    }, 3000);
  }

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(`${form} .form__input`)) {
      const $input = d.getElementsByName(e.target.name)[0];
      if (!$input) return;

      const $error = d.getElementById(`span-${$input.name}`);

      if ($error) {
        d.getElementById(`span-${$input.name}`).classList.remove("form__error");
        d.getElementById(`span-${$input.name}`).classList.add("hidde");
      }

      if ($input.value == "") {
        $input.classList.remove("form__input--error");
      } else {
        const validate = valiteSubmit($input);
        validate === "OK"
          ? $input.classList.remove("form__input--error")
          : $input.classList.add("form__input--error");
      }
    }
  });

  d.addEventListener("submit", async (e) => {
    if (form !== `#${e.target.id}`) return;

    e.preventDefault();
    let formError = false;
    $inputs.forEach((input) => {
      const validate = valiteSubmit(input);
      if (validate !== "OK") {
        formError = true;

        let errorInfo = validate === "error" ? input.title : "Requerido";

        const $error = d.getElementById(`span-${input.name}`);
        if (!$error) {
          const $span = d.createElement("span");
          $span.id = `span-${input.name}`;
          $span.textContent = errorInfo;
          $span.classList.add("form__error"); // , "hidde"
          input.insertAdjacentElement("afterend", $span);
        } else {
          $error.textContent = errorInfo;
          $error.classList.remove("hidde");
          $error.classList.add("form__error");
        }
      }
    });

    if (formError == true) return;

    processForm();
  });
}
