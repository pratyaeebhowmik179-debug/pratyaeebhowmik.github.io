/**
 * script.js
 * Vanilla JavaScript interactions for Pratyaee Bhowmik's portfolio.
 * Implements smooth scroll, intersection observers for animations, mobile menu,
 * and a fully functioning interactive AI Chatbot simulation with typing effects.
 */

// Safe helper to create/render Lucide icons, preventing script crashes if CDN is slow/blocked
const safeCreateIcons = () => {
  if (typeof lucide !== "undefined" && lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }
};

const init = () => {
  // Add 'js-enabled' class so that we know JavaScript loaded and runs successfully
  document.documentElement.classList.add('js-enabled');

  // Initialize Lucide Icons
  safeCreateIcons();

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
    safeCreateIcons();
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
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  
  const reveal = () => {
    const triggerBottom = (window.innerHeight || document.documentElement.clientHeight) * 0.95;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add("active");
      }
    });
  };

  // Use IntersectionObserver with a fallback to scroll listener
  if (window.IntersectionObserver) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // Animates once
        }
      });
    }, {
      threshold: 0.05, // Lower threshold for mobile screen heights
      rootMargin: "0px 0px -20px 0px" // Permissive margin to trigger animation slightly early
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });

    // Run once on a slight timeout to animate elements currently on screen
    setTimeout(reveal, 150);
  } else {
    // Fallback scroll/resize listeners for older browsers or sandboxed iframes
    window.addEventListener("scroll", reveal);
    window.addEventListener("resize", reveal);
    reveal(); // Initial check on load
  }

  // Robust absolute fallback backup timer to guarantee all sections reveal and are visible
  setTimeout(() => {
    revealElements.forEach(el => {
      el.classList.add("active");
    });
  }, 600);


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
              ? "bg-red-100 border border-red-200 text-[#B91C1C]" 
              : "bg-red-100/70 border border-red-200 text-[#991B1B]"
          }">
            <i data-lucide="${isUser ? "user" : "bot"}" class="w-4 h-4"></i>
          </div>

          <!-- Speech Bubble -->
          <div class="rounded-xl p-4 text-sm leading-relaxed ${
            isUser 
              ? "bg-[#B91C1C] text-white font-medium shadow-sm" 
              : "bg-red-50/90 text-[#475569] border border-red-100 shadow-sm"
          }">
            ${formattedText}
          </div>
        </div>
      </div>
    `;
  }

  // Scroll chat to bottom with optional smooth animation
  function scrollToBottom(smooth = false) {
    if (chatMessagesContainer) {
      if (smooth) {
        chatMessagesContainer.scrollTo({
          top: chatMessagesContainer.scrollHeight,
          behavior: "smooth"
        });
      } else {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
      }
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

    // Simulate short thinking delay (500ms) before streaming answers
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = "";

      if (lower.includes("skills") || lower.includes("programming") || lower.includes("language") || lower.includes("stack") || lower.includes("technolog") || lower.includes("developer") || lower.includes("coding")) {
        response = "Pratyaee has a robust set of modern technical skills:\n\n" +
          "• **Programming**: Python, C\n" +
          "• **Web Development**: HTML, CSS, JavaScript, Bootstrap, React JS\n" +
          "• **Database Systems**: MySQL\n" +
          "• **AI & Dev Ecosystem**: Cursor AI, Claude AI, Agentic Workflows, Git & GitHub\n\n" +
          "She specializes in blending analytical data processes with clean, modern web engineering!";
      } else if (lower.includes("education") || lower.includes("college") || lower.includes("bca") || lower.includes("degree") || lower.includes("academic") || lower.includes("study") || lower.includes("year") || lower.includes("school")) {
        response = "Pratyaee is currently in her **1st year of Bachelor of Computer Applications (BCA)** (2025-2028).\n\n" +
          "She is focused on building strong mathematical and programming foundations, with a continuous focus on adapting state-of-the-art AI tooling to computer science fundamentals.";
      } else if (lower.includes("certifications") || lower.includes("course") || lower.includes("udemy") || lower.includes("bootcamp") || lower.includes("certified") || lower.includes("certificate")) {
        response = "Pratyaee holds several professional certifications, including:\n\n" +
          "1. **Agentic AI Mastery: Claude Code & Beyond** (School of AI - Udemy)\n" +
          "2. **Python Full Stack Developer Bootcamp** (Creative Online School - Udemy)\n" +
          "3. **Mastering MySQL: Beginner to Advanced** (Udemy)\n\n" +
          "She's always expanding her portfolio with structured certifications to keep pace with rapid innovations.";
      } else if (
        lower.includes("contact") || 
        lower.includes("email") || 
        lower.includes("reach") || 
        lower.includes("phone") || 
        lower.includes("hire") || 
        lower.includes("linkedin") || 
        lower.includes("github") ||
        lower.includes("touch") ||
        lower.includes("connect") ||
        lower.includes("mobile") ||
        lower.includes("number") ||
        lower.includes("call") ||
        lower.includes("whatsapp")
      ) {
        response = "You can easily connect with Pratyaee through the following channels:\n\n" +
          "• **Mobile Number**: **+91 8100449256** (Call / WhatsApp)\n" +
          "• **Email**: pratyaeebhowmik07@gmail.com\n" +
          "• **LinkedIn**: linkedin.com/in/pratyaee-bhowmik-262356313\n" +
          "• **GitHub**: github.com/pratyaeebhowmik179-debug\n\n" +
          "She is highly responsive and eager to discuss projects, collaborations, or internship roles!";
      } else if (
        lower.includes("internship") || 
        lower.includes("job") || 
        lower.includes("work") || 
        lower.includes("experience") || 
        lower.includes("hire") ||
        lower.includes("portfolio") || 
        lower.includes("project") || 
        lower.includes("showcase")
      ) {
        response = "Pratyaee is actively seeking **Data Science & AI Developer Internships**!\n\n" +
          "As a dedicated first-year BCA student, she can assist teams with analytical data preprocessing, database architecture in MySQL, scripting in Python, and prototyping automated LLM workflows using Claude and Cursor. She is highly self-driven and eager to collaborate on technical solutions.";
      } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("greetings") || lower.includes("yo") || lower.includes("sup")) {
        response = "Hello! 👋 I'm Pratyaee's custom AI assistant. I can guide you through her background, skills, and aspirations. Try asking:\n\n" +
          "• 'What skills do you have?'\n" +
          "• 'Tell me about your education'\n" +
          "• 'How do I get in touch?'";
      } else {
        response = "I'm designed to focus specifically on Pratyaee's background! Try asking about her **skills**, **education**, **certifications**, or how to **get in touch**. I'd be happy to share those details!";
      }

      // Hide typing state
      setTypingState(false);

      // Create streaming response container
      const botMessageEl = document.createElement("div");
      botMessageEl.className = "flex justify-start fade-in";
      botMessageEl.innerHTML = `
        <div class="flex gap-3 max-w-[85%] flex-row">
          <!-- Avatar -->
          <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-red-100/70 border border-red-200 text-[#991B1B]">
            <i data-lucide="bot" class="w-4 h-4"></i>
          </div>

          <!-- Speech Bubble -->
          <div class="rounded-xl p-4 text-sm leading-relaxed bg-red-50/90 text-[#475569] border border-red-100 shadow-sm chat-bubble-content"></div>
        </div>
      `;

      chatMessagesContainer.appendChild(botMessageEl);
      safeCreateIcons();
      scrollToBottom(true);

      const bubbleContent = botMessageEl.querySelector(".chat-bubble-content");
      
      // Parse simple markdown-like elements first to keep styling intact during streaming
      let formattedText = response
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");

      // HTML-safe character-by-character streamer to prevent unclosed tags or layout flickering
      let charIndex = 0;
      bubbleContent.innerHTML = "";

      const streamInterval = setInterval(() => {
        if (charIndex < formattedText.length) {
          if (formattedText[charIndex] === "<") {
            // Find end of the HTML tag so we append it in a single tick
            const tagEndIndex = formattedText.indexOf(">", charIndex);
            if (tagEndIndex !== -1) {
              bubbleContent.innerHTML += formattedText.substring(charIndex, tagEndIndex + 1);
              charIndex = tagEndIndex + 1;
            } else {
              bubbleContent.innerHTML += formattedText[charIndex];
              charIndex++;
            }
          } else {
            bubbleContent.innerHTML += formattedText[charIndex];
            charIndex++;
          }
          scrollToBottom(false); // Quick instant scroll while typing to prevent stutter
        } else {
          clearInterval(streamInterval);
          scrollToBottom(true); // Smooth scroll at the very end
        }
      }, 8); // Fast, high-performance streaming (8ms per character)
    }, 400);
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
    
    safeCreateIcons();
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
};

// Robust readyState check to ensure execution even if loaded after DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
      }
