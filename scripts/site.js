﻿
// Store emojis and associated text in a local variable
const emojis = [
    { emoji: "💒", text: "വിശ്വാസപ്രമാണം" },
    { emoji: "🌹", text: "എത്രയും ദയയുള്ള മാതാവേ" },
    { emoji: "📿", text: "ജപമാല" },
    { emoji: "❤‍🔥", text: "കരുണ കൊന്ത" },
    { emoji: "🤺", text: "മിഖായേല്‍ മാലാഖയോട്  പ്രാർത്ഥന" },
    { emoji: "👑", text: "പരിശുദ്ധ രാജ്ഞി" },
    { emoji: "➕", text: "വി. ജെര്‍ത്രൂദിനോട് ഉള്ള പ്രാർത്ഥന" },
    { emoji: "🚼", text: "കുരിശിന്റെ വഴി" },
    { emoji: "💓", text: "വി. കുര്‍ബാന" },
    { emoji: "🩸", text: "മാതാവിന്റെ രക്തകണ്ണീര്‍ ജപമാല" },
    { emoji: "🕯️", text: "സമ്പൂര്‍ണ്ണ ജപമാല (4 രഹസ്യങ്ങള്‍- സന്തോഷം, ദുഃഖം, മഹിമ, പ്രകാശം) " },
    { emoji: "🛡️", text: "സങ്കീര്‍ത്തനങ്ങള്‍ 91" }
];

// Function to save to local storage

function saveToLocalStorage() {
    const emojiItems = document.querySelectorAll('.emoji-item input[type="text"]');
    const emojiCounts = {};
    emojiItems.forEach((item, index) => {
        emojiCounts[emojis[index].emoji] = item.value;
    });
    localStorage.setItem('emojiCounts', JSON.stringify(emojiCounts));
}

// Function to load from local storage
function loadFromLocalStorage() {
    const storedCounts = JSON.parse(localStorage.getItem('emojiCounts')) || {};
    const emojiItems = document.querySelectorAll('.emoji-item input[type="text"]');
    emojiItems.forEach((item, index) => {
        item.value = storedCounts[emojis[index].emoji] || 0;
    });
}

// Function to dynamically generate the form
function generateEmojiForm() {
    const form = document.getElementById('emojiForm');
    emojis.forEach((item, index) => {
        const emojiDiv = document.createElement('div');
        emojiDiv.classList.add('emoji-item');

        // Create label for emoji and text
        const label = document.createElement('label');
        label.textContent = `${item.emoji} ${item.text}`;

        // Create - button
        const minusButton = document.createElement('button');
        minusButton.type = 'button';
        minusButton.textContent = '-';
        minusButton.onclick = function () {
            const countInput = document.getElementById(`count${index}`);
            let currentValue = parseInt(countInput.value);
            if (currentValue > 0) {
                countInput.value = currentValue - 1;
                saveToLocalStorage();
            }
        };

        // Create number input (readonly)
        const numberInput = document.createElement('input');
        numberInput.type = 'text';
        numberInput.value = 0;
        numberInput.readOnly = true;
        numberInput.id = `count${index}`;

        // Create + button
        const plusButton = document.createElement('button');
        plusButton.type = 'button';
        plusButton.textContent = '+';
        plusButton.onclick = function () {
            const countInput = document.getElementById(`count${index}`);
            let currentValue = parseInt(countInput.value);
            countInput.value = currentValue + 1;
            saveToLocalStorage();
        };

        // Append elements to the emojiDiv
        emojiDiv.appendChild(label);
        emojiDiv.appendChild(minusButton);
        emojiDiv.appendChild(numberInput);
        emojiDiv.appendChild(plusButton);

        // Append emojiDiv to the form
        form.appendChild(emojiDiv);
    });

    // Load stored values after generating the form
    loadFromLocalStorage();
}

// Call the function to generate the form
generateEmojiForm();

document.getElementById('submitBtn').addEventListener('click', function () {
    // Get all emoji items
    const emojiItems = document.querySelectorAll('.emoji-item input[type="text"]');
    let resultMessage = '';

    // Loop through each emoji item
    emojiItems.forEach((item, index) => {
        const count = parseInt(item.value);
        const emoji = emojis[index].emoji;

        // If count is greater than 0, append the emoji to the message
        if (count > 0) {
            for (let i = 0; i < count; i++) {
                resultMessage += emoji;
            }
        }
    });

    //alert(resultMessage);

    // Post the result message to WhatsApp
    const whatsappMessage = encodeURIComponent(resultMessage);
    const whatsappGroupLink = `https://wa.me/919048668408?text=${whatsappMessage}`;
    window.open(whatsappGroupLink, '_blank');

    // Display the result
    document.getElementById('result').textContent = `Your message: ${resultMessage}`;

    // Automatically reset the form after posting the message
    //setTimeout(function () {
    //    document.getElementById('resetBtn').click();
    //}, 500); // Delay to ensure the WhatsApp link is opened before resetting
});

// Reset button event handler
document.getElementById('resetBtn').addEventListener('click', function () {
    if (confirm("Are you sure you want to reset all values to 0?")) {
        const emojiItems = document.querySelectorAll('.emoji-item input[type="text"]');
        emojiItems.forEach((item) => {
            item.value = 0;
        });
        saveToLocalStorage();
    }
});