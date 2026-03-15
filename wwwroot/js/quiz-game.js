document.addEventListener("DOMContentLoaded", function () {
    const config = window.quizConfig || {};

    const questionText = document.getElementById("questionText");
    const quizOptions = document.getElementById("quizOptions");
    const quizFeedback = document.getElementById("quizFeedback");
    const nextQuestionBtn = document.getElementById("nextQuestionBtn");

    const quizTitle = document.getElementById("quizTitle");
    const quizScore = document.getElementById("quizScore");
    const quizProgress = document.getElementById("quizProgress");
    const quizPoints = document.getElementById("quizPoints");

    if (!questionText || !quizOptions || !quizFeedback || !nextQuestionBtn || !quizTitle || !quizScore || !quizProgress || !quizPoints) {
        console.error("Quiz page elements missing.");
        return;
    }

    const quizData = {
        "football-basics": {
            title: "Football Basics",
            difficulty: "easy",
            questions: [
                { q: "How many players does a football team usually have on the pitch?", options: ["9", "10", "11", "12"], answer: 2 },
                { q: "Which part of the body can the goalkeeper use inside the penalty area?", options: ["Head only", "Hands", "Feet only", "Shoulders only"], answer: 1 },
                { q: "What is scored when the ball crosses the goal line into the net?", options: ["Corner", "Goal", "Throw-in", "Penalty"], answer: 1 },
                { q: "How long is a standard football match?", options: ["60 minutes", "70 minutes", "80 minutes", "90 minutes"], answer: 3 },
                { q: "What colour card usually means a player is sent off?", options: ["Blue", "Green", "Red", "Black"], answer: 2 },
                { q: "What starts the match from the centre circle?", options: ["Penalty", "Kick-off", "Throw-in", "Free kick"], answer: 1 },
                { q: "What is it called when the ball goes out over the sideline?", options: ["Corner", "Goal kick", "Throw-in", "Penalty"], answer: 2 },
                { q: "How many halves are in a football match?", options: ["1", "2", "3", "4"], answer: 1 },
                { q: "What do players wear on their feet?", options: ["Boots", "Sandals", "Skates", "Slippers"], answer: 0 },
                { q: "Who controls the game on the pitch?", options: ["Coach", "Captain", "Referee", "Fans"], answer: 2 }
            ]
        },

        "luton-history": {
            title: "Luton Town History",
            difficulty: "medium",
            questions: [
                { q: "What is the home stadium of Luton Town?", options: ["Wembley", "Kenilworth Road", "Old Trafford", "Anfield"], answer: 1 },
                { q: "What colours are strongly associated with Luton Town?", options: ["Blue and white", "Orange, white and navy", "Green and yellow", "Black and pink"], answer: 1 },
                { q: "Luton Town is based in which town?", options: ["Luton", "Leeds", "London", "Lincoln"], answer: 0 },
                { q: "What is a common nickname for Luton Town?", options: ["The Foxes", "The Hatters", "The Eagles", "The Owls"], answer: 1 },
                { q: "Kenilworth Road is famous for being a very what kind of stadium?", options: ["Modern", "Large", "Historic and compact", "Underground"], answer: 2 },
                { q: "Luton Town is a football club in which country?", options: ["Scotland", "Wales", "England", "Ireland"], answer: 2 },
                { q: "Luton Town fans are known for creating what kind of atmosphere?", options: ["Silent", "Very loud and passionate", "Only musical", "Noisy only away"], answer: 1 },
                { q: "The club badge represents which club?", options: ["Chelsea", "Luton Town", "Arsenal", "Watford"], answer: 1 },
                { q: "Kenilworth Road is more known for tradition or futuristic design?", options: ["Tradition", "Futuristic design", "Space-age design", "Glass design"], answer: 0 },
                { q: "Which sport is Luton Town mainly known for?", options: ["Rugby", "Basketball", "Football", "Cricket"], answer: 2 }
            ]
        },

        "famous-players": {
            title: "Famous Football Players",
            difficulty: "medium",
            questions: [
                { q: "Which player is famous for playing for Argentina and winning the 2022 World Cup?", options: ["Ronaldo", "Messi", "Neymar", "Mbappé"], answer: 1 },
                { q: "Which player is strongly linked with Portugal?", options: ["Ronaldo", "Modrić", "Kane", "Bellingham"], answer: 0 },
                { q: "Which player is known as a fast French superstar?", options: ["Mbappé", "Xavi", "Salah", "Kroos"], answer: 0 },
                { q: "Which player is associated with Brazil flair?", options: ["Neymar", "Maguire", "Foden", "Casillas"], answer: 0 },
                { q: "Which of these is a goalkeeper?", options: ["Messi", "Neuer", "Mbappé", "Saka"], answer: 1 },
                { q: "Which player is famous for free kicks and crossing, now retired?", options: ["Beckham", "Haaland", "Vinícius Jr", "Rice"], answer: 0 },
                { q: "Which player is known for scoring many goals for Norway?", options: ["Haaland", "Pedri", "Bruno Fernandes", "Di María"], answer: 0 },
                { q: "Which player won many trophies with Barcelona and Argentina?", options: ["Messi", "Odegaard", "Kanté", "Walker"], answer: 0 },
                { q: "Which player is an England striker?", options: ["Harry Kane", "Hakimi", "Rüdiger", "Valverde"], answer: 0 },
                { q: "Which player is famous for tall, powerful finishing and plays for Norway?", options: ["Haaland", "Messi", "Iniesta", "Alisson"], answer: 0 }
            ]
        },

        "stadiums-fans": {
            title: "Stadiums & Fans",
            difficulty: "easy",
            questions: [
                { q: "Who usually sits in the stands and supports the team?", options: ["Fans", "Referees", "Managers", "Doctors"], answer: 0 },
                { q: "Where do football matches happen?", options: ["Library", "Stadium", "Cinema", "Office"], answer: 1 },
                { q: "What do fans often do to support their team?", options: ["Sleep", "Cheer and sing", "Cook", "Drive"], answer: 1 },
                { q: "What is a stadium seat used for?", options: ["Running", "Swimming", "Watching the match", "Refereeing"], answer: 2 },
                { q: "What might fans wave during a match?", options: ["Flags", "Towels only", "Books", "Shoes"], answer: 0 },
                { q: "What helps create atmosphere in a stadium?", options: ["Silence", "Cheering", "Sleeping", "Whispering"], answer: 1 },
                { q: "What is sold at many stadium kiosks?", options: ["Match snacks", "School books", "Furniture", "Bikes"], answer: 0 },
                { q: "What do fans wear to show support?", options: ["Club colours", "Pyjamas only", "Lab coats", "School uniforms"], answer: 0 },
                { q: "A stadium usually has a pitch for what?", options: ["Football", "Cooking", "Painting", "Typing"], answer: 0 },
                { q: "Fans often celebrate when their team scores a what?", options: ["Throw-in", "Goal", "Corner flag", "Whistle"], answer: 1 }
            ]
        },

        "football-tactics": {
            title: "Advanced Football Tactics",
            difficulty: "hard",
            questions: [
                { q: "What does high pressing try to do?", options: ["Defend deep only", "Win the ball back quickly high up the pitch", "Slow the match down", "Avoid attacking"], answer: 1 },
                { q: "What is the purpose of switching play?", options: ["Make the pitch smaller", "Move the ball to the opposite side to exploit space", "Waste time", "Stop passing"], answer: 1 },
                { q: "What does a low block mean?", options: ["Defending deep and compact", "Only attacking centrally", "Playing without defenders", "Using long throws"], answer: 0 },
                { q: "Why use overlapping full-backs?", options: ["To stand still", "To add width and support attacks", "To waste energy", "To avoid crosses"], answer: 1 },
                { q: "What is a counter-attack?", options: ["A slow build-up", "A quick attack after winning the ball", "A goal kick routine", "A type of foul"], answer: 1 },
                { q: "What does compactness help with?", options: ["Leaving gaps", "Reducing space for opponents", "Only attacking wide", "Stopping substitutions"], answer: 1 },
                { q: "Why play through the thirds?", options: ["To ignore midfield", "To progress the ball in structured phases", "To only shoot long", "To waste possession"], answer: 1 },
                { q: "What does man-marking mean?", options: ["Marking a specific opponent", "Marking empty space only", "Ignoring attackers", "Changing boots"], answer: 0 },
                { q: "What is the half-space?", options: ["Area between central and wide zones", "Only the centre circle", "The bench area", "The goal line"], answer: 0 },
                { q: "What is usually the aim of an overload?", options: ["Create a numerical advantage in one area", "Reduce your own players", "Slow the ball", "End the game"], answer: 0 }
            ]
        },

        "football-business": {
            title: "Football Business & Finance",
            difficulty: "hard",
            questions: [
                { q: "Which of these is a common football revenue stream?", options: ["Ticket sales", "Homework", "Fishing", "Farming"], answer: 0 },
                { q: "What does sponsorship usually provide to a club?", options: ["Only players", "Money and brand partnership", "Referees", "Grass"], answer: 1 },
                { q: "What do clubs sell in club shops?", options: ["Merchandise", "Cars only", "Houses", "Office desks"], answer: 0 },
                { q: "What can broadcasting deals bring clubs?", options: ["TV revenue", "Only stadium lights", "New referees", "Free boots for every fan"], answer: 0 },
                { q: "Why is budgeting important for a club?", options: ["To ignore spending", "To manage money responsibly", "To avoid all transfers forever", "To stop fan events"], answer: 1 },
                { q: "What is a transfer fee?", options: ["Money paid for a player's registration", "A stadium ticket", "A weekly wage only", "A referee fine"], answer: 0 },
                { q: "What is merchandise?", options: ["Club products like shirts and scarves", "Tactics notes", "Match grass", "Only food"], answer: 0 },
                { q: "Why are matchday revenues important?", options: ["They help fund club operations", "They do nothing", "They replace players", "They stop leagues"], answer: 0 },
                { q: "What can strong fan engagement improve?", options: ["Revenue and loyalty", "Only weather", "Only refereeing", "Nothing"], answer: 0 },
                { q: "What do clubs need to balance with ambition?", options: ["Financial sustainability", "Only social media", "Only mascot design", "Ignoring all costs"], answer: 0 }
            ]
        }
    };

    function shuffle(array) {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    let selectedQuiz = null;
    const requestedQuizId = config.quizId || "football-basics";

    if (requestedQuizId === "random-ai") {
        const allQuestions = Object.values(quizData).flatMap(quiz => quiz.questions);

        selectedQuiz = {
            title: "Generated Quiz",
            difficulty: "medium",
            questions: shuffle(allQuestions).slice(0, 10)
        };
    } else {
        selectedQuiz = quizData[requestedQuizId] || quizData["football-basics"];
    }

    if (!selectedQuiz || !selectedQuiz.questions || selectedQuiz.questions.length === 0) {
        questionText.textContent = "No questions found for this quiz.";
        console.error("Quiz not found or empty:", requestedQuizId);
        return;
    }

    const questions = selectedQuiz.questions;

    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    function getPointsForDifficulty(difficulty) {
        if (difficulty === "easy") return 15;
        if (difficulty === "medium") return 25;
        if (difficulty === "hard") return 40;
        return 0;
    }

    function updatePointsDisplay() {
        const currentPoints = parseInt(localStorage.getItem("player_points")) || 0;
        quizPoints.textContent = currentPoints;
    }

    function renderQuestion() {
        const currentQuestion = questions[currentQuestionIndex];

        if (!currentQuestion) {
            finishQuiz();
            return;
        }

        quizTitle.textContent = selectedQuiz.title;
        quizScore.textContent = score;
        quizProgress.textContent = currentQuestionIndex + 1;
        questionText.textContent = currentQuestion.q;
        quizFeedback.textContent = "";
        quizFeedback.className = "quiz-feedback";
        nextQuestionBtn.style.display = "none";
        quizOptions.innerHTML = "";
        answered = false;

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "quiz-option";
            button.textContent = option;

            button.addEventListener("click", function () {
                if (answered) return;
                answered = true;

                const allOptions = document.querySelectorAll(".quiz-option");
                allOptions.forEach(opt => {
                    opt.disabled = true;
                });

                if (index === currentQuestion.answer) {
                    button.classList.add("correct");
                    quizFeedback.textContent = "Correct!";
                    quizFeedback.className = "quiz-feedback correct";
                    score++;
                    quizScore.textContent = score;
                } else {
                    button.classList.add("wrong");
                    if (allOptions[currentQuestion.answer]) {
                        allOptions[currentQuestion.answer].classList.add("correct");
                    }
                    quizFeedback.textContent = `Wrong! Correct answer: ${currentQuestion.options[currentQuestion.answer]}`;
                    quizFeedback.className = "quiz-feedback wrong";
                }

                nextQuestionBtn.style.display = "inline-flex";
            });

            quizOptions.appendChild(button);
        });
    }

    function finishQuiz() {
        quizTitle.textContent = selectedQuiz.title;
        quizProgress.textContent = questions.length;
        quizOptions.innerHTML = "";
        questionText.textContent = `Quiz complete! You scored ${score} out of ${questions.length}.`;

        const completionKey = `quiz_completed_${requestedQuizId}`;
        const pointsKey = "player_points";
        const alreadyCompleted = localStorage.getItem(completionKey);

        if (!alreadyCompleted) {
            const earnedPoints = getPointsForDifficulty(selectedQuiz.difficulty);
            let currentPoints = parseInt(localStorage.getItem(pointsKey)) || 0;
            currentPoints += earnedPoints;

            localStorage.setItem(pointsKey, currentPoints);
            localStorage.setItem(completionKey, "true");

            updatePointsDisplay();

            quizFeedback.textContent = `You earned ${earnedPoints} points for completing this quiz the first time!`;
            quizFeedback.className = "quiz-feedback correct";
        } else {
            quizFeedback.textContent = "You already earned points for this quiz before.";
            quizFeedback.className = "quiz-feedback";
        }

        nextQuestionBtn.style.display = "none";

        const restartBtn = document.createElement("button");
        restartBtn.type = "button";
        restartBtn.className = "game-btn";
        restartBtn.textContent = "Play Again";
        restartBtn.addEventListener("click", function () {
            window.location.reload();
        });

        quizOptions.appendChild(restartBtn);
    }

    nextQuestionBtn.addEventListener("click", function () {
        currentQuestionIndex++;

        if (currentQuestionIndex >= questions.length) {
            finishQuiz();
        } else {
            renderQuestion();
        }
    });

    updatePointsDisplay();
    renderQuestion();
});