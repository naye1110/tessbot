const chatBox = document.getElementById("chatBox");
const input = document.getElementById("questionInput");
const btn = document.getElementById("sendBtn");

let step = 0;
let memory = "";

// 버튼
btn.addEventListener("click", runChat);

function runChat() {

    const text = input.value.trim();
    if (!text) return;

    addMsg(text, "user");
    input.value = "";

    setTimeout(() => {

        if (step === 0) {

            memory = text;

            const type = classifyText(text);

            if (type === "casual") {
                addMsg("안녕하세요 😊 저는 TESSBOT입니다.", "bot");
                addMsg("철학 질문도 좋아요: '행복이란 무엇인가?'", "bot");
                return;
            }

            if (type === "philosophy") {
                addMsg("당신의 생각을 더 깊게 분석해보겠습니다.", "bot");
                step = 1;
                return;
            }

            addMsg("조금 더 명확한 질문으로 다시 말해보세요.", "bot");
            return;
        }

        if (step === 1) {

            memory += " / " + text;

            addMsg("그 개념은 항상 같은 의미일까요?", "bot");
            addMsg("반례를 떠올려보세요.", "bot");

            step = 2;
            return;
        }

        if (step === 2) {

            memory += " / " + text;

            const result = findPhilosophy(memory);

            let response = "";

            if (result) {
                response += result.text + "\n\n";
                response += "→ 이 질문은 인간 경험 전체로 확장될 수 있습니다.\n\n";
                response += "관련 철학자: " + result.thinkers.join(", ");
            } else {
                response += "이 질문은 특정 철학으로 고정하기 어렵습니다.\n\n";
                response += "하지만 인간이 세계를 이해하는 방식에 대한 질문입니다.";
            }

            typeMessage(response, "bot");

            setTimeout(() => {
                typeMessage("이제 생각이 조금 달라졌나요?", "bot");
            }, 800);

            step = 3;
            return;
        }

        if (step === 3) {
            addMsg("사유 완료. 정답은 없습니다.", "bot");
            step = 4;
        }

    }, 400);
}


// 🔥 철학 분류
function classifyText(text) {

    const casual = ["안녕", "ㅎㅇ", "하이"];
    const philosophy = ["행복", "자유", "삶", "죽음", "의미", "정의", "윤리", "존재"];

    if (casual.some(w => text.includes(w))) return "casual";
    if (philosophy.some(w => text.includes(w))) return "philosophy";

    return "unknown";
}


// 🔥 철학 DB
const PHILOSOPHY_DB = [
    {
        tags: ["행복", "삶"],
        thinkers: ["아리스토텔레스"],
        text: "행복은 단순한 감정이 아니라 삶 전체의 완성입니다."
    },
    {
        tags: ["자유", "선택"],
        thinkers: ["사르트르"],
        text: "인간은 자유롭지만 그 자유에는 책임이 따릅니다."
    },
    {
        tags: ["의미", "허무"],
        thinkers: ["카뮈"],
        text: "세계는 무의미하지만 인간은 의미를 만들어갑니다."
    },
    {
        tags: ["정의"],
        thinkers: ["플라톤"],
        text: "정의는 각자가 자신의 역할을 하는 상태입니다."
    },
    {
        tags: ["윤리"],
        thinkers: ["칸트"],
        text: "윤리는 결과가 아니라 의무에 의해 판단됩니다."
    }
];


// 🔥 매칭
function findPhilosophy(text) {

    let best = null;
    let scoreMax = 0;

    for (let item of PHILOSOPHY_DB) {

        let score = 0;

        for (let t of item.tags) {
            if (text.includes(t)) score++;
        }

        if (score > scoreMax) {
            scoreMax = score;
            best = item;
        }
    }

    return best;
}


// 🔥 메시지 출력
function addMsg(text, type) {

    const div = document.createElement("div");
    div.classList.add("msg", type);
    div.innerText = text;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}


// 🔥 GPT 느낌 타이핑
function typeMessage(text, type = "bot") {

    const div = document.createElement("div");
    div.classList.add("msg", type);
    chatBox.appendChild(div);

    let i = 0;

    function typing() {
        if (i < text.length) {
            div.innerText += text[i];
            i++;
            setTimeout(typing, 15);
        }
    }

    typing();

    chatBox.scrollTop = chatBox.scrollHeight;
}
