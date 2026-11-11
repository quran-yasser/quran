const urlInput = document.getElementById("urlInput");
const pasteBtn = document.getElementById("pasteBtn");
const downloadBtn = document.getElementById("downloadBtn");

const loading = document.getElementById("loading");
const resultContainer = document.getElementById("resultContainer");
const mediaTitle = document.getElementById("mediaTitle");
const downloadLinks = document.getElementById("downloadLinks");
const message = document.getElementById("message");


pasteBtn.addEventListener("click", async () => {
    try {
        const text = await navigator.clipboard.readText();
        urlInput.value = text;
        showMessage("");
    } catch {
        showMessage("مش قادر أوصل للحافظة.");
    }
});


downloadBtn.addEventListener("click", async () => {

    const url = urlInput.value.trim();

    if (!url) {
        showMessage("حط رابط Instagram الأول.");
        return;
    }

    if (!isInstagramUrl(url)) {
        showMessage("الموقع ده مخصص لروابط Instagram فقط.");
        return;
    }

    loading.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    downloadBtn.disabled = true;
    showMessage("");

    try {

        const response = await fetch("/api/download", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                url: url
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "حصل خطأ.");
        }

        mediaTitle.textContent =
            data.title || "فيديو Instagram";

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
                    ${item.quality || "Video"}
                    - ${item.format || "MP4"}
                </span>

                <span>تحميل</span>
            `;

            downloadLinks.appendChild(link);
        });

        resultContainer.classList.remove("hidden");

    } catch (error) {

        showMessage(
            error.message || "حصل خطأ أثناء تجهيز الفيديو."
        );

    } finally {

        loading.classList.add("hidden");
        downloadBtn.disabled = false;

    }
});


function isInstagramUrl(value) {

    try {

        const url = new URL(value);
        const host = url.hostname.toLowerCase();

        return (
            host === "instagram.com" ||
            host === "www.instagram.com"
        );

    } catch {

        return false;

    }
}


function showMessage(text) {
    message.textContent = text;
}
