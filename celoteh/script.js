let sentence = "";
let sentenceHistory = []; // Store previous versions for undo/redo
let redoStack = []; // Store removed words for redo

function addToSentence(word) {
    sentenceHistory.push(sentence); // Save for undo
    redoStack = []; // Clear redo history when adding new words
    sentence += word + " ";
    updateSentenceDisplay();
    speakWord(word);
}

function undoLastWord() {
    if (sentenceHistory.length > 0) {
        redoStack.push(sentence); // Save for redo
        sentence = sentenceHistory.pop(); // Restore last state
        updateSentenceDisplay();
    }
}

function redoLastWord() {
    if (redoStack.length > 0) {
        sentenceHistory.push(sentence); // Save for undo
        sentence = redoStack.pop(); // Restore last removed state
        updateSentenceDisplay();
    }
}

function clearSentence() {
    sentenceHistory.push(sentence); // Save before clearing
    sentence = "";
    redoStack = [];
    updateSentenceDisplay();
}

function updateSentenceDisplay() {
    document.getElementById("sentence-area").textContent = sentence.trim() || "Kalimat akan muncul di sini...";
}

function speakSentence() {
    if (sentence.trim() === "") return;
    const speech = new SpeechSynthesisUtterance(sentence);
    speech.lang = "id-ID";
    speech.pitch = 1;
    speech.rate = 1;
    speechSynthesis.speak(speech);
}

function speakWord(word) {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "id-ID";
    speech.pitch = 1;
    speech.rate = 1;
    speechSynthesis.speak(speech);
}

// Adding event listeners to buttons
document.getElementById("speak-btn").addEventListener("click", speakSentence);
document.getElementById("clear-btn").addEventListener("click", clearSentence);
