// 🎂 Calculate Age Function
function calculateAge() {
    const birthdateInput = document.getElementById("birthdate").value.trim();
    const errorMessage = document.getElementById("error-message");
    const resultContainer = document.getElementById("ageResult");

   // 🛑 Validate input
if (!birthdateInput) {
    showError(errorMessage, "⚠️ Please enter your birthdate!");
    resultContainer.innerHTML = "";

    // ✨ Apply improved styling with custom text color
    Object.assign(errorMessage.style, {
        maxWidth: "80%",  
        margin: "10px auto 15px auto", // Center align with bottom margin
        padding: "10px 15px",
        borderRadius: "8px",
        background: "rgba(255, 77, 77, 0.15)", // Light red background
        boxShadow: "0px 0px 10px rgba(255, 77, 77, 0.4)",
        borderLeft: "4px solid #ff4d4d",
        transition: "all 0.3s ease-in-out",
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "center",
        color: "#ffcccc", // 🔥 Soft red text for better readability
        textShadow: "1px 1px 5px rgba(255, 77, 77, 0.8)", // Glow effect
        transform: "scale(1.03)",
        opacity: "1"
    });

    // 🔁 Smooth shake effect for better feedback
    errorMessage.animate([
        { transform: "translateX(0px)" },
        { transform: "translateX(-4px)" },
        { transform: "translateX(4px)" },
        { transform: "translateX(0px)" }
    ], { duration: 250 });

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

    errorMessage.innerHTML = ""; // ✅ Clear previous errors

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
        countdownMessage.innerHTML = "🎉 Today is your birthday! Have a fantastic day! 🎂🥳";
        applyResultStyles(countdownMessage, "#ffcc00");
    } else {
        countdownMessage.innerHTML = "🎈 Your birthday is not today.";
        applyResultStyles(countdownMessage, "#ffffff");
    }

    goToPage("birthdayPage");
}

// 📝 Display error messages
function showError(element, message) {
    element.innerHTML = message;
    element.style.color = "#ff4d4d";
    element.style.fontWeight = "bold";
    element.style.fontSize = "18px";
}

// 🌟 Apply styles to results
function applyResultStyles(element, color) {
    element.style.fontSize = "22px";
    element.style.color = color;
    element.style.fontWeight = "bold";
    element.style.textShadow = `2px 2px 10px ${color}80`;
    element.style.padding = "10px";
    element.style.borderRadius = "10px";
    element.style.background = "rgba(255, 255, 255, 0.1)";
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
