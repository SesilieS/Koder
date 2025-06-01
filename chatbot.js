const hamburger = document.querySelector('.hamburger');
const navContainer = document.querySelector('.nav-container');
const closeBtn = document.querySelector('.close-btn');
const chatBotForm = document.getElementById('chatbot-form');
const chatInput = document.getElementById('chatbot-input');
const chatWindow = document.getElementById('chat-window');
const openAiKey = 'YOUR AI KEY HERE';

let messageHistory = [
  { role: "system", content: "You wil help the user to learn more about products produced in local farms. Products like vegetables. The farmers are located i Norway. If the user wants to buy vegetables, please guide them to the Products found in the Menu on the left" }
];

// Mobile nav toggle
hamburger.addEventListener('click', () => {
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
  navContainer.classList.toggle('active');
  hamburger.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navContainer.contains(e.target)) {
    closeMenu();
  }
});

closeBtn.addEventListener('click', closeMenu);

function closeMenu() {
  navContainer.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.classList.remove('active');
}
document.addEventListener("DOMContentLoaded", () => {
    const greeting = "What can I help you with today?";
    appendMessage("ai", greeting);
  
    // Optional: also add to message history so the assistant remembers it
    messageHistory.push({ role: "assistant", content: greeting });
  });
  
// Message bubble appending
function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerText = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Form submission
chatBotForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  appendMessage("user", userMessage);
  messageHistory.push({ role: "user", content: userMessage });

  chatInput.value = "";

  const thinking = document.createElement("div");
  thinking.classList.add("message", "ai");
  thinking.innerText = "•••";
  chatWindow.appendChild(thinking);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messageHistory,
      }),
    });

    const data = await response.json();
    thinking.remove();

    if (response.ok) {
      const aiResponse = data.choices[0].message.content.trim();
      appendMessage("ai", aiResponse);
      messageHistory.push({ role: "assistant", content: aiResponse });
    } else {
      appendMessage("ai", "Oops! Something went wrong.");
    }
  } catch (error) {
    thinking.remove();
    console.error("Network Error:", error);
    appendMessage("ai", "Network error. Please try again.");
  }
});

// Submit on Enter
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    chatBotForm.dispatchEvent(new Event("submit"));
  }
});