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
            const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
            const data = await response.json();

            loader.style.display = 'none';

            if (data.code === 0 && data.data) {
                const videoData = data.data;

                videoCover.src = videoData.cover || videoData.origin_cover;
                authorName.textContent = videoData.author?.nickname || videoData.author?.unique_id || 'مستخدم تيك توك';
                videoDesc.textContent = videoData.title || 'بدون وصف';
                statLikes.textContent = formatNumber(videoData.digg_count);
                statComments.textContent = formatNumber(videoData.comment_count);
                statShares.textContent = formatNumber(videoData.share_count);

                downloadHD.href = videoData.hdplay || videoData.play;
                downloadWatermark.href = videoData.play;
                downloadAudio.href = videoData.music;
                downloadCover.href = videoData.cover;

                resultContainer.style.display = 'block';
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
        history.unshift({ title, link, date: new Date().toLocaleDateString('ar-EG') });
        if (history.length > 5) history.pop();
        localStorage.setItem('tiktok_history', JSON.stringify(history));
        renderHistory();
    }

    renderHistory();
});
