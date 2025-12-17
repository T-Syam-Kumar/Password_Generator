const inputSlider = document.getElementById("inputSlider");
const sliderValue = document.getElementById("sliderValue");
const passBox = document.getElementById("passBox");
const lowercase = document.getElementById("lowercase");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const genBtn = document.getElementById("genBtn");
const copyIcon = document.getElementById("copyIcon");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const themeToggle = document.getElementById("themeToggle");

const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "~!@#$%^&*";

// Slider
sliderValue.textContent = inputSlider.value;
inputSlider.oninput = () => sliderValue.textContent = inputSlider.value;

// Generate Password
genBtn.onclick = () => {
  const password = generatePassword();
  passBox.value = password;
  checkStrength(password);
};

function generatePassword() {
  let chars = "";
  let password = "";

  if (lowercase.checked) chars += lowerChars;
  if (uppercase.checked) chars += upperChars;
  if (numbers.checked) chars += numberChars;
  if (symbols.checked) chars += symbolChars;

  if (chars === "") return "";

  for (let i = 0; i < inputSlider.value; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
}

// Copy Password
copyIcon.onclick = () => {
  if (passBox.value.length > 0) {
    navigator.clipboard.writeText(passBox.value);
    copyIcon.innerText = "check";
    setTimeout(() => copyIcon.innerText = "content_copy", 2000);
  }
};

// Strength Meter
function checkStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const levels = [
    { text: "Weak", color: "red", width: "25%" },
    { text: "Medium", color: "orange", width: "50%" },
    { text: "Strong", color: "yellowgreen", width: "75%" },
    { text: "Very Strong", color: "green", width: "100%" }
  ];

  if (strength > 0) {
    strengthBar.style.width = levels[strength - 1].width;
    strengthBar.style.background = levels[strength - 1].color;
    strengthText.textContent = levels[strength - 1].text;
  }
}

// Dark Mode
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  themeToggle.innerText =
    document.body.classList.contains("dark") ? "light_mode" : "dark_mode";
};
