const surahsData = [
    { id: 1, name: "الفاتحة", type: "مكية", آیات: 7 },
    { id: 2, name: "البقرة", type: "مدنية", آیات: 286 },
    { id: 3, name: "آل عمران", type: "مدنية", آیات: 200 },
    { id: 4, name: "النساء", type: "مدنية", آیات: 176 },
    { id: 5, name: "المائدة", type: "مدنية", آیات: 120 },
    { id: 6, name: "الأنعام", type: "مكية", آیات: 165 },
    { id: 7, name: "الأعراف", type: "مكية", آیات: 206 },
    { id: 8, name: "الأنفال", type: "مدنية", آیات: 75 },
    { id: 9, name: "التوبة", type: "مدنية", آیات: 129 },
    { id: 10, name: "يونس", type: "مكية", آیات: 109 },
    { id: 11, name: "هود", type: "مكية", آیات: 123 },
    { id: 12, name: "يوسف", type: "مكية", آیات: 111 },
    { id: 13, name: "الرعد", type: "مدنية", آیات: 43 },
    { id: 14, name: "إبراهيم", type: "مكية", آیات: 52 },
    { id: 15, name: "الحجر", type: "مكية", آیات: 99 },
    { id: 16, name: "النحل", type: "مكية", آیات: 128 },
    { id: 17, name: "الإسراء", type: "مكية", آیات: 111 },
    { id: 18, name: "الكهف", type: "مكية", آیات: 110 },
    { id: 19, name: "مريم", type: "مكية", آیات: 98 },
    { id: 20, name: "طه", type: "مكية", آیات: 135 },
    { id: 21, name: "الأنبياء", type: "مكية", آیات: 112 },
    { id: 22, name: "الحج", type: "مدنية", آیات: 78 },
    { id: 23, name: "المؤمنون", type: "مكية", آیات: 118 },
    { id: 24, name: "النور", type: "مدنية", آیات: 64 },
    { id: 25, name: "الفرقان", type: "مكية", آیات: 77 },
    { id: 26, name: "الشعراء", type: "مكية", آیات: 227 },
    { id: 27, name: "النمل", type: "مكية", آیات: 93 },
    { id: 28, name: "القصص", type: "مكية", آیات: 88 },
    { id: 29, name: "العنكبوت", type: "مكية", آیات: 69 },
    { id: 30, name: "الروم", type: "مكية", آیات: 60 },
    { id: 31, name: "لقمان", type: "مكية", آیات: 34 },
    { id: 32, name: "السجدة", type: "مكية", آیات: 30 },
    { id: 33, name: "الأحزاب", type: "مدنية", آیات: 73 },
    { id: 34, name: "سبأ", type: "مكية", آیات: 54 },
    { id: 35, name: "فاطر", type: "مكية", آیات: 45 },
    { id: 36, name: "يس", type: "مكية", آیات: 83 },
    { id: 37, name: "الصافات", type: "مكية", آیات: 182 },
    { id: 38, name: "ص", type: "مكية", آیات: 88 },
    { id: 39, name: "الزمر", type: "مكية", آیات: 75 },
    { id: 40, name: "غافر", type: "مكية", آیات: 85 },
    { id: 41, name: "فصلت", type: "مكية", آیات: 54 },
    { id: 42, name: "الشورى", type: "مكية", آیات: 53 },
    { id: 43, name: "الزخرف", type: "مكية", آیات: 89 },
    { id: 44, name: "الدخان", type: "مكية", آیات: 59 },
    { id: 45, name: "الجاثية", type: "مكية", آیات: 37 },
    { id: 46, name: "الأحقاف", type: "مكية", آیات: 35 },
    { id: 47, name: "محمد", type: "مدنية", آیات: 38 },
    { id: 48, name: "الفتح", type: "مدنية", آیات: 29 },
    { id: 49, name: "الحجرات", type: "مدنية", آیات: 18 },
    { id: 50, name: "ق", type: "مكية", آیات: 45 },
    { id: 51, name: "الذاريات", type: "مكية", آیات: 60 },
    { id: 52, name: "الطور", type: "مكية", آیات: 49 },
    { id: 53, name: "النجم", type: "مكية", آیات: 62 },
    { id: 54, name: "القمر", type: "مكية", آیات: 55 },
    { id: 55, name: "الرحمن", type: "مدنية", آیات: 78 },
    { id: 56, name: "الواقعة", type: "مكية", آیات: 96 },
    { id: 57, name: "الحديد", type: "مدنية", آیات: 29 },
    { id: 58, name: "المجادلة", type: "مدنية", آیات: 22 },
    { id: 59, name: "الحشر", type: "مدنية", آیات: 24 },
    { id: 60, name: "الممتحنة", type: "مدنية", آیات: 13 },
    { id: 61, name: "الصف", type: "مدنية", آیات: 14 },
    { id: 62, name: "الجمعة", type: "مدنية", آیات: 11 },
    { id: 63, name: "المنافقون", type: "مدنية", آیات: 11 },
    { id: 64, name: "التغابن", type: "مدنية", آیات: 18 },
    { id: 65, name: "الطلاق", type: "مدنية", آیات: 12 },
    { id: 66, name: "التحريم", type: "مدنية", آیات: 12 },
    { id: 67, name: "الملك", type: "مكية", آیات: 30 },
    { id: 68, name: "القلم", type: "مكية", آیات: 52 },
    { id: 69, name: "الحاقة", type: "مكية", آیات: 52 },
    { id: 70, name: "المعارج", type: "مكية", آیات: 44 },
    { id: 71, name: "نوح", type: "مكية", آیات: 28 },
    { id: 72, name: "الجن", type: "مكية", آیات: 28 },
    { id: 73, name: "المزمل", type: "مكية", آیات: 20 },
    { id: 74, name: "المدثر", type: "مكية", آیات: 56 },
    { id: 75, name: "القيامة", type: "مكية", آیات: 40 },
    { id: 76, name: "الإنسان", type: "مدنية", آیات: 31 },
    { id: 77, name: "المرسلات", type: "مكية", آیات: 50 },
    { id: 78, name: "النبأ", type: "مكية", آیات: 40 },
    { id: 79, name: "النازعات", type: "مكية", آیات: 46 },
    { id: 80, name: "عبس", type: "مكية", آیات: 42 },
    { id: 81, name: "التكوير", type: "مكية", آیات: 29 },
    { id: 82, name: "الانفطار", type: "مكية", آیات: 19 },
    { id: 83, name: "المطففين", type: "مكية", آیات: 36 },
    { id: 84, name: "الانشقاق", type: "مكية", آیات: 25 },
    { id: 85, name: "البروج", type: "مكية", آیات: 22 },
    { id: 86, name: "الطارق", type: "مكية", آیات: 17 },
    { id: 87, name: "الأعلى", type: "مكية", آیات: 19 },
    { id: 88, name: "الغاشية", type: "مكية", آیات: 26 },
    { id: 89, name: "الفجر", type: "مكية", آیات: 30 },
    { id: 90, name: "البلد", type: "مكية", آیات: 20 },
    { id: 91, name: "الشمس", type: "مكية", آیات: 15 },
    { id: 92, name: "الليل", type: "مكية", آیات: 21 },
    { id: 93, name: "الضحى", type: "مكية", آیات: 11 },
    { id: 94, name: "الشرح", type: "مكية", آیات: 8 },
    { id: 95, name: "التين", type: "مكية", آیات: 8 },
    { id: 96, name: "العلق", type: "مكية", آیات: 19 },
    { id: 97, name: "القدر", type: "مكية", آیات: 5 },
    { id: 98, name: "البينة", type: "مدنية", آیات: 8 },
    { id: 99, name: "الزلزلة", type: "مدنية", آیات: 8 },
    { id: 100, name: "العاديات", type: "مكية", آیات: 11 },
    { id: 101, name: "القارعة", type: "مكية", آیات: 11 },
    { id: 102, name: "التكاثر", type: "مكية", آیات: 8 },
    { id: 103, name: "العصر", type: "مكية", آیات: 3 },
    { id: 104, name: "الهُمَزة", type: "مكية", آیات: 9 },
    { id: 105, name: "الفيل", type: "مكية", آیات: 5 },
    { id: 106, name: "قريش", type: "مكية", آیات: 4 },
    { id: 107, name: "الماعون", type: "مكية", آیات: 7 },
    { id: 108, name: "الككوثر", type: "مكية", آیات: 3 },
    { id: 109, name: "الكافرون", type: "مكية", آیات: 6 },
    { id: 110, name: "النصر", type: "مدنية", آیات: 3 },
    { id: 111, name: "المسد", type: "مكية", آیات: 5 },
    { id: 112, name: "الإخلاص", type: "مكية", آیات: 4 },
    { id: 113, name: "الفلق", type: "مكية", آیات: 5 },
    { id: 114, name: "الناس", type: "مكية", آیات: 6 }
];

