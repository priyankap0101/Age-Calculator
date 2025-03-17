function calculateAge() {
    let birthdateInput = document.getElementById("birthdate").value;
    if (!birthdateInput) {
        alert("⚠️ Please enter your birthdate!");
        return;
    }

    let birthDate = new Date(birthdateInput);
    let today = new Date();
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
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let bornDay = daysOfWeek[birthDate.getDay()];
    document.getElementById("bornDay").innerHTML = `You were born on a <strong>${bornDay}</strong>.`;

    // 🎂 Countdown to Next Birthday
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) { nextBirthday.setFullYear(today.getFullYear() + 1); }
    let diff = nextBirthday - today;
    let countdownDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById("countdown").innerHTML = `Your next birthday is in <strong>${countdownDays}</strong> days!`;

    // 🏮 Chinese Zodiac Calculation
    let chineseZodiacs = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
    let chineseZodiacSign = chineseZodiacs[(birthDate.getFullYear() - 4) % 12];
    document.getElementById("chineseZodiac").innerHTML = `Your Chinese zodiac sign is <strong>${chineseZodiacSign}</strong>.`;

    // 🔥 Western Zodiac Calculation
    let zodiacSigns = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
    let zodiacDates = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
    let month = birthDate.getMonth();
    let day = birthDate.getDate();
    let sign = (day > zodiacDates[month]) ? zodiacSigns[month + 1] : zodiacSigns[month];
    document.getElementById("zodiac").innerHTML = `Your zodiac sign is <strong>${sign}</strong>.`;

    // ⏳ Age in Weeks, Days, Hours, Minutes, Seconds
    let ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    let ageInWeeks = Math.floor(ageInDays / 7);
    let ageInHours = ageInDays * 24;
    let ageInMinutes = ageInHours * 60;
    let ageInSeconds = ageInMinutes * 60;
    
    document.getElementById("ageInTimeUnits").innerHTML = `
        🕰️ You've lived for:
        <ul>
            <li><strong>${ageInWeeks}</strong> weeks</li>
            <li><strong>${ageInDays}</strong> days</li>
            <li><strong>${ageInHours}</strong> hours</li>
            <li><strong>${ageInMinutes}</strong> minutes</li>
            <li><strong>${ageInSeconds}</strong> seconds</li>
        </ul>`;

    // 🎯 Life Expectancy Estimation
    let averageLifeExpectancy = 72; // Global average
    let remainingYears = averageLifeExpectancy - years;
    let remainingDays = remainingYears * 365;
    document.getElementById("lifeExpectancy").innerHTML = remainingYears > 0 
        ? `On average, you have <strong>${remainingYears}</strong> years left to live! (Based on a global average of 72 years).` 
        : `You've surpassed the average life expectancy! 🎉 Keep enjoying life!`;

    // 🤯 Fun Facts
    let funFacts = [
        "You've witnessed thousands of sunrises!",
        "Your heart has beaten millions of times!",
        "You've taken millions of breaths so far!",
        "Your eyes have blinked over a hundred million times!",
        "You share a birthday with approximately 9 million people worldwide!"
    ];
    document.getElementById("funFact").innerHTML = `Fun Fact: <strong>${funFacts[Math.floor(Math.random() * funFacts.length)]}</strong>`;

    goToPage('agePage'); // Move to the first result page
}

function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    let index = ["inputPage", "agePage", "birthdayPage", "zodiacPage", "funFactPage"].indexOf(pageId);
    document.querySelectorAll('.step').forEach((step, i) => step.classList.toggle('active', i <= index));
}

function goBack(pageId) {
    goToPage(pageId);
}
