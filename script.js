const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const humanizeBtn = document.getElementById('humanizeBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const originalWordCount = document.getElementById('originalWordCount');
const humanizedWordCount = document.getElementById('humanizedWordCount');

const synonymMap = {
    'utilize': ['use', 'employ', 'make use of', 'apply'],
    'implement': ['put into practice', 'carry out', 'execute', 'apply'],
    'demonstrate': ['show', 'display', 'exhibit', 'reveal'],
    'facilitate': ['make easier', 'help', 'assist with', 'enable'],
    'optimize': ['improve', 'enhance', 'make better', 'refine'],
    'analyze': ['examine', 'study', 'look at', 'review'],
    'comprehensive': ['complete', 'thorough', 'full', 'detailed'],
    'significant': ['important', 'major', 'notable', 'considerable'],
    'furthermore': ['also', 'additionally', 'moreover', 'besides'],
    'however': ['but', 'yet', 'though', 'still'],
    'therefore': ['so', 'thus', 'hence', 'as a result'],
    'establish': ['set up', 'create', 'form', 'build'],
    'achieve': ['reach', 'accomplish', 'attain', 'get'],
    'maintain': ['keep', 'preserve', 'sustain', 'uphold'],
    'provide': ['give', 'offer', 'supply', 'present'],
    'ensure': ['make sure', 'guarantee', 'make certain', 'secure'],
    'various': ['different', 'diverse', 'several', 'many'],
    'numerous': ['many', 'several', 'lots of', 'plenty of'],
    'subsequent': ['following', 'next', 'later', 'after'],
    'prior': ['before', 'earlier', 'previous', 'preceding']
};

const contractionMap = {
    'cannot': "can't",
    'will not': "won't",
    'do not': "don't",
    'does not': "doesn't",
    'did not': "didn't",
    'would not': "wouldn't",
    'should not': "shouldn't",
    'could not': "couldn't",
    'is not': "isn't",
    'are not': "aren't",
    'was not': "wasn't",
    'were not': "weren't",
    'have not': "haven't",
    'has not': "hasn't",
    'had not': "hadn't",
    'will not': "won't",
    'shall not': "shan't",
    'they are': "they're",
    'we are': "we're",
    'you are': "you're",
    'it is': "it's",
    'that is': "that's",
    'who is': "who's",
    'what is': "what's",
    'where is': "where's",
    'when is': "when's",
    'why is': "why's",
    'how is': "how's"
};

function humanizeText(text) {
    let humanized = text;
    
    humanized = addContractions(humanized);
    
    humanized = replaceFormalWords(humanized);
    
    humanized = varyPunctuation(humanized);
    
    humanized = addFillerWords(humanized);
    
    humanized = varyTransitions(humanized);
    
    humanized = simplifyComplexSentences(humanized);
    
    humanized = addPersonalTouch(humanized);
    
    return humanized;
}

function addContractions(text) {
    let result = text;
    for (const [formal, contraction] of Object.entries(contractionMap)) {
        const regex = new RegExp(`\\b${formal}\\b`, 'gi');
        result = result.replace(regex, (match) => {
            return Math.random() > 0.3 ? contraction : match;
        });
    }
    return result;
}

function replaceFormalWords(text) {
    let result = text;
    for (const [formal, alternatives] of Object.entries(synonymMap)) {
        const regex = new RegExp(`\\b${formal}\\b`, 'gi');
        result = result.replace(regex, (match) => {
            if (Math.random() > 0.4) {
                const alternative = alternatives[Math.floor(Math.random() * alternatives.length)];
                return matchCase(alternative, match);
            }
            return match;
        });
    }
    return result;
}

function matchCase(replacement, original) {
    if (original === original.toUpperCase()) {
        return replacement.toUpperCase();
    } else if (original[0] === original[0].toUpperCase()) {
        return replacement[0].toUpperCase() + replacement.slice(1);
    }
    return replacement;
}

function varyPunctuation(text) {
    let sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    sentences = sentences.map((sentence, index) => {
        sentence = sentence.trim();
        
        if (Math.random() > 0.7 && sentence.endsWith('.')) {
            const rand = Math.random();
            if (rand > 0.8 && index < sentences.length - 1) {
                sentence = sentence.slice(0, -1) + ' -';
            }
        }
        
        return sentence;
    });
    
    return sentences.join(' ');
}

function addFillerWords(text) {
    const fillers = ['actually', 'basically', 'honestly', 'literally', 'obviously', 'clearly', 'simply', 'just', 'really', 'quite', 'pretty', 'kind of', 'sort of', 'you know', 'I mean', 'well'];
    
    let sentences = text.split(/(?<=[.!?])\s+/);
    
    sentences = sentences.map(sentence => {
        if (Math.random() > 0.6 && sentence.length > 20) {
            const filler = fillers[Math.floor(Math.random() * fillers.length)];
            const position = Math.random();
            
            if (position < 0.3) {
                sentence = filler.charAt(0).toUpperCase() + filler.slice(1) + ', ' + sentence.charAt(0).toLowerCase() + sentence.slice(1);
            } else if (position < 0.6) {
                const words = sentence.split(' ');
                const insertIndex = Math.floor(Math.random() * (words.length - 1)) + 1;
                words.splice(insertIndex, 0, filler);
                sentence = words.join(' ');
            }
        }
        return sentence;
    });
    
    return sentences.join(' ');
}

function varyTransitions(text) {
    const transitions = {
        'Additionally,': ['Also,', 'Plus,', 'And,', 'What\'s more,'],
        'Moreover,': ['Besides,', 'Furthermore,', 'Also,', 'Plus,'],
        'Nevertheless,': ['Still,', 'Yet,', 'However,', 'But,'],
        'Consequently,': ['So,', 'Therefore,', 'As a result,', 'Thus,'],
        'In conclusion,': ['To sum up,', 'Overall,', 'In summary,', 'All in all,']
    };
    
    let result = text;
    for (const [formal, alternatives] of Object.entries(transitions)) {
        if (result.includes(formal)) {
            const alternative = alternatives[Math.floor(Math.random() * alternatives.length)];
            result = result.replace(formal, alternative);
        }
    }
    
    return result;
}

function simplifyComplexSentences(text) {
    let sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    sentences = sentences.map(sentence => {
        const commaCount = (sentence.match(/,/g) || []).length;
        
        if (commaCount > 3 && Math.random() > 0.5) {
            const parts = sentence.split(/,\s*/);
            const midPoint = Math.floor(parts.length / 2);
            const firstPart = parts.slice(0, midPoint).join(', ');
            const secondPart = parts.slice(midPoint).join(', ');
            
            if (firstPart && secondPart) {
                const connector = ['. And', '. But', '. So', '. Also'][Math.floor(Math.random() * 4)];
                sentence = firstPart + connector + ' ' + secondPart;
            }
        }
        
        return sentence;
    });
    
    return sentences.join(' ');
}

function addPersonalTouch(text) {
    const personalPhrases = [
        'I think', 'I believe', 'In my opinion', 'From my perspective',
        'It seems to me that', 'I\'d say', 'If you ask me', 'The way I see it'
    ];
    
    let sentences = text.split(/(?<=[.!?])\s+/);
    let modified = false;
    
    sentences = sentences.map((sentence, index) => {
        if (!modified && Math.random() > 0.7 && index < 3 && sentence.length > 30) {
            const phrase = personalPhrases[Math.floor(Math.random() * personalPhrases.length)];
            sentence = phrase + ', ' + sentence.charAt(0).toLowerCase() + sentence.slice(1);
            modified = true;
        }
        return sentence;
    });
    
    return sentences.join(' ');
}

function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function updateWordCounts() {
    const originalCount = countWords(inputText.value);
    const humanizedCount = countWords(outputText.value);
    
    originalWordCount.textContent = `${originalCount} words`;
    humanizedWordCount.textContent = `${humanizedCount} words`;
}

humanizeBtn.addEventListener('click', () => {
    const text = inputText.value.trim();
    
    if (!text) {
        alert('Please enter some text to humanize');
        return;
    }
    
    const humanizedText = humanizeText(text);
    outputText.value = humanizedText;
    copyBtn.disabled = false;
    updateWordCounts();
});

clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    copyBtn.disabled = true;
    updateWordCounts();
});

copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputText.value);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    } catch (err) {
        alert('Failed to copy text');
    }
});

inputText.addEventListener('input', updateWordCounts);
outputText.addEventListener('input', updateWordCounts);