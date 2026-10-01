 // Gemini API yordamida javob olish funksiyasi
async function askAI(userPrompt) {
    const resultBox = document.getElementById('ai-result');
    
    if (!userPrompt.trim()) {
        if (resultBox) resultBox.textContent = "Iltimos, savol yoki biznes rejangizni yozing!";
        return;
    }

    if (resultBox) resultBox.textContent = "QIZBIZ AI o'ylamoqda... ⏳";

    // O'zingizning haqiqiy Gemini API kalitingizni shu yerga qo'yasiz
    const apiKey = "SIZNING_GEMINI_API_KALITINGIZ"; 
    
    // Gemini API manzili (gemini-1.5-flash yoki gemini-pro modeli)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: "Sen QIZBIZ AI biznes mentorisan. Quyidagi savol yoki biznes bo'yicha maslahat ber: " + userPrompt }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();

        // API'dan kelgan javobni to'g'ri o'qib olish
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            if (resultBox) resultBox.textContent = aiResponse;
        } else {
            if (resultBox) resultBox.textContent = "Kechirasiz, AI'dan javob kelmadi. Kalitni tekshiring.";
        }

    } catch (error) {
        console.error("Xatolik:", error);
        if (resultBox) resultBox.textContent = "Internet aloqasi yoki API so'rovida xatolik yuz berdi.";
    }
}
