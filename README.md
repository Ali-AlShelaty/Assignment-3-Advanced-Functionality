# Personal Portfolio — Assignment 3

## Project Description

This is a responsive personal portfolio website developed throughout Assignments 1, 2, and 3. It includes an **About Me** section, a **Projects** showcase, and a **Contact** form.

Assignment 3 adds advanced JavaScript functionality, including project sorting, weather API integration, advanced contact form validation, and a visitor timer, making the website more interactive and useful.

Built with plain **HTML, CSS, and JavaScript** — no frameworks or build tools required.

## Features

- Responsive layout for desktop, tablet, and mobile using CSS Flexbox and Grid
- Dark / light theme toggle with saved preference (`localStorage`)
- Friendly feedback when theme preferences cannot be saved
- Time-of-day greeting generated with JavaScript
- Project category filtering and live search
- Project sorting alphabetically (A–Z and Z–A)
- Project result count and "No projects found" feedback
- Weather widget using the Open-Meteo API
- Weather search by city
- Weather information including temperature, conditions, humidity, and wind speed
- Visitor timer displaying the elapsed time since the user opened the website
- Smooth scrolling navigation with a mobile hamburger menu
- Contact form with advanced client-side validation and confirmation messages
- Name validation requiring at least 2 characters
- Email format validation
- Message validation requiring at least 10 characters
- Hover transitions and a confirmation animation
- Keyboard accessibility and reduced-motion support

The contact form is a front-end demo. No messages are actually sent.

## API Integration

The portfolio includes a weather widget powered by the Open-Meteo API.

Users can search for a city to retrieve its weather information. The application uses the Open-Meteo Geocoding API to obtain the city's coordinates and then retrieves weather data from the Forecast API.

Displayed weather information includes:

- Temperature
- Weather conditions
- Humidity
- Wind speed

## Folder Structure

```text
assignment-3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   ├── technical-documentation.md
│   └── evidence/
└── .gitignore
```

## Setup Instructions (Run Locally)

1. Download and extract the project, or clone the repository.
2. Open the project folder.
3. Open `index.html` in a web browser, or use VS Code Live Server.

Keep the folder structure unchanged so the CSS and JavaScript load correctly. No installation is required.

## Performance Testing

The portfolio was evaluated using Google Lighthouse.

| Category | Score |
|---|---|
| Performance | 100/100 |
| Accessibility | 96/100 |
| Best Practices | 92/100 |
| SEO | 90/100 |

Lighthouse was used to evaluate the website's performance, accessibility, adherence to web development best practices, and search engine optimization.

## AI Usage Summary

AI tools supported code planning, explanations, debugging, feature implementation, testing, and documentation. AI-generated suggestions were reviewed, understood, tested, and modified where necessary before being incorporated into the project. AI was used as a learning and development assistant rather than as a replacement for independent work. Further details are provided in [`docs/ai-usage-report.md`](docs/ai-usage-report.md).
