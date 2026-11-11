document.addEventListener('DOMContentLoaded', () => {
    const videoUrlInput = document.getElementById('videoUrl');
    const pasteBtn = document.getElementById('pasteBtn');
    const clearBtn = document.getElementById('clearBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const loader = document.getElementById('loader');
    const resultContainer = document.getElementById('resultContainer');
    
    // عناصر الحساب
    const authorAvatar = document.getElementById('authorAvatar');
    const authorNickname = document.getElementById('authorNickname');
    const authorId = document.getElementById('authorId');

    // عناصر الفيديو
    const videoCover = document.getElementById('videoCover');
    const videoDesc = document.getElementById('videoDesc');
    const statLikes = document.getElementById('statLikes');
    const statComments = document.getElementById('statComments');
    const statShares = document.getElementById('statShares');

    // أزرار التحميل
    const downloadHD = document.getElementById('downloadHD');
    const downloadWatermark = document.getElementById('downloadWatermark');
    const downloadAudio = document.getElementById('downloadAudio');
    const downloadCover = document.getElementById('downloadCover');

    const historySection = document.getElementById('historySection');
    const historyList = document.getElementById('historyList');

    videoUrlInput.addEventListener('input', () => {
        if (videoUrlInput.value.trim() !== '') {
            clearBtn.style.display = 'block';
            pasteBtn.style.display = 'none';
        } else {
            clearBtn.style.display = 'none';
            pasteBtn.style.display = 'block';
        }
    });

    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            videoUrlInput.value = text;
            videoUrlInput.dispatchEvent(new Event('input'));
        } catch (err) {
            alert('تعذر الوصول إلى الحافظة تلقائياً، يرجى اللصق يدوياً.');
        }
    });

    clearBtn.addEventListener('click', () => {
        videoUrlInput.value = '';
        videoUrlInput.dispatchEvent(new Event('input'));
        resultContainer.style.display = 'none';
    });

    downloadBtn.addEventListener('click', async () => {
        let rawUrl = videoUrlInput.value.trim();
        if (!rawUrl) {
            alert('الرجاء إدخال رابط فيديو تيك توك أولاً!');
            return;
        }

        // استخراج رابط تيك توك الأساسي وتطهير أي زيادات أو علامات استفهام خاطئة
        let cleanUrl = rawUrl;
        if (rawUrl.includes('tiktok.com')) {
            const match = rawUrl.match(/(https?:\/\/[^\s]+)/);
            if (match) {
                cleanUrl = match[0].split('?')[0]; // إزالة الـ parameters الزائدة التي تسبب المشاكل
            }
        }

        loader.style.display = 'block';
        resultContainer.style.display = 'none';

        try {
            // استخدام وسيط آمن (CORS Proxy) لضمان جلب البيانات بدون مشاكل حظر المتصفح
            const apiURL = `https://tikwm.com/api/?url=${encodeURIComponent(cleanUrl)}`;
            const proxyURL = `https://corsproxy.io/?` + encodeURIComponent(apiURL);
            
            const response = await fetch(proxyURL);
            const resData = await response.json();

            loader.style.display = 'none';

            if (resData.code === 0 && resData.data) {
                const videoData = resData.data;
                const author = videoData.author || {};

                // تعبئة معلومات الحساب
                authorAvatar.src = author.avatar || 'https://via.placeholder.com/150';
                authorNickname.textContent = author.nickname || 'مستخدم تيك توك';
                authorId.textContent = `@${author.unique_id || 'tiktok_user'}`;

                // تعبئة تفاصيل الفيديو
                videoCover.src = videoData.cover || videoData.origin_cover;
                videoDesc.textContent = videoData.title || 'بدون وصف';
                statLikes.textContent = formatNumber(videoData.digg_count);
                statComments.textContent = formatNumber(videoData.comment_count);
                statShares.textContent = formatNumber(videoData.share_count);

                // روابط التحميل
                downloadHD.href = videoData.hdplay || videoData.play;
                downloadWatermark.href = videoData.play;
                downloadAudio.href = videoData.music;
                downloadCover.href = videoData.cover;

                resultContainer.style.display = 'block';
                addToHistory(videoData.title || 'فيديو تيك توك', videoData.hdplay || videoData.play);

            } else {
                alert('فشل في جلب الفيديو، تأكد من أن الرابط صحيح وأن الحساب عام.');
            }

        } catch (error) {
            loader.style.display = 'none';
            alert('حدث خطأ أثناء الاتصال بالخادم. تأكد من اتصالك بالإنترنت وصحة الرابط.');
            console.error(error);
        }
    });

    function formatNumber(num) {
        if (!num) return '0';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    }

    function addToHistory(title, link) {
        historySection.style.display = 'block';
        let history = JSON.parse(localStorage.getItem('tiktok_history') || '[]');
        history = history.filter(item => item.link !== link);
        history.unshift({ title, link });
        if (history.length > 5) history.pop();
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

    renderHistory();
});
