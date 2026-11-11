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
        const url = videoUrlInput.value.trim();
        if (!url) {
            alert('الرجاء إدخال رابط فيديو تيك توك أولاً!');
            return;
        }

        loader.style.display = 'block';
        resultContainer.style.display = 'none';

        try {
            // استخدام API بديل ومستقر يدعم HTTPS بالكامل
            const apiURL = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;
            const response = await fetch(apiURL);
            const data = await response.json();

            loader.style.display = 'none';

            if (data.code === 0 && data.data) {
                const videoData = data.data;
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

                // الروابط (تمت إضافة روابط بديلة لضمان التحميل المباشر)
                downloadHD.href = videoData.hdplay || videoData.play;
                downloadWatermark.href = videoData.play;
                downloadAudio.href = videoData.music;
                downloadCover.href = videoData.cover;

                resultContainer.style.display = 'block';
                addToHistory(videoData.title || 'فيديو تيك توك', videoData.hdplay || videoData.play);

            } else {
                alert('فشل في جلب الفيديو، تأكد من أن الرابط صحيح وعام.');
            }

        } catch (error) {
            loader.style.display = 'none';
            // في حال حدوث حظر من المتصفح، نقوم بتوجيه الرابط عبر خدمة CorsProxy مجانية
            try {
                const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://tikwm.com/api/?url=${url}`)}`;
                const proxyRes = await fetch(proxyURL);
                const proxyData = await proxyRes.json();
                const data = JSON.parse(proxyData.contents);

                if (data.code === 0 && data.data) {
                    const videoData = data.data;
                    const author = videoData.author || {};

                    authorAvatar.src = author.avatar || '';
                    authorNickname.textContent = author.nickname || 'مستخدم تيك توك';
                    authorId.textContent = `@${author.unique_id || 'user'}`;

                    videoCover.src = videoData.cover;
                    videoDesc.textContent = videoData.title || 'فيديو تيك توك';
                    statLikes.textContent = formatNumber(videoData.digg_count);
                    statComments.textContent = formatNumber(videoData.comment_count);
                    statShares.textContent = formatNumber(videoData.share_count);

                    downloadHD.href = videoData.hdplay || videoData.play;
                    downloadWatermark.href = videoData.play;
                    downloadAudio.href = videoData.music;
                    downloadCover.href = videoData.cover;

                    loader.style.display = 'none';
                    resultContainer.style.display = 'block';
                    return;
                }
            } catch (err2) {
                console.error(err2);
            }

            loader.style.display = 'none';
            alert('حدث خطأ أثناء الاتصال بالخادم. تأكد من أن الرابط صالح.');
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
