const d = document;

export default function scrollSpy() {
  const $sections = d.querySelectorAll("section[data-scroll-spy]");

  console.log($sections);

  const cb = (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      if (entry.isIntersecting) {
        d.querySelector(`a[data-scroll-spy][href="#${id}"]`).classList.add(
          "menu__active"
        );
      } else {
        d.querySelector(`a[data-scroll-spy][href="#${id}"]`).classList.remove(
          "menu__active"
        );
      }
    });
  };

  const observer = new IntersectionObserver(cb, {
    rootMargin: "-280px",
    // threshold: [0.5, 0.75],
    // threshold: 0.3,
  });

  $sections.forEach((el) => observer.observe(el));
}
