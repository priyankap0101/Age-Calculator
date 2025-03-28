// 🎂 Calculate Age Function
function calculateAge() {
    const birthdateInput = document.getElementById("birthdate").value.trim();
    const errorMessage = document.getElementById("error-message");
    const resultContainer = document.getElementById("ageResult");

    // 🛑 Validate input
    if (!birthdateInput) {
        showError(errorMessage, "⚠️ Please enter your birthdate!");
        resultContainer.innerHTML = "";
        return;
    }

    const birthDate = new Date(birthdateInput);
    const today = new Date();

    // 🚫 Prevent future dates
    if (birthDate > today) {
        showError(errorMessage, "⚠️ Birthdate cannot be in the future!");
        resultContainer.innerHTML = "";
        return;
    }

    // ✅ Hide error message completely after valid input
    showError(errorMessage, "");

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (today.getDate() < birthDate.getDate()) {
        months--;
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    // 🎉 Display result with styling
    resultContainer.innerHTML = `🎉 You are <strong>${years}</strong> years and <strong>${months}</strong> months old.`;
    applyResultStyles(resultContainer, "#00ff99");

    goToPage("agePage");
}

// 🎈 Check if Today is the User's Birthday
function checkBirthdayToday() {
    const birthdateInput = document.getElementById("birthdate").value.trim();
    const countdownMessage = document.getElementById("countdown");

    // 🛑 Validate input
    if (!birthdateInput) {
        showError(countdownMessage, "⚠️ Please enter your birthdate first!");
        return;
    }

    const birthDate = new Date(birthdateInput);
    const today = new Date();

    if (today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth()) {
        countdownMessage.innerHTML = "Today is your birthday! Have a fantastic day! 🎂🥳";
        applyResultStyles(countdownMessage, "#ffcc00");
    } else {
        countdownMessage.innerHTML = "Oops! Today isn't your birthday.";
        applyResultStyles(countdownMessage, "#ffffff");
    }

    goToPage("birthdayPage");
}

// 📝 Display error messages with enhanced styling
function showError(element, message) {
    if (message) {
        element.innerHTML = message;
        element.style.display = "block"; // Show error when needed

        // 🔥 Stylish error box
        Object.assign(element.style, {
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "10px",
            background: "rgba(255, 0, 0, 0.95)",
            padding: "12px",
            borderRadius: "8px",
            borderLeft: "4px solid #ff0000",

            textAlign: "center",
            maxWidth: "40%",
            margin: "10px auto 10px "
        });

        // 🔁 Smooth shake effect for better feedback
        element.animate([
            { transform: "translateX(0px)" },
            { transform: "translateX(-5px)" },
            { transform: "translateX(5px)" },
            { transform: "translateX(0px)" }
        ], { duration: 250 });

    } else {
        element.innerHTML = "";
        element.style.display = "none"; // Hide when no error
    }
}

// 🌟 Apply styles to results
function applyResultStyles(element, color) {
    element.style.fontSize = "22px";
    element.style.color = color;
    element.style.fontWeight = "bold";
    element.style.textShadow = `2px 2px 10px ${color}80`;
    element.style.padding = "10px";
    element.style.borderRadius = "10px";
   
}

// 🧭 Page Navigation with History Support
let pageHistory = [];

function goToPage(pageId) {
    const pages = ["inputPage", "agePage", "birthdayPage"];

    if (!pageHistory.length || pageHistory[pageHistory.length - 1] !== pageId) {
        pageHistory.push(pageId);
    }

    pages.forEach(page => document.getElementById(page).classList.remove("active"));
    document.getElementById(pageId).classList.add("active");

    if (pageId === "birthdayPage") {
        checkBirthdayToday();
    }
}

// ⬅️ Go Back Function
function goBack() {
    if (pageHistory.length > 1) {
        pageHistory.pop();
        goToPage(pageHistory[pageHistory.length - 1]);
    }
}
