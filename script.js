// =========================================================
// PORTFOLIO SITE — MAIN SCRIPT
// =========================================================
// This file wires up all the interactive behaviour for the
// portfolio: theme toggle (with saved preference), a
// time-of-day greeting, a mobile nav menu, smooth-scroll
// active link handling, and basic contact form validation.
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  setGreeting();
  initThemeToggle();
  initMobileNav();
  initContactForm();
  initProjectFilter();
});

/**
 * Insert the current year into the footer copyright line.
 */
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Show a greeting message based on the visitor's local time of day.
 */
function setGreeting() {
  const greetingEl = document.getElementById("greeting");
  if (!greetingEl) return;

  const hour = new Date().getHours();
  let greeting;

  if (hour < 5) {
    greeting = "Burning the midnight oil? 🌙";
  } else if (hour < 12) {
    greeting = "Good morning! ☀️";
  } else if (hour < 18) {
    greeting = "Good afternoon! 👋";
  } else {
    greeting = "Good evening! 🌆";
  }

  greetingEl.textContent = greeting;
}

/**
 * Toggle between light and dark themes and remember the
 * user's choice using localStorage.
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  let savedTheme;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch {
    showStorageFeedback();
  }
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Apply saved theme, or fall back to system preference.
  const initialTheme = ["dark", "light"].includes(savedTheme) ? savedTheme : (prefersDark ? "dark" : "light");
  applyTheme(initialTheme);

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      showStorageFeedback();
    }
  });

  function showStorageFeedback() {
    const feedback = document.getElementById("theme-feedback");
    feedback.textContent = "Theme saving is unavailable. You can still switch themes for this visit.";
    feedback.hidden = false;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
    toggleBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
}

/**
 * Show/hide the mobile navigation menu and close it whenever
 * a link is clicked (useful for single-page smooth scrolling).
 */
