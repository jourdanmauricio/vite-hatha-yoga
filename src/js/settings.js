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

  //const titleColor
  //const paragraphColor

  console.log("settings", whatsapp);

  const $logoImg = document.getElementById("logo");
  $logoImg.src = logo.value;
  const $logoFooter = document.getElementById("footer-logo");
  $logoFooter.src = logo.value;
  const $phoneSpan = document.getElementById("phone");
  $phoneSpan.innerText = `Tel ${phone.value}`;
  const $emailA = document.getElementById("footer-email");
  $emailA.href = `mailto: ${email.value}`;
  const $whatsappA = document.getElementById("footer-whatsapp");
  $whatsappA.href = whatsapp.value;
  const $facebookA = document.getElementById("footer-facebook");
  $facebookA.href = facebook.value;
  const $twitterA = document.getElementById("footer-twitter");
  $twitterA.href = twitter.value;
  const $instagramA = document.getElementById("footer-instagram");
  $instagramA.href = instagram.value;
}
