const urlInput = document.getElementById('urlInput');
const pasteBtn = document.getElementById('pasteBtn');
const downloadBtn = document.getElementById('downloadBtn');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('resultContainer');
const mediaTitle = document.getElementById('mediaTitle');
const downloadLinks = document.getElementById('downloadLinks');

pasteBtn.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        urlInput.value = text;
    } catch (err) {
        alert('إلصق الرابط يدوياً');
    }
});

downloadBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    if (!url) {
        alert('أدخل الرابط أولاً!');
        return;
    }

    loading.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    downloadLinks.innerHTML = '';

    try {
        // استخدام خدمة API موثوقة لجلب روابط الفيديوهات مباشرة
        const response = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        loading.classList.add('hidden');

        if (data.code === 0 && data.data) {
            resultContainer.classList.remove('hidden');
            mediaTitle.textContent = data.data.title || 'تم جلب الفيديو بنجاح!';

            const videoUrl = data.data.play;

            const btn = document.createElement('a');
            btn.href = videoUrl;
            btn.className = 'download-link-btn';
            btn.innerHTML = '<i class="fa-solid fa-download"></i> تحميل الفيديو الآن';
            btn.target = '_blank';
            downloadLinks.appendChild(btn);
        } else {
            // بديل مباشر لو الرابط مش تيك توك
            resultContainer.classList.remove('hidden');
            mediaTitle.textContent = 'رابط جاهز للتحميل المباشر:';
            
            const btn = document.createElement('a');
            btn.href = url;
            btn.className = 'download-link-btn';
            btn.innerHTML = '<i class="fa-solid fa-download"></i> فتح ملف الفيديو';
            btn.target = '_blank';
            downloadLinks.appendChild(btn);
        }

    } catch (error) {
        loading.classList.add('hidden');
        alert('حدث خطأ، تأكد من صحة الرابط.');
    }
});