function initMobileNav() {
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    setOpen(!navLinks.classList.contains("open"));
  });

  function setOpen(open) {
    navLinks.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      setOpen(false);
      navToggle.focus();
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setOpen(false);
    });
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("form-success");

  if (!form || !successMessage) return;

  let submitted = false;

  // Validate a field and display its error message
  function validateField(fieldName, condition, errorText) {
    const errorEl = document.getElementById(`${fieldName}-error`);
    const field = form.elements.namedItem(fieldName);

    if (!errorEl || !field) return condition;

    errorEl.textContent = condition ? "" : errorText;

    field.setAttribute("aria-invalid", String(!condition));

    return condition;
  }

  // Validate email format
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // Validate the name
  function validateName() {
    const name = form.elements.namedItem("name").value.trim();

    return validateField(
      "name",
      name.length >= 2,
      "Please enter your name (at least 2 characters)."
    );
  }

  // Validate the email
  function validateEmail() {
    const email = form.elements.namedItem("email").value.trim();

    return validateField(
      "email",
      isValidEmail(email),
      "Please enter a valid email address."
    );
  }

  // Validate the message
  function validateMessage() {
    const message = form.elements.namedItem("message").value.trim();

    return validateField(
      "message",
      message.length >= 10,
      "Message must be at least 10 characters long."
    );
  }

  // Submit event
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    submitted = true;

    // Get trimmed values
    const name = form.elements.namedItem("name").value.trim();
    const email = form.elements.namedItem("email").value.trim();
    const message = form.elements.namedItem("message").value.trim();

    let isValid = true;

    // Validate all fields
    isValid =
      validateField(
        "name",
        name.length >= 2,
        "Please enter your name (at least 2 characters)."
      ) && isValid;

    isValid =
      validateField(
        "email",
        isValidEmail(email),
        "Please enter a valid email address."
      ) && isValid;

    isValid =
      validateField(
        "message",
        message.length >= 10,
        "Message must be at least 10 characters long."
      ) && isValid;

    // If all fields are valid
    if (isValid) {
      successMessage.hidden = false;

      form.reset();

      // Clear invalid states after reset
      ["name", "email", "message"].forEach((fieldName) => {
        form.elements.namedItem(fieldName).setAttribute(
          "aria-invalid",
          "false"
        );

        document.getElementById(`${fieldName}-error`).textContent = "";
      });

      submitted = false;
    } else {
      // Hide success message
      successMessage.hidden = true;

      // Focus the first invalid field
      const firstInvalidField = form.querySelector(
        '[aria-invalid="true"]'
      );

      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    }
  });

  // Live validation while typing
  form.elements.namedItem("name").addEventListener("input", () => {
    if (submitted) {
      validateName();
    }
  });

  form.elements.namedItem("email").addEventListener("input", () => {
    if (submitted) {
      validateEmail();
    }
  });

  form.elements.namedItem("message").addEventListener("input", () => {
    if (submitted) {
      validateMessage();
    }
  });


  function validateField(fieldName, condition, errorText) {
    const errorEl = document.getElementById(`${fieldName}-error`);
    if (!errorEl) return condition;

    errorEl.textContent = condition ? "" : errorText;
    form.elements.namedItem(fieldName).setAttribute("aria-invalid", String(!condition));
    return condition;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

/** Category and query must both match; original cards stay in the DOM. */
/**
 * Project search, category filtering, and sorting.
 */
function initProjectFilter() {
  const controls = document.querySelector(".project-controls");
  const search = document.getElementById("project-search");
  const sortSelect = document.getElementById("project-sort");
  const buttons = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll(".project-card")];

  // Save the original project order
  const originalCards = [...cards];

  let category = "all";
  let sortOrder = "default";

  // Show controls after JavaScript initializes
  controls.hidden = false;

  function update() {
    // 1. Get search query
    const query = search.value.trim().toLowerCase();

    // 2. Filter projects by category and search
    const matchingCards = cards.filter((card) => {
      return (
        (category === "all" || card.dataset.category === category) &&
        card.textContent.toLowerCase().includes(query)
      );
    });

    const count = matchingCards.length;

    // 3. Start with the original project order
    const displayCards = [...originalCards];

    // 4. Sort projects
    if (sortOrder === "az") {
      displayCards.sort((a, b) =>
        a.querySelector("h3").textContent.localeCompare(
          b.querySelector("h3").textContent
        )
      );
    } else if (sortOrder === "za") {
      displayCards.sort((a, b) =>
        b.querySelector("h3").textContent.localeCompare(
          a.querySelector("h3").textContent
        )
      );
    }

    // 5. Display projects in the selected order
    const container = document.querySelector(".project-grid");

    displayCards.forEach((card) => {
      container.appendChild(card);

      // Show matching projects and hide the others
      const matches = matchingCards.includes(card);
      card.hidden = !matches;
    });

    // 6. Update category filter button states
    buttons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === category)
      );
    });

    // 7. Update project count
    document.getElementById("project-count").textContent =
      count + (count === 1 ? " project shown" : " projects shown");

    // 8. Show or hide empty message
    document.getElementById("project-empty").hidden = count > 0;
  }

  // Category filter buttons
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      category = button.dataset.filter;
      update();
    });
  });

  // Search input
  search.addEventListener("input", update);

  // Sorting dropdown
  sortSelect.addEventListener("change", () => {
    sortOrder = sortSelect.value;
    update();
  });

  // Initial display
  update();
}

  function update() {
    const query = search.value.trim().toLowerCase();
    let count = 0;
    cards.forEach((card) => {
      const matches = (category === "all" || card.dataset.category === category)
        && card.textContent.toLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) count++;
    });
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === category));
    });
    document.getElementById("project-count").textContent =
      count + (count === 1 ? " project shown" : " projects shown");
    document.getElementById("project-empty").hidden = count > 0;
  

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      category = button.dataset.filter;
      update();
    });
  });
  search.addEventListener("input", update);
  update();
}

let city = "Dammam";

