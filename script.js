const colors = document.querySelectorAll('.color');
const genius = document.querySelector('.genius');
const h1 = document.querySelector('h1');

let order = [];
let clickedOrder = [];
let score = 0;
let level = 0;

// Configuração da Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator;
let gainNode;

// Funções para gerar e tocar sons
const playSound = (frequency, duration) => {
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine'; // Tipo de onda para o som
    oscillator.frequency.value = frequency;

    // Aumenta o volume gradualmente
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);

    oscillator.start(audioContext.currentTime);
    
    // Diminui o volume e para o som
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
    oscillator.stop(audioContext.currentTime + duration);
};

// Funções para cada som
const sounds = {
    0: () => playSound(392, 0.3), // Verde (G4)
    1: () => playSound(329, 0.3), // Vermelho (E4)
    2: () => playSound(261, 0.3), // Amarelo (C4)
    3: () => playSound(196, 0.3), // Azul (G3)
    gameOver: () => {
        // Sequência de tons para o som de Game Over
        playSound(80, 0.1);
        setTimeout(() => playSound(50, 0.1), 150);
        setTimeout(() => playSound(20, 0.5), 300);
    }
};

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
    
    // Toca o som correspondente à cor
    sounds[colorIndex]();

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
    // Toca o som de Game Over
    sounds.gameOver();

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
