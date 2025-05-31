const hamburger = document.querySelector('.hamburger');
const navContainer = document.querySelector('.nav-container');
const closeBtn = document.querySelector('.close-btn');
const chatBotForm = document.getElementById('chatbot-form');
const openAiKey = 'PUT KEY HERE'

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
chatBotForm.addEventListener("submit", async (event) => {
    event.preventDefault();
   
    const chatBotInput = document.getElementById("chatbot-input");
    const userMessage = chatBotInput.value; // Get the actual value
    console.log(userMessage);
   
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
        }),
      });
   
      const data = await response.json();
   
      if (response.ok) {
        const aiResponse = data.choices[0].message.content;
        console.log("AI Response:", aiResponse);
   
        const responseDiv = document.getElementById("response-div");
        if (responseDiv) {
          responseDiv.innerHTML = `<strong>AI:</strong> ${aiResponse}`;
        }
      } else {
        console.error("API Error:", data.error);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
   
    chatBotInput.value = "";
  });