function getWeatherDescription(code) {
  if (code === 0) {
    return "Clear sky";
  } else if (code === 1) {
    return "Mainly clear";
  } else if (code === 2) {
    return "Partly cloudy";
  } else if (code === 3) {
    return "Overcast";
  } else if (code === 45 || code === 48) {
    return "Fog";
  } else if (code === 51 || code === 53 || code === 55) {
    return "Drizzle";
  } else if (code === 61 || code === 63 || code === 65) {
    return "Rain";
  } else if (code === 71 || code === 73 || code === 75) {
    return "Snow";
  } else if (code === 95) {
    return "Thunderstorm";
  } else {
    return "Unknown weather";
  }
}

function getWeatherIcon(code) {
  if (code === 0) {
    return "☀️";
  } else if (code === 1) {
    return "🌤️";
  } else if (code === 2) {
    return "⛅";
  } else if (code === 3) {
    return "☁️";
  } else if (code === 45 || code === 48) {
    return "🌫️";
  } else if (code === 51 || code === 53 || code === 55) {
    return "🌦️";
  } else if (code === 61 || code === 63 || code === 65) {
    return "🌧️";
  } else if (code === 71 || code === 73 || code === 75) {
    return "🌨️";
  } else if (code === 95) {
    return "⛈️";
  } else {
    return "🌡️";
  }
}

async function getWeather() {
  try {
    document.getElementById("weather-city").textContent = city; 

    document.getElementById("weather-temperature").textContent =
      "Loading...";

    document.getElementById("weather-description").textContent =
      "Searching for weather...";

    document.getElementById("weather-humidity").textContent =
      "Loading...";

    document.getElementById("weather-wind").textContent =
      "Loading...";

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

    const response = await fetch(url);

    if (!response.ok) {
      document.getElementById("weather-description").textContent =
        "Unable to find city.";

      return;
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      document.getElementById("weather-description").textContent =
        "City not found.";

      return;
    }

    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
      document.getElementById("weather-description").textContent =
        "Unable to retrieve weather data.";

      return;
    }

    const weatherData = await weatherResponse.json();

    const temperature = weatherData.current.temperature_2m;
    const humidity = weatherData.current.relative_humidity_2m;
    const windSpeed = weatherData.current.wind_speed_10m;
    const weatherCode = weatherData.current.weather_code;

    const description = getWeatherDescription(weatherCode);
    const icon = getWeatherIcon(weatherCode);

    document.getElementById("weather-city").textContent = city;

    document.getElementById("weather-temperature").textContent =
      `${icon} ${temperature}°C`;

    document.getElementById("weather-description").textContent =
      description;

    document.getElementById("weather-humidity").textContent =
      `${humidity}%`;

    document.getElementById("weather-wind").textContent =
      `${windSpeed} km/h`;

    console.log("City:", city);
    console.log("Temperature:", temperature, "°C");
    console.log("Humidity:", humidity, "%");
    console.log("Wind Speed:", windSpeed, "km/h");
    console.log("Weather:", description);
    console.log("Icon:", icon);

  } catch (error) {
    console.log("Unable to retrieve weather data");
    console.error(error);

    document.getElementById("weather-description").textContent =
      "Unable to load weather data. Please try again.";
  }
}

/**
 * Visitor Timer
 * Tracks how long the visitor has been on the website.
 */
function initVisitorTimer() {
  const timerElement = document.getElementById("visitor-timer");

  // Check if the timer element exists
  if (!timerElement) return;

  // Start counting from zero
  let elapsedSeconds = 0;

  // Update the timer every second
  setInterval(() => {
    elapsedSeconds++;

    // Calculate hours
    const hours = Math.floor(elapsedSeconds / 3600);

    // Calculate minutes
    const minutes = Math.floor(elapsedSeconds / 60) % 60;

    // Calculate seconds
    const seconds = elapsedSeconds % 60;

    // Format numbers to two digits
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    // Display the timer
    timerElement.textContent =
      `Time on site: ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }, 1000);
}

getWeather();

initVisitorTimer();

document.getElementById("city-search-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const cityInput = document.getElementById("city-input").value.trim();

  if (cityInput === "") {
    document.getElementById("weather-description").textContent =
      "Please enter a city name.";

    return;
  }
  city = cityInput;
  console.log("Searching for:", city);
  getWeather();
});
initContactForm();
