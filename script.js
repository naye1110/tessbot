const chatBox = document.getElementById("chatBox");
const input = document.getElementById("questionInput");
const btn = document.getElementById("sendBtn");

let currentTopic = null;
let usedQuestions = [];
let conversationMemory = [];

// =======================
// 이벤트
// =======================

btn.addEventListener("click", runChat);

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") runChat();
});

// =======================
// 메인
// =======================

function runChat() {

    const text = input.value.trim();
    if (!text) return;

    addMsg(text, "user");
    input.value = "";

    conversationMemory.push(text);

    detectTopic(text);

    setTimeout(() => {

        if (!currentTopic) {
            addMsg(randomIntro(), "bot");
            return;
        }

        addMsg(getRandomQuestion(), "bot");

    }, 300);
}

// =======================
// 주제 인식
// =======================

function detectTopic(text) {

    const lower = text.toLowerCase();

    if (lower.includes("행복")) {
        if (currentTopic !== "happiness") usedQuestions = [];
        currentTopic = "happiness";
        return;
    }

    if (lower.includes("공리")) {
        if (currentTopic !== "util") usedQuestions = [];
        currentTopic = "util";
        return;
    }

    if (
        lower.includes("도덕") ||
        lower.includes("동물") ||
        lower.includes("식물") ||
        lower.includes("무생물")
    ) {
        if (currentTopic !== "moral") usedQuestions = [];
        currentTopic = "moral";
        return;
    }
}

// =======================
// 질문 생성 (단순 안정형)
// =======================

function getRandomQuestion() {

    const pools = {
        happiness: happinessQuestions,
        util: utilQuestions,
        moral: moralQuestions
    };

    const list = pools[currentTopic] || [];

    if (usedQuestions.length >= 10) {

        const summary = generateSummary();

        usedQuestions = [];
        currentTopic = null;
        conversationMemory = [];

        return summary + "\n\n👉 이제 자신의 입장을 정리해볼까요?";
    }

    const available = list.filter(q => !usedQuestions.includes(q));

    if (available.length === 0) {
        usedQuestions = [];
        return "👉 이제 자신의 입장을 정리해볼까요?";
    }

    const q = available[Math.floor(Math.random() * available.length)];
    usedQuestions.push(q);

    return q;
}

// =======================
// 요약 (안전 버전)
// =======================

function generateSummary() {

    const text = (conversationMemory || []).join(" ");

    let themes = [];
    let philosophers = [];

    if (text.includes("행복")) {
        themes.push("행복 중심 사고");
        philosophers.push("아리스토텔레스", "에피쿠로스");
    }

    if (text.includes("공리")) {
        themes.push("결과 중심 윤리");
        philosophers.push("벤담", "J.S. 밀");
    }

    if (text.includes("동물") || text.includes("자연")) {
        themes.push("도덕 범위 확장");
        philosophers.push("피터 싱어", "톰 리건");
    }

    if (themes.length === 0) {
        themes.push("철학적 탐구");
        philosophers.push("소크라테스");
    }

    philosophers = [...new Set(philosophers)];

    let result = "🧠 사유 분석\n\n";

    result += "📌 핵심 경향\n";
    themes.forEach(t => result += "- " + t + "\n");

    result += "\n📚 철학자\n";
    philosophers.forEach(p => result += "- " + p + "\n");

    return result;
}

// =======================
// 첫 화면 멘트
// =======================

function randomIntro() {

    const msgs = [
        "탐구 주제를 입력해주세요: 행복 / 공리주의 / 도덕적 고려",
        "어떤 주제를 탐구해볼까요?",
        "철학적 질문을 시작해보세요."
    ];

    return msgs[Math.floor(Math.random() * msgs.length)];
}

// =======================
// 출력
// =======================

function addMsg(text, type) {

    const div = document.createElement("div");
    div.classList.add("msg", type);
    div.innerText = text;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
      }
