const chatBox = document.getElementById("chatBox");
const input = document.getElementById("questionInput");
const btn = document.getElementById("sendBtn");

let currentTopic = null;
let usedQuestions = [];
let conversationMemory = [];

// =======================
// =======================

const happinessQuestions = [
"행복을 감정이라고 생각하나요, 아니면 삶 전체의 상태라고 생각하나요?",
"행복은 개인마다 다를까요?",
"행복한 삶과 의미 있는 삶은 같은 삶일까요?",
"행복은 목표일까요, 결과일까요?",
"행복과 쾌락은 같은 것일까요?",
"행복은 타인과의 관계 없이도 가능할까요?",
"행복은 노력으로 얻는 것일까요, 운에 달린 것일까요?",
"행복과 성공은 같은 것일까요?",
"행복은 인간의 최종 목적일까요?"
];

const utilQuestions = [
"다수의 행복을 위해 소수의 희생이 허용될 수 있을까요?",
"공리주의는 개인의 권리를 충분히 보호할 수 있을까요?",
"행복을 수치로 계산할 수 있을까요?",
"결과만 좋으면 과정은 중요하지 않을까요?",
"정의와 행복이 충돌한다면 무엇을 우선해야 할까요?",
"최대 다수의 최대 행복은 항상 옳을까요?"
];

const moralQuestions = [
"동물은 인간과 동등한 권리를 가져야 할까요?",
"식물도 도덕적 고려 대상일까요?",
"AI가 고통을 느낀다면 도덕적 존재일까요?",
"미래 세대도 도덕적 고려 대상일까요?",
"자연은 인간과 동등한 가치를 가질까요?",
"도덕 공동체는 어디까지 확장되어야 할까요?"
];

// =======================
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
"행복, 공리주의, 도덕 중 하나를 입력해보세요.",
"흥미로운 질문이네요. 주제를 선택해볼까요?",
"철학적 탐구를 계속해볼까요?"
];

addMsg(random(casualReplies), "bot");
return;
}

addMsg(getRandomQuestion(), "bot");

}, 400);
}

// =======================
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

const summary = generateSummary();

usedQuestions = [];
currentTopic = null;

return summary + "\n\n지금까지 생각을 정리해볼까요?";
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
// =======================

function random(arr) {
return arr[Math.floor(Math.random() * arr.length)];
}
