let hasBet = false;
let hasDealt = false;
let isPlaying = false;
let hit = false;
let hasDoubled;
let playerCard1;
let playerCard2;
let dealerCard1;
let dealerCard2;
let playerHand;
let dealerHand;
let hitCard;

let betAmount = 0;
let cashAmount = 100;
let lastBetAmount;

const playerDisplay = document.querySelector('#player-cards');
const playerHandDisplay = document.querySelector('#player-hand');
const playerWin = document.querySelector('#player-win');
const dealerDisplay = document.querySelector('#dealer-cards');
const dealerHandDisplay = document.querySelector('#dealer-hand');
const dealerWin = document.querySelector('#dealer-win');

const deal = document.querySelector('#deal-btn');
const hitButton = document.querySelector('#hit-btn');
const standButton = document.querySelector('#stand-btn');
const doubleDown = document.querySelector('#double-down-btn');

const playerBet = document.querySelector('#bet-amount');
const playerCash = document.querySelector('#player-cash');
const errorBox = document.querySelector('#error-box');

const tinyBet = document.querySelector('#tiny-bet');
const smallBet = document.querySelector('#small-bet');
const mediumBet = document.querySelector('#medium-bet');
const largeBet = document.querySelector('#large-bet');
const lastBet = document.querySelector('#last-bet');
const clearBet = document.querySelector('#clear-bet');

deal.onclick = () => {
	if (isPlaying) {
		errorBox.textContent = `Already dealt`;
	} else {
		if (betAmount == ``) {
			errorBox.textContent = `Please place a bet`;
		} else if (cashAmount == 0) {
			errorBox.textContent = `You broke...`;
		} else if (betAmount > cashAmount) {
			errorBox.textContent = `Not enough cash`;
		} else {
			hasBet = true;
			hasDoubled = false;
			cashAmount -= betAmount;
			lastBetAmount = betAmount;
			// betAmount = 0;
			errorBox.textContent = ``;
			playerBet.textContent = `Bet Amount: $${betAmount}`;
			playerCash.textContent = `Cash: $${cashAmount}`;
			mainDeal();
		}
	}
};

tinyBet.onclick = () => {
	if (isPlaying) {
		errorBox.textContent = `Already dealt`;
	} else {
		betAmount += 5;
		playerBet.textContent = `Bet Amount: $${betAmount}`;
		errorBox.textContent = ``;
	}
};

smallBet.onclick = () => {
	if (isPlaying) {
		errorBox.textContent = `Already dealt`;
	} else {
		betAmount += 10;
		playerBet.textContent = `Bet Amount: $${betAmount}`;
		errorBox.textContent = ``;
	}
};

mediumBet.onclick = () => {
	if (isPlaying) {
		errorBox.textContent = `Already dealt`;
	} else {
		betAmount += 50;
		playerBet.textContent = `Bet Amount: $${betAmount}`;
		errorBox.textContent = ``;
	}
};

largeBet.onclick = () => {
	if (isPlaying) {
		errorBox.textContent = `Already dealt`;
	} else {
		betAmount += 100;
		playerBet.textContent = `Bet Amount: $${betAmount}`;
		errorBox.textContent = ``;
	}
};

clearBet.onclick = () => {
	betAmount = 0;
	playerBet.textContent = `Bet Amount: $${betAmount}`;
	errorBox.textContent = ``;
};

lastBet.onclick = () => {
	if (isPlaying) {
		errorBox.textContent = `Already dealt`;
	} else if (hasBet == false) {
		errorBox.textContent = `You have to place a bet first`;
	} else {
		betAmount = lastBetAmount;
		playerBet.textContent = `Bet Amount: $${lastBetAmount}`;
	}
};

let mainDeal = () => {
	isPlaying = true;
	hit = false;
	playerCard1 = Math.floor(Math.random() * 11) + 1;
	playerCard2 = Math.floor(Math.random() * 11) + 1;

	if (playerCard1 == 11 && playerCard2 == 11) {
		playerCard1 = 1;
	} else if (playerCard1 == 1 && playerCard2 == 1) {
		playerCard1 = 11;
	}

	playerHand = playerCard1 + playerCard2;
	playerDisplay.textContent = `${playerHand}`;
	playerHandDisplay.textContent = `${playerCard1} | ${playerCard2}`;

	if (playerHand > 21) {
		playerWin.textContent = `Bust!`;
		isPlaying = false;
	} else if (playerHand == 21) {
		playerWin.textContent = `Blackjack!`;
		collectMoney();
		isPlaying = false;
	} else {
		playerWin.textContent = ``;
	}

	dealerCard1 = Math.floor(Math.random() * 11) + 1;
	dealerCard2 = Math.floor(Math.random() * 11) + 1;

	if (dealerCard1 == 11 && dealerCard2 == 11) {
		dealerCard1 = 1;
	} else if (dealerCard1 == 1 && dealerCard2 == 1) {
		dealerCard1 = 11;
	}

	dealerHand = dealerCard1 + dealerCard2;
	dealerDisplay.textContent = `${dealerHand}`;
	dealerHandDisplay.textContent = `${dealerCard1} | ${dealerCard2}`;

	if (dealerHand > 21) {
		dealerWin.textContent = `Bust!`;
		isPlaying = false;
	} else if (dealerHand == 21) {
		dealerWin.textContent = `Blackjack!`;
		isPlaying = false;
	} else {
		dealerWin.textContent = ``;
	}
};

