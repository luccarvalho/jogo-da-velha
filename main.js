const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winnerMessageTextElement = document.querySelector("[data-winner-message-text]");
const winnerMessage = document.querySelector("[data-winner-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const startGame = () => {
    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }

    isCircleTurn = false;

    board.classList.add("x");
    winnerMessage.classList.remove("show-winner-message");
}

const endGame = (isDraw) => {
    if (isDraw) {
        winnerMessageTextElement.innerText = "Empate!"
    } else {
        winnerMessageTextElement.innerText = isCircleTurn ? "Círculo Venceu!" : "X Venceu!";
    }

    winnerMessage.classList.add("show-winner-message");
}

const checkForWin = (currentPlayer) => {
    return winnerCombinations.some(combination => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
}

const handleClick = (elemento) => {
    // Colocar o simbolo X ou Circle
    const cell = elemento.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    // Verificar por vitória
    const isWin = checkForWin(classToAdd);
    
    // Verificar por empate
    const isDraw = checkForDraw();
    
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        // Mudar símbolo
        swapTurns();
    }
}

startGame();

restartButton.addEventListener("click", startGame);