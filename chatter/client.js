const socket = io('http://localhost:8000');
const form = document.getElementById('sendcon');
const messageinput = document.getElementById('msginp');
const messagecontainer = document.querySelector(".messages");
var audio = new Audio('ting.wav');
var names = prompt("Please enter your name:");
const append = (message, position) => {
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    audio.play();
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageinput.value;
    append(`You : ${message}`, 'rig');
    socket.emit('send', message);
    messageinput = '';
})
socket.emit('new-user-joined', names);
socket.on('user-joined', names => {
    append(`${names} joined the chat`, 'mid');
})
socket.on('receive', data => {
    append(`${data.names}:${data.message}`, 'lef');
})
socket.on('left', names => {
    append(`${names} left the chat`, 'mid2');
})
// Handle image selection and display
const fileInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const dataURL = event.target.result;

    // Emit the dataURL to the server
    socket.emit('image', dataURL);
  };

  reader.readAsDataURL(file);
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const dataURL = event.target.result;

    // Set the dataURL as the source of the image preview
    imagePreview.src = dataURL;
  };

  reader.readAsDataURL(file);
});
