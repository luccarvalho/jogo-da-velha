const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");

let isCircleTurn;

const startGame = () => {
    for (const cell of cellElements) {
        cell.addEventListener('click', handleClick, { once: true });
    }

    isCircleTurn = false;

    board.classList.add("x");
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    board.classList.remove('circle');
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
}

const handleClick = (elemento) => {
    // Colocar o simbolo X ou Circle
    const cell = elemento.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    // Verificar por vitória
    // Verificar por empate
    // Mudar símbolo

    swapTurns();
}

startGame();
