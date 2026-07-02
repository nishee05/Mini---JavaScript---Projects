const textArea = document.getElementById('text-area');
const wordCount = document.getElementById('word-count');
const charWithSpaceCount = document.getElementById('char-with-space-count');
const charWithoutSpaceCount = document.getElementById('char-without-space-count');
const specialCharCount = document.getElementById('special-char-count');
const sentenceCount = document.getElementById('sentence-count');
const readingTime = document.getElementById('reading-time');

textArea.addEventListener('input', () => {
    const text = textArea.value;

    // Words
    const words = text.trim().split(/\s+/).filter(word => word !== "").length;

    // Characters with spaces
    const charactersWithSpaces = text.length;

    // Characters without spaces
    const charactersWithoutSpaces = text.replace(/\s/g, "").length;

    // Special characters (non-alphanumeric, non-space)
    const specialCharacters = text.match(/[^a-zA-Z0-9\s]/g) || [];
    const specialCharCountValue = specialCharacters.length;

    // Sentences (split by `.`, `!`, or `?`)
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim() !== "").length;

    // Reading time (assuming 200 words per minute)
    const readingTimeValue = Math.ceil(words / 50);

    // Update counts
    wordCount.textContent = words;
    charWithSpaceCount.textContent = charactersWithSpaces;
    charWithoutSpaceCount.textContent = charactersWithoutSpaces;
    specialCharCount.textContent = specialCharCountValue;
    sentenceCount.textContent = sentences;
    readingTime.textContent = readingTimeValue;
});
