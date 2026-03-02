document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("gq-start");
    const nextBtn = document.getElementById("gq-next");
    const card = document.getElementById("gq-card");
    const scoreEl = document.getElementById("gq-score");

    let score = 0;
    let idx = -1;

    const questions = [
        { q: "What does LTFC stand for?", a: ["Luton Town Football Club", "London Town FC", "Luton Tigers FC"], correct: 0 },
        { q: "How many points do you get per QR claim?", a: ["5", "10", "20"], correct: 1 },
    ];

    function render() {
        const item = questions[idx];
        card.innerHTML = `
      <div class="fw-bold mb-2">${item.q}</div>
      <div class="d-grid gap-2">
        ${item.a.map((t, i) => `<button class="btn btn-outline-light text-start" data-i="${i}">${t}</button>`).join("")}
      </div>
      <div id="gq-msg" class="mt-3 text-muted"></div>
    `;

        card.querySelectorAll("button[data-i]").forEach(b => {
            b.addEventListener("click", () => {
                const choice = Number(b.getAttribute("data-i"));
                const msg = document.getElementById("gq-msg");
                if (choice === item.correct) {
                    score += 1;
                    scoreEl.textContent = score;
                    msg.textContent = "Correct ✅";
                } else {
                    msg.textContent = "Wrong ❌";
                }
                nextBtn.disabled = false;
            });
        });
    }

    startBtn?.addEventListener("click", () => {
        score = 0; idx = 0;
        scoreEl.textContent = score;
        nextBtn.disabled = true;
        render();
    });

    nextBtn?.addEventListener("click", () => {
        idx++;
        if (idx >= questions.length) {
            card.innerHTML = `<div class="fw-bold">Finished!</div><div class="text-muted">Final score: ${score}</div>`;
            nextBtn.disabled = true;
            return;
        }
        nextBtn.disabled = true;
        render();
    });
});