# Clinic Appointment Booking System (Final Project of Javascript)

This project is a comprehensive clinic management system designed to handle patient appointments. It is built using **HTML5, CSS3, and Vanilla JavaScript**, focusing on core programming concepts without the need for external libraries or frameworks.

## 🚀 Key Features
* **Dynamic Dashboard:** Real-time visualization of total appointments, today's bookings, and the most requested medical service.
* **Full CRUD Management:**
    * **Create:** Register new patient appointments via a booking form.
    * **Read:** View a structured list of all appointments in a management table.
    * **Update:** Edit existing appointment details (Name, Service, Date) using a built-in edit function.
    * **Delete:** Cancel and remove appointments from the system.
* **Live Search & Filtering:** Instantly search for patients by name or filter the list based on specific medical services.
* **Holiday Validation (API Integration):** The system connects to a Public Holiday API to prevent users from booking appointments on national holidays.
* **Visual Reports:** Data analytics showing service distribution using dynamic CSS-based progress bars.

## 🛠️ Technology Stack
* **HTML5:** Semantic structure of the web pages.
* **CSS3:** Modern styling using **CSS Variables**, Flexbox, and responsive design.
* **Vanilla JavaScript:** Core logic handling:
    * `localStorage`: Persistent data storage within the browser.
    * `Fetch API`: Asynchronous data retrieval for holiday checks.
    * `Higher-Order Functions`: Usage of `.map()`, `.filter()`, and `.reduce()` for data processing.
    * `DOM Manipulation`: Real-time UI updates without page reloads.

## 📂 Project Structure
```text
clinic-booking-system/
│
├── index.html        # Dashboard (Home/Overview)
├── booking.html      # Appointment Registration Form
├── manage.html       # Appointment Management (Search/Edit/Delete)
├── reports.html      # Analytics and Service Reports
│
├── css/
│   └── style.css     # Global styles and design system
│
└── js/
    └── app.js        # Centralized JavaScript logic