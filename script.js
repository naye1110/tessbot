const chatBox = document.getElementById("chatBox");
const input = document.getElementById("questionInput");
const btn = document.getElementById("sendBtn");

let currentTopic = null;
let usedQuestions = [];

// =======================
// 행복
// =======================

const happinessQuestions = [

"행복을 감정이라고 생각하나요, 아니면 삶 전체의 상태라고 생각하나요?",

"행복은 개인마다 다를까요?",

"행복한 삶과 의미 있는 삶은 같은 삶일까요?",

"행복은 목표일까요, 결과일까요?",

"행복과 쾌락은 같은 것일까요?",

"힘든 경험도 행복한 삶에 필요할까요?",

"행복은 타인과의 관계 없이도 가능할까요?",

"행복은 노력으로 얻는 것일까요, 운에 달린 것일까요?",

"행복을 측정할 수 있을까요?",

"모든 욕구가 충족되면 행복해질까요?",

"행복은 순간의 경험일까요, 삶 전체의 평가일까요?",

"행복보다 의미가 더 중요할 수도 있을까요?",

"당신이 생각하는 행복한 사람은 어떤 사람인가요?",

"행복은 발견하는 것일까요, 만들어가는 것일까요?",

"행복은 사회가 제공하는 것일까요, 개인이 만드는 것일까요?"
];

// =======================
// 공리주의
// =======================

const utilQuestions = [

"다수의 행복을 위해 소수의 희생이 허용될 수 있을까요?",

"공리주의는 개인의 권리를 충분히 보호할 수 있을까요?",

"행복을 수치로 계산할 수 있다고 생각하나요?",

"결과만 좋으면 과정은 중요하지 않을까요?",

"한 사람의 큰 고통과 여러 사람의 작은 행복은 어떻게 비교할 수 있을까요?",

"당신이 소수의 입장이라면 같은 판단을 내릴 수 있을까요?",

"공리주의는 정의로운 사회를 만들 수 있을까요?",

"행복보다 인간의 존엄이 더 중요할 수도 있을까요?",

"모든 사람의 행복을 공평하게 계산하는 것이 가능할까요?",

"공리주의는 현실 정치에 적합한 이론일까요?",

"다수결과 공리주의는 같은 생각일까요?",

"공리주의는 소수자를 보호할 수 있을까요?",

"행복의 총량과 개인의 자유 중 무엇이 더 중요할까요?",

"공리주의는 인간관계를 설명할 수 있을까요?",

"결국 당신은 공리주의에 찬성하나요, 반대하나요?"
];

// =======================
// 도덕적 고려의 범위
// =======================

const moralQuestions = [

"도덕적 고려의 기준은 생명일까요, 고통일까요?",

"동물은 인간과 동등한 권리를 가져야 할까요?",

"식물을 보호해야 하는 이유는 무엇일까요?",

"생태계 전체를 하나의 도덕 공동체로 볼 수 있을까요?",

"미래 세대도 도덕적 고려 대상일까요?",

"AI가 고통을 느낀다면 도덕적 고려 대상이 될 수 있을까요?",

"무생물인 강이나 산도 권리를 가질 수 있을까요?",

"인간 중심주의는 정당한 입장일까요?",

"환경 보호는 인간을 위한 것일까요, 자연 자체를 위한 것일까요?",

"도덕 공동체의 범위는 어디까지 확장될 수 있을까요?",

"고통을 느끼지 못하는 존재도 보호받아야 할까요?",

"동물 실험은 정당화될 수 있을까요?",

"멸종 위기 종을 보호해야 하는 이유는 무엇일까요?",

"자연은 인간과 동등한 도덕적 가치를 가질까요?",

"결국 당신은 어디까지를 도덕 공동체에 포함시키고 싶나요?"
];

// =======================
// 버튼 이벤트
// =======================

btn.addEventListener("click", runChat);

// 엔터 입력도 가능

input.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {
        runChat();
    }
});

// =======================
// 메인
// =======================

function runChat() {

    const text = input.value.trim();

    if (!text) return;

    addMsg(text, "user");

    input.value = "";

    setTimeout(() => {

        detectTopic(text);

        if (!currentTopic) {

            addMsg(
                "안녕하세요. 저는 TESSBOT입니다.\n\n탐구할 주제를 입력해주세요.\n\n예시:\n• 행복\n• 공리주의\n• 도덕적 고려의 범위",
                "bot"
            );

            return;
        }

        addMsg(
            getRandomQuestion(currentTopic),
            "bot"
        );

    }, 400);
}

// =======================
// 주제 인식
// =======================

function detectTopic(text) {

    const lower = text.toLowerCase();

    if (lower.includes("행복")) {

        if (currentTopic !== happinessQuestions) {
            usedQuestions = [];
        }

        currentTopic = happinessQuestions;
        return;
    }

    if (
        lower.includes("공리주의") ||
        lower.includes("공리")
    ) {

        if (currentTopic !== utilQuestions) {
            usedQuestions = [];
        }

        currentTopic = utilQuestions;
        return;
    }

    if (
        lower.includes("도덕적 고려") ||
        lower.includes("도덕적고려") ||
        lower.includes("동물") ||
        lower.includes("식물") ||
        lower.includes("무생물")
    ) {

        if (currentTopic !== moralQuestions) {
            usedQuestions = [];
        }

        currentTopic = moralQuestions;
        return;
    }
}

// =======================
// 랜덤 질문
// =======================

function getRandomQuestion(list) {

    const available = list.filter(
        q => !usedQuestions.includes(q)
    );

    if (available.length === 0) {

        usedQuestions = [];

        return "좋아요. 이제 지금까지의 생각을 바탕으로 자신의 입장을 한 문단으로 정리해볼 수 있을까요?";
    }

    const question =
        available[
            Math.floor(Math.random() * available.length)
        ];

    usedQuestions.push(question);

    return question;
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
