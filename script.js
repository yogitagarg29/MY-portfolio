
/* =================================
   YOGITA GARG - PORTFOLIO JAVASCRIPT
   1. Dark / Light Mode
   2. Five Question Quiz
================================= */

document.addEventListener("DOMContentLoaded", function () {

    // ===== PART 1: DARK / LIGHT MODE =====

    const root = document.documentElement;
    const themeToggle = document.getElementById("theme");

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);

        if (themeToggle) {
            themeToggle.checked = theme === "dark";
        }
    }

    // Load saved theme
    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("theme") || "light";
    } catch (error) {
        console.log("Theme storage unavailable.");
    }

    applyTheme(savedTheme);

    // Change theme when checkbox is clicked
    if (themeToggle) {
        themeToggle.addEventListener("change", function () {

            const newTheme = themeToggle.checked ? "dark" : "light";

            applyTheme(newTheme);

            try {
                localStorage.setItem("theme", newTheme);
            } catch (error) {
                console.log("Could not save theme.");
            }
        });
    }


    // ===== PART 2: QUIZ =====

    const quizForm = document.getElementById("quizForm");

    if (!quizForm) {
        console.error("Quiz form not found!");
        return;
    }

    const questions = Array.from(
        quizForm.querySelectorAll(".q")
    );

    const quizCount = document.getElementById("quizCount");
    const quizBar = document.getElementById("quizBar");
    const quizMsg = document.getElementById("quizMsg");

    const result = document.getElementById("result");
    const scoreDisplay = document.getElementById("score");
    const resultMsg = document.getElementById("resultMsg");
    const review = document.getElementById("review");
    const restartBtn = document.getElementById("restartBtn");

    // Correct option values
    const answers = ["2", "0", "3", "1", "2"];

    const correctTexts = [
        "<h1>",
        "color",
        ";",
        "const",
        "Tricking people into revealing sensitive information"
    ];

    // Count selected answers
    function countAnswered() {

        let count = 0;

        questions.forEach(function (question) {
            if (question.querySelector("input:checked")) {
                count++;
            }
        });

        return count;
    }

    // Update progress bar
    function updateProgress() {

        const answered = countAnswered();

        quizCount.textContent =
            answered + " of " + questions.length + " answered";

        quizBar.style.width =
            (answered / questions.length) * 100 + "%";
    }

    // Track selected answers
    quizForm.addEventListener("change", function () {

        quizMsg.textContent = "";

        updateProgress();
    });

    // Submit quiz
    quizForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Check unanswered questions
        const unanswered = [];

        questions.forEach(function (question, index) {

            if (!question.querySelector("input:checked")) {
                unanswered.push(index + 1);
            }
        });

        // Display warning
        if (unanswered.length > 0) {

            quizMsg.textContent =
                "Please answer all questions. Missing: " +
                unanswered.join(", ");

            result.hidden = true;

            return;
        }

        quizMsg.textContent = "";

        let score = 0;

        review.innerHTML = "";

        // Calculate score
        questions.forEach(function (question, index) {

            const selected = question.querySelector("input:checked");

            const isCorrect =
                selected.value === answers[index];

            if (isCorrect) {
                score++;
            }

            const item = document.createElement("li");

            item.textContent = isCorrect
                ? "Question " + (index + 1) + ": Correct!"
                : "Question " + (index + 1) +
                  ": Incorrect. Correct answer: " +
                  correctTexts[index];

            review.appendChild(item);
        });

        // Show final score
        scoreDisplay.textContent = "Your Score: " + score + "/5";

        if (score === 5) {
            resultMsg.textContent = "Excellent! Perfect score!";
        } else if (score >= 3) {
            resultMsg.textContent = "Great job! Keep learning!";
        } else {
            resultMsg.textContent = "Good try! Practice and try again!";
        }

        result.hidden = false;

        // Scroll to result
        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

    // Restart quiz
    restartBtn.addEventListener("click", function () {

        quizForm.reset();

        quizMsg.textContent = "";

        result.hidden = true;

        review.innerHTML = "";

        updateProgress();

    });

    // Initial progress
    updateProgress();

});
