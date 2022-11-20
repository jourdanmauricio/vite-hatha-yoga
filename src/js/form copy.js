const d = document;

export default function subscriberForm(form) {
  /*****************/
  /*   Subscribe   */
  /*****************/
  const $form = d.querySelector(form);
  const $inputs = d.querySelectorAll(`${form} .form__input`);

  console.log("form", $form);
  console.log("inputs", $inputs);

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
    console.log("form", $form);

    const $spinner = d.querySelector(`${form} ~ #spinner`);
    const $formRta = d.querySelector(`${form} ~ #form-rta`);

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
        // const data = await res.json();
        // console.log("data", data);
        msg = "Gracias por suscribirte a nuestro newsletter!!!";
      } else {
        // console.log(`Error: ${res.status} - ${res.statusText}`);
        msg = "Error en suscripción. Inténtalo más tarde";
      }
    }

    if (form === "#form-contact") {
      if (res.status === 200 || res.status === 201) {
        msg = "Gracias por tu comentario· En breve nos pondremos en contacto.";
      } else {
        msg = "Error enviando el formulario. Inténtalo más tarde";
      }
    }
    $formRta.innerHTML = msg;
  }

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(`${form} .form__input`)) {
      const $input = d.getElementsByName(e.target.name)[0];
      if (!$input) return;
      console.log("input", $input);
      console.log("!!!!!", d.getElementById($input.name));
      // d.getElementById($input.name).classList.remove("is-active");
      // $input.classList.remove("is-active");

      // const error = d.getElementById($input.name).classList.remove("is-active");

      if ($input.value == "") {
        $input.classList.remove("form__input--error");
      } else {
        const validate = valiteSubmit($input);
        console.log("!!!!!!!!!!!", validate);
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
        const $span = d.createElement("span");
        // $span.id = `span-${input.name}`;
        $span.id = input.name;
        $span.textContent = errorInfo;
        $span.classList.add("form__error", "hidde");
        input.insertAdjacentElement("afterend", $span);

        console.log(d.getElementById(input.name));
        d.getElementById(input.name).classList.add("is-active");
      }
    });

    console.log("formError", form, formError);
    if (formError == true) return;

    processForm();
  });
}
