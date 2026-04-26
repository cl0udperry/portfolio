const chatLog = document.querySelector("#chatLog");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const promptChips = document.querySelectorAll("[data-question]");

const knowledge = [
  {
    keys: ["fit", "strong", "why", "candidate", "hire", "summary", "know"],
    answer:
      "Jordan is strongest where AppSec meets delivery: Python automation, CI/CD security workflows, SAST/SCA/DAST/IAST adoption, Jira workflow design, and hands-on developer remediation support."
  },
  {
    keys: ["work", "ocbc", "experience", "current", "role"],
    answer:
      "Jordan has worked at OCBC since June 2022 and currently serves as a TISO DevSecOps & Application Security Engineer, supporting secure releases, code review, CVE remediation, vendor rollout, and developer guidance."
  },
  {
    keys: ["automation", "python", "pipeline", "ci/cd", "cicd", "jira"],
    answer:
      "Jordan developed Python automation to reduce manual CI/CD security processes and designed automated Jira workflows to improve turnaround time, traceability, and request handling."
  },
  {
    keys: ["tools", "security", "sast", "sca", "dast", "iast", "burp", "nmap"],
    answer:
      "Jordan has used Burp Suite, SAST, SCA, DAST, IAST, Nmap, Jenkins, GitLab CI, Bitbucket, Nexus Repository, Postman, and Jira automation in security delivery workflows."
  },
  {
    keys: ["semio", "ai", "openai", "gemini", "fastapi", "gradio"],
    answer:
      "Semio is Jordan's AI in DevSecOps platform: a FastAPI backend with a Gradio dashboard for vulnerability analysis, Semgrep JSON processing, contextual fix recommendations, Docker workflows, GitLab CI/CD integration, and OpenAI/Gemini-powered analysis."
  },
  {
    keys: ["revmp", "vulnerability", "dashboard", "black duck", "coverity"],
    answer:
      "revmp is an enhanced vulnerability management platform built with Python, Flask, and Chart.js. It integrates Black Duck SCA, Coverity SAST, and Jira APIs to visualize, deduplicate, and track security findings across commits."
  },
  {
    keys: ["cert", "certification", "cdp", "aws", "ejpt"],
    answer:
      "Jordan holds Certified DevSecOps Professional (CDP), AWS Certified Cloud Practitioner, and eJPT Junior Penetration Tester certifications."
  },
  {
    keys: ["education", "nus", "degree", "gpa", "scholarship"],
    answer:
      "Jordan studied Mechanical Engineering with an Aeronautical Engineering specialization at the National University of Singapore, earned a 4.50/5.00 GPA, and received the NUS Merit Scholarship."
  },
  {
    keys: ["language", "mandarin", "english"],
    answer: "Jordan is fluent in English and Mandarin."
  },
  {
    keys: ["contact", "email", "github", "website"],
    answer:
      "You can reach Jordan by email at jordanleong007@gmail.com, visit semio-ai.com, or review GitHub work at github.com/cl0udperry."
  }
];

const fallbackAnswer =
  "I can answer from Jordan's resume: DevSecOps experience, OCBC work, Semio, revmp, certifications, education, security tools, languages, or email contact.";

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

function submitQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  addMessage(cleanQuestion, "user");
  chatInput.value = "";
  window.setTimeout(() => addMessage(answerFor(cleanQuestion)), 220);
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
  "Hi, I am Mini Jordan. Ask me what Jordan has built, what he works on, or what he is curious about."
);
