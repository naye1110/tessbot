const chatBox = document.getElementById("chatBox");
const input = document.getElementById("questionInput");
const btn = document.getElementById("sendBtn");

let step = 0;
let memory = "";

// 🔥 버튼 이벤트
btn.addEventListener("click", runChat);

function runChat() {

    const text = input.value.trim();
    if (!text) return;

    addMsg(text, "user");
    input.value = "";

    setTimeout(() => {

        // STEP 0 + 필터
        if (step === 0) {

            memory = text;

            if (!isPhilosophical(text)) {
                addMsg("이건 철학적 질문으로 보기 어렵습니다.", "bot");
                addMsg("예: '행복이란 무엇인가?'처럼 질문해보세요.", "bot");
                return;
            }

            addMsg("당신이 말한 핵심 개념은 무엇인가요?", "bot");
            step = 1;
            return;
        }

        // STEP 1
        if (step === 1) {

            memory += " / " + text;

            addMsg("그 개념은 항상 옳다고 할 수 있을까요?", "bot");
            addMsg("반례를 생각해보세요.", "bot");

            step = 2;
            return;
        }

        // STEP 2
        if (step === 2) {

            memory += " / " + text;

            addMsg("소크라테스: 너는 정말 알고 있는가?", "bot");
            addMsg("카뮈: 세계는 답을 주지 않는다.", "bot");
            addMsg("니체: 그 생각은 진짜 너의 것인가?", "bot");

            addMsg("이제 처음 생각으로 돌아가 답이 바뀌었나요?", "bot");

            step = 3;
            return;
        }

        // STEP 3
        if (step === 3) {

            memory += " / " + text;

            addMsg("사유 완료. 정답은 없다.", "bot");

            step = 4;
            btn.disabled = true;
            input.disabled = true;
        }

    }, 500);
}


// 🔥 철학 필터
function isPhilosophical(text) {

    const keywords = [
        "행복", "정의", "자유", "삶", "죽음",
        "존재", "의미", "윤리", "선", "악", "진리"
    ];

    const questionWords = ["?", "무엇", "왜", "어떻게"];

    return keywords.some(k => text.includes(k)) &&
           questionWords.some(q => text.includes(q));
}


// 메시지 출력
function addMsg(text, type) {

    const div = document.createElement("div");
    div.classList.add("msg", type);
    div.innerText = text;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}
