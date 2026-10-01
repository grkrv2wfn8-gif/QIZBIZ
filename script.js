// Sahifa ochilganda oldin ro'yxatdan o'tganligini tekshirish
window.onload = function() {
    const savedName = localStorage.getItem('qizbiz_name');
    if (savedName) {
        showApp(savedName);
    }
};

function registerUser() {
    const name = document.getElementById('user-name').value.trim();
    const biz = document.getElementById('user-biz').value.trim();

    if (!name || !biz) {
        alert("Iltimos, ismingiz va biznes yo'nalishingizni kiriting!");
        return;
    }

    localStorage.setItem('qizbiz_name', name);
    localStorage.setItem('qizbiz_biz', biz);
    showApp(name);
}

function showApp(name) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('app-section').style.display = 'block';
    document.getElementById('welcome-msg').textContent = `Xush kelibsiz, ${name}!`;
}

function logoutUser() {
    localStorage.removeItem('qizbiz_name');
    localStorage.removeItem('qizbiz_biz');
    document.getElementById('app-section').style.display = 'none';
    document.getElementById('auth-section').style.display = 'block';
}

async function askAI() {
    const inputField = document.getElementById('user-input');
    const resultBox = document.getElementById('ai-result');
    const userPrompt = inputField.value.trim();
    const bizType = localStorage.getItem('qizbiz_biz') || "Biznes";

    if (!userPrompt) {
        resultBox.textContent = "Iltimos, biznesingiz bo'yicha savolingizni yozing!";
        return;
    }

    resultBox.textContent = "QIZBIZ AI tahlil qilmoqda... ⏳";

    // O'zingizning Gemini API kalitingizni shu yerga qo'ying:
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
                                text: `Sen professional ayol tadbirkorlar uchun tajribali biznes mentorisan (QIZBIZ AI). ` +
                                      `Foydalanuvchining biznes yo'nalishi: ${bizType}. ` +
                                      `Qisqa, aniq, amaliy va motivatsion maslahat ber. ` +
                                      `So'rov: ${userPrompt}` 
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
