/**
 * script.js
 * Vanilla JavaScript interactions for Pratyaee Bhowmik's portfolio.
 * Implements smooth scroll, intersection observers for animations, mobile menu,
 * and a fully functioning interactive AI Chatbot simulation with typing effects.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // --- MOBILE NAV TOGGLE ---
  const mobileNavToggleBtn = document.getElementById("mobile-nav-toggle");
  const mobileNavPanel = document.getElementById("mobile-nav-panel");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  function toggleMobileMenu() {
    const isHidden = mobileNavPanel.classList.contains("hidden");
    if (isHidden) {
      mobileNavPanel.classList.remove("hidden");
      // Trigger subtle fade-in transition
      setTimeout(() => {
        mobileNavPanel.classList.remove("opacity-0", "-translate-y-4");
      }, 10);
      mobileNavToggleBtn.innerHTML = `<i data-lucide="x" class="w-6 h-6"></i>`;
    } else {
      mobileNavPanel.classList.add("opacity-0", "-translate-y-4");
      setTimeout(() => {
        mobileNavPanel.classList.add("hidden");
      }, 200);
      mobileNavToggleBtn.innerHTML = `<i data-lucide="menu" class="w-6 h-6"></i>`;
    }
    lucide.createIcons();
  }

  if (mobileNavToggleBtn && mobileNavPanel) {
    mobileNavToggleBtn.addEventListener("click", toggleMobileMenu);
  }

  // Close mobile nav when link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (mobileNavPanel && !mobileNavPanel.classList.contains("hidden")) {
        toggleMobileMenu();
      }
    });
  });


  // --- REVEAL ON SCROLL ANIMATIONS ---
  // Replaces the React Framer Motion on-scroll fade-in effect
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  // --- AI CHATBOT INTERACTIVE SYSTEM ---
  const chatMessagesContainer = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const typingIndicator = document.getElementById("typing-indicator");
  const quickPromptButtons = document.querySelectorAll(".quick-prompt-btn");

  // Chat message generator helper
  function createMessageHTML(sender, text) {
    const isUser = sender === "user";
    
    // Format text lines for beautiful rendering with bullet points
    const formattedText = text.replace(/\n/g, "<br>");

    return `
      <div class="flex ${isUser ? "justify-end" : "justify-start"} fade-in">
        <div class="flex gap-3 max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}">
          <!-- Avatar -->
          <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isUser 
              ? "bg-rose-100 border border-rose-200 text-[#E11D48]" 
              : "bg-rose-100/70 border border-rose-200 text-[#BE123C]"
          }">
            <i data-lucide="${isUser ? "user" : "bot"}" class="w-4 h-4"></i>
          </div>

          <!-- Speech Bubble -->
          <div class="rounded-xl p-4 text-sm leading-relaxed ${
            isUser 
              ? "bg-[#E11D48] text-white font-medium shadow-sm" 
              : "bg-rose-50/90 text-[#475569] border border-rose-150 shadow-sm"
          }">
            ${formattedText}
          </div>
        </div>
      </div>
    `;
  }

  // Scroll chat to bottom
  function scrollToBottom() {
    if (chatMessagesContainer) {
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
  }

  // Show/Hide typing state
  function setTypingState(show) {
    if (typingIndicator) {
      if (show) {
        typingIndicator.classList.remove("hidden");
        typingIndicator.classList.add("flex");
      } else {
        typingIndicator.classList.add("hidden");
        typingIndicator.classList.remove("flex");
      }
      scrollToBottom();
    }
  }

  // Core Chatbot Response Logic
  function handleBotReply(userQuery) {
    const text = userQuery.trim();
    if (!text) return;

    setTypingState(true);

    // Simulate thinking delay (850ms)
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = "";

      if (lower.includes("skills") || lower.includes("programming") || lower.includes("language") || lower.includes("stack") || lower.includes("technolog")) {
        response = "Pratyaee has a robust set of modern technical skills:\n\n" +
          "• **Programming**: Python, C\n" +
          "• **Web Development**: HTML, CSS, JavaScript, Bootstrap, React JS\n" +
          "• **Database Systems**: MySQL\n" +
          "• **AI & Dev Ecosystem**: Cursor AI, Claude AI, Agentic Workflows, Git & GitHub\n\n" +
          "She specializes in blending analytical data processes with clean, modern web engineering!";
      } else if (lower.includes("education") || lower.includes("college") || lower.includes("bca") || lower.includes("degree") || lower.includes("academic") || lower.includes("study") || lower.includes("year")) {
        response = "Pratyaee is currently in her **1st year of Bachelor of Computer Applications (BCA)** (2025-2028).\n\n" +
          "She is focused on building strong mathematical and programming foundations, with a continuous focus on adapting state-of-the-art AI tooling to computer science fundamentals.";
      } else if (lower.includes("certifications") || lower.includes("course") || lower.includes("udemy") || lower.includes("bootcamp") || lower.includes("certified")) {
        response = "Pratyaee holds several professional certifications, including:\n\n" +
          "1. **Agentic AI Mastery: Claude Code & Beyond** (School of AI - Udemy)\n" +
          "2. **Python Full Stack Developer Bootcamp** (Creative Online School - Udemy)\n" +
          "3. **Mastering MySQL: Beginner to Advanced** (Udemy)\n\n" +
          "She's always expanding her portfolio with structured certifications to keep pace with rapid innovations.";
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("reach") || lower.includes("phone") || lower.includes("hire") || lower.includes("linkedin") || lower.includes("github")) {
        response = "You can easily connect with Pratyaee through the following channels:\n\n" +
          "• **Email**: pratyaeebhowmik07@gmail.com\n" +
          "• **LinkedIn**: linkedin.com/in/pratyaee-bhowmik-262356313\n" +
          "• **GitHub**: github.com/pratyaeebhowmik179-debug\n\n" +
          "She is highly responsive and eager to discuss projects, collaborations, or internship roles!";
      } else if (lower.includes("internship") || lower.includes("job") || lower.includes("work") || lower.includes("experience") || lower.includes("hire")) {
        response = "Pratyaee is actively seeking **Data Science & AI Developer Internships**!\n\n" +
          "She can assist teams with analytical data preprocessing, automated web development prototyping, scripting, and deploying LLM integrations using Agentic workflows. She is self-driven and highly trainable.";
      } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("greetings")) {
        response = "Hello! 👋 I'm Pratyaee's custom assistant. I can guide you through her work and aspirations. Try asking: 'What skills do you have?' or 'Tell me about your certifications'.";
      } else {
        response = "I'm designed to focus specifically on Pratyaee's background! Try asking about her **skills**, **education**, **certifications**, or how to **contact** her. I'd be happy to share those details!";
      }

      // Hide typing state and append bot message
      setTypingState(false);
      
      const botMessageEl = document.createElement("div");
      botMessageEl.innerHTML = createMessageHTML("bot", response);
      chatMessagesContainer.appendChild(botMessageEl);
      
      // Re-trigger icon parsing for new message icon
      lucide.createIcons();
      scrollToBottom();
    }, 900);
  }

  // Handle user submit query
  function submitUserMessage(messageText) {
    if (!messageText.trim()) return;

    // Append user message
    const userMessageEl = document.createElement("div");
    userMessageEl.innerHTML = createMessageHTML("user", messageText);
    chatMessagesContainer.appendChild(userMessageEl);
    
    // Clear input
    if (chatInput) chatInput.value = "";
    
    lucide.createIcons();
    scrollToBottom();

    // Trigger Bot reply
    handleBotReply(messageText);
  }

  // Event listener for chat form submission
  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (chatInput) {
        submitUserMessage(chatInput.value);
      }
    });
  }

  // Click handler for quick prompts
  quickPromptButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const promptText = btn.getAttribute("data-prompt") || btn.innerText;
      submitUserMessage(promptText);
    });
  });

  // Smooth scroll offsets for sticky header alignment
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
});
