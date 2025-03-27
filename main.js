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

// 🧭 Page Navigation
function goToPage(pageId) {
    document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");

    // If going to birthday page, calculate countdown
    if (pageId === "birthdayPage") {
        calculateBirthdayCountdown();
    }
}
