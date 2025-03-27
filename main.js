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
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById("ageResult").innerHTML =
        `You are <strong>${years}</strong> years, <strong>${months}</strong> months, <strong>${days}</strong> days old.`;

    goToPage("agePage"); // ✅ Move to age display
}

// 🎈 Calculate Next Birthday Countdown
function calculateBirthdayCountdown() {
    const birthdateInput = document.getElementById("birthdate").value;

    if (!birthdateInput) {
        document.getElementById("countdown").innerHTML = "⚠️ Please enter your birthdate first!";
        return;
    }

    const birthDate = new Date(birthdateInput);
    const today = new Date();

    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const differenceInTime = nextBirthday.getTime() - today.getTime();
    const countdownDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

    if (countdownDays === 0) {
        document.getElementById("countdown").innerHTML = "🎉 Happy Birthday! 🎂";
    } else {
        document.getElementById("countdown").innerHTML =
            `Your next birthday is in <strong>${countdownDays}</strong> days!`;
    }

    goToPage("birthdayPage"); // ✅ Move to countdown page
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

    // If moving to the birthday page, calculate countdown
    if (pageId === "birthdayPage") {
        calculateBirthdayCountdown();
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
