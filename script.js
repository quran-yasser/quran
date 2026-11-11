const urlInput = document.getElementById("urlInput");
const pasteBtn = document.getElementById("pasteBtn");
const downloadBtn = document.getElementById("downloadBtn");

const loading = document.getElementById("loading");
const resultContainer = document.getElementById("resultContainer");

const mediaTitle = document.getElementById("mediaTitle");
const downloadLinks = document.getElementById("downloadLinks");

const message = document.getElementById("message");


// زر اللصق
pasteBtn.addEventListener("click", async () => {

    try {

        const text = await navigator.clipboard.readText();

        urlInput.value = text;

        showMessage("");

    } catch (error) {

        showMessage("المتصفح منع الوصول للحافظة.");

    }

});


// زر التحميل
downloadBtn.addEventListener("click", async () => {

    const url = urlInput.value.trim();

    if (!url) {

        showMessage("الصق رابط الفيديو أولاً.");

        return;
    }

    if (!isValidUrl(url)) {

        showMessage("الرابط غير صحيح.");

        return;
    }

    hideResult();

    showMessage("");

    loading.classList.remove("hidden");

    downloadBtn.disabled = true;

    try {

        /*
         * هنا يتم إرسال الرابط إلى السيرفر الخاص بك.
         *
         * مثال:
         * POST /api/download
         *
         * السيرفر المفترض يرجع:
         *
         * {
         *   "title": "اسم الفيديو",
         *   "downloads": [
         *      {
         *          "quality": "1080p",
         *          "format": "MP4",
         *          "url": "https://example.com/video.mp4"
         *      }
         *   ]
         * }
         */

        const response = await fetch("/api/download", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                url: url
            })

        });


        if (!response.ok) {

            throw new Error("فشل الاتصال بالسيرفر.");

        }


        const data = await response.json();


        if (!data.downloads || data.downloads.length === 0) {

            throw new Error("لم يتم العثور على ملف قابل للتحميل.");

        }


        mediaTitle.textContent =
            data.title || "الفيديو جاهز للتحميل";


        downloadLinks.innerHTML = "";


        data.downloads.forEach(item => {

            const link = document.createElement("a");

            link.className = "download-link";

            link.href = item.url;

            link.download = "";

            link.target = "_blank";

            link.rel = "noopener noreferrer";


            link.innerHTML = `
                <span>
                    ${item.quality || "جودة"}
                    -
                    ${item.format || "Video"}
                </span>

                <span>
                    تحميل
                </span>
            `;


            downloadLinks.appendChild(link);

        });


        resultContainer.classList.remove("hidden");

    }

    catch (error) {

        showMessage(
            error.message ||
            "حدث خطأ أثناء تجهيز الفيديو."
        );

    }

    finally {

        loading.classList.add("hidden");

        downloadBtn.disabled = false;

    }

});


// التحقق من الرابط
function isValidUrl(value) {

    try {

        const url = new URL(value);

        return (
            url.protocol === "http:" ||
            url.protocol === "https:"
        );

    } catch {

        return false;

    }

}


// إظهار رسالة
function showMessage(text) {

    message.textContent = text;

}


// إخفاء النتيجة
function hideResult() {

    resultContainer.classList.add("hidden");

    downloadLinks.innerHTML = "";

}
