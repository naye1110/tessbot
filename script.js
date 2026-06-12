let step = 0;
let memory = "";

const btn = document.getElementById("exploreBtn");

btn.addEventListener("click", runTessbot);

function runTessbot() {

    const input = document.getElementById("questionInput");
    const result = document.getElementById("resultArea");

    const text = input.value.trim();

    if (step === 0 && !text) {
        alert("질문을 입력해주세요.");
        return;
    }

    // =====================
    // STEP 1: 질문 시작
    // =====================
    if (step === 0) {

        memory = text;
        step = 1;

        result.innerHTML = `
            <div class="card">
                <h3>🧾 질문</h3>
                <p>${text}</p>
            </div>

            <div class="card">
                <h3>🧐 첫 질문</h3>
                <p>당신이 생각하는 핵심 개념은 무엇인가요?</p>
                <p>답을 입력하고 버튼을 다시 눌러주세요.</p>
            </div>
        `;

        input.value = "";
        input.placeholder = "당신의 생각을 입력하세요...";
        return;
    }

    // =====================
    // STEP 2: 개념 확인
    // =====================
    if (step === 1) {

        memory += "\n[생각1] " + text;
        step = 2;

        result.innerHTML = `
            <div class="card">
                <h3>🔍 당신의 생각</h3>
                <p>${text}</p>
            </div>

            <div class="card">
                <h3>⚖️ 반문</h3>
                <p>그 기준이 항상 옳다고 할 수 있을까요?</p>
                <p>반례나 예외 상황을 생각해보세요.</p>
            </div>
        `;

        input.value = "";
        input.placeholder = "반례를 입력하세요...";
        return;
    }

    // =====================
    // STEP 3: 반례 단계
    // =====================
    if (step === 2) {

        memory += "\n[생각2] " + text;
        step = 3;

        result.innerHTML = `
            <div class="card">
                <h3>🔄 반례 확인</h3>
                <p>${text}</p>
            </div>

            <div class="card">
                <h3>📚 철학자 개입</h3>
                <p>
                    소크라테스: "너는 정말 알고 있는가?"<br><br>
                    카뮈: "세상은 답을 주지 않는다. 질문만 있을 뿐이다."<br><br>
                    니체: "그 생각은 정말 너의 것인가?"
                </p>
            </div>

            <div class="card">
                <h3>✍️ 최종 질문</h3>
                <p>이제 처음 생각을 다시 보면, 바뀐 점이 있나요?</p>
                <p>새로운 결론을 적어보세요.</p>
            </div>
        `;

        input.value = "";
        input.placeholder = "최종 생각을 입력하세요...";
        return;
    }

    // =====================
    // STEP 4: 종료
    // =====================
    if (step === 3) {

        memory += "\n[최종] " + text;

        result.innerHTML = `
            <div class="card">
                <h3>🏁 사유 완료</h3>
                <p>${text}</p>
            </div>

            <div class="card">
                <h3>🧠 당신의 사유 기록</h3>
                <pre>${memory}</pre>
            </div>

            <div class="card">
                <h3>✨ 결론</h3>
                <p>정답은 없다. 대신 사고의 깊이가 남는다.</p>
            </div>
        `;

        input.value = "";
        input.disabled = true;

        btn.innerText = "탐구 종료";
        btn.disabled = true;

        step = 4;
    }
}
