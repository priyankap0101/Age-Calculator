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
  
    // ✅ Step 1: Show Age Page
    goToPage("agePage");
  
    // ✅ Step 2: After displaying Age Page, show Birthday Countdown
    setTimeout(() => {
      calculateBirthdayCountdown(birthDate, today);
      goToPage("birthdayPage");
  
      // ✅ Step 3: After showing Birthday Page, return to Input Page
      setTimeout(() => {
        goToPage("inputPage");
      }, 9000); // Wait 3 seconds before going back
    }, 9000); // Wait 2 seconds before moving
  }
  
  // 🎂 Function to calculate birthday countdown
  function calculateBirthdayCountdown(birthDate, today) {
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
  
    const countdownDays = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
  
    if (countdownDays === 0) {
      document.getElementById("countdown").innerHTML = "🎉 Happy Birthday! 🎂";
    } else {
      document.getElementById("countdown").innerHTML =
        `Your next birthday is in <strong>${countdownDays}</strong> days!`;
    }
  }
  
  // 🧭 Navigation Function
  function goToPage(pageId) {
    const pages = ["inputPage", "agePage", "birthdayPage"];
    
    document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
  }
  