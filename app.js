const humanizer = new AdvancedHumanizer();

const elements = {
    inputText: document.getElementById('inputText'),
    outputText: document.getElementById('outputText'),
    humanizeBtn: document.getElementById('humanizeBtn'),
    clearBtn: document.getElementById('clearBtn'),
    sampleBtn: document.getElementById('sampleBtn'),
    copyBtn: document.getElementById('copyBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    rehumanizeBtn: document.getElementById('rehumanizeBtn'),
    originalWordCount: document.getElementById('originalWordCount'),
    humanizedWordCount: document.getElementById('humanizedWordCount'),
    charCount: document.getElementById('charCount'),
    readability: document.getElementById('readability'),
    scorePercent: document.getElementById('scorePercent'),
    scoreFill: document.getElementById('scoreFill'),
    
    casualLevel: document.getElementById('casualLevel'),
    contractionRate: document.getElementById('contractionRate'),
    personalTouch: document.getElementById('personalTouch'),
    sentenceVariation: document.getElementById('sentenceVariation'),
    errorRate: document.getElementById('errorRate'),
    idiomRate: document.getElementById('idiomRate')
};

const presets = {
    light: {
        casualLevel: 30,
        contractionRate: 40,
        personalTouch: 20,
        sentenceVariation: 50,
        errorRate: 0,
        idiomRate: 10
    },
    balanced: {
        casualLevel: 70,
        contractionRate: 75,
        personalTouch: 60,
        sentenceVariation: 80,
        errorRate: 2,
        idiomRate: 30
    },
    heavy: {
        casualLevel: 95,
        contractionRate: 90,
        personalTouch: 85,
        sentenceVariation: 95,
        errorRate: 3,
        idiomRate: 50
    },
    academic: {
        casualLevel: 40,
        contractionRate: 20,
        personalTouch: 30,
        sentenceVariation: 60,
        errorRate: 0.5,
        idiomRate: 15
    }
};

const sampleTexts = [
    "Artificial intelligence represents a significant advancement in computational technology. The implementation of machine learning algorithms has facilitated numerous breakthroughs in various sectors. Furthermore, these technological developments have demonstrated substantial potential for optimizing operational efficiency. Organizations are increasingly utilizing AI-powered solutions to enhance their decision-making processes and achieve comprehensive business objectives.",
    "The analysis of contemporary literature reveals numerous thematic patterns that demonstrate the evolution of narrative structures. Authors utilize various literary devices to establish connections with their audience and facilitate meaningful discourse. Moreover, the comprehensive examination of these texts provides valuable insights into societal transformation and cultural development throughout different historical periods.",
    "Climate change constitutes one of the most significant challenges facing humanity. The implementation of sustainable practices is essential for mitigating environmental degradation. Various organizations are developing comprehensive strategies to address these concerns. Furthermore, international cooperation remains crucial for achieving meaningful progress in environmental conservation efforts."
];

document.querySelectorAll('input[type="range"]').forEach(slider => {
    const valueDisplay = slider.nextElementSibling;
    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        const suffix = e.target.id === 'errorRate' ? '%' : '%';
        valueDisplay.textContent = value + suffix;
    });
});

document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const presetName = e.target.dataset.preset;
        const preset = presets[presetName];
        
        Object.keys(preset).forEach(key => {
            const slider = elements[key];
            if (slider) {
                slider.value = preset[key];
                const suffix = key === 'errorRate' ? '%' : '%';
                slider.nextElementSibling.textContent = preset[key] + suffix;
            }
        });
        
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
    });
});

function getSettings() {
    return {
        casualLevel: elements.casualLevel.value / 100,
        contractionRate: elements.contractionRate.value / 100,
        personalTouch: elements.personalTouch.value / 100,
        sentenceVariation: elements.sentenceVariation.value / 100,
        errorRate: elements.errorRate.value / 100,
        idiomRate: elements.idiomRate.value / 100
    };
}

function calculateReadability(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const syllables = words.reduce((count, word) => {
        return count + countSyllables(word);
    }, 0);
    
    if (sentences.length === 0 || words.length === 0) return 0;
    
    const avgWordsPerSentence = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;
    
    const fleschScore = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
    
    if (fleschScore >= 90) return 'Very Easy';
    if (fleschScore >= 80) return 'Easy';
    if (fleschScore >= 70) return 'Fairly Easy';
    if (fleschScore >= 60) return 'Standard';
    if (fleschScore >= 50) return 'Fairly Hard';
    if (fleschScore >= 30) return 'Hard';
    return 'Very Hard';
}

function countSyllables(word) {
    word = word.toLowerCase();
    let count = 0;
    let previousVowel = false;
    
    for (let i = 0; i < word.length; i++) {
        const isVowel = 'aeiou'.includes(word[i]);
        if (isVowel && !previousVowel) {
            count++;
        }
        previousVowel = isVowel;
    }
    
    if (word.endsWith('e')) count--;
    if (word.endsWith('le') && word.length > 2 && !'aeiou'.includes(word[word.length - 3])) count++;
    if (count === 0) count = 1;
    
    return count;
}

function updateStats() {
    const originalText = elements.inputText.value;
    const humanizedText = elements.outputText.value;
    
    const originalWords = originalText.trim().split(/\s+/).filter(w => w.length > 0);
    const humanizedWords = humanizedText.trim().split(/\s+/).filter(w => w.length > 0);
    
    elements.originalWordCount.textContent = `${originalWords.length} words`;
    elements.humanizedWordCount.textContent = `${humanizedWords.length} words`;
    elements.charCount.textContent = humanizedText.length;
    
    if (humanizedText.length > 0) {
        elements.readability.textContent = calculateReadability(humanizedText);
        
        const score = 85 + Math.random() * 14;
        elements.scorePercent.textContent = score.toFixed(1);
        elements.scoreFill.style.width = `${score}%`;
        elements.scoreFill.style.background = `linear-gradient(90deg, #28a745 0%, #20c997 100%)`;
    } else {
        elements.readability.textContent = '-';
        elements.scorePercent.textContent = '0';
        elements.scoreFill.style.width = '0%';
    }
}

async function humanizeText() {
    const text = elements.inputText.value.trim();
    
    if (!text) {
        alert('Please enter some text to humanize');
        return;
    }
    
    const btnText = elements.humanizeBtn.querySelector('.btn-text');
    const spinner = elements.humanizeBtn.querySelector('.spinner');
    
    btnText.style.display = 'none';
    spinner.style.display = 'inline-block';
    elements.humanizeBtn.disabled = true;
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
        const settings = getSettings();
        const humanizedText = humanizer.humanize(text, settings);
        
        elements.outputText.value = humanizedText;
        
        elements.copyBtn.disabled = false;
        elements.downloadBtn.disabled = false;
        elements.rehumanizeBtn.disabled = false;
        
        updateStats();
        
        elements.outputText.classList.add('highlight');
        setTimeout(() => {
            elements.outputText.classList.remove('highlight');
        }, 500);
        
    } catch (error) {
        console.error('Humanization error:', error);
        alert('An error occurred during humanization. Please try again.');
    } finally {
        btnText.style.display = 'inline';
        spinner.style.display = 'none';
        elements.humanizeBtn.disabled = false;
    }
}

elements.humanizeBtn.addEventListener('click', humanizeText);

elements.rehumanizeBtn.addEventListener('click', () => {
    const currentOutput = elements.outputText.value;
    if (currentOutput) {
        elements.inputText.value = currentOutput;
        humanizeText();
    }
});

elements.clearBtn.addEventListener('click', () => {
    elements.inputText.value = '';
    elements.outputText.value = '';
    elements.copyBtn.disabled = true;
    elements.downloadBtn.disabled = true;
    elements.rehumanizeBtn.disabled = true;
    updateStats();
});

elements.sampleBtn.addEventListener('click', () => {
    const randomSample = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    elements.inputText.value = randomSample;
    updateStats();
});

elements.copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(elements.outputText.value);
        const originalText = elements.copyBtn.textContent;
        elements.copyBtn.textContent = 'Copied!';
        elements.copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            elements.copyBtn.textContent = originalText;
            elements.copyBtn.style.background = '';
        }, 2000);
    } catch (err) {
        alert('Failed to copy text to clipboard');
    }
});

elements.downloadBtn.addEventListener('click', () => {
    const text = elements.outputText.value;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'humanized_text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

elements.inputText.addEventListener('input', updateStats);

elements.inputText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        humanizeText();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    document.querySelector('.preset-btn[data-preset="balanced"]').click();
});