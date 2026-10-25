// Sample course data (simulating our academy database)
const courses = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    category: "Programming",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Advanced CSS & Layouts",
    category: "Design",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Full-Stack API Integration",
    category: "Backend",
    level: "Advanced",
  },
];

const courseListElement = document.getElementById("courseList");

// Function to render courses on the screen
function displayCourses(coursesArray) {
  courseListElement.innerHTML = ""; // Clear current list

  coursesArray.forEach((course) => {
    const card = document.createElement("div");
    card.classList.add("course-card");

    card.innerHTML = `
            <h3>${course.title}</h3>
            <p>Category: <strong>${course.category}</strong></p>
            <p>Level: ${course.level}</p>
            <button class="btn" onclick="enroll(${course.id})">Enroll Now</button>
        `;

    courseListElement.appendChild(card);
  });
}

function enroll(courseId) {
  alert(`Successfully enrolled in course ID: ${courseId}!`);
}

// Initial load
displayCourses(courses);