const container = document.getElementById('surahsContainer');
const searchInput = document.getElementById('searchInput');
const playerBar = document.getElementById('audioPlayerBar');
const audioElement = document.getElementById('audioElement');
const playPauseBtn = document.getElementById('playPauseBtn');
const playingTitle = document.getElementById('playingTitle');

let currentPlayingId = null;

function renderSurahs(list) {
    container.innerHTML = '';
    list.forEach(surah => {
        const paddedId = String(surah.id).padStart(3, '0');
        const card = document.createElement('div');
        card.className = `surah-card ${currentPlayingId === surah.id ? 'active' : ''}`;
        card.innerHTML = `
            <div class="surah-info">
                <h3>سورة ${surah.name}</h3>
                <span>${surah.type} • ${surah.آيات} آيات</span>
            </div>
            <div class="surah-number">${paddedId}</div>
        `;
        
        card.addEventListener('click', () => {
            playSurah(surah.id, surah.name);
        });
        
        container.appendChild(card);
    });
}

function playSurah(id, name) {
    const paddedId = String(id).padStart(3, '0');
    // رابط السيرفر الصوتي للشيخ ياسر الدوسري (MP3Quran)
    const audioUrl = `https://server11.mp3quran.net/yasser/${paddedId}.mp3`;
    
    if (currentPlayingId !== id) {
        currentPlayingId = id;
        audioElement.src = audioUrl;
        audioElement.play();
        playingTitle.textContent = `سورة ${name}`;
        playerBar.style.display = 'block';
    } else {
        if (audioElement.paused) {
            audioElement.play();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            audioElement.pause();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    }
    renderSurahs(surahsData);
}

playPauseBtn.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audioElement.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.trim();
    const filtered = surahsData.filter(s => s.name.includes(term));
    renderSurahs(filtered);
});

// عرض السور أول ما الصفحة تفتح
renderSurahs(surahsData);
