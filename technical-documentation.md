# Technical Documentation

## Starting Point and Changes

Assignment 1 supplied the single-page portfolio, two projects, theme toggle, time-based greeting, contact form, and mobile menu. Assignment 2 preserved that structure and styling while adding live search, category filters, result count, and empty-state guidance. The missing profile image was replaced with initials.

Assignment 3 extends the portfolio with alphabetical project sorting, a weather widget using the Open-Meteo API, enhanced contact form validation, and a visitor timer. The README and project documentation were also updated.

## Implementation

### Project Filtering, Search, and Sorting

HTML holds the project content, and JavaScript does not duplicate the project data. Each project card has a `data-category` attribute.

The project functionality combines the selected category with a case-insensitive search query. A card is displayed only when it matches both conditions. The result count updates dynamically, and an empty-state message appears when no projects match.

Project sorting supports the default order, alphabetical A–Z, and reverse alphabetical Z–A. The original project order is preserved so users can return to the default arrangement. Filtering, searching, and sorting can be used together.

The controls are revealed after initialization so that all projects remain accessible if JavaScript is unavailable.

### Theme Toggle

`initThemeToggle()` validates the stored theme against light and dark values. If no valid preference exists, it uses the operating system preference.

Storage reads and writes use `try/catch` so blocked `localStorage` does not prevent other functionality from initializing. The theme remains usable for the current visit, with friendly feedback when preferences cannot be saved.

### Weather API Integration

The weather widget uses the Open-Meteo API.

Users can search for a city. The Geocoding API converts the city name into geographic coordinates, which are then used to request weather information from the Forecast API.

The geocoding request is necessary because the weather forecast API uses geographic coordinates to identify locations.

The widget displays temperature, weather conditions, humidity, and wind speed. It also provides feedback during loading and when requests fail or a city cannot be found.

### Contact Form Validation

`initContactForm()` prevents form submission and trims user input.

Validation rules include:
- Name must contain at least two characters.
- Email must match a basic email format.
- Message must contain at least ten characters.

Inline error messages are connected through `aria-describedby`, while `aria-invalid` identifies invalid fields. When validation fails, focus moves to the first invalid field.

When all fields are valid, the form resets and displays a confirmation message. No contact form message is sent or stored.

Email validation is basic and does not verify whether an email address actually exists.

### Visitor Timer

The visitor timer uses `setInterval()` to update the elapsed time every second.

Elapsed seconds are converted into hours, minutes, and seconds and displayed in `HH:MM:SS` format. The timer measures time elapsed during the current page visit and resets when the page is reloaded. It does not persist time across sessions.

### Navigation and Other Functions

`initMobileNav()` updates `aria-expanded`, closes the menu when a navigation link is selected, and supports Escape with focus returned to the menu button.

`setGreeting()` uses the visitor's local time, and `setYear()` updates the footer year.

## Layout and Performance

CSS Grid, Flexbox, and custom properties provide responsive styling. Media queries support different screen sizes.

Hover and success transitions are disabled for users who prefer reduced motion.

The portfolio uses plain HTML, CSS, and JavaScript without a framework or build tools. The weather feature makes external requests to Open-Meteo.

The website was evaluated using Google Lighthouse:
- Performance: 100
- Accessibility: 96
- Best Practices: 92
- SEO: 90

Standard features target current Chrome, Edge, Firefox, and Safari. Browser rendering should be verified manually.

## Manual Verification Before Submission

1. Choose Java: only Java Star Game appears. Choose Concepts: only the bus concept appears.
2. Search for a project under All and then under a category. Check the result count and empty-state guidance.
3. Test sorting using Default order, A–Z, and Z–A. Combine sorting with filtering and search.
4. Switch themes and reload. Block storage and confirm the theme still works and guidance appears.
5. Search for a valid city using the weather widget. Check temperature, conditions, humidity, and wind speed.
6. Search for an invalid city and test the weather widget's error handling.
7. Submit blank and whitespace-only contact fields. Check validation messages and focus.
8. Test a name shorter than two characters, an invalid email, and a message shorter than ten characters.
9. Submit valid contact form values. Check field reset and confirmation that nothing was sent.
10. Verify the visitor timer updates every second and displays hours, minutes, and seconds correctly.
11. At 375px width, open the mobile menu; close it by link and Escape. Check keyboard focus.
12. Check desktop/mobile widths, both themes, zoom, and reduced-motion preference.
13. Repeat in other available browsers. Inspect the console and network for failures.

## Limitations

The portfolio has no backend or messaging service. Contact form submissions are demonstrations and are not sent or stored.

Weather information depends on the availability of the Open-Meteo API and an internet connection.

The project cards do not represent a full portfolio backend, and the initials are a deliberate alternative to an unavailable profile photograph.

## Validation Performed

JavaScript syntax was checked using `node --check`. HTML IDs are unique, and local stylesheet and script references resolve.

Automated browser execution was attempted, but the environment had no Chromium executable. Interactive and visual checks therefore remain to be completed using the manual verification checklist above.