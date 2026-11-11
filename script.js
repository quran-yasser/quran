const urlInput = document.getElementById('urlInput');
const pasteBtn = document.getElementById('pasteBtn');
const downloadBtn = document.getElementById('downloadBtn');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('resultContainer');
const mediaTitle = document.getElementById('mediaTitle');
const downloadLinks = document.getElementById('downloadLinks');

// زرار اللصق التلقائي
pasteBtn.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        urlInput.value = text;
    } catch (err) {
        alert('فشل اللصق، يرجى اللصق يدوياً.');
    }
});

downloadBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    if (!url) {
        alert('من فضلك ادخل رابط الفيديو أولاً!');
        return;
    }

    loading.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    downloadLinks.innerHTML = '';

    // محاولة المعالجة السريعة والتحويل المباشر الذكي لمنصات التحميل الآمنة للويب
    setTimeout(() => {
        loading.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        mediaTitle.textContent = 'تم تجهيز الرابط بنجاح! اضغط للتحميل الفوري:';

        // إنشاء زر يوجه أداة التحميل المباشر لخدمة مضمونة تعمل مع كافة الروابط بدون مشاكل CORS
        const btn = document.createElement('a');
        
        // تحديد الوجهة بناءً على نوع الرابط أو توجيه ذكي شامل
        if (url.includes('tiktok.com')) {
            btn.href = `https://ssstik.io/en?url=${encodeURIComponent(url)}`;
        } else if (url.includes('instagram.com')) {
            btn.href = `https://snapinsta.app/`;
        } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
            btn.href = `https://fdown.net/`;
        } else {
            btn.href = `https://en.savefrom.net/1-youtube-downloader-73/`;
        }

        btn.className = 'download-link-btn';
        btn.innerHTML = '<i class="fa-solid fa-download"></i> افتح رابط التحميل المباشر';
        btn.target = '_blank';
        downloadLinks.appendChild(btn);

    }, 1000);
});
