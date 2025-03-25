function calculateAge() {
    const birthdateInput = document.getElementById("birthdate").value;
    const messageContainer = document.getElementById("error-message");

    // 🛑 Handle missing birthdate input
    if (!birthdateInput) {
        messageContainer.innerHTML = "⚠️ Please enter your birthdate!";
        messageContainer.style.display = "block";
        return;
    } else {
        messageContainer.style.display = "none";
    }

    const birthDate = new Date(birthdateInput);
    const today = new Date();
    
    // Remove time components for accurate date comparison
    birthDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // 🛑 Prevent future birthdates
    if (birthDate > today) {
        messageContainer.innerHTML = "⚠️ Birthdate cannot be in the future!";
        messageContainer.style.display = "block";
        return;
    }

    // 🎂 Calculate Age in Years, Months, and Days
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

    // 🗓️ Day of the Week Born
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    document.getElementById("bornDay").innerHTML = `You were born on a <strong>${daysOfWeek[birthDate.getDay()]}</strong>.`;

    // 🎂 Countdown to Next Birthday
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const countdownDays = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    if (countdownDays === 0) {
        document.getElementById("countdown").innerHTML = "🎉 Happy Birthday! 🎂";
    } else {
        document.getElementById("countdown").innerHTML = `Your next birthday is in <strong>${countdownDays}</strong> days!`;
    }

    // 🏮 Chinese Zodiac Calculation (Fix negative index issue)
    const chineseZodiacs = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
    const chineseZodiacSign = chineseZodiacs[(birthDate.getFullYear() - 4 + 1200) % 12];
    document.getElementById("chineseZodiac").innerHTML = `Your Chinese zodiac sign is <strong>${chineseZodiacSign}</strong>.`;

    // 🔥 Western Zodiac Calculation (Fix December overflow issue)
    const zodiacSigns = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
    const zodiacDates = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
    
    const signIndex = (birthDate.getDate() > zodiacDates[birthDate.getMonth()]) 
        ? (birthDate.getMonth() + 1) % 12 
        : birthDate.getMonth();
    
    const sign = zodiacSigns[signIndex];
    document.getElementById("zodiac").innerHTML = `Your zodiac sign is <strong>${sign}</strong>.`;

    // ⏳ Age in Weeks, Days, Hours, Minutes, Seconds
    const ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    const ageInWeeks = Math.floor(ageInDays / 7);
    const ageInHours = ageInDays * 24;
    const ageInMinutes = ageInHours * 60;
    const ageInSeconds = ageInMinutes * 60;

    document.getElementById("ageInTimeUnits").innerHTML = `
        🕰️ You've lived for:
        <ul>
            <li><strong>${ageInWeeks}</strong> weeks</li>
            <li><strong>${ageInDays}</strong> days</li>
            <li><strong>${ageInHours}</strong> hours</li>
            <li><strong>${ageInMinutes}</strong> minutes</li>
            <li><strong>${ageInSeconds}</strong> seconds</li>
        </ul>`;

    goToPage('agePage'); // Move to the first result page
}

// 🧭 Navigation Functions (Fix: Check if page exists)
function goToPage(pageId) {
    const pages = ["inputPage", "agePage", "birthdayPage", "zodiacPage"];
    let index = pages.indexOf(pageId);

    if (index === -1) {
        console.error("Invalid page ID:", pageId);
        return;
    }

    // 🌟 Loop back to first page after last page
    if (index === pages.length - 1) {
        index = 0;
    }

    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pages[index]).classList.add('active');

    document.querySelectorAll('.step').forEach((step, i) => step.classList.toggle('active', i <= index));
}


// 🔙 Go Back Function
function goBack(pageId) {
    goToPage(pageId);
}
