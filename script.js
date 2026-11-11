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

downloadBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (!url) {
        alert('أدخل الرابط أولاً!');
        return;
    }

    loading.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    downloadLinks.innerHTML = '';

    setTimeout(() => {
        loading.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        mediaTitle.textContent = 'جاهز للتحميل!';

        let targetUrl = '';
        if (url.includes('tiktok.com')) {
            targetUrl = `https://ssstik.io/en?url=${encodeURIComponent(url)}`;
        } else if (url.includes('instagram.com')) {
            targetUrl = `https://snapinsta.app/`;
        } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
            targetUrl = `https://fdown.net/`;
        } else {
            targetUrl = `https://cobalt.tools/`;
        }

        const btn = document.createElement('a');
        btn.href = targetUrl;
        btn.className = 'download-link-btn';
        btn.innerHTML = '<i class="fa-solid fa-download"></i> اضغط هنا لتحميل الفيديو فوراً';
        btn.target = '_blank';
        downloadLinks.appendChild(btn);

        // فتح التنزيل في نافذة جديدة مباشرة
        window.open(targetUrl, '_blank');
    }, 500);
});
