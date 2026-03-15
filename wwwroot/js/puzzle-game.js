document.addEventListener("DOMContentLoaded", function () {
    const config = window.puzzleConfig;
    const board = document.getElementById("puzzleBoard");
    const tray = document.getElementById("piecesTray");
    const timerEl = document.getElementById("timer");
    const resetBtn = document.getElementById("resetBtn");
    const hintBtn = document.getElementById("hintBtn");
    const pointsDisplay = document.getElementById("pointsDisplay");

    if (!config || !config.image || !config.difficulty || !config.title || !config.id) {
        alert("Puzzle config missing!");
        return;
    }

    let rows = 3;
    let cols = 4;

    if (config.difficulty === "medium") {
        rows = 4;
        cols = 6;
    } else if (config.difficulty === "hard") {
        rows = 6;
        cols = 8;
    }

    const totalPieces = rows * cols;
    let seconds = 0;
    let timerInterval = null;

    const boardWidth = 640;
    const boardHeight = 480;

    function getPointsForDifficulty() {
        if (config.difficulty === "easy") return 10;
        if (config.difficulty === "medium") return 20;
        if (config.difficulty === "hard") return 30;
        return 0;
    }

    function updatePointsDisplay() {
        const currentPoints = parseInt(localStorage.getItem("player_points")) || 0;
        if (pointsDisplay) {
            pointsDisplay.textContent = currentPoints;
        }
    }

    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            seconds++;
            const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
            const secs = String(seconds % 60).padStart(2, "0");
            timerEl.textContent = `${mins}:${secs}`;
        }, 1000);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createBoard() {
        board.innerHTML = "";
        board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        for (let i = 0; i < totalPieces; i++) {
            const slot = document.createElement("div");
            slot.className = "puzzle-slot";
            slot.dataset.index = i;

            slot.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            slot.addEventListener("drop", function (e) {
                e.preventDefault();

                const pieceId = e.dataTransfer.getData("text/plain");
                const draggedPiece = document.getElementById(pieceId);

                if (!draggedPiece) return;
                if (slot.children.length > 0) return;

                slot.appendChild(draggedPiece);
                checkCompletion();
            });

            board.appendChild(slot);
        }
    }

    function createPieces() {
        tray.innerHTML = "";

        const pieceWidth = Math.floor(boardWidth / cols);
        const pieceHeight = Math.floor(boardHeight / rows);
        let pieces = [];

        for (let i = 0; i < totalPieces; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;

            const piece = document.createElement("div");
            piece.className = "puzzle-piece";
            piece.id = `piece-${i}`;
            piece.draggable = true;
            piece.dataset.correctIndex = i;

            piece.style.width = `${pieceWidth}px`;
            piece.style.height = `${pieceHeight}px`;
            piece.style.backgroundImage = `url('${config.image}')`;
            piece.style.backgroundRepeat = "no-repeat";
            piece.style.backgroundSize = `${boardWidth}px ${boardHeight}px`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;

            piece.addEventListener("dragstart", function (e) {
                e.dataTransfer.setData("text/plain", piece.id);
            });

            pieces.push(piece);
        }

        shuffle(pieces).forEach(piece => tray.appendChild(piece));
    }

    function checkCompletion() {
        const slots = [...document.querySelectorAll(".puzzle-slot")];

        const complete = slots.every((slot, index) => {
            if (slot.children.length === 0) return false;
            return slot.children[0].dataset.correctIndex == index;
        });

        if (!complete) return;

        clearInterval(timerInterval);

        const puzzleKey = `puzzle_completed_${config.id}`;
        const pointsKey = "player_points";
        const alreadyCompleted = localStorage.getItem(puzzleKey);

        if (!alreadyCompleted) {
            const awardedPoints = getPointsForDifficulty();
            let currentPoints = parseInt(localStorage.getItem(pointsKey)) || 0;
            currentPoints += awardedPoints;

            localStorage.setItem(pointsKey, currentPoints);
            localStorage.setItem(puzzleKey, "true");

            updatePointsDisplay();

            setTimeout(() => {
                alert(`Well done! You completed "${config.title}" in ${timerEl.textContent} and earned ${awardedPoints} points.\nTotal points: ${currentPoints}`);
            }, 200);
        } else {
            const currentPoints = parseInt(localStorage.getItem(pointsKey)) || 0;

            setTimeout(() => {
                alert(`Well done! You completed "${config.title}" in ${timerEl.textContent}.\nYou already earned points for this puzzle before.\nTotal points: ${currentPoints}`);
            }, 200);
        }
    }

    function resetGame() {
        seconds = 0;
        timerEl.textContent = "00:00";
        createBoard();
        createPieces();
        updatePointsDisplay();
        startTimer();
    }

    hintBtn.addEventListener("click", function () {
        alert("Tip: Start with the corners and edges first.");
    });

    resetBtn.addEventListener("click", function () {
        resetGame();
    });

    const testImage = new Image();
    testImage.onload = function () {
        resetGame();
    };
    testImage.onerror = function () {
        alert("Failed to load puzzle image!");
        console.log("Image path causing issue:", config.image);
    };
    testImage.src = config.image;
});