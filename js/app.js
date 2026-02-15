/**
 * CLINIC SYSTEM - */

// --- 1. SHARED DATA LOGIC ---
const Storage = {
    getAppointments: () => JSON.parse(localStorage.getItem('clinic_db')) || [],
    saveAppointments: (data) => localStorage.setItem('clinic_db', JSON.stringify(data)),
    addAppointment: (appt) => {
        const db = Storage.getAppointments();
        db.push(appt);
        Storage.saveAppointments(db);
    }
};

// --- 2. DASHBOARD---
if (document.getElementById('stat-total')) {
    const appts = Storage.getAppointments();
    const today = new Date().toISOString().split('T')[0];

    document.getElementById('stat-total').textContent = appts.length;
    document.getElementById('stat-today').textContent = appts.filter(a => a.date === today).length;

    const counts = appts.reduce((acc, a) => {
        acc[a.service] = (acc[a.service] || 0) + 1;
        return acc;
    }, {});
    const top = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, "N/A");
    document.getElementById('stat-service').textContent = top;

    const upcoming = appts
        .filter(a => new Date(`${a.date} ${a.time}`) > new Date())
        .sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`))[0];
    
    document.getElementById('stat-next').textContent = upcoming ? 
        `${upcoming.name} - ${upcoming.date}` : "No upcoming bookings";
}

// --- 3.booking ---
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.textContent = "Checking...";

        const appt = {
            id: Date.now(),
            name: document.getElementById('name').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
        };

        try {
            const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${new Date().getFullYear()}/US`);
            const holidays = await res.json();
            if (holidays.some(h => h.date === appt.date)) {
                alert("Maanta waa fasax qaran!");
            } else {
                Storage.addAppointment(appt);
                alert("Appointment booked successfully!");
                bookingForm.reset();
            }
        } catch (err) {
            Storage.addAppointment(appt);
        }
        btn.textContent = "Book Now";
    });
}

// --- 4 manage---
const searchInput = document.getElementById('searchInput');

if (searchInput) {
    function render() {
        const term = searchInput.value.toLowerCase();
        const service = document.getElementById('filterService').value;
        const appts = Storage.getAppointments().filter(a => 
            a.name.toLowerCase().includes(term) && (service === "" || a.service === service)
        );

        const tbody = document.getElementById('apptTable');
    
    // Edit Button

        tbody.innerHTML = appts.map(a => `
            <tr>
                <td>${a.name}</td>
                <td>${a.service}</td>
                <td>${a.date}</td>
                <td>
                    <button onclick="editAppt(${a.id})" class="btn-edit">Edit</button>
                    <button onclick="deleteMe(${a.id})" class="btn-delete">Cancel</button>
                </td>
            </tr>
        `).join('');
    }

    window.editAppt = (id) => {
        const appts = Storage.getAppointments();
        const apptToEdit = appts.find(a => a.id === id);
        
        if (apptToEdit) {
            const newName = prompt("Change the name :", apptToEdit.name);
            const newService = prompt("Change the service (Consultation, Check-up, Lab Test, Vaccination, X-Ray, Dental, Physical Therapy):", apptToEdit.service);
            const newDate = prompt("Change the date (YYYY-MM-DD):", apptToEdit.date);

            if (newName && newService && newDate) {
                // Update the appointment object
                apptToEdit.name = newName;
                apptToEdit.service = newService;
                apptToEdit.date = newDate;

                // storage
                Storage.saveAppointments(appts);
                render(); 
                alert("Appointment updated successfully!");
            }
        }
    };

    window.deleteMe = (id) => {
        if (confirm("Are you sure you want to cancel this appointment?")) {
            Storage.saveAppointments(Storage.getAppointments().filter(a => a.id !== id));
            render();
        }
    };

    searchInput.oninput = render;
    document.getElementById('filterService').onchange = render;
    render();
}

// --- 5.reports ---
const viz = document.getElementById('viz');
if (viz) {
    const appts = Storage.getAppointments();
    const counts = appts.reduce((acc, a) => {
        acc[a.service] = (acc[a.service] || 0) + 1;
        return acc;
    }, {});

    Object.entries(counts).forEach(([service, count]) => {
        const percent = (count / appts.length) * 100;
        viz.innerHTML += `
            <div class="bar-label">${service} (${count})</div>
            <div class="bar-bg"><div class="bar-fill" style="width:${percent}%"></div></div>
        `;
    });
}