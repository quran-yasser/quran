const surahsData = [
    "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
    "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
    "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
    "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
    "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
    "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
    "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
    "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
    "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
    "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
    "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
    "المسد", "الإخلاص", "الفلق", "الناس"
];

const surahSelect = document.getElementById('surahSelect');
const playerBox = document.getElementById('playerBox');
const audioElement = document.getElementById('audioElement');
const selectedTitle = document.getElementById('selectedTitle');

// تعبئة القائمة المنسدلة بالسور الـ 114
surahsData.forEach((name, index) => {
    const surahNum = index + 1;
    const option = document.createElement('option');
    option.value = surahNum;
    option.textContent = `${surahNum}. سورة ${name}`;
    surahSelect.appendChild(option);
});

// عند اختيار سورة من القائمة
surahSelect.addEventListener('change', (e) => {
    const surahNum = e.target.value;
    if (!surahNum) {
        playerBox.style.display = 'none';
        audioElement.pause();
        return;
    }

    const paddedId = String(surahNum).padStart(3, '0');
    const audioUrl = `https://server11.mp3quran.net/yasser/${paddedId}.mp3`;
    const surahName = surahsData[surahNum - 1];

    selectedTitle.textContent = `سورة ${surahName} (الشيخ ياسر الدوسري)`;
    audioElement.src = audioUrl;
    audioElement.play();
    playerBox.style.display = 'block';
});
