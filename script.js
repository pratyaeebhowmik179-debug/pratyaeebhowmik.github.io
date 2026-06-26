/**
 * Pratyaee Bhowmik - Standalone Portfolio JS Script Engine
 * Handles Navigation effects, Dynamic chatbot simulation, and UX.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Set Footer Current Year Automatically
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Nav-bar Scroll Styling Effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = "0 10px 30px -10px rgba(0, 0, 0, 0.05)";
            navbar.style.background = "rgba(255, 255, 255, 0.98)";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.background = "rgba(255, 255, 255, 0.9)";
        }
    });

    // Chat Elements Setup
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");

    // Process Bot Response (Interactive intelligence parser)
    function processQuery(text) {
        const lower = text.toLowerCase();
        let reply = "";

        if (lower.includes("skills") || lower.includes("programming") || lower.includes("language") || lower.includes("stack") || lower.includes("technolog")) {
            reply = "Pratyaee has a robust set of modern technical skills:\n\n" +
                    "• **Programming**: Python, C\n" +
                    "• **Web Development**: HTML, CSS, JavaScript, Bootstrap, React JS\n" +
                    "• **Database Systems**: MySQL\n" +
                    "• **AI & Dev Ecosystem**: Cursor AI, Claude AI, Agentic Workflows, Git & GitHub\n\n" +
                    "He specializes in blending analytical data processes with clean, modern web engineering!";
        } else if (lower.includes("education") || lower.includes("college") || lower.includes("bca") || lower.includes("degree") || lower.includes("academic") || lower.includes("study") || lower.includes("year")) {
            reply = "Pratyaee is currently in his **1st year of Bachelor of Computer Applications (BCA)** (2025-2028).\n\n" +
                    "He is focused on building strong mathematical and programming foundations, with a continuous focus on adapting state-of-the-art AI tooling to computer science fundamentals.";
        } else if (lower.includes("certifications") || lower.includes("course") || lower.includes("udemy") || lower.includes("bootcamp") || lower.includes("certified")) {
            reply = "Pratyaee holds several professional certifications, including:\n\n" +
                    "1. **Agentic AI Mastery: Claude Code & Beyond** (School of AI - Udemy)\n" +
                    "2. **Python Full Stack Developer Bootcamp** (Creative Online School - Udemy)\n" +
                    "3. **Mastering MySQL: Beginner to Advanced** (Udemy)\n\n" +
                    "He's always expanding his portfolio with structured certifications to keep pace with rapid innovations.";
        } else if (lower.includes("contact") || lower.includes("email") || lower.includes("reach") || lower.includes("phone") || lower.includes("hire") || lower.includes("linkedin") || lower.includes("github")) {
            reply = "You can easily connect with Pratyaee through the following channels:\n\n" +
                    "• **Email**: nantinggg3@gmail.com\n" +
                    "• **LinkedIn**: linkedin.com/in/pratyaee-bhowmik\n" +
                    "• **GitHub**: github.com/Pratyaee\n\n" +
                    "He is highly responsive and eager to discuss projects, collaborations, or internship roles!";
        } else if (lower.includes("internship") || lower.includes("job") || lower.includes("work") || lower.includes("experience") || lower.includes("hire")) {
            reply = "Pratyaee is actively seeking **Data Science & AI Developer Internships**!\n\n" +
                    "He can assist teams with analytical data preprocessing, automated web development prototyping, scripting, and deploying LLM integrations using Agentic workflows. He is self-driven and highly trainable.";
        } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("greetings")) {
            reply = "Hello! 👋 I'm Pratyaee's custom assistant. I can guide you through his work and aspirations. Try asking: 'What skills do you have?' or 'Tell me about your certifications'.";
        } else {
            reply = "I'm designed to focus specifically on Pratyaee's background! Try asking about his **skills**, **education**, **certifications**, or how to **contact** him. I'd be happy to share those details!";
        }
        return reply;
    }

    // Append Bubble UI to Chat Box
    function appendMessage(sender, text) {
        const wrapper = document.createElement("div");
        wrapper.className = `message-wrapper ${sender === "user" ? "outgoing" : "incoming"} d-flex gap-3 max-w-85`;
        
        const avatarHtml = sender === "user" 
            ? `<div class="chat-avatar bg-danger text-white border-0"><i class="fa-solid fa-user"></i></div>`
            : `<div class="chat-avatar"><i class="fa-solid fa-robot"></i></div>`;

        const bubbleClass = sender === "user" ? "outgoing-bubble" : "incoming-bubble";
        
        wrapper.innerHTML = `
            ${sender !== "user" ? avatarHtml : ""}
            <div class="message-bubble ${bubbleClass}">${text}</div>
            ${sender === "user" ? avatarHtml : ""}
        `;

        chatMessages.appendChild(wrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Simulate Typing Indicator
    function appendTypingIndicator() {
        const wrapper = document.createElement("div");
        wrapper.className = "message-wrapper incoming d-flex gap-3 max-w-85 align-items-center";
        wrapper.id = "typing-indicator";
        wrapper.innerHTML = `
            <div class="chat-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="message-bubble incoming-bubble d-flex gap-1 align-items-center py-2 px-3">
                <span class="spinner-grow spinner-grow-sm text-danger" style="animation-duration: 0.8s" role="status"></span>
                <span class="spinner-grow spinner-grow-sm text-danger" style="animation-duration: 0.8s; animation-delay: 0.2s" role="status"></span>
                <span class="spinner-grow spinner-grow-sm text-danger" style="animation-duration: 0.8s; animation-delay: 0.4s" role="status"></span>
            </div>
        `;
        chatMessages.appendChild(wrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remove Typing Indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById("typing-indicator");
        if (indicator) {
            indicator.remove();
        }
    }

    // Main Chat Message Handler
    function handleMessage(text) {
        if (!text.trim()) return;

        // User submits message
        appendMessage("user", text);

        // Display Loader & Processing Delay
        appendTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            const responseText = processQuery(text);
            appendMessage("ai", responseText);
        }, 650);
    }

    // Event listener for chat submission
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = chatInput.value;
        if (text.trim()) {
            handleMessage(text);
            chatInput.value = "";
        }
    });

    // Handle Quick Action Suggestion Buttons
    const quickButtons = document.querySelectorAll(".quick-btn");
    quickButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            handleMessage(btn.textContent);
        });
    });
});
