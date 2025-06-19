const egg = document.getElementById('egg');
const basket = document.getElementById('basket');
const gameArea = document.getElementById('gameArea');
let basketPosition = 160;
let eggFallInterval;
let eggCaught = 0; 

function startGame() {
    spawnEgg();
}

function spawnEgg() {
    egg.style.top = '0px';
    egg.style.left = Math.random() * (gameArea.offsetWidth - 30) + 'px';
    eggFallInterval = setInterval(moveEggDown, 20);
}

function moveEggDown() {
    let eggTop = parseInt(egg.style.top);
    if (eggTop < gameArea.offsetHeight - 40) {
        egg.style.top = eggTop + 5 + 'px'; 
    } else {
        clearInterval(eggFallInterval);
        spawnEgg();
    }

    checkCatch();
}

function checkCatch() {
    const eggRect = egg.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (
        eggRect.bottom >= basketRect.top &&
        eggRect.left + eggRect.width >= basketRect.left &&
        eggRect.left <= basketRect.left + basketRect.width
    ) {
        eggCaught++;
        updateCounter()
        clearInterval(eggFallInterval);
        spawnEgg();
    }
}

function updateCounter() {
	counter.textContent = `Всего поймано: ${eggCaught}`;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && basketPosition > 0) {
        basketPosition -= 10;
    }
    if (e.key === 'ArrowRight' && basketPosition < gameArea.offsetWidth - 80) {
        basketPosition += 10;
    }
    basket.style.left = basketPosition + 'px';
});

startGame();