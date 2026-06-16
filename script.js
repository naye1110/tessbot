const chatBox = document.getElementById("chatBox");
const input = document.getElementById("questionInput");
const btn = document.getElementById("sendBtn");

let currentTopic = null;
let usedQuestions = [];
let conversationMemory = [];

// =======================
// 🔥 바로 뜨는 자기소개
// =======================

window.onload = function () {

const introMessages = [
"안녕하세요 😊 저는 당신의 생각을 확장해주는 철학 질문 챗봇입니다.",
"반가워요. 저는 질문을 통해 당신의 사고를 깊게 만드는 챗봇입니다.",
"철학은 정답보다 질문입니다. 함께 시작해볼까요?"
];

addMsg(random(introMessages), "bot");
};

// =======================
// 질문 리스트 (전체 포함)
// =======================

// 행복
const happinessQuestions = [
"행복은 감정일까요, 삶의 상태일까요?",
"행복은 개인마다 다를까요?",
"행복과 의미는 같은 것일까요?",
"행복은 목표일까요 결과일까요?",
"행복은 타인 없이도 가능할까요?",
"행복은 선택일까요 운일까요?",
"행복과 성공은 같은 것일까요?"
];

// 공리주의
const utilQuestions = [
"다수의 행복을 위해 소수의 희생은 정당할까요?",
"공리주의는 정의로운 이론일까요?",
"행복은 수치로 계산 가능할까요?",
"결과가 좋으면 과정은 중요하지 않을까요?",
"개인의 권리는 충분히 보호될 수 있을까요?"
];

// 도덕적 고려
const moralQuestions = [
"동물은 도덕적 권리를 가질까요?",
"식물도 도덕적 고려 대상일까요?",
"자연은 인간과 동등한 가치를 가질까요?",
"미래 세대도 도덕적 고려 대상일까요?",
"AI도 도덕적 존재가 될 수 있을까요?"
];

// =======================
// 이벤트
// =======================

btn.addEventListener("click", runChat);

input.addEventListener("keydown", (e) => {
if (e.key === "Enter") runChat();
});

// =======================
// 메인
// =======================

function runChat() {

const text = input.value.trim();
if (!text) return;

addMsg(text, "user");
conversationMemory.push(text);

input.value = "";

setTimeout(() => {

detectTopic(text);

if (!currentTopic) {
const casualReplies = [
"행복 / 공리 / 도덕 중 하나를 입력해주세요.",
"주제를 선택하면 질문을 시작할게요 😊",
"어떤 철학 주제를 탐구해볼까요?"
];

addMsg(random(casualReplies), "bot");
return;
}

addMsg(getRandomQuestion(), "bot");

}, 400);
}

// =======================
// 주제 감지
// =======================

function detectTopic(text) {
const lower = text.toLowerCase();

if (lower.includes("행복")) {
if (currentTopic !== happinessQuestions) usedQuestions = [];
currentTopic = happinessQuestions;
return;
}

if (lower.includes("공리")) {
if (currentTopic !== utilQuestions) usedQuestions = [];
currentTopic = utilQuestions;
return;
}

if (
lower.includes("도덕") ||
lower.includes("동물") ||
lower.includes("자연")
) {
if (currentTopic !== moralQuestions) usedQuestions = [];
currentTopic = moralQuestions;
return;
}
}

// =======================
// 질문 생성 + 요약
// =======================

function getRandomQuestion() {

const available = currentTopic.filter(q => !usedQuestions.includes(q));

if (usedQuestions.length >= 10) {

const result = generateSummary();

usedQuestions = [];
currentTopic = null;

return result + "\n\n이제 자신의 입장을 정리해볼까요?";
}

if (available.length === 0) {
usedQuestions = [];
return "좋아요. 이제 자신의 생각을 정리해볼까요?";
}

const q = random(available);
usedQuestions.push(q);

return q;
}

// =======================
// 요약 생성
// =======================

function generateSummary() {

const allText = conversationMemory.join(" ");

let themes = [];
let philosophers = [];

if (allText.includes("행복")) {
themes.push("행복 중심 사고");
philosophers.push("아리스토텔레스", "에피쿠로스");
}

if (allText.includes("공리")) {
themes.push("결과 중심 윤리");
philosophers.push("벤담", "밀");
}

if (allText.includes("동물") || allText.includes("자연")) {
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

result += "\n📚 관련 철학자\n";
philosophers.forEach(p => result += "- " + p + "\n");

return result;
}

// =======================
// UI 출력
// =======================

function addMsg(text, type) {
const div = document.createElement("div");
div.classList.add("msg", type);
div.innerText = text;

chatBox.appendChild(div);
chatBox.scrollTop = chatBox.scrollHeight;
}

// =======================
// 유틸
// =======================

function random(arr) {
return arr[Math.floor(Math.random() * arr.length)];
}
