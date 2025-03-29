// 🎂 Calculate Age Function
function calculateAge() {
    const birthdateInput = document.getElementById("birthdate").value.trim();
    const errorMessage = document.getElementById("error-message");
    const resultContainer = document.getElementById("ageResult");
  
    // 🛑 Validate input
    if (!birthdateInput) {
      showError(errorMessage, "⚠️ Please enter your birthdate!");
      resultContainer.innerHTML = "";
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
  
    // ✅ Hide error message after valid input
    showError(errorMessage, "");
  
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
  
    if (today.getDate() < birthDate.getDate()) {
      months--;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
  
    // 🎉 Display result with styling and copy icon
    resultContainer.innerHTML = `
      <div style="
          font-size: 22px;
          font-weight: bold;
          color: #fff;
          padding: 12px;
          border-radius: 12px;
          text-align: center;
          
          margin-bottom: 15px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          display: inline-block;
          max-width: 90%;
          position: relative;
      ">
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

.age-text {
    font-family: 'Poppins', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color:rgb(255, 255, 255); /* Light Orange */
    text-shadow: 
        -3px -3px 0 rgba(0, 0, 0, 0.7), 
        3px -3px 0 rgba(0, 0, 0, 0.7), 
        -3px 3px 0 rgba(0, 0, 0, 0.7), 
        3px 3px 0 rgba(0, 0, 0, 0.7);
    transition: transform 0.3s ease, text-shadow 0.3s ease;
    display: inline-block;
    padding: 5px 10px;
}



.age-container {
    text-align: center;
    padding: 20px;
    font-size: 20px;
    color: white;
    font-family: 'Poppins', sans-serif;
}
</style>

<div class="age-container">
    You are 
    <strong class="age-text">
        ${years}
    </strong> 
    years and 
    <strong class="age-text">
        ${months}
    </strong> 
    months old.
</div>


          
          <!-- Copy Icon -->
          <span id="copyIcon" style="
              position: absolute;
              right: 10px;
              top: 10px;
              cursor: pointer;
              font-size: 20px;
              color: white;
              opacity: 0.8;
              transition: opacity 0.3s ease-in-out;
          " title="Copy to Clipboard">
              📋
          </span>
      </div>
    `;
  
    resultContainer.style.opacity = "1";
    resultContainer.style.transition = "all 0.3s ease-in-out";
  
    // Copy functionality
    const copyIcon = document.getElementById("copyIcon");
  
    copyIcon.onmouseover = () => (copyIcon.style.opacity = "1");
    copyIcon.onmouseout = () => (copyIcon.style.opacity = "0.8");
  
    copyIcon.onclick = () => {
      navigator.clipboard.writeText(`You are ${years} years and ${months} months old.`);
      copyIcon.textContent = "✅"; // Change icon temporarily
      setTimeout(() => (copyIcon.textContent = "📋"), 1500);
    };
  
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
  
    const isBirthday = today.getDate() === birthDate.getDate() &&
                       today.getMonth() === birthDate.getMonth();
                       if (isBirthday) {
                        countdownMessage.innerHTML = `
                            <div style="
                                font-size: 20px;
                                font-weight: bold;
                                color: #fff;
                                padding: 35px;
                                border-radius: 20px;
                                text-align: center;
                                background: linear-gradient(135deg, #ff8800, #ff0055, #ff00ff);
                                background-size: 400% 400%;
                                
                                
                                animation: gradientShift 6s infinite alternate, pulseGlow 1.5s infinite alternate;
                                display: inline-block;
                                max-width: 90%;
                                position: relative;
                                overflow: hidden;
                                border: 5px solid rgba(255, 255, 255, 0.3);
                                transform: scale(1.05);
                                transition: all 0.3s ease-in-out;
                            " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1.05)'">
                            
                                🎂 <strong>Happy Birthday! 🥳</strong>
                    
                                <div style="
                                    font-size: 14px;
                                    font-weight: normal;
                                    margin-top: 10px;
                                    color: #ffeecc;
                                ">
                                    🎁 Wishing you joy, laughter, and a day filled with cake! 🎂🎊
                                </div>
                    
                                <!-- Floating Confetti -->
                                <div class="confetti-container"></div>
                    
                                <!-- Floating Balloons -->
                                <span class="floating-emoji" style="
                                    position: absolute;
                                    top: -20px;
                                    left: 10px;
                                    font-size: 40px;
                                    animation: floatUp 2s infinite ease-in-out;
                                ">🎈</span>
                    
                                <span class="floating-emoji" style="
                                    position: absolute;
                                    top: -15px;
                                    right: 20px;
                                    font-size: 38px;
                                    animation: floatDown 2s infinite ease-in-out;
                                ">🎉</span>
                    
                                <!-- Sparkle Effect -->
                                <div class="sparkle"></div>
                            </div>
                        `;
                        applyResultStyles(countdownMessage, "#ffcc00");
                    } else {
                        countdownMessage.innerHTML = `
                            <div style="
                                font-size: 20px;
                                font-weight: bolder;
                                color: #fff;
                                padding: 25px;
                                border-radius: 15px;
                                text-align: center;
                                background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
                                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                                text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
                                display: inline-block;
                                max-width: 90%;
                                backdrop-filter: blur(12px);
                                border: 3px solid rgba(255, 255, 255, 0.3);
                                transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                                animation: pulse 1.5s infinite alternate;
                                position: relative;
                            " onmouseover="this.style.transform='scale(1.08)'; this.style.boxShadow='0 15px 35px rgba(0, 0, 0, 0.5)';" 
                               onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 10px 25px rgba(0, 0, 0, 0.3)';">
                            
                                <strong> Oops! Today isn't your birthday✨ </strong>
                     
                                </div>
                    
                
                            </div>
                    
                            <style>
                                @keyframes pulse {
                                    0% { transform: scale(1); }
                                    100% { transform: scale(1.02); }
                                }
                                @keyframes floatUp {
                                    0% { transform: translateY(0px); opacity: 1; }
                                    100% { transform: translateY(-10px); opacity: 0.5; }
                                }
                            </style>
                        `;
                        applyResultStyles(countdownMessage, "#ffffff");
                    }
                    
                    // 🎨 Advanced Styling & Animations
                    const style = document.createElement("style");
                    style.innerHTML = `
                        @keyframes gradientShift {
                            0% { background-position: 0% 50%; }
                            100% { background-position: 100% 50%; }
                        }
                        
                        @keyframes floatUp {
                            0% { transform: translateY(0); }
                            50% { transform: translateY(-10px); }
                            100% { transform: translateY(0); }
                        }
                        @keyframes floatDown {
                            0% { transform: translateY(0); }
                            50% { transform: translateY(10px); }
                            100% { transform: translateY(0); }
                        }
                        @keyframes sparkleAnimation {
                            0% { opacity: 0.3; transform: scale(1); }
                            50% { opacity: 1; transform: scale(1.2); }
                            100% { opacity: 0.3; transform: scale(1); }
                        }
                      
                        @keyframes confettiFall {
                            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                            100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
                        }
                        .confetti-container {
                            position: absolute;
                            top: 0;
                            left: 50%;
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                        }
                        .confetti {
                            position: absolute;
                            width: 10px;
                            height: 10px;
                            background: red;
                            border-radius: 50%;
                            opacity: 0.9;
                            animation: confettiFall 1.5s infinite ease-in-out;
                        }
                    `;
                    document.head.appendChild(style);
                    
                    // 🎉 Generate Falling Confetti Effect
                    function createConfetti() {
                        const confettiContainer = document.querySelector(".confetti-container");
                        for (let i = 0; i < 30; i++) {
                            let confetti = document.createElement("div");
                            confetti.className = "confetti";
                            confetti.style.left = `${Math.random() * 100}%`;
                            confetti.style.animationDuration = `${1 + Math.random() * 2}s`;
                            confetti.style.backgroundColor = getRandomColor();
                            confettiContainer.appendChild(confetti);
                        }
                    }
                    
                    // 🎨 Random Confetti Colors
                    function getRandomColor() {
                        const colors = ["#ffcc00", "#ff8800", "#ff5500", "#ff0000", "#ff66cc", "#66ff99", "#00ffcc"];
                        return colors[Math.floor(Math.random() * colors.length)];
                    }
                    
                    if (isBirthday) {
                        createConfetti();
                    }
                    
  
    goToPage("birthdayPage");
  }
  
  // 📝 Display error messages with enhanced styling
  function showError(element, message) {
    if (message) {
      element.innerHTML = message;
      element.style.display = "block"; // Show error when needed
  
      // 🔥 Stylish error box
      Object.assign(element.style, {
        color: "#fff",
        fontWeight: "bolder",
        fontSize: "18px",
        background: "rgba(255, 0, 0, 0.95)",
        padding: "12px",
        borderRadius: "8px",
        borderLeft: "4px solid #ff0000",
        textAlign: "center",
        maxWidth: "80%",
        margin: "10px auto 15px",
      });
  
      // 🔁 Smooth shake effect for better feedback
      element.animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateX(-5px)" },
          { transform: "translateX(5px)" },
          { transform: "translateX(0px)" },
        ],
        { duration: 250 }
      );
    } else {
      element.innerHTML = "";
      element.style.display = "none"; // Hide when no error
    }
  }
  
  // 🌟 Apply styles to results
  function applyResultStyles(element, color) {
    element.style.fontSize = "22px";
    element.style.color = color;
    element.style.fontWeight = "bold";
    element.style.textShadow = `2px 2px 10px ${color}80`;
    element.style.padding = "10px";
    element.style.borderRadius = "10px";
  }
  
  // 🧭 Page Navigation with History Support
  let pageHistory = [];
  
  function goToPage(pageId) {
    const pages = ["inputPage", "agePage", "birthdayPage"];
  
    if (!pageHistory.length || pageHistory[pageHistory.length - 1] !== pageId) {
      pageHistory.push(pageId);
    }
  
    pages.forEach((page) =>
      document.getElementById(page).classList.remove("active")
    );
    document.getElementById(pageId).classList.add("active");
  
    if (pageId === "birthdayPage") {
      checkBirthdayToday();
    }
  }
  
  // ⬅️ Go Back Function
  function goBack() {
    if (pageHistory.length > 0) {
      pageHistory.pop();
      goToPage(pageHistory[pageHistory.length - 1] || "inputPage");
    }
  }
  