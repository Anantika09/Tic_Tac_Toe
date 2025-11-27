class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.xWins = 0;
        this.oWins = 0;
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        this.initializeGame();
    }

    initializeGame() {
        this.createBoard();
        this.addEventListeners();
        this.updateStatus();
        this.updateScores();
    }

    createBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';
        
        this.board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.setAttribute('data-index', index);
            cellElement.textContent = cell;
            boardElement.appendChild(cellElement);
        });
    }

    addEventListeners() {
        const boardElement = document.getElementById('board');
        const resetBtn = document.getElementById('reset-btn');
        const resetScoreBtn = document.getElementById('reset-score-btn');

        boardElement.addEventListener('click', (e) => {
            if (!e.target.classList.contains('cell')) return;
            
            const index = parseInt(e.target.getAttribute('data-index'));
            this.handleCellClick(index);
        });

        resetBtn.addEventListener('click', () => this.resetGame());
        resetScoreBtn.addEventListener('click', () => this.resetScores());
    }

    handleCellClick(index) {
        if (!this.gameActive || this.board[index] !== '') return;

        this.board[index] = this.currentPlayer;
        this.updateBoard();
        
        if (this.checkWinner()) {
            this.handleWin();
        } else if (this.board.every(cell => cell !== '')) {
            this.handleDraw();
        } else {
            this.switchPlayer();
            this.updateStatus();
        }
    }

    updateBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = this.board[index];
            if (this.board[index] !== '') {
                cell.classList.add(this.board[index].toLowerCase());
            }
        });
    }

    checkWinner() {
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            return this.board[a] !== '' && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }

    handleWin() {
        this.gameActive = false;
        const statusElement = document.getElementById('status');
        statusElement.textContent = `Player ${this.currentPlayer} Wins!`;
        statusElement.style.color = this.currentPlayer === 'X' ? '#ff6b6b' : '#4ecdc4';
        
        // Update scores
        if (this.currentPlayer === 'X') {
            this.xWins++;
        } else {
            this.oWins++;
        }
        this.updateScores();
        
        // Highlight winning cells
        this.highlightWinningCells();
    }

    highlightWinningCells() {
        const winningCondition = this.winningConditions.find(condition => {
            const [a, b, c] = condition;
            return this.board[a] !== '' && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });

        if (winningCondition) {
            winningCondition.forEach(index => {
                const cell = document.querySelector(`.cell[data-index="${index}"]`);
                cell.classList.add('winner');
            });
        }
    }

    handleDraw() {
        this.gameActive = false;
        const statusElement = document.getElementById('status');
        statusElement.textContent = "Game ended in a draw!";
        statusElement.style.color = '#666';
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    updateStatus() {
        const statusElement = document.getElementById('status');
        statusElement.textContent = `Player ${this.currentPlayer}'s Turn`;
        statusElement.style.color = '#555';
    }

    updateScores() {
        document.getElementById('x-wins').textContent = this.xWins;
        document.getElementById('o-wins').textContent = this.oWins;
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.createBoard();
        this.updateStatus();
    }

    resetScores() {
        this.xWins = 0;
        this.oWins = 0;
        this.updateScores();
        this.resetGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});