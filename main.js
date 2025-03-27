// 🎂 Calculate Age Function
function calculateAge() {
    const birthdateInput = document.getElementById("birthdate").value;
    const messageContainer = document.getElementById("error-message");

    // 🛑 Handle missing input
    if (!birthdateInput) {
        messageContainer.innerHTML = "⚠️ Please enter your birthdate!";
        return;
    } else {
        messageContainer.innerHTML = "";
    }

    const birthDate = new Date(birthdateInput);
    const today = new Date();

    // Prevent future dates
    if (birthDate > today) {
        messageContainer.innerHTML = "⚠️ Birthdate cannot be in the future!";
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById("ageResult").innerHTML =
        `You are <strong>${years}</strong> years and <strong>${months}</strong> months old.`;

    goToPage("agePage"); // ✅ Move to age display
}

// 🎈 Birthday Message (Only Checks If It's Today)
function checkBirthdayToday() {
    const birthdateInput = document.getElementById("birthdate").value;

    if (!birthdateInput) {
        document.getElementById("countdown").innerHTML = "⚠️ Please enter your birthdate first!";
        return;
    }

    const birthDate = new Date(birthdateInput);
    const today = new Date();

    // 🎂 If today is the birthday
    if (today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth()) {
        document.getElementById("countdown").innerHTML = "🎉 Today is your birthday! Have a great day! 🎂🥳";
    } else {
        document.getElementById("countdown").innerHTML = "🎈 Your birthday is not today.";
    }

    goToPage("birthdayPage");
}

// 🧭 Page Navigation with Back Support
let pageHistory = []; // Store page navigation history

function goToPage(pageId) {
    const pages = ["inputPage", "agePage", "birthdayPage"];
    
    // Store current page before switching (except when going back)
    if (pageHistory.length === 0 || pageHistory[pageHistory.length - 1] !== pageId) {
        pageHistory.push(pageId);
    }

    // Show the selected page and hide others
    pages.forEach((page) => document.getElementById(page).classList.remove("active"));
    document.getElementById(pageId).classList.add("active");

    // If moving to the birthday page, check if today is the birthday
    if (pageId === "birthdayPage") {
        checkBirthdayToday();
    }
}

// ⬅️ Go Back Function
function goBack() {
    if (pageHistory.length > 1) {
        pageHistory.pop(); // Remove current page
        const previousPage = pageHistory[pageHistory.length - 1]; // Get the last visited page
        goToPage(previousPage);
    }
}
