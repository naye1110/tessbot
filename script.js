const btn = document.getElementById("exploreBtn");

btn.addEventListener("click", runTessbot);

function runTessbot() {

    const q = document.getElementById("questionInput").value.trim();
    const result = document.getElementById("resultArea");

    if (!q) {
        alert("질문을 입력해주세요.");
        return;
    }

    const analysis = analyzeQuestion(q);

    result.innerHTML = `
        <div class="card">
            <h3>🧾 질문</h3>
            <p>${q}</p>
        </div>

        <div class="card">
            <h3>🧠 개념 분석</h3>
            <p>${analysis.concept}</p>
        </div>

        <div class="card">
            <h3>🔍 전제 질문</h3>
            <p>${analysis.assumption}</p>
        </div>

        <div class="card">
            <h3>⚖️ 반례</h3>
            <p>${analysis.counter}</p>
        </div>

        <div class="card">
            <h3>📚 철학적 시선</h3>
            <p>${analysis.philosophy}</p>
        </div>

        <div class="card">
            <h3>✍️ 성찰</h3>
            <p>${analysis.reflection}</p>
        </div>
    `;
}


// =========================
// 사고 엔진
// =========================

function analyzeQuestion(q) {

    return {
        concept: getConcept(q),
        assumption: getAssumption(q),
        counter: getCounter(q),
        philosophy: getPhilosophy(q),
        reflection: getReflection()
    };
}


// =========================
// 개념 분석
// =========================

function getConcept(q) {

    if (q.includes("행복")) {
        return "행복은 감정 상태인가, 삶 전체의 평가인가?";
    }

    if (q.includes("정의")) {
        return "정의는 평등, 공정, 절차 중 무엇으로 정의되는가?";
    }

    if (q.includes("자유")) {
        return "자유는 선택 가능성인가, 제약의 부재인가?";
    }

    return "이 질문의 핵심 개념을 먼저 정의할 필요가 있다.";
}


// =========================
// 전제 질문
// =========================

function getAssumption(q) {

    return "이 질문은 이미 어떤 '좋음/나쁨'의 기준이 존재한다고 가정한다. 그 기준은 무엇인가?";
}


// =========================
// 반례
// =========================

function getCounter(q) {

    if (q.includes("행복")) {
        return "행복만을 기준으로 하면 책임, 고통, 의무가 무시될 수 있다.";
    }

    if (q.includes("정의")) {
        return "완전한 평등은 개인의 노력 차이를 무시할 수 있다.";
    }

    if (q.includes("자유")) {
        return "자유의 극대화는 타인의 자유를 침해할 수 있다.";
    }

    return "이 주장과 반대되는 상황을 고려할 필요가 있다.";
}


// =========================
// 철학자 시선
// =========================

function getPhilosophy(q) {

    if (q.includes("행복")) {
        return "소크라테스: 성찰되지 않은 삶은 살 가치가 있는가?";
    }

    if (q.includes("정의")) {
        return "롤스: 무지의 베일 뒤에서 선택될 원칙이 정의다.";
    }

    if (q.includes("자유")) {
        return "니체: 자유는 주어진 것이 아니라 창조되는 것이다.";
    }

    return "카뮈: 우리는 의미 없는 세계 속에서도 계속 질문한다.";
}


// =========================
// 성찰
// =========================

function getReflection() {
    return "처음의 생각과 지금의 생각은 어떻게 달라졌는가?";
}
