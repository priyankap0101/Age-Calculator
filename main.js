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
  
    document.getElementById(
      "ageResult"
    ).innerHTML = `You are <strong>${years}</strong> years, <strong>${months}</strong> months, <strong>${days}</strong> days old.`;
  
    // 🎂 Countdown to Next Birthday
    let nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const countdownDays = Math.ceil(
      (nextBirthday - today) / (1000 * 60 * 60 * 24)
    );
  
    if (countdownDays === 0) {
      document.getElementById("countdown").innerHTML = "🎉 Happy Birthday! 🎂";
    } else {
      document.getElementById(
        "countdown"
      ).innerHTML = `Your next birthday is in <strong>${countdownDays}</strong> days!`;
    }
  
    // ✅ Fix: Navigate to results page after calculation
    goToPage("agePage");
  }
  
  // 🧭 Navigation Functions (Fixed: Proper looping)
  function goToPage(pageId) {
    const pages = ["inputPage", "agePage", "birthdayPage", "zodiacPage"];
    let index = pages.indexOf(pageId);
  
    if (index === -1) {
      console.error("Invalid page ID:", pageId);
      return;
    }
  
    document
      .querySelectorAll(".page")
      .forEach((page) => page.classList.remove("active"));
    document.getElementById(pages[index]).classList.add("active");
  
    document
      .querySelectorAll(".step")
      .forEach((step, i) => step.classList.toggle("active", i <= index));
  }
  
  // 🔙 Go Back Function
  function goBack() {
    const pages = ["inputPage", "agePage", "birthdayPage", "zodiacPage"];
    let activeIndex = pages.findIndex(
      (page) => document.getElementById(page).classList.contains("active")
    );
  
    // If at the first page, go to last page, otherwise go back one step
    let newIndex = activeIndex === 0 ? pages.length - 1 : activeIndex - 1;
  
    goToPage(pages[newIndex]);
  }
  