const board = document.getElementById("board");
const status = document.getElementById("status");
const particlesContainer = document.getElementById("particles");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell", "w-24", "h-24", "border", "border-gray-300", "cursor-pointer", "text-center", "text-3xl", "flex", "items-center", "justify-center", "rounded-lg");
        cellElement.dataset.index = index;
        if (cell === "X") {
            cellElement.classList.add("x");
        } else if (cell === "O") {
            cellElement.classList.add("o");
        }
        cellElement.innerText = cell;
        cellElement.addEventListener("click", handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    createBoard();
    checkWinner();
    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.innerText = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            status.innerText = `Player ${gameBoard[a]} Wins!`;
            gameActive = false;
            highlightWinner(combination);
            triggerCelebration();
            return;
        }
    }
    if (!gameBoard.includes("")) {
        status.innerText = "It's a Draw!";
        gameActive = false;
    }
}

function highlightWinner(combination) {
    combination.forEach(index => {
        const cell = board.children[index];
        cell.classList.add("bg-yellow-300");
    });
}

function triggerCelebration() {
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement("div");
        particle.style.position = "absolute";
        particle.style.width = particle.style.height = `${Math.random() * 10 + 5}px`;
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        particle.style.borderRadius = "50%";
        particle.style.left = `${Math.random() * window.innerWidth}px`;
        particle.style.top = `${Math.random() * window.innerHeight}px`;
        particle.style.opacity = 1;
        particlesContainer.appendChild(particle);

        const animation = particle.animate([
            { transform: "translateY(0) scale(1)", opacity: 1 },
            { transform: `translateY(${Math.random() * -200 - 100}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1500 + Math.random() * 500,
            easing: "ease-out"
        });

        animation.onfinish = () => particle.remove();
    }
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    status.innerText = "Player X's Turn";
    createBoard();
}

createBoard();
