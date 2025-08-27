const colors = document.querySelectorAll('.color');
const genius = document.querySelector('.genius');
const h1 = document.querySelector('h1');

let order = [];
let clickedOrder = [];
let score = 0;
let level = 0;

const clickColor = (colorIndex) => {
    clickedOrder.push(colorIndex);
    lightUpColor(colorIndex);
    checkClick();
};

const checkClick = () => {
    if (clickedOrder.length === order.length) {
        if (JSON.stringify(clickedOrder) === JSON.stringify(order)) {
            level++;
            h1.textContent = `Nível ${level} - Jogue!`;
            clickedOrder = [];
            setTimeout(nextLevel, 1000);
        } else {
            gameOver();
        }
    }
};

const lightUpColor = (colorIndex) => {
    colors[colorIndex].classList.add('selected');
    setTimeout(() => {
        colors[colorIndex].classList.remove('selected');
    }, 300);
};

const nextLevel = () => {
    const nextColor = Math.floor(Math.random() * 4);
    order.push(nextColor);
    playSequence();
};

const playSequence = () => {
    let i = 0;
    const interval = setInterval(() => {
        lightUpColor(order[i]);
        i++;
        if (i >= order.length) {
            clearInterval(interval);
        }
    }, 800);
};

const gameOver = () => {
    alert(`Game Over! Seu score foi: ${score}`);
    order = [];
    clickedOrder = [];
    score = 0;
    level = 0;
    h1.textContent = `Jogo Genius`;
    setTimeout(startGame, 1000);
};

const startGame = () => {
    alert('Clique em OK para começar!');
    score = 0;
    level = 1;
    h1.textContent = `Nível ${level} - Jogue!`;
    nextLevel();
};

document.addEventListener('DOMContentLoaded', startGame);