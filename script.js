let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let chatContainer = document.querySelector("#chat-container");

// Function to add messages to chat container
function addMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.innerText = `${sender === "user" ? "You" : "ECHO"}: ${message}`;
  chatContainer.appendChild(msgDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Speak and display assistant message
function speak(text) {
  let utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  utter.volume = 1;
  utter.lang = "hi-GB"; // You can also try "en-US"
  window.speechSynthesis.speak(utter);

  addMessage("assistant", text);
}

function wishMe() {
  let hour = new Date().getHours();
  if (hour >= 0 && hour < 12) speak("Good Morning Sir");
  else if (hour >= 12 && hour < 16) speak("Good Afternoon Sir");
  else speak("Good Evening Sir");
}

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  let transcript = event.results[event.resultIndex][0].transcript;
  content.innerText = `You: ${transcript}`;
  addMessage("user", transcript);
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
  voice.style.display = "block";
  btn.style.display = "none";
});

function takeCommand(message) {
  voice.style.display = "none";
  btn.style.display = "flex";

  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello sir, what can I help you with?");
  } else if (message.includes("who are you")) {
    speak("I am a virtual assistant. My name is Echo.");
  } else if (message.includes("how are you")) {
    speak("I'm functioning as expected. How can I assist you today?");
  } else if (message.includes("what is your name")) {
    speak("My name is Echo.");
  } else if (message.includes("thank you") || message.includes("thanks")) {
    speak("You're welcome, always here to help!");
  } else if (message.includes("what can you do")) {
    speak("I can open websites, tell you the time and date, and help with basic queries.");
  } else if (message.includes("who created you")) {
    speak("I was created by Vanshika Rajput.");
  } else if (message.includes("are you real")) {
    speak("I exist in the digital world. So yes, in my own way, I am real.");
  } else if (message.includes("do you love me")) {
    speak("As a virtual assistant, I don't have feelings, but I'm always here to help you!");
  } else if (message.includes("tell me a joke")) {
    speak("Why did the computer go to therapy? Because it had too many bytes of issues!");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://youtube.com/", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google...");
    window.open("https://google.com/", "_blank");
  } else if (message.includes("open facebook")) {
    speak("Opening Facebook...");
    window.open("https://facebook.com/", "_blank");
  } else if (message.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://instagram.com/", "_blank");
  } else if (message.includes("open calculator")) {
    speak("Opening calculator...");
    window.open("calculator://");
  } else if (message.includes("open whatsapp")) {
    speak("Opening WhatsApp...");
    window.open("whatsapp://");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
    speak("The time is " + time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
    speak("Today's date is " + date);
  } else {
    let query = message.replace("shipra", "").replace("shifra", "");
    let finalText = "This is what I found on the internet regarding " + query;
    speak(finalText);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  }
}
