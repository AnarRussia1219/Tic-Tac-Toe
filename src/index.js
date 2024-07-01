import "./styles.css";

function GameBoard(player1, player2) {
    let playing = true;
    const getPlaying = function() {
        return playing;
    };
    const setPlaying = function(val) {
        playing = val;
    }
    let gameBoardArray = [
        new GameBoardBox("", false), new GameBoardBox("", false), new GameBoardBox("", false),
        new GameBoardBox("", false), new GameBoardBox("", false), new GameBoardBox("", false),
        new GameBoardBox("", false), new GameBoardBox("", false), new GameBoardBox("", false),
    ];

    const getGameBoardArray = function() {
        return gameBoardArray;
    };

    const updateGameBoardArray = function(index, to) {
        gameBoardArray[index] = to;
    };

    let currentPlayer = player1;
    const getCurrentPlayer = function() {
        return currentPlayer;
    };
    const updateCurrentPlayer = function() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else if (currentPlayer === player2) {
            currentPlayer = player1;
        };
    };

    let player1Score = 0;
    let player2Score = 0;
    let ties = 0;
    const getScore = function() {
        return {
            player1Score: player1Score,
            player2Score: player2Score,
            ties: ties,
        };
    };
    const updateScore = function(player, to) {
        if (player === 1) {
            player1Score = to;
        } else if (player === 2) {
            player2Score = to;
        } else if (player === "tie") {
            ties = to;
        };
    };

    const resetGameBoardArray = function() {
        gameBoardArray = [
            new GameBoardBox("", false), new GameBoardBox("", false), new GameBoardBox("", false),
            new GameBoardBox("", false), new GameBoardBox("", false), new GameBoardBox("", false),
            new GameBoardBox("", false), new GameBoardBox("", false), new GameBoardBox("", false),
        ];
    };

    return {
        player1: player1,
        player2: player2,
        getScore, updateScore, getCurrentPlayer, updateCurrentPlayer, getGameBoardArray,
        updateGameBoardArray, resetGameBoardArray, getPlaying, setPlaying
    };
};

function GameBoardBox(value, selected) {
    this.value = value;
    this.selected = selected;
};

const Game = GameBoard("x", "o");
const gridBoxes = document.querySelectorAll(".grid-box");
const scoreInfoPlayer1Text = document.querySelector(".score-info-player-1-text");
const scoreInfoPlayer1Number = document.querySelector(".score-info-player-1-number");
const scoreInfoPlayer2Text = document.querySelector(".score-info-player-2-text");
const scoreInfoPlayer2Number = document.querySelector(".score-info-player-2-number");
const scoreInfoTieNumber = document.querySelector(".score-info-tie-number");

updateUIInfo();

function updateUIInfo() {
    if (Game.getCurrentPlayer() === Game.player1) {
        document.querySelector(".score-info-box:nth-child(1)").style.color = "#ffffff";
        document.querySelector(".score-info-box:nth-child(3)").style.color = "rgba(255, 255, 255, 0.5)";
    } else if (Game.getCurrentPlayer() === Game.player2) {
        document.querySelector(".score-info-box:nth-child(3)").style.color = "#ffffff";
        document.querySelector(".score-info-box:nth-child(1)").style.color = "rgba(255, 255, 255, 0.5)";
    };
    document.querySelector(".score-info-box--tie").style.color = "rgba(255, 255, 255, 0.5";
    scoreInfoPlayer1Text.textContent = `PLAYER 1(${Game.player1})`;
    scoreInfoPlayer1Number.textContent = String(Game.getScore().player1Score);

    scoreInfoPlayer2Text.textContent = `PLAYER 2(${Game.player2})`;
    scoreInfoPlayer2Number.textContent = String(Game.getScore().player2Score);

    scoreInfoTieNumber.textContent = String(Game.getScore().ties);
};

const winningGameBoardsequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

gridBoxes.forEach((gridBox, index) => {
    gridBox.addEventListener("click", function() {
        if (Game.getPlaying()) {
            if (!Game.getGameBoardArray()[index].selected) {
                // console.log(1); // test
                Game.updateGameBoardArray(index, new GameBoardBox(Game.getCurrentPlayer(), true));

                // render the gameboard
                document.querySelectorAll(".grid-box-text")[index].textContent = Game.getGameBoardArray()[index].value;
                document.querySelectorAll(".grid-box-text")[index].style.scale = "1.30";
                setTimeout(() => {
                    document.querySelectorAll(".grid-box-text")[index].style.scale = "1";
                }, 100);
                updateUIInfo();

                // check if won
                let won = false;
                for (let i = 0; i < winningGameBoardsequences.length; i++) {
                    const [a, b, c] = winningGameBoardsequences[i];
                    if (Game.getGameBoardArray()[a].value && Game.getGameBoardArray()[a].value === Game.getGameBoardArray()[b].value && Game.getGameBoardArray()[a].value === Game.getGameBoardArray()[c].value) {
                        won = true;
                        Game.setPlaying(false);
                        document.querySelectorAll(".grid-box-text").forEach((text, index) => {
                            if (index !== a && index !== b && index !== c) {
                                text.style.color = "rgba(255, 255, 255, 0.5)";
                            } else {
                                text.style.display = "none";

                                // animation
                                setTimeout(() => {
                                    text.style.display = "inline";

                                    setTimeout(() => {
                                        text.style.display = "none";

                                        setTimeout(() => {
                                            text.style.display = "inline";

                                            setTimeout(() => {
                                                text.style.display = "none";

                                                setTimeout(() => {
                                                    text.style.display = "inline";
                                                }, 50);
                                            }, 50);
                                        }, 50);
                                    }, 50);
                                }, 50);
                            };
                        });
                        if (Game.getCurrentPlayer() === Game.player1) {
                            Game.updateScore(1, Number(Game.getScore().player1Score + 1));
                        } else if (Game.getCurrentPlayer() === Game.player2) {
                            Game.updateScore(2, Number(Game.getScore().player2Score + 1));
                        };

                        updateUIInfo();

                        return;
                    };
                };

                // check if tie
                const array = Game.getGameBoardArray();
                let tie; // BOOL
                let allSelected = true;

                for (let j = 0; j < array.length; j++) {
                    if (!array[j].selected) {
                        allSelected = false;
                        break;
                    };
                };

                if (won === false && allSelected) {
                    tie = true;
                } else {
                    tie = false;
                };

                if (tie) {
                    Game.setPlaying(false);
                    Game.updateScore("tie", Number(Game.getScore().ties) + 1);
                    updateUIInfo();
                    document.querySelector(".score-info-box:nth-child(1)").style.color = "rgba(255, 255, 255, 0.5)";
                    document.querySelector(".score-info-box:nth-child(3)").style.color = "rgba(255, 255, 255, 0.5)";
                    document.querySelector(".score-info-box--tie").style.color = "#ffffff";
                } else {
                    Game.updateCurrentPlayer();
                    updateUIInfo();
                    document.querySelector(".score-info-box--tie").style.color = "rgba(255, 255, 255, 0.5)";
                };
            };
        } else {
            Game.setPlaying(true);
            Game.resetGameBoardArray();
            Game.updateCurrentPlayer();
            document.querySelectorAll(".grid-box-text").forEach(text => {
                text.textContent = "";
                text.style.color = "#ffffff";
            });
            updateUIInfo();
        };
    });
});