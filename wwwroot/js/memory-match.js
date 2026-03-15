document.addEventListener("DOMContentLoaded", function () {
    const config = window.memoryMatchConfig;
    const grid = document.getElementById("memoryGrid");
    const movesCount = document.getElementById("movesCount");
    const matchesCount = document.getElementById("matchesCount");
    const memoryTimer = document.getElementById("memoryTimer");
    const memoryPoints = document.getElementById("memoryPoints");
    const newGameBtn = document.getElementById("newGameBtn");

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let seconds = 0;
    let timerStarted = false;
    let timerInterval = null;
    let boardLocked = false;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function updateTimer() {
        const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        memoryTimer.textContent = `${mins}:${secs}`;
    }

    function startTimer() {
        if (timerStarted) return;
        timerStarted = true;

        timerInterval = setInterval(() => {
            seconds++;
            updateTimer();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function updateStats() {
        movesCount.textContent = moves;
        matchesCount.textContent = matchedPairs;

        const currentPoints = parseInt(localStorage.getItem("player_points")) || 0;
        memoryPoints.textContent = currentPoints;
    }

    function createDeck() {
        const selectedImages = config.images.slice(0, config.totalPairs);
        const duplicated = [...selectedImages, ...selectedImages];

        return shuffle(
            duplicated.map((image, index) => ({
                uniqueId: index,
                image,
                pairId: image
            }))
        );
    }

    function createCard(cardData) {
        const card = document.createElement("div");
        card.className = "memory-card";
        card.dataset.pairId = cardData.pairId;

        card.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-front">
                    <span class="memory-front-icon">⚽</span>
                </div>
                <div class="memory-card-back">
                    <img src="${cardData.image}" alt="Memory card">
                </div>
            </div>
        `;

        card.addEventListener("click", function () {
            handleCardClick(card);
        });

        return card;
    }

    function handleCardClick(card) {
        if (boardLocked) return;
        if (card.classList.contains("flipped")) return;
        if (card.classList.contains("matched")) return;
        if (flippedCards.length >= 2) return;

        startTimer();

        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            updateStats();

            const [firstCard, secondCard] = flippedCards;

            if (firstCard.dataset.pairId === secondCard.dataset.pairId) {
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");

                flippedCards = [];
                matchedPairs++;
                updateStats();

                if (matchedPairs === config.totalPairs) {
                    handleGameComplete();
                }
            } else {
                boardLocked = true;

                setTimeout(() => {
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");
                    flippedCards = [];
                    boardLocked = false;
                }, 900);
            }
        }
    }

    function handleGameComplete() {
        stopTimer();

        const completionKey = `game_completed_${config.gameId}`;
        const pointsKey = "player_points";
        const alreadyCompleted = localStorage.getItem(completionKey);

        let bonusPoints = 0;

        if (!alreadyCompleted) {
            bonusPoints = 25;

            let currentPoints = parseInt(localStorage.getItem(pointsKey)) || 0;
            currentPoints += bonusPoints;

            localStorage.setItem(pointsKey, currentPoints);
            localStorage.setItem(completionKey, "true");

            updateStats();

            setTimeout(() => {
                alert(`Well done! You completed Memory Match in ${memoryTimer.textContent} with ${moves} moves and earned ${bonusPoints} points!`);
            }, 250);
        } else {
            setTimeout(() => {
                alert(`Well done! You completed Memory Match in ${memoryTimer.textContent} with ${moves} moves. You already earned points for this game before.`);
            }, 250);
        }
    }

    function buildBoard() {
        grid.innerHTML = "";
        const deck = createDeck();

        deck.forEach(cardData => {
            const card = createCard(cardData);
            grid.appendChild(card);
        });
    }

    function resetGame() {
        stopTimer();
        seconds = 0;
        timerStarted = false;
        moves = 0;
        matchedPairs = 0;
        flippedCards = [];
        boardLocked = false;
        updateTimer();
        updateStats();
        buildBoard();
    }

    newGameBtn.addEventListener("click", function () {
        resetGame();
    });

    updateTimer();
    updateStats();
    buildBoard();
});