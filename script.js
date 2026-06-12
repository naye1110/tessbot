// 버튼 가져오기
const btn = document.getElementById("exploreBtn");

btn.addEventListener("click", function () {

    const question = document.getElementById("questionInput").value.trim();
    const resultArea = document.getElementById("resultArea");

    if (question === "") {
        alert("질문을 입력해주세요.");
        return;
    }

    // 🔍 소크라테스식 질문 생성
    const socrates = `
    🧐 생각해 볼 질문

    • 이 질문에서 핵심 개념은 무엇인가요?
    • 당신은 왜 이 질문이 중요하다고 생각하나요?
    • 반대 입장은 어떻게 말할 수 있을까요?
    `;

    // 🔍 다른 관점
    const alternative = `
    🔍 다른 관점

    이 문제는 하나의 정답이 있는 것이 아니라,
    서로 다른 가치와 기준이 충돌하는 문제일 수 있습니다.
    `;

    // 📚 철학적 시선 (간단 버전)
    const philosopher = `
    📚 철학자의 시선

    소크라테스: "너 자신이 무엇을 모르는지 아는 것이 시작이다."
    카뮈: "세상은 의미를 주지 않는다. 그러나 우리는 질문한다."
    니체: "당신의 생각은 진짜 당신의 것인가?"
    `;

    // ✍️ 성찰
    const reflection = `
    ✍️ 성찰

    이 질문을 통해 당신의 생각은 어떻게 변했나요?
    처음 생각과 지금 생각은 같나요, 다른가요?
    `;

    // 화면 출력
    resultArea.innerHTML = `
        <div class="card">
            <h3>입력 질문</h3>
            <p>${question}</p>
        </div>

        <div class="card">
            <h3>${socrates}</h3>
        </div>

        <div class="card">
            <h3>${alternative}</h3>
        </div>

        <div class="card">
            <h3>${philosopher}</h3>
        </div>

        <div class="card">
            <h3>${reflection}</h3>
        </div>
    `;
});
