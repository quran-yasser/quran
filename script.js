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

    try {
        // API سريع ومباشر يدعم المنصات المختلفة
        const response = await fetch(`https://api.v2.tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        loading.classList.add('hidden');

        if (data.code === 0 && data.data) {
            resultContainer.classList.remove('hidden');
            mediaTitle.textContent = data.data.title || 'تم جلب الفيديو بنجاح!';

            // رابط التحميل بدون علامة مائية
            const videoUrl = data.data.play || data.data.wmplay;
            
            const btn = document.createElement('a');
            btn.href = videoUrl;
            btn.className = 'download-link-btn';
            btn.innerHTML = '<i class="fa-solid fa-download"></i> تحميل الفيديو (بدون علامة مائية)';
            btn.target = '_blank';
            btn.download = 'video.mp4';
            downloadLinks.appendChild(btn);
        } else {
            // محاولة بديلة لروابط المنصات الأخرى
            window.open(`https://snapinst.app/`, '_blank');
            alert('جاري توجيهك لأسرع محرك تحميل لهذا الرابط!');
        }

    } catch (error) {
        loading.classList.add('hidden');
        alert('تأكد من صحة الرابط وحاول مرة أخرى.');
    }
});
