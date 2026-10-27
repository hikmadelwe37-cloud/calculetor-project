[23/10/2026 21:13] Eneb: // Using Promises
function loadWithPromises() {
    // 1. Get the request URL from the input box first
    const targetUrl = document.getElementById('apiUrl').value;

    // 2. Then run the fetch request using that URL
    fetch(targetUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Promise Data:", data);
        })
        .catch(error => console.error("Error:", error));
}

// Using Async/Await
async function loadWithAsyncAwait() {
    // 1. Get the request URL from the input box first
    const targetUrl = document.getElementById('apiUrl').value;

    try {
        // 2. Then run the fetch request using that URL
        const response = await fetch(targetUrl);
        const data = await response.json();
        console.log("Async/Await Data:", data);
    } catch (error) {
        console.error("Error:", error);
    }
}

const promiseButton = document.getElementById("promiseButton");
const asyncButton = document.getElementById("asyncButton");
const errorButton = document.getElementById("errorButton");

const status = document.getElementById("status");
const steps = document.getElementById("steps");
const userResult = document.getElementById("userResult");

const API_URL = "https://jsonplaceholder.typicode.com/users/1";

// Display a user on the page.
function displayUser(user) {
    userResult.innerHTML = "";

    const card = document.createElement("div");
    card.className = "user-card";

    const name = document.createElement("p");
    name.textContent = "Name: " + user.name;

    const email = document.createElement("p");
    email.textContent = "Email: " + user.email;

    const city = document.createElement("p");
    city.textContent = "City: " + user.address.city;

    card.append(name, email, city);
    userResult.appendChild(card);
}

// Show an error safely.
function displayError(error) {
    status.textContent = "Request failed!";
    status.className = "error";

    steps.textContent =
        "Lesson 30: catch received the error and handled it.";

    userResult.textContent = error.message;
    userResult.className = "error";
}

// Reset the page before a new request.
function startLoading() {
    status.className = "";
    status.textContent = "Loading...";
    steps.textContent = "Sending a request to the server...";
    userResult.textContent = "Waiting for the API response...";
    userResult.className = "";
}

// LESSON 27 + 28: fetch() and Promises
function loadWithPromises() {
    startLoading();

    steps.textContent =
        "1. fetch() sends the request. 2. A Promise represents the result.";

    fetch(API_URL)
        .then(function (response) {
            status.textContent = "Server responded!";
            steps.textContent =
                "3. The response arrived. Checking response.ok...";

            if (!response.ok) {
                throw new Error("The server returned an error.");
            }

            return response.json();
        })
        .then(function (user) {
            status.textContent = "Data received successfully!";
            status.className = "success";

            steps.textContent =
                "4. response.json() parsed the data. " +
                "The next then() received the user object.";

            displayUser(user);
        })
        .catch(function (error) {
            displayError(error);
        });
}

// LESSON 27 + 29 + 30: fetch(), async/await, try/catch
async function loadWithAsyncAwait(url = API_URL) {
    startLoading();

    try {
        steps.textContent =
            "1. fetch() sends the request. await waits for its Promise.";

        const response = await fetch(url);

        status.textContent = "Server responded!";
        steps.textContent =
            "2. The response arrived. Checking response.ok...";

        if (!response.ok) {
            throw new Error(
                "HTTP error! Status: " + response.status
            );
        }

        steps.textContent =
            "3. await response.json() reads and parses the response.";
[23/10/2026 21:13] Eneb: const user = await response.json();

        status.textContent = "Data received successfully!";
        status.className = "success";

        steps.textContent =
            "4. The user object is ready. Now we display it.";

        displayUser(user);

    } catch (error) {
        displayError(error);
    }
}

// Connect the buttons to their functions.
promiseButton.addEventListener("click", loadWithPromises);

asyncButton.addEventListener("click", function () {
    loadWithAsyncAwait();
});

// LESSON 30: Deliberately test a failed request.
errorButton.addEventListener("click", function () {
    loadWithAsyncAwait(
        "https://jsonplaceholder.typicode.com/invalid-endpoint"
    );
});