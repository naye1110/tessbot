const chatBox = document.getElementById("chatBox");
const input = document.getElementById("questionInput");
const btn = document.getElementById("sendBtn");

let currentTopic = null;
let usedQuestions = [];
let conversationMemory = [];

// =======================
// 버튼 이벤트
// =======================

btn.addEventListener("click", runChat);

input.addEventListener("keydown", function(e) {
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

    setTimeout(() => {

        detectTopic(text);

        if (!currentTopic) {

            const casualReplies = [
                "좋아요. 새로운 탐구를 시작하고 싶다면 행복, 공리주의, 도덕적 고려의 범위 중 하나를 입력해주세요.",
                "흥미로운 탐구였네요. 다음에는 어떤 주제를 생각해보고 싶나요?",
                "생각이 조금 더 정리된 것 같나요? 새로운 주제를 입력하면 다시 탐구를 시작할 수 있어요.",
                "철학은 정답보다 질문을 중요하게 여깁니다. 다른 주제도 탐구해볼까요?"
            ];

            addMsg(
                casualReplies[Math.floor(Math.random() * casualReplies.length)],
                "bot"
            );

            return;
        }

        addMsg(getRandomQuestion(currentTopic), "bot");

    }, 400);
}

// =======================
// 주제 인식
// =======================

function detectTopic(text) {

    const lower = text.toLowerCase();

    if (lower.includes("행복")) {
        if (currentTopic !== happinessQuestions) usedQuestions = [];
        currentTopic = happinessQuestions;
        return;
    }

    if (lower.includes("공리주의") || lower.includes("공리")) {
        if (currentTopic !== utilQuestions) usedQuestions = [];
        currentTopic = utilQuestions;
        return;
    }

    if (
        lower.includes("도덕적 고려") ||
        lower.includes("동물") ||
        lower.includes("식물") ||
        lower.includes("무생물")
    ) {
        if (currentTopic !== moralQuestions) usedQuestions = [];
        currentTopic = moralQuestions;
        return;
    }
}

// =======================
// 랜덤 질문
// =======================

function getRandomQuestion(list) {

    const available = list.filter(q => !usedQuestions.includes(q));

    // 🔥 10개 끝났을 때
    if (usedQuestions.length >= 10) {

        const result = generateSummary();

        usedQuestions = [];
        currentTopic = null;
        conversationMemory = [];

        return result + "\n\n지금까지의 생각을 바탕으로 자신의 입장을 정리해볼 수 있을까요?";
    }

    if (available.length === 0) {

        currentTopic = null;
        usedQuestions = [];

        return "좋아요. 이제 지금까지의 생각을 바탕으로 자신의 입장을 한 문단으로 정리해볼 수 있을까요?";
    }

    const question =
        available[Math.floor(Math.random() * available.length)];

    usedQuestions.push(question);

    return question;
}

// =======================
// 🔥 요약 함수
// =======================

function generateSummary() {

    const allText = conversationMemory.join(" / ");

    let themes = [];
    let philosophers = [];

    if (allText.includes("행복")) {
        themes.push("행복을 주관적 경험으로 이해");
        philosophers.push("아리스토텔레스", "에피쿠로스");
    }

    if (allText.includes("공리") || allText.includes("다수") || allText.includes("소수")) {
        themes.push("결과 중심 윤리 비판적 사고");
        philosophers.push("벤담", "J.S. 밀", "피터 싱어");
    }

    if (allText.includes("동물") || allText.includes("자연") || allText.includes("무생물")) {
        themes.push("도덕적 고려 확장 사고");
        philosophers.push("피터 싱어", "톰 리건");
    }

    if (themes.length === 0) {
        themes.push("철학적 탐구적 사고");
        philosophers.push("소크라테스");
    }

    philosophers = [...new Set(philosophers)];

    let result = "🧠 당신의 사유 분석\n\n";

    result += "📌 핵심 경향\n";
    themes.forEach(t => result += "- " + t + "\n");

    result += "\n📚 비슷한 철학자\n";
    philosophers.forEach(p => result += "- " + p + "\n");

    result += "\n💬 해석\n";
    result += "당신의 답변은 개념 비교와 확장 중심의 사고를 보입니다.\n";

    return result;
}

// =======================
// 메시지 출력
// =======================

function addMsg(text, type) {

    const div = document.createElement("div");
    div.classList.add("msg", type);
    div.innerText = text;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}
