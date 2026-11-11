const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static("."));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/download", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            error: "الرابط غير موجود"
        });
    }

    return res.status(400).json({
        error: "السيرفر محتاج خدمة معالجة فيديو مخصصة."
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