//* HIT FUNCTION

hitButton.addEventListener('click', () => {
	if (!isPlaying || hit) {
		return false;
	} else {
		hitCard = Math.floor(Math.random() * 10) + 1;
		playerHand = playerHand + hitCard;
		playerDisplay.textContent = `${playerHand}`;
		playerHandDisplay.textContent = `${playerCard1} | ${playerCard2} | ${hitCard}`;

		if (playerHand > 21) {
			playerWin.textContent = `Bust!`;
			hit = true;
			isPlaying = false;
		} else if (playerHand == 21) {
			playerWin.textContent = `Blackjack!`;
			whoWins();
			hit = true;
			isPlaying = false;
		}
	}
});

standButton.addEventListener('click', () => {
	if (!isPlaying) {
		return false;
	} else {
		// hit = true;
		while (dealerHand < 17) {
			dealerHit();
		}

		if (dealerHand > 21) {
			dealerWin.textContent = `Bust!`;
			playerWin.textContent = `Win!`;
			isPlaying = false;
			collectMoney();
		}
		if (dealerHand == 21) {
			dealerWin.textContent = `Blackjack!`;
			isPlaying = false;
		}
		if (dealerHand < 21) {
			isPlaying = false;
			whoWins();
		}
	}
});

doubleDown.addEventListener('click', () => {
	if (playerHand == 11) {
		hitCard = Math.floor(Math.random() * 11) + 1;
		if (hitCard == 11) {
			hitCard = 1;
		}
		playerHand = playerHand + hitCard;
		playerDisplay.textContent = `${playerHand}`;
		playerHandDisplay.textContent = `${playerCard1} | ${playerCard2} | ${hitCard}`;
		if (playerHand == 21) {
			playerWin.textContent = `Blackjack!`;
			hasDoubled = true;
			collectMoney();
			isPlaying = false;
		} else {
			standing();
		}
	}
});

let dealerHit = () => {
	hitCard = Math.floor(Math.random() * 11) + 1;
	if (dealerHand >= 11 && hitCard == 11) {
		hitCard = 1;
	}
	dealerHand = dealerHand + hitCard;
	dealerDisplay.textContent = `${dealerHand}`;
	dealerHandDisplay.textContent = `${dealerCard1} | ${dealerCard2} | ${hitCard}`;
};

let whoWins = () => {
	if (playerHand > dealerHand) {
		playerWin.textContent = `Win!`;
		collectMoney();
	} else if (dealerHand > playerHand && dealerHand < 21) {
		dealerWin.textContent = `Wins!`;
	} else if (playerHand == dealerHand) {
		playerWin.textContent = `Push!`;
		dealerWin.textContent = `Push!`;
	}
};

let standing = () => {
	if (!isPlaying) {
		return false;
	} else {
		// hit = true;
		while (dealerHand < 17) {
			dealerHit();
		}

		if (dealerHand > 21) {
			dealerWin.textContent = `Bust!`;
			playerWin.textContent = `Win!`;
			isPlaying = false;
			collectMoney();
		}
		if (dealerHand == 21) {
			dealerWin.textContent = `Blackjack!`;
			isPlaying = false;
		}
		if (dealerHand < 21) {
			isPlaying = false;
			whoWins();
		}
	}
};

let collectMoney = () => {
	if (hasDoubled) {
		let prizeMoney = lastBetAmount * 4;
		cashAmount += prizeMoney;
		playerCash.textContent = `Cash: $${cashAmount}`;
		errorBox.textContent = `You win : $${prizeMoney}`;
	} else if (playerHand == 21) {
		let prizeMoney = lastBetAmount * 3;
		cashAmount += prizeMoney;
		playerCash.textContent = `Cash: $${cashAmount}`;
		errorBox.textContent = `You win : $${prizeMoney}`;
	} else {
		let prizeMoney = lastBetAmount * 2;
		cashAmount += prizeMoney;
		playerCash.textContent = `Cash: $${cashAmount}`;
		errorBox.textContent = `You win : $${prizeMoney}`;
	}
};
