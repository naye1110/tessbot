const chatBox = document.getElementById("chatBox");
const input = document.getElementById("questionInput");
const btn = document.getElementById("sendBtn");

let state = "start";

btn.addEventListener("click", runChat);

function runChat() {

    const text = input.value.trim();

    if (!text) return;

    addMsg(text, "user");

    input.value = "";

    setTimeout(() => {

        // 시작
        if (state === "start") {

            if (text.includes("행복")) {

                addMsg(
                    "먼저 행복을 무엇에 더 가깝다고 생각하나요?\n\n① 감정\n② 삶 전체의 상태\n③ 아직 잘 모르겠다",
                    "bot"
                );

                state = "happiness_choice";
                return;
            }

            addMsg(
                "나는 근본적인 질문을 탐구하는 AI입니다.\n\n예: 행복이란 무엇인가?",
                "bot"
            );

            return;
        }

        // 행복 - 감정
        if (
            state === "happiness_choice" &&
            (text.includes("감정") || text === "1")
        ) {

            addMsg(
                "흥미롭네요.\n\n그렇다면 즐겁기만 하면 행복하다고 볼 수 있을까요?",
                "bot"
            );

            state = "emotion_branch";
            return;
        }

        // 행복 - 삶 전체
        if (
            state === "happiness_choice" &&
            (text.includes("삶") || text === "2")
        ) {

            addMsg(
                "그렇다면 불행한 순간이 포함된 삶도 행복한 삶일 수 있을까요?",
                "bot"
            );

            state = "life_branch";
            return;
        }

        // 행복 - 모르겠다
        if (
            state === "happiness_choice" &&
            (text.includes("모르") || text === "3")
        ) {

            addMsg(
                "괜찮습니다.\n\n행복한 사람을 떠올릴 때 가장 먼저 생각나는 특징은 무엇인가요?",
                "bot"
            );

            state = "unknown_branch";
            return;
        }

        // 감정 분기
        if (state === "emotion_branch") {

            addMsg(
                "만약 즐거움이 행복이라면, 힘들지만 가치 있는 일을 하는 사람은 행복하지 않은 걸까요?",
                "bot"
            );

            state = "final";
            return;
        }

        // 삶 분기
        if (state === "life_branch") {

            addMsg(
                "그 생각은 아리스토텔레스의 관점과 비슷합니다.\n\n행복은 순간의 기분보다 삶 전체의 완성이라고 볼 수 있을까요?",
                "bot"
            );

            state = "final";
            return;
        }

        // 모르겠다 분기
        if (state === "unknown_branch") {

            addMsg(
                "그 특징은 행복의 결과일까요, 아니면 행복의 조건일까요?",
                "bot"
            );

            state = "final";
            return;
        }

        // 마지막
        if (state === "final") {

            addMsg(
                "흥미로운 탐구였어요.\n\n당신은 처음보다 행복에 대해 조금 더 명확하게 생각하게 되었나요?",
                "bot"
            );

            state = "start";
            return;
        }

    }, 400);
}

function addMsg(text, type) {

    const div = document.createElement("div");

    div.classList.add("msg", type);

    div.innerText = text;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}
