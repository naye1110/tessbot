const btn = document.getElementById("exploreBtn");

btn.addEventListener("click", runTessbot);

function runTessbot() {

    const q = document.getElementById("questionInput").value.trim();
    const result = document.getElementById("resultArea");

    if (!q) {
        alert("질문을 입력해주세요.");
        return;
    }

    const mode = detectMode(q);

    const clarification = makeClarification(q);
    const alternative = makeAlternative(q);
    const philosopher = makePhilosopher(mode);
    const reflection = makeReflection();

    result.innerHTML = `
        <div class="card">
            <h3>🧾 입력 질문</h3>
            <p>${q}</p>
        </div>

        <div class="card">
            <h3>🧐 생각해 볼 질문</h3>
            <p>${clarification.join("<br>")}</p>
        </div>

        <div class="card">
            <h3>🔍 다른 관점</h3>
            <p>${alternative}</p>
        </div>

        <div class="card">
            <h3>📚 철학자의 시선 (${mode})</h3>
            <p>${philosopher}</p>
        </div>

        <div class="card">
            <h3>✍️ 성찰</h3>
            <p>${reflection}</p>
        </div>
    `;
}

// =========================
// 1. 질문 개념 감지
// =========================

function detectMode(q) {

    if (q.includes("행복")) return "소크라테스";
    if (q.includes("정의")) return "롤스";
    if (q.includes("자유")) return "니체";
    if (q.includes("삶") || q.includes("부조리")) return "카뮈";
    if (q.includes("덕") || q.includes("인")) return "공자";

    return "소크라테스";
}

// =========================
// 2. 개념 분해 질문
// =========================

function makeClarification(q) {

    if (q.includes("행복")) {
        return [
            "행복은 감정인가, 상태인가?",
            "행복은 지속 가능한가?",
            "행복은 누구의 기준인가?"
        ];
    }

    if (q.includes("정의")) {
        return [
            "정의는 평등인가, 공정인가?",
            "결과의 평등 vs 기회의 평등",
            "누구를 기준으로 정의를 판단하는가?"
        ];
    }

    if (q.includes("자유")) {
        return [
            "자유는 어디까지 허용되는가?",
            "타인의 자유와 충돌하면?",
            "자유는 책임을 포함하는가?"
        ];
    }

    return [
        "이 개념의 핵심은 무엇인가?",
        "당신은 왜 이 질문을 했는가?",
        "다른 사람은 어떻게 볼까?"
    ];
}

// =========================
// 3. 반례 / 다른 관점
// =========================

function makeAlternative(q) {

    if (q.includes("행복")) {
        return "어떤 사람은 행복을 ‘즐거움’이라 하고, 다른 사람은 ‘의미 있는 삶’이라고 본다.";
    }

    if (q.includes("정의")) {
        return "완전한 평등은 자유를 제한할 수 있고, 완전한 자유는 불평등을 만들 수 있다.";
    }

    if (q.includes("자유")) {
        return "자유가 커질수록 책임도 커지지만, 모두가 같은 방식으로 책임을 감당하진 않는다.";
    }

    return "이 문제는 하나의 정답보다 서로 다른 관점의 충돌일 가능성이 크다.";
}

// =========================
// 4. 철학자 모드
// =========================

function makePhilosopher(mode) {

    switch (mode) {

        case "소크라테스":
            return "너 자신이 무엇을 알고 있는지 먼저 점검하라.";

        case "롤스":
            return "당신이 사회 위치를 모른 채 제도를 만든다면 어떤 선택을 할 것인가?";

        case "니체":
            return "당신의 가치관은 진짜 당신의 것인가, 사회가 준 것인가?";

        case "카뮈":
            return "세상은 의미를 주지 않는다. 그러나 인간은 계속 질문한다.";

        case "공자":
            return "사람됨(仁)은 생각에서 시작되고 행동으로 완성된다.";

        default:
            return "철학적 시선은 하나로 고정되지 않는다.";
    }
}

// =========================
// 5. 성찰
// =========================

function makeReflection() {
    return "처음 생각과 지금 생각은 어떻게 달라졌는가? 왜 그렇게 변했는가?";
}
