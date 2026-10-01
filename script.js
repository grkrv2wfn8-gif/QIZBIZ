async function askAI() {
    const inputField = document.getElementById('user-input');
    const resultBox = document.getElementById('ai-result');
    const userPrompt = inputField.value.trim();

    if (!userPrompt) {
        resultBox.textContent = "Iltimos, biznesingiz yoki loyihangiz bo'yicha savolingizni yozing!";
        return;
    }

    resultBox.textContent = "QIZBIZ AI biznes rejangizni tahlil qilmoqda... ⏳";

    // O'zingizning haqiqiy Gemini API kalitingizni shu yerga qo'ying:
    const apiKey = "SIZNING_GEMINI_API_KALITINGIZ"; 
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
                            { 
                                text: "Sen professional ayol tadbirkorlar uchun tajribali va zamonaviy biznes mentorisan (QIZBIZ AI). " +
                                      "Foydalanuvchiga qisqa, aniq, amaliy va motivatsion maslahat ber. " +
                                      "Foydalanuvchi so'rovi: " + userPrompt 
                            }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            resultBox.textContent = data.candidates[0].content.parts[0].text;
        } else {
            resultBox.textContent = "Kechirasiz, javob olishda xatolik yuz berdi. API kalitingizni tekshiring.";
        }

    } catch (error) {
        console.error("Xato:", error);
        resultBox.textContent = "Internet aloqasi yoki so'rovda xatolik yuz berdi.";
    }
}
