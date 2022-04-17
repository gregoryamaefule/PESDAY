const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
const topBtn = document.getElementById("toTopBtn");
const bottomBtn = document.getElementById("toBottomBtn");
const daysLeft = document.getElementById("days-left");
const hoursLeft = document.getElementById("hours-left");
const minutesLeft = document.getElementById("minutes-left");
const secondsLeft = document.getElementById("seconds-left");

window.onscroll = () => {
    toggleJumpBtn();
};
window.onload = () => {
    updateCountdown();
};

const updateCountdown = () => {
    const conferenceDate = new Date("05/10/2022");

    const updateUI = () => {
        const now = new Date();
        const diff = Math.abs(conferenceDate - now);

        if (diff === 0) {
            clearInterval(intervalID);
            return;
        }
        let seconds = Math.floor(diff / 1000); //Get difference between the two dates in seconds
        let minutes = Math.floor(seconds / 60); //Get difference between the two dates in minutes | same as doing diff/(1000*60)
        let hours = Math.floor(minutes / 60); //Get difference between the two dates in hours | same as doing diff/(1000*60*60)
        let days = Math.floor(hours / 24); //Get difference between the two dates in days  | same as doing diff/(1000*60*60*24)

        hours = hours - days * 24; //Difference between the total hours left and the days left (converted to hours)
        minutes = minutes - (days * 24 * 60) - (hours * 60); //Difference between the total minutes left and the days left, and the hours left (converted to minutes)
        seconds =
            seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60); //Difference between the total seconds left the days left, the hours left and the minutes left (converted to seconds)

        daysLeft.innerText = days < 10 ? '0' + days : days; // Output days left in two digits; add 0 in front if less than 10(that is, one digit)
        hoursLeft.innerText = hours < 10 ? '0' + hours : hours; // Output hours left in two digits; add 0 in front if less than 10(that is, one digit)
        minutesLeft.innerText = minutes < 10 ? '0' + minutes : minutes; // Output minutes left in two digits; add 0 in front if less than 10(that is, one digit)
        secondsLeft.innerText = seconds < 10 ? '0' + seconds : seconds; // Output seconds left in two digits; add 0 in front if less than 10(that is, one digit)
    };
    const intervalID = setInterval(updateUI, 1000);
};

const toggleJumpBtn = () => {
    if (
        document.documentElement.scrollTop >
            document.documentElement.scrollHeight / 3 ||
        document.body.scrollTop > document.body.scrollHeight / 3
    ) {
        !bottomBtn.classList.contains("hidden") &&
            bottomBtn.classList.toggle("hidden");
        topBtn.classList.contains("hidden") &&
            topBtn.classList.toggle("hidden");
    } else {
        !topBtn.classList.contains("hidden") &&
            topBtn.classList.toggle("hidden");
        bottomBtn.classList.contains("hidden") &&
            bottomBtn.classList.toggle("hidden");
    }
};

const jumpToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

const jumpToBottom = () => {
    window.scrollTo(
        0,
        document.body.scrollHeight || document.documentElement.scrollHeight
    );
};

// Change the icons inside the button based on previous settings
if (
    localStorage.getItem("ascf-theme") === "dark" ||
    (!("ascf-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
    themeToggleLightIcon.classList.remove("hidden");
} else {
    themeToggleDarkIcon.classList.remove("hidden");
}

const themeToggleBtn = document.getElementById("theme-toggle");

const toggleThemeMode = () => {
    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    // if set via local storage previously
    if (localStorage.getItem("ascf-theme")) {
        if (localStorage.getItem("ascf-theme") === "light") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("ascf-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("ascf-theme", "light");
        }

        // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("ascf-theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("ascf-theme", "dark");
        }
    }
};

themeToggleBtn.addEventListener("click", toggleThemeMode);
topBtn.addEventListener("click", jumpToTop);
bottomBtn.addEventListener("click", jumpToBottom);
