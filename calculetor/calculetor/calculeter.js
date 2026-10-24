const num1 = document.getElementById("num1");
        const num2 = document.getElementById("num2");
        const calcBtn = document.getElementById("calcBtn");
        const calcResult = document.getElementById("calcResult");

        const contactForm = document.getElementById("contactForm");
        const nameInput = document.getElementById("nameInput");
        const emailInput = document.getElementById("emailInput");
        const msgInput = document.getElementById("msgInput");
        const formResult = document.getElementById("formResult");
        const historyList = document.getElementById("historyList");

        const themeToggle = document.getElementById("themeToggle");

        // Keep track of the latest calculation result globally
        let latestCalculationText = "No calculations yet.";

        // --- FEATURE 1: CALCULATOR & SAVING HISTORY ---
        calcBtn.addEventListener("click", function() {
            const val1 = Number(num1.value);
            const val2 = Number(num2.value);

            if (num1.value === "" || num2.value === "") {
                calcResult.textContent = "Please fill in both numbers.";
                return;
            }

            const sum = val1 + val2;
            latestCalculationText = `${val1} + ${val2} = ${sum}`;
            calcResult.textContent = `Current Result: ${latestCalculationText}`;

            // Create and add element to calculator history list immediately
            const historyItem = document.createElement("li");
            historyItem.textContent = latestCalculationText;
            historyList.appendChild(historyItem);
        });

        // --- FEATURE 2: SUBMIT, UPPERCASE, & MESSAGE HANDLING ---
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Stop page refresh

            const cleanName = nameInput.value.trim();
            const cleanEmail = emailInput.value.trim();
            const cleanMsg = msgInput.value.trim();

            if (cleanName === "" || cleanEmail === "" || cleanMsg === "") {
                formResult.textContent = "Please fill out all fields!";
                return;
            }

            // Using toUpperCase for the final submitted message/name
            const upperName = cleanName.toUpperCase();
            const upperMsg = cleanMsg.toUpperCase();

            formResult.textContent = `Thank you, ${upperName} (${cleanEmail})!\nYour Message: "${upperMsg}"\nLast Calc Result Attached: ${latestCalculationText}`;
        });

        // --- FEATURE 3: DARK MODE TOGGLE AT THE BOTTOM ---
        themeToggle.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");
            
            // Change button text based on mode
            if (document.body.classList.contains("dark-mode")) {
                themeToggle.textContent = "Light Mode";
            } else {
                themeToggle.textContent = "Dark Mode";
            }
        });