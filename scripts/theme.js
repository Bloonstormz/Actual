// Variables
const themeBtn = document.querySelector("#themeBtn");
let darkMode = false;

// Function to toggle theme
function toggleTheme() {
	if (darkMode) {
		// Dark Mode setting
		document.body.setAttribute("data-bs-theme", "light");
		// Theme swap to dark mode
		document.querySelectorAll(".bg-dark").forEach((element) => {
			element.classList.replace("bg-dark", "bg-light");
		});
		document.querySelectorAll(".text-bg-light").forEach((element) => {
			element.classList.replace("text-bg-light", "text-bg-dark");
		});
		document.querySelectorAll(".text-light").forEach((element) => {
			element.classList.replace("text-light", "text-dark");
		});
		// Change Button
		document.body.querySelectorAll(".btn-light").forEach((element) => {
			element.classList.replace("btn-light", "btn-dark");
			if (element.childElementCount == 1 && element.firstElementChild.tagName === "svg") {
				element.firstElementChild.setAttribute("fill", "white");
			}
		});
	} else {
		// Light mode setting
		document.body.setAttribute("data-bs-theme", "dark");
		// Theme swap to light mode
		document.querySelectorAll(".bg-light").forEach((element) => {
			element.classList.replace("bg-light", "bg-dark");
		});
		document.querySelectorAll(".text-bg-dark").forEach((element) => {
			element.classList.replace("text-bg-dark", "text-bg-light");
		});
		document.querySelectorAll(".text-dark").forEach((element) => {
			element.classList.replace("text-dark", "text-light");
		});
		// Change Button
		document.body.querySelectorAll(".btn-dark").forEach((element) => {
			element.classList.replace("btn-dark", "btn-light");
			if (element.childElementCount == 1 && element.firstElementChild.tagName === "svg") {
				element.firstElementChild.setAttribute("fill", "black");
			}
		});
	}

	// Change type
	darkMode = !darkMode;
}

// Theme Swap
themeBtn.onclick = () => {
	toggleTheme();
};

// Theme Swap on load
toggleTheme();
