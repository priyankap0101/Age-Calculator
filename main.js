// 🎂 Calculate Age Function
function calculateAge() {
    const birthdateInput = document.getElementById("birthdate").value;
    const messageContainer = document.getElementById("error-message");
    const resultContainer = document.getElementById("ageResult");

    // 🛑 Validate input
    if (!birthdateInput) {
        messageContainer.innerHTML = "⚠️ Please enter your birthdate!";
        resultContainer.innerHTML = "";
        return;
    }

    const birthDate = new Date(birthdateInput);
    const today = new Date();

    // 🚫 Prevent future dates
    if (birthDate > today) {
        messageContainer.innerHTML = "⚠️ Birthdate cannot be in the future!";
        resultContainer.innerHTML = "";
        return;
    }

    messageContainer.innerHTML = ""; // ✅ Clear previous errors

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (today.getDate() < birthDate.getDate()) {
        months--;
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    resultContainer.innerHTML = `🎉 You are <strong>${years}</strong> years and <strong>${months}</strong> months old.`;
    goToPage("agePage");
}

// 🎈 Check if Today is the User's Birthday
function checkBirthdayToday() {
    const birthdateInput = document.getElementById("birthdate").value;
    const messageContainer = document.getElementById("countdown");

    // 🛑 Validate input
    if (!birthdateInput) {
        messageContainer.innerHTML = "⚠️ Please enter your birthdate first!";
        return;
    }

    const birthDate = new Date(birthdateInput);
    const today = new Date();

    if (today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth()) {
        messageContainer.innerHTML = "🎉 Today is your birthday! Have a fantastic day! 🎂🥳";
    } else {
        messageContainer.innerHTML = "🎈 Your birthday is not today.";
    }

    goToPage("birthdayPage");
}

// 🧭 Page Navigation with Back Support
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
