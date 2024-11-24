document.addEventListener('DOMContentLoaded', () => {
    const eventsContainer = document.getElementById('eventsContainer');
    const eventFormSection = document.getElementById('eventFormSection');
    const addEventBtn = document.getElementById('addEventBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const eventForm = document.getElementById('eventForm');

    let events = []; // Simulación inicial de eventos

    // Mostrar y ocultar formulario
    addEventBtn.addEventListener('click', () => {
        eventFormSection.classList.remove('hidden');
    });

    cancelBtn.addEventListener('click', () => {
        eventFormSection.classList.add('hidden');
    });

    // Agregar evento
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('eventName').value;
        const date = document.getElementById('eventDate').value;
        const description = document.getElementById('eventDescription').value;

        const newEvent = { id: Date.now(), name, date, description };
        events.push(newEvent);
        updateEventList();
        eventForm.reset();
        eventFormSection.classList.add('hidden');
    });

    // Actualizar lista de eventos
    function updateEventList() {
        eventsContainer.innerHTML = '';
        events.forEach(event => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${event.name}</strong> 
                <span>${event.date}</span>
                <p>${event.description}</p>
                <button onclick="editEvent(${event.id})">Editar</button>
                <button onclick="deleteEvent(${event.id})">Eliminar</button>
            `;
            eventsContainer.appendChild(li);
        });
    }

    // Funciones simuladas (deben conectarse con API más adelante)
    window.editEvent = (id) => alert(`Editar evento: ${id}`);
    window.deleteEvent = (id) => {
        events = events.filter(event => event.id !== id);
        updateEventList();
    };
});

async function fetchEvents() {
    const response = await fetch('http://localhost:5000/events');
    const data = await response.json();
    events = data;
    updateEventList();
}

async function saveEvent(event) {
    const response = await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
    });
    return await response.json();
}
