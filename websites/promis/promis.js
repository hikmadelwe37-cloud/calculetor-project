async function fetchUserData() {
  const userId = document.getElementById("userIdInput").value;

  // Elements to update
  const nameSpan = document.getElementById("name");
  const emailSpan = document.getElementById("email");
  const citySpan = document.getElementById("city");

  // Validation
  if (!userId || userId < 1 || userId > 10) {
    alert("Please enter a valid ID between 1 and 10.");
    return;
  }

  nameSpan.textContent = "Loading...";
  emailSpan.textContent = "Loading...";
  citySpan.textContent = "Loading...";

  try {
    // 1. Fetch data from the mock database API
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );

    // Check if response is okay
    if (!response.ok) {
      throw new Error("User not found!");
    }

    // 2. Parse the response into a JSON object
    const user = await response.json();

    // 3. Update the DOM with the real database data
    nameSpan.textContent = user.name;
    emailSpan.textContent = user.email;
    citySpan.textContent = user.address.city;
  } catch (error) {
    nameSpan.textContent = "Error fetching data!";
    emailSpan.textContent = "";
    citySpan.textContent = "";
    console.error(error);
  }
}
