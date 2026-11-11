document.addEventListener('DOMContentLoaded', () => {
    const videoUrlInput = document.getElementById('videoUrl');
    const pasteBtn = document.getElementById('pasteBtn');
    const clearBtn = document.getElementById('clearBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const loader = document.getElementById('loader');
    const resultContainer = document.getElementById('resultContainer');
    
    const videoCover = document.getElementById('videoCover');
    const authorName = document.getElementById('authorName');
    const videoDesc = document.getElementById('videoDesc');
    const statLikes = document.getElementById('statLikes');
    const statComments = document.getElementById('statComments');
    const statShares = document.getElementById('statShares');

    const downloadHD = document.getElementById('downloadHD');
    const downloadWatermark = document.getElementById('downloadWatermark');
    const downloadAudio = document.getElementById('downloadAudio');
    const downloadCover = document.getElementById('downloadCover');

    const historySection = document.getElementById('historySection');
    const historyList = document.getElementById('historyList');

    // إظهار أو إخفاء زر المسح بناءً على وجود نص
    videoUrlInput.addEventListener('input', () => {
        if (videoUrlInput.value.trim() !== '') {
            clearBtn.style.display = 'block';
            pasteBtn.style.display = 'none';
        } else {
            clearBtn.style.display = 'none';
            pasteBtn.style.display = 'block';
        }
    });

    // زر اللصق
    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            videoUrlInput.value = text;
            videoUrlInput.dispatchEvent(new Event('input'));
        } catch (err) {
            alert('تعذر الوصول إلى الحافظة تلقائياً، يرجى اللصق يدوياً.');
        }
    });

    // زر المسح
    clearBtn.addEventListener('click', () => {
        videoUrlInput.value = '';
        videoUrlInput.dispatchEvent(new Event('input'));
        resultContainer.style.display = 'none';
    });

    // تنفيذ عملية الاستخراج والتحميل
    downloadBtn.addEventListener('click', async () => {
        const url = videoUrlInput.value.trim();
        if (!url) {
            alert('الرجاء إدخال رابط فيديو تيك توك أولاً!');
            return;
        }

        loader.style.display = 'block';
        resultContainer.style.display = 'none';

        try {
            // استخدام API مجاني وسريع لجلب بيانات تيك توك بدون علامة مائية
            const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
            const data = await response.json();

            loader.style.display = 'none';

            if (data.code === 0 && data.data) {
                const videoData = data.data;

                // تعبئة البيانات في الواجهة
                videoCover.src = videoData.cover || videoData.origin_cover;
                authorName.textContent = videoData.author?.nickname || videoData.author?.unique_id || 'مستخدم تيك توك';
                videoDesc.textContent = videoData.title || 'بدون وصف';
                statLikes.textContent = formatNumber(videoData.digg_count);
                statComments.textContent = formatNumber(videoData.comment_count);
                statShares.textContent = formatNumber(videoData.share_count);

                // روابط التحميل المباشرة
                downloadHD.href = videoData.hdplay || videoData.play;
                downloadWatermark.href = videoData.play;
                downloadAudio.href = videoData.music;
                downloadCover.href = videoData.cover;

                resultContainer.style.display = 'block';

                // إضافة للسجل المحلي
                addToHistory(videoData.title || 'فيديو تيك توك', videoData.hdplay || videoData.play);

            } else {
                alert('فشل في جلب الفيديو، تأكد من صحة الرابط وحاول مرة أخرى.');
            }

        } catch (error) {
            loader.style.display = 'none';
            alert('حدث خطأ أثناء الاتصال بالخادم. تأكد من اتصالك بالإنترنت.');
            console.error(error);
        }
    });

    // تنسيق الأرقام (الإعجابات والمشاهدات)
    function formatNumber(num) {
        if (!num) return '0';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    }

    // إدارة سجل التحميلات
    function addToHistory(title, link) {
        historySection.style.display = 'block';
        let history = JSON.parse(localStorage.getItem('tiktok_history') || '[]');
        
        // منع التكرار وإضافة الجديد بالأعلى
        history = history.filter(item => item.link !== link);
        history.unshift({ title, link, date: new Date().toLocaleDateString('ar-EG') });
        
        if (history.length > 5) history.pop(); // الاحتفاظ بأحدث 5 فقط
        
        localStorage.setItem('tiktok_history', JSON.stringify(history));
        renderHistory();
    }

    function renderHistory() {
        const history = JSON.parse(localStorage.getItem('tiktok_history') || '[]');
        if (history.length === 0) {
            historySection.style.display = 'none';
            return;
        }

        historyList.innerHTML = '';
        history.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <span style="max-width: 70%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.title}</span>
                <a href="${item.link}" target="_blank" class="dl-btn hd-btn" style="padding: 4px 10px; font-size: 0.75rem;">تحميل مباشر</a>
            `;
            historyList.appendChild(div);
        });
    }

    // استعراض السجل عند التحميل
    renderHistory();
});
