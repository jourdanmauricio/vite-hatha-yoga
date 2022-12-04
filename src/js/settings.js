const d = document;
export default async function api() {
  const API_URL = `${import.meta.env.VITE_BACK_API}/settings`;

  const res = await fetch(API_URL);
  const settings = await res.json();

  const logo = settings.filter((setting) => setting.feature === "logo")[0];
  const twitter = settings.filter(
    (setting) => setting.feature === "Twitter"
  )[0];
  const facebook = settings.filter(
    (setting) => setting.feature === "Facebook"
  )[0];
  const instagram = settings.filter(
    (setting) => setting.feature === "Instagram"
  )[0];

  const whatsapp = settings.filter(
    (setting) => setting.feature === "Whatsapp"
  )[0];

  const phone = settings.filter((setting) => setting.feature === "phone")[0];
  const email = settings.filter((setting) => setting.feature === "email")[0];
  const titleColor = settings.filter(
    (setting) => setting.feature === "title_color"
  )[0];
  const paragraphColor = settings.filter(
    (setting) => setting.feature === "paragraph_color"
  )[0];
  const buttonColor = settings.filter(
    (setting) => setting.feature === "button_color"
  )[0];
  const effectColor = settings.filter(
    (setting) => setting.feature === "effect_color"
  )[0];
  const errorColor = settings.filter(
    (setting) => setting.feature === "error_color"
  )[0];
  const divisorColor = settings.filter(
    (setting) => setting.feature === "divisor_color"
  )[0];
  const titleSize = settings.filter(
    (setting) => setting.feature === "title_font_size"
  )[0];
  const paragraphSize = settings.filter(
    (setting) => setting.feature === "paragraph_font_size"
  )[0];
  const titleWeight = settings.filter(
    (setting) => setting.feature === "title_font_weight"
  )[0];
  const paragraphWeight = settings.filter(
    (setting) => setting.feature === "paragraph_font_weight"
  )[0];

  console.log("settings", settings);

  const $logoImg = d.getElementById("logo");
  $logoImg.src = logo.value;
  const $logoFooter = d.getElementById("footer-logo");
  $logoFooter.src = logo.value;
  const $phoneSpan = d.getElementById("phone");
  $phoneSpan.innerText = `Tel ${phone.value}`;
  const $emailA = d.getElementById("footer-email");
  $emailA.href = `mailto: ${email.value}`;
  const $whatsappA = d.getElementById("footer-whatsapp");
  $whatsappA.href = whatsapp.value;
  const $facebookA = d.getElementById("footer-facebook");
  $facebookA.href = facebook.value;
  const $twitterA = d.getElementById("footer-twitter");
  $twitterA.href = twitter.value;
  const $instagramA = d.getElementById("footer-instagram");
  $instagramA.href = instagram.value;

  d.documentElement.style.setProperty("--title-color", titleColor.value);
  d.documentElement.style.setProperty(
    "--paragraph-color",
    paragraphColor.value
  );
  d.documentElement.style.setProperty("--button-color", buttonColor.value);
  d.documentElement.style.setProperty("--effect-color", effectColor.value);
  d.documentElement.style.setProperty("--error-color", errorColor.value);
  d.documentElement.style.setProperty("--divisor-color", divisorColor.value);
  d.documentElement.style.setProperty("--paragraph-size", paragraphSize.value);
  d.documentElement.style.setProperty("--title-size", titleSize.value);
  d.documentElement.style.setProperty("--title-weight", titleWeight.value);
  d.documentElement.style.setProperty(
    "--paragraph-weight",
    paragraphWeight.value
  );
}
