async function fetchVideo() {
    const urlInput = document.getElementById('videoUrl').value.trim();
    const loading = document.getElementById('loading');
    const resultCard = document.getElementById('resultCard');

    if (!urlInput) {
        alert('من فضلك حط رابط فيديو تيك توك الأول!');
        return;
    }

    loading.classList.remove('hidden');
    resultCard.classList.add('hidden');

    try {
        const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(urlInput)}`);
        const result = await response.json();

        if (result.code === 0 && result.data) {
            const data = result.data;

            document.getElementById('thumbImg').src = data.cover;
            document.getElementById('videoTitle').textContent = data.title || 'فيديو تيك توك';
            document.getElementById('authorName').textContent = `@${data.author.unique_id} (${data.author.nickname})`;
            
            document.getElementById('noWatermarkBtn').href = data.play;
            document.getElementById('musicBtn').href = data.music;

            resultCard.classList.remove('hidden');
        } else {
            alert('عفواً، فشل في جلب الفيديو. تأكد من صحة الرابط وحاول مرة أخرى.');
        }
    } catch (error) {
        console.error('Error fetching TikTok video:', error);
        alert('حدث خطأ أثناء الاتصال. حاول مرة أخرى لاحقاً.');
    } finally {
        loading.classList.add('hidden');
    }
}
