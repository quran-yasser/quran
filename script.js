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
        const response = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        });

        const data = await response.json();
        loading.classList.add('hidden');

        if (data.status === 'error' || !data.url) {
            alert('عذراً، حدث خطأ أو الرابط غير مدعوم. تأكد من صحة الرابط.');
            return;
        }

        resultContainer.classList.remove('hidden');
        mediaTitle.textContent = data.filename || 'تم جلب الفيديو بنجاح!';

        // زرار تحميل الفيديو الأساسي
        const btn = document.createElement('a');
        btn.href = data.url;
        btn.className = 'download-link-btn';
        btn.innerHTML = '<i class="fa-solid fa-download"></i> تحميل الفيديو بجودة عالية';
        btn.target = '_blank';
        downloadLinks.appendChild(btn);

    } catch (error) {
        loading.classList.add('hidden');
        alert('حدث خطأ في الاتصال بالسيرفر. جرب مرة أخرى.');
    }
});
