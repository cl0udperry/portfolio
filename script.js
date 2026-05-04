const chatLog = document.querySelector("#chatLog");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const promptChips = document.querySelectorAll("[data-question]");

// Furnish more personal details here. Keep each value concise; the chat answers
// below will pull from this profile so Mini Jordan sounds like you.
const personalProfile = {
  name: "Jordan",
  currentRole: "TISO DevSecOps & Application Security Engineer at OCBC",
  base: "Singapore",
  interests: ["tennis", "audio products", "AI security tools"],
  audioBlog:
    "Perrivan Audio is my website blog at perrivanaudio.com, where I share earphone reviews and thoughts on products I have tested because I love music.",
  styleNotes:
    "I like work that feels intentional: clear systems, useful tools, and a bit of personality in the details.",
  personalPitch:
    "I enjoy the space where security, developer experience, and product thinking overlap."
};

const knowledge = [
  {
    keys: ["fit", "strong", "why", "candidate", "hire", "summary", "know"],
    answer:
      `I am strongest where AppSec meets delivery: Python automation, CI/CD security workflows, SAST/SCA/DAST/IAST adoption, Jira workflow design, and hands-on developer remediation support. ${personalProfile.personalPitch}`
  },
  {
    keys: ["work", "ocbc", "experience", "current", "role"],
    answer:
      `I have worked at OCBC since June 2022, and I currently work as a ${personalProfile.currentRole}. I support secure releases, code review, CVE remediation, vendor rollout, and developer guidance.`
  },
  {
    keys: ["automation", "python", "pipeline", "ci/cd", "cicd", "jira"],
    answer:
      "I have built Python automation to reduce manual CI/CD security processes, and I have designed Jira workflows that improve turnaround time, traceability, and request handling."
  },
  {
    keys: ["tools", "security", "sast", "sca", "dast", "iast", "burp", "nmap"],
    answer:
      "I have used Burp Suite, SAST, SCA, DAST, IAST, Nmap, Jenkins, GitLab CI, Bitbucket, Nexus Repository, Postman, and Jira automation in security delivery workflows."
  },
  {
    keys: ["semio", "ai", "openai", "gemini", "fastapi", "gradio"],
    answer:
      "Semio is my AI in DevSecOps platform: a FastAPI backend with a Gradio dashboard for vulnerability analysis, Semgrep JSON processing, contextual fix recommendations, Docker workflows, GitLab CI/CD integration, and OpenAI/Gemini-powered analysis."
  },
  {
    keys: ["revmp", "vulnerability", "dashboard", "black duck", "coverity"],
    answer:
      "revmp is my enhanced vulnerability management platform built with Python, Flask, and Chart.js. It integrates Black Duck SCA, Coverity SAST, and Jira APIs to visualize, deduplicate, and track security findings across commits."
  },
  {
    keys: ["cert", "certification", "cdp", "aws", "ejpt"],
    answer:
      "I hold the Certified DevSecOps Professional (CDP), AWS Certified Cloud Practitioner, and eJPT Junior Penetration Tester certifications."
  },
  {
    keys: ["education", "nus", "degree", "gpa", "scholarship"],
    answer:
      "I studied Mechanical Engineering with an Aeronautical Engineering specialization at the National University of Singapore, earned a 4.50/5.00 GPA, and received the NUS Merit Scholarship."
  },
  {
    keys: ["language", "mandarin", "english"],
    answer: "I am fluent in English and Mandarin."
  },
  {
    keys: ["interest", "interests", "enjoy", "like", "fun", "outside", "hobby", "hobbies", "tennis", "monet", "art", "audio", "earphone", "earphones", "music", "perrivan", "perrivanaudio", "personal"],
    answer:
      `Outside work, I like ${personalProfile.interests.join(", ")}. ${personalProfile.audioBlog} ${personalProfile.styleNotes}`
  },
  {
    keys: ["contact", "email", "github", "website"],
    answer:
      "You can reach me by email at jordanleong007@gmail.com, visit semio-ai.com, or review my GitHub work at github.com/cl0udperry."
  }
];

const fallbackAnswer =
  "I might not have that detail written down yet, but I can still tell you about my work, projects, security background, education, or the things I enjoy outside work.";

function addMessage(text, sender = "bot") {
  const bubble = document.createElement("div");
  bubble.className = `message ${sender}`;
  bubble.textContent = text;
  chatLog.appendChild(bubble);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function answerFor(question) {
  const normalized = question.toLowerCase();
  const match = knowledge
    .map((item) => ({
      item,
      score: item.keys.filter((key) => normalized.includes(key)).length
    }))
    .sort((a, b) => b.score - a.score)[0];

  return match && match.score > 0 ? match.item.answer : fallbackAnswer;
}

function showTyping() {
  const el = document.createElement("div");
  el.className = "typing-indicator";
  el.innerHTML = "<span></span><span></span><span></span>";
  chatLog.appendChild(el);
  chatLog.scrollTop = chatLog.scrollHeight;
  return el;
}

function submitQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  addMessage(cleanQuestion, "user");
  chatInput.value = "";

  const typing = showTyping();
  window.setTimeout(() => {
    typing.remove();
    addMessage(answerFor(cleanQuestion));
  }, 700);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitQuestion(chatInput.value);
});

promptChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    submitQuestion(chip.dataset.question);
  });
});

addMessage(
  "Hi, I am Mini Jordan. Ask me what I have built, what I work on, or what I am curious about."
);

// ── Scroll-reveal observer ────────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
