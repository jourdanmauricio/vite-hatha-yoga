/************/
/*   Menu   */
/************/
export default function menu() {
  console.log("!!!!!!!!!!!", window.location.href);
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
}
