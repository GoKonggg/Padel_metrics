document.addEventListener('DOMContentLoaded', () => {
            // --- Global Variables ---
            let summaryChartInstance = null;
            let historyChartInstance = null;
            
            // --- View Elements ---
            const loginView = document.getElementById('login-view');
            const appView = document.getElementById('app-view');
            
            // --- Login Elements ---
            const loginForm = document.getElementById('login-form');

            // --- App Elements ---
            const tabs = document.querySelectorAll('.nav-tab');
            const tabPanes = document.querySelectorAll('.tab-pane');
            const uploadView = document.getElementById('upload-view');
            const analysisView = document.getElementById('analysis-view');
            const uploadBtn = document.getElementById('upload-btn');
            const loadingOverlay = document.getElementById('loading-overlay');
            const loadingText = document.getElementById('loading-text');
            const resultsContainer = document.getElementById('analysis-results-container');
            const historyList = document.getElementById('history-list');
            const shareModal = document.getElementById('share-modal');
            const closeModalBtn = document.getElementById('close-modal-btn');
            const shareStatsContainer = document.getElementById('share-stats');
            const videoPlaceholder = document.getElementById('video-player-placeholder');
            // --- LOGIKA UNTUK TOMBOL REVIEW & NOTES ---
            const mainAnalysisView = document.getElementById('main-analysis-view');
            const mainAnalysisContent = document.getElementById('main-analysis-content');
const reviewModeView = document.getElementById('review-mode-view');
const backToAnalysisBtn = document.getElementById('back-to-analysis-btn');
const reviewModeTimestamp = document.getElementById('review-mode-timestamp');
const reviewModeTextarea = document.getElementById('review-mode-textarea');
const saveReviewNoteBtn = document.getElementById('save-review-note-btn');
let currentlyEditingIndex = null; // Tetap kita pakai

// Variabel untuk menyimpan semua catatan
        let analysisNotes = {};

// Event Listener untuk seluruh container hasil
        resultsContainer.addEventListener('click', (event) => {
    const reviewButton = event.target.closest('.jump-btn');
    if (reviewButton) {
        // 1. Ambil data yang diperlukan
        const timeInSeconds = reviewButton.dataset.time;
        const parentDiv = reviewButton.closest('.grid');
        const noteInput = parentDiv.querySelector('.note-input');
        currentlyEditingIndex = noteInput.dataset.index;

        // 2. Sembunyikan view utama, tampilkan view review
        mainAnalysisContent.classList.add('hidden');
        reviewModeView.classList.remove('hidden');

        // 3. Pindahkan video player ke view review
        const videoPlayer = document.getElementById('analysis-video-player');
        // Menjadi seperti ini (saat masuk review mode):
        const reviewVideoContainer = document.getElementById('review-video-container');
        reviewVideoContainer.appendChild(videoPlayer);



        // 4. Atur konten di view review
        reviewModeTimestamp.textContent = formatTime(timeInSeconds);
        reviewModeTextarea.value = analysisNotes[currentlyEditingIndex] || '';
        reviewModeTextarea.focus();

        // 5. Lompat ke timestamp dan mainkan video
        videoPlayer.currentTime = timeInSeconds;
        videoPlayer.play();
    }
});
saveReviewNoteBtn.addEventListener('click', () => {
    if (currentlyEditingIndex !== null) {
        const newNoteText = reviewModeTextarea.value;
        analysisNotes[currentlyEditingIndex] = newNoteText;

        const originalInput = document.querySelector(`.note-input[data-index='${currentlyEditingIndex}']`);
        if (originalInput) {
            originalInput.value = newNoteText;
        }
        console.log("Catatan diperbarui:", analysisNotes);
        // Otomatis kembali setelah save
        backToAnalysisBtn.click();
    }
});

backToAnalysisBtn.addEventListener('click', () => {
    // 1. Sembunyikan view review mode
    reviewModeView.classList.add('hidden');

    // 2. Tampilkan kembali konten analisis utama
    mainAnalysisContent.classList.remove('hidden');

    // 3. Kembalikan video player ke tempat asalnya
    const videoPlayer = document.getElementById('analysis-video-player');
    const mainVideoContainer = document.getElementById('main-video-container');
    mainVideoContainer.appendChild(videoPlayer);
});
// Event Listener untuk input notes
        resultsContainer.addEventListener('change', (event) => {
    if (event.target.classList.contains('note-input')) {
        const inputElement = event.target;
        const index = inputElement.dataset.index;
        const noteText = inputElement.value;

        analysisNotes[index] = noteText;
        console.log("Catatan disimpan:", analysisNotes);

        inputElement.classList.add('border-green-500', 'bg-green-50');
        setTimeout(() => {
            inputElement.classList.remove('border-green-500', 'bg-green-50');
        }, 1500);
    }
});

            // --- LOGIN LOGIC ---
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault();
                loginView.style.display = 'none';
                appView.classList.remove('hidden');
                appView.classList.add('fade-in');
                document.body.className = ''; // Reset body class for app view
            });

            // --- APP LOGIC ---
            renderHistory();

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    tabPanes.forEach(p => p.classList.add('hidden'));
                    tab.classList.add('active');
                    const activeTabContent = document.getElementById(tab.dataset.tab + '-content');
                    activeTabContent.classList.remove('hidden');
                    activeTabContent.classList.add('fade-in');
                });
            });

            uploadBtn.addEventListener('click', () => {
                uploadView.classList.add('hidden');
                analysisView.classList.remove('hidden');
                analysisView.classList.add('fade-in');
                startAnalysis();
            });

            function startAnalysis() {
                loadingOverlay.classList.remove('hidden');
                resultsContainer.innerHTML = '';
                //videoPlaceholder.innerHTML = 'Video Player Area';
                
                const messages = ["Analyzing shots...", "Detecting rallies...", "Compiling report...", "Finalizing..."];
                let messageIndex = 0;
                loadingText.textContent = messages[messageIndex];
                const interval = setInterval(() => {
                    messageIndex = (messageIndex + 1) % messages.length;
                    loadingText.textContent = messages[messageIndex];
                }, 1500);

                setTimeout(() => {
                    clearInterval(interval);
                    loadingOverlay.classList.add('hidden');
                    renderAnalysisResults();
                }, 5000);
            }

            function renderAnalysisResults() {
    // GANTIKAN BAGIAN for-loop LAMA ANDA DENGAN SEMUA KODE DI BAWAH INI

// =========================================================================
// MOCKUP DATA PERTANDINGAN - Silakan edit 'time' dan 'type' di bawah ini
// =========================================================================
const mockAnalysisData = [
    // Poin 1 (dimulai dari detik ke-12)
    { time: 12, type: 'ERROR' },   // Pukulan pertama, error. (0:12)

    // Poin 2 (dimulai dari detik ke-25, ada reli singkat)
    { time: 31, type: 'WINNER' },  // Reli selesai dengan winner. (0:31)

    // Poin 3 (dimulai dari detik ke-45)
    { time: 52, type: 'WINNER' },  // Winner cepat. (0:52)

    // Poin 4 (dimulai dari 1 menit 5 detik)
    { time: 68, type: 'ERROR' },   // Error setelah beberapa pukulan. (1:08)
    
    // Poin 5 (Reli panjang, dimulai dari 1 menit 20 detik)
    { time: 143, type: 'WINNER' }, // Winner di menit 2:23 (143 detik)
    
    // Poin 6 
    { time: 155, type: 'ERROR' },  // Error di menit 2:35 (155 detik)
    
    // Poin 7
    { time: 181, type: 'WINNER' }, // Winner di menit 3:01 (181 detik)
    
    // Poin 8
    { time: 204, type: 'WINNER' }, // Winner di menit 3:24 (204 detik)

    // Poin 9
    { time: 220, type: 'ERROR' },  // Error di menit 3:40 (220 detik)
    
    // Poin 10
    { time: 245, type: 'WINNER' }, // Winner di menit 4:05 (245 detik)
    
    // Poin 11
    { time: 261, type: 'WINNER' }, // Winner di menit 4:21 (261 detik)
    
    // Poin 12
    { time: 288, type: 'ERROR' },  // Error di menit 4:48 (288 detik)
    
    // Poin 13
    { time: 305, type: 'WINNER' }, // Winner di menit 5:05 (305 detik)
    
    // Poin 14
    { time: 318, type: 'ERROR' },  // Error di menit 5:18 (318 detik)

    // Poin 15
    { time: 340, type: 'WINNER' }, // Winner di menit 5:40 (340 detik)
];


const winners = mockAnalysisData.filter(shot => shot.type === 'WINNER').length;
const errors = mockAnalysisData.filter(shot => shot.type === 'ERROR').length;
const totalShots = winners + errors;
const longestRally = 22; // Anda bisa sesuaikan ini secara manual jika mau
const winnerPercentage = totalShots > 0 ? Math.round((winners / totalShots) * 100) : 0;
    
    // Kosongkan container hasil
    resultsContainer.innerHTML = '';

    // --- BAGIAN 1: SUMMARY CARD ---
    const summaryContainer = document.createElement('div');
    summaryContainer.className = "bg-white p-4 rounded-lg card-shadow stagger-in-1";
    summaryContainer.innerHTML = `
        <h3 class="font-bold text-slate-800 mb-4 text-md">Match Summary</h3>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-12 p-2">
            <div class="w-36 h-36 relative chart-glow">
                <canvas id="summaryChart"></canvas>
                <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span class="text-3xl font-bold text-slate-800">${totalShots}</span>
                    <span class="text-xs font-semibold text-slate-500">Total Shots</span>
                </div>
            </div>
            <div class="flex flex-col gap-4 text-left">
                <div class="flex items-center gap-3"><div class="w-3 h-3 rounded-full bg-sky-500"></div><span class="font-semibold text-slate-600">${winners} Winners (${winnerPercentage}%)</span></div>
                <div class="flex items-center gap-3"><div class="w-3 h-3 rounded-full bg-amber-500"></div><span class="font-semibold text-slate-600">${errors} Errors</span></div>
            </div>
            <div class="sm:border-l sm:pl-8 md:pl-12">
                <div class="text-left"><p class="text-2xl font-bold text-slate-700">${longestRally}</p><p class="text-sm text-slate-500 font-semibold">Longest Rally</p></div>
            </div>
        </div>
        <button id="share-btn" class="w-full mt-4 text-sm text-sky-600 bg-sky-100 hover:bg-sky-200 font-semibold py-2 px-3 rounded-md flex items-center justify-center transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 mr-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            Share Results
        </button>`;
    resultsContainer.appendChild(summaryContainer);

    if (summaryChartInstance) summaryChartInstance.destroy();
    const ctx = document.getElementById('summaryChart').getContext('2d');
    summaryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: { datasets: [{ data: [winners, errors], backgroundColor: ['#0ea5e9', '#f59e0b'], borderWidth: 8, borderColor: '#ffffff' }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { display: false }, tooltip: { enabled: true } } }
    });

    // --- BAGIAN 2: SHOT LIST DENGAN NOTES ---
    const shotListContainer = document.createElement('div');
    shotListContainer.className = "bg-white p-4 rounded-lg card-shadow stagger-in-2";
    
    // INI SATU-SATUNYA TEMPAT "let shotListHTML" MUNCUL
    let shotListHTML = `<div class="grid grid-cols-4 gap-4 text-sm font-bold text-slate-500 px-3 pb-2 border-b"><span>TYPE</span><span>TIMESTAMP</span><span class="col-span-2">NOTES & ACTIONS</span></div><div class="space-y-2 pt-2">`;
    
    mockAnalysisData.forEach((shot, index) => {
        const isWinner = shot.type === 'WINNER';
        shotListHTML += `
        <div class="grid grid-cols-4 gap-4 items-center bg-slate-50 p-3 rounded-md hover:bg-slate-100 transition-all duration-300">
            <div>
                <span class="text-xs font-bold px-2 py-1 rounded-full ${isWinner ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">${shot.type}</span>
            </div>
            <div class="font-medium text-slate-600 text-sm">
                Shot at ${formatTime(shot.time)}
            </div>
            <div class="col-span-2 flex items-center gap-2">
                <input type="text" placeholder="Add a note..." data-index="${index}" class="note-input w-full text-sm bg-slate-200/50 rounded-md p-2 border-transparent focus:bg-white focus:border-sky-500 focus:ring-0 transition">
                <button class="jump-btn text-xs text-sky-600 bg-sky-100 hover:bg-sky-200 font-semibold py-2 px-3 rounded-md flex-shrink-0" data-time="${shot.time}">
                    Review
                </button>
            </div>
        </div>`;
    });
    shotListHTML += `</div>`;
    shotListContainer.innerHTML = shotListHTML;
    resultsContainer.appendChild(shotListContainer);

    // --- BAGIAN 3: EVENT LISTENER UNTUK TOMBOL SHARE ---
    document.getElementById('share-btn').addEventListener('click', () => {
        shareStatsContainer.innerHTML = `<h2 class="text-xl font-semibold text-white mb-4">Padel Session</h2><div class="text-left space-y-4"><div><p class="text-sm text-slate-300">Playtime</p><p class="text-3xl font-bold text-white">1h 5m</p></div><div class="space-y-3 pt-2"><div class="flex justify-between items-baseline"><p class="text-sm text-slate-300">Total Shots</p><p class="text-2xl font-bold text-white">${totalShots}</p></div><div class="flex justify-between items-baseline"><p class="text-sm text-slate-300">Longest Rally</p><p class="text-2xl font-bold text-white">${longestRally}</p></div><div class="flex justify-between items-baseline"><p class="text-sm text-slate-300">Winners</p><p class="text-2xl font-bold text-green-400">${winnerPercentage}%</p></div></div></div>`;
        shareModal.classList.remove('hidden');
    });
}

            function renderHistory() {
                const mockHistoryData = [
                    { date: '18 May 2025', totalShots: 38, winners: 15, errors: 23 },
                    { date: '22 May 2025', totalShots: 62, winners: 35, errors: 27 },
                    { date: '25 May 2025', totalShots: 45, winners: 20, errors: 25 },
                    { date: '28 May 2025', totalShots: 55, winners: 35, errors: 20 },
                ];
                historyList.innerHTML = '';
                mockHistoryData.forEach(item => {
                    const historyItem = document.createElement('div');
                    historyItem.className = 'bg-slate-100/80 border border-slate-200/80 p-4 rounded-lg flex items-center justify-between';
                    historyItem.innerHTML = `<div><p class="font-bold text-slate-800">${item.date}</p><p class="text-sm text-slate-500">${item.totalShots} shots (<span class="text-green-600 font-semibold">${item.winners} W</span>, <span class="text-red-600 font-semibold">${item.errors} E</span>)</p></div><button class="text-sm text-sky-600 bg-sky-100 hover:bg-sky-200 font-semibold py-2 px-4 rounded-md">View</button>`;
                    historyList.appendChild(historyItem);
                });
                renderHistoryChart(mockHistoryData);
            }

            function renderHistoryChart(data) {
                const labels = data.map(item => item.date.substring(0, 6));
                const winnerPercentages = data.map(item => item.totalShots > 0 ? Math.round((item.winners / item.totalShots) * 100) : 0);
                
                if (historyChartInstance) historyChartInstance.destroy();
                const ctx = document.getElementById('historyChart').getContext('2d');
                historyChartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Winner %',
                            data: winnerPercentages,
                            borderColor: '#0ea5e9',
                            backgroundColor: 'rgba(14, 165, 233, 0.1)',
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: '#0ea5e9',
                            pointHoverRadius: 6,
                        }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        scales: { y: { beginAtZero: true, max: 100, ticks: { callback: value => value + '%' } } },
                        plugins: { legend: { display: false } }
                    }
                });
            }

            closeModalBtn.addEventListener('click', () => shareModal.classList.add('hidden'));

            function formatTime(seconds) {
                return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
            }
        });