const search = document.getElementById("search");
const courses = document.querySelectorAll("#courseList li");

search.addEventListener("input", function () {
  const searchText = search.value.trim().toLowerCase();

  courses.forEach(function (course) {
    const courseName = course.textContent.toLowerCase();

    if (courseName.includes(searchText)) {
      course.style.display = "";
    } else {
      course.style.display = "none";
    }
  });
});
