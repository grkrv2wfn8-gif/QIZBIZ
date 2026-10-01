// AI bilan bog'lanish va javob olish funksiyasi
async function handleAIRequest() {
    const userInput = document.getElementById('user-input').value;
    const resultBox = document.getElementById('ai-result');

    if (!userInput.trim()) {
        resultBox.textContent = "Iltimos, biror narsa yozing!";
        return;
    }

    resultBox.textContent = "O'ylayapman... ⏳";

    try {
        // Bu yerda o'zingizning AI API so'rovingiz bo'ladi.
        // Hozircha sinab ko'rish uchun vaqtinchalik javob qaytarib turamiz:
        setTimeout(() => {
            resultBox.textContent = `QIZBIZ AI javobi: "${userInput" degan savolingiz bo'yicha tahlil tayyor!`;
        }, 1000);

    } catch (error) {
        console.error(error);
        resultBox.textContent = "Xatolik yuz berdi. Qaytadan urinib ko'ring.";
    }
}
