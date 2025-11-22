// Data kata yang harus ditemukan — POSISI DIPERBAIKI & URUTAN HARUS BENAR!
const wordsToFind = [
    { word: "INDI", positions: [[1,0], [1,1], [1,2], [1,3]] }, // I-N-D-I
    { word: "SALMAN", positions: [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5]] }, // S-A-L-M-A-N
    { word: "PEJUANG", positions: [[0,7], [1,7], [2,7], [3,7], [4,7], [5,7], [6,7]] }, // P-E-J-U-A-N-G (vertikal)
    { word: "KELUARGA", positions: [[0,6], [1,6], [2,6], [3,6], [4,6], [5,6], [6,6], [7,6]] }, // K-E-L-U-A-R-G-A (vertikal)
    { word: "PMT", positions: [[3,3], [3,4], [3,5]] } // P-M-T
];

// Grid 8x8
const gridSize = 8;
let grid = [];
let foundWords = new Set();
let currentWord = null; // Kata yang sedang dicoba
let currentStep = 0;   // Langkah saat ini dalam kata
let selectedCells = []; // Sel yang dipilih saat ini

// Generate puzzle grid
function generateGrid() {
    return [
        ['S', 'A', 'L', 'M', 'A', 'N', 'K', 'P'],
        ['I', 'N', 'D', 'I', 'U', 'J', 'E', 'E'],
        ['K', 'B', 'C', 'V', 'W', 'U', 'L', 'J'],
        ['E', 'Q', 'F', 'P', 'M', 'T', 'U', 'U'],
        ['L', 'H', 'R', 'X', 'Y', 'A', 'A', 'A'],
        ['U', 'Z', 'O', 'L', 'K', 'N', 'R', 'N'],
        ['A', 'M', 'P', 'Q', 'J', 'G', 'G', 'G'],
        ['G', 'A', 'N', 'T', 'U', 'G', 'A', 'A']
    ];
}

// Render grid ke HTML
function renderGrid() {
    const puzzleGrid = document.getElementById('puzzle-grid');
    puzzleGrid.innerHTML = '';

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = grid[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => handleCellClick(i, j));
            puzzleGrid.appendChild(cell);
        }
    }
}

// Handle klik sel
function handleCellClick(row, col) {
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

    // Jika sudah ditemukan, skip
    if (cell.classList.contains('highlighted')) return;

    // Jika sedang dalam proses mencari kata
    if (currentWord) {
        checkNextStep(row, col);
    } else {
        // Mulai baru: cari kata yang mengandung sel ini
        startNewSearch(row, col);
    }
}

// Mulai pencarian baru
function startNewSearch(row, col) {
    // Reset semuanya
    resetSelection();

    // Cari kata yang mengandung sel ini
    for (let wordObj of wordsToFind) {
        if (foundWords.has(wordObj.word)) continue;

        const index = wordObj.positions.findIndex(pos => pos[0] === row && pos[1] === col);

        if (index !== -1) {
            currentWord = wordObj;
            currentStep = index;
            selectedCells = [ [row, col] ];

            // Highlight sel pertama
            cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.classList.add('selected');

            return;
        }
    }

    // Jika tidak ada kata yang mengandung sel ini
    alert("Sel ini tidak termasuk dalam kata apa pun. Coba lagi!");
}

// Cek langkah berikutnya — HARUS BERURUTAN DAN DALAM KATA YANG SAMA!
function checkNextStep(row, col) {
    const nextIndex = currentStep + 1;

    // Jika sudah sampai akhir kata
    if (nextIndex >= currentWord.positions.length) {
        return;
    }

    const expectedPos = currentWord.positions[nextIndex];

    // Cek apakah sel yang diklik adalah sel berikutnya — HARUS PERSIS SESUAI URUTAN!
    if (expectedPos[0] === row && expectedPos[1] === col) {
        // Lanjutkan
        currentStep = nextIndex;
        selectedCells.push([row, col]);

        // Highlight sel ini
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add('selected');

        // Jika sudah sampai akhir kata
        if (currentStep === currentWord.positions.length - 1) {
            completeWord();
        }
    } else {
        // Salah! Reset
        alert("Langkah salah! Kamu harus mengikuti urutan kata. Mulai ulang.");
        resetSelection();
    }
}

// Selesaikan kata
function completeWord() {
    // Highlight semua sel
    currentWord.positions.forEach(pos => {
        const cell = document.querySelector(`[data-row="${pos[0]}"][data-col="${pos[1]}"]`);
        cell.classList.remove('selected');
        cell.classList.add('highlighted');
    });

    // Tandai kata ditemukan
    foundWords.add(currentWord.word);

    // Update tampilan kata di atas
    updateWordList();

    // Reset proses — biarkan user mulai cari kata lain!
    resetSelection();

    // Cek apakah semua kata sudah ditemukan
    if (foundWords.size === wordsToFind.length) {
        showCompletionMessage();
    }
}

// Reset selection dan proses
function resetSelection() {
    selectedCells.forEach(pos => {
        const cell = document.querySelector(`[data-row="${pos[0]}"][data-col="${pos[1]}"]`);
        if (cell && !cell.classList.contains('highlighted')) {
            cell.classList.remove('selected');
        }
    });
    selectedCells = [];
    currentWord = null;
    currentStep = 0;
}

// Update tampilan daftar kata
function updateWordList() {
    const wordItems = document.querySelectorAll('.word-item');
    wordItems.forEach(item => {
        const word = item.textContent.trim();
        if (foundWords.has(word)) {
            item.classList.add('found');
        }
    });
}

// Tampilkan pesan penyelesaian
function showCompletionMessage() {
    const completionMsg = document.getElementById('completion-message');
    completionMsg.classList.remove('hidden');

    // Scroll ke bawah
    completionMsg.scrollIntoView({ behavior: 'smooth' });

    // Button klik
    document.getElementById('claim-button').addEventListener('click', () => {
        alert("🎉 Kupon Spesial Telah Diklaim!\n\nTerima kasih telah bermain! Semoga keluarga Anda selalu bahagia dan penuh cinta.");
    });
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    grid = generateGrid();
    renderGrid();
});