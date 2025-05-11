// Connect to our Socket.io server
const socket = io('http://localhost:3000');

// Get references to key DOM elements once when page loads
const input = document.getElementById('messageInput');
const messages = document.getElementById('messages');


function sendMessage() {
  const msg = input.value; // Get current text from input
  
  if (msg.trim()) {
    // Emit the message to server via Socket.io
    socket.emit('chat message', msg);
    
    // Clear input field after sending
    input.value = '';
  
    input.focus();
  }
}

// Listens for incoming chat messages from server
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});