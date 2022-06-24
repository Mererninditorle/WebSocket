const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

const ws = new WebSocket('ws://localhost:8082');

function setStatus(value) {
    status.innerHTML = value;
}

function printMessage(value) {
    const div = document.createElement('div');
    div.className = 'task_card'
    div.innerHTML = `
        <div>Task</div>
        <div>${value}</div>
    `;
    messages.appendChild(div);
}

form.addEventListener('submit', event => {
    event.preventDefault();

    ws.send(input.value);
    console.log(input.value);
    input.value = '';
})

ws.onopen = () => setStatus('online');
ws.onclose = () => setStatus('offline');
ws.onmessage = response => printMessage(response.data);