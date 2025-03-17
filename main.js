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

    document.getElementById("ageResult").innerHTML = `You are <strong>${years}</strong> years, <strong>${months}</strong> months, <strong>${days}</strong> days old.`;

    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) { nextBirthday.setFullYear(today.getFullYear() + 1); }
    let diff = nextBirthday - today;
    let countdownDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById("countdown").innerHTML = `Your next birthday is in <strong>${countdownDays}</strong> days!`;

    let zodiacSigns = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
    let zodiacDates = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
    let month = birthDate.getMonth();
    let day = birthDate.getDate();
    let sign = (day > zodiacDates[month]) ? zodiacSigns[month + 1] : zodiacSigns[month];
    document.getElementById("zodiac").innerHTML = `Your zodiac sign is <strong>${sign}</strong>.`;

    let funFacts = ["You've witnessed thousands of sunrises!", "Your heart has beaten millions of times!", "You've taken millions of breaths so far!"];
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