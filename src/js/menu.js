/************/
/*   Menu   */
/************/
export default function menu() {
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
