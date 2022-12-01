export default async function api() {
  if (
    `${import.meta.env.VITE_URL}/contact.html` !==
    window.location.href.split("#")[0]
  )
    return;

  const lessonsId = document.getElementById("lessons-table");
  const API_URL = `${import.meta.env.VITE_BACK_API}/lessons`;

  const res = await fetch(API_URL);
  const lessons = await res.json();

  const lessonsTbody = document.createElement("tbody");
  lessons.forEach((lesson) => {
    const lessonsTr = document.createElement("tr");
    const lessonsTd = document.createElement("td");
    lessonsTd.innerText = lesson.days;
    const lessonsTd2 = document.createElement("td");
    lessonsTd2.innerText = lesson.hours;
    lessonsTr.appendChild(lessonsTd);
    lessonsTr.appendChild(lessonsTd2);
    lessonsTbody.appendChild(lessonsTr);
  });

  lessonsId.appendChild(lessonsTbody);
}
