class AdvancedHumanizer {
    constructor() {
        this.initializeDictionaries();
        this.initializePatterns();
    }

    initializeDictionaries() {
        this.academicToHuman = {
            'utilize': ['use', 'work with', 'take advantage of', 'employ', 'make use of'],
            'implement': ['put in place', 'start using', 'roll out', 'set up', 'get going with'],
            'demonstrate': ['show', 'prove', 'make clear', 'point out', 'reveal'],
            'facilitate': ['help', 'make easier', 'smooth the way for', 'enable', 'assist'],
            'optimize': ['improve', 'make better', 'enhance', 'fine-tune', 'boost'],
            'analyze': ['look at', 'examine', 'study', 'check out', 'review', 'go through'],
            'comprehensive': ['complete', 'full', 'thorough', 'all-inclusive', 'extensive'],
            'significant': ['big', 'important', 'major', 'meaningful', 'substantial'],
            'furthermore': ['also', 'plus', 'what\'s more', 'on top of that', 'and'],
            'however': ['but', 'though', 'still', 'yet', 'on the other hand'],
            'therefore': ['so', 'which means', 'that\'s why', 'because of this', 'as a result'],
            'establish': ['set up', 'create', 'start', 'build', 'form'],
            'achieve': ['reach', 'get', 'accomplish', 'pull off', 'manage'],
            'maintain': ['keep', 'hold onto', 'preserve', 'sustain', 'continue'],
            'provide': ['give', 'offer', 'supply', 'share', 'deliver'],
            'ensure': ['make sure', 'check', 'guarantee', 'confirm', 'see to it that'],
            'various': ['different', 'many', 'several', 'all kinds of', 'a variety of'],
            'numerous': ['many', 'lots of', 'a bunch of', 'plenty of', 'countless'],
            'subsequent': ['next', 'following', 'later', 'after', 'coming'],
            'prior': ['before', 'earlier', 'previous', 'preceding', 'past'],
            'regarding': ['about', 'concerning', 'on', 'with respect to', 'as for'],
            'commence': ['start', 'begin', 'kick off', 'get started', 'launch'],
            'terminate': ['end', 'stop', 'finish', 'close', 'wrap up'],
            'approximately': ['about', 'around', 'roughly', 'close to', 'near'],
            'substantial': ['large', 'big', 'considerable', 'major', 'serious'],
            'acquire': ['get', 'obtain', 'pick up', 'gain', 'secure'],
            'endeavor': ['try', 'attempt', 'work', 'effort', 'strive'],
            'perceive': ['see', 'view', 'understand', 'notice', 'realize'],
            'constitute': ['make up', 'form', 'be', 'represent', 'account for'],
            'necessitate': ['need', 'require', 'call for', 'demand', 'make necessary'],
            'acknowledge': ['admit', 'recognize', 'accept', 'agree', 'own up to'],
            'assist': ['help', 'support', 'aid', 'lend a hand', 'back up'],
            'consequently': ['so', 'as a result', 'because of this', 'which led to', 'and so'],
            'determine': ['find out', 'figure out', 'decide', 'work out', 'pin down'],
            'emphasize': ['stress', 'highlight', 'focus on', 'point out', 'make clear'],
            'evaluate': ['assess', 'judge', 'check', 'look over', 'weigh up'],
            'exhibit': ['show', 'display', 'present', 'reveal', 'demonstrate'],
            'fundamental': ['basic', 'essential', 'key', 'main', 'core'],
            'illustrate': ['show', 'explain', 'make clear', 'demonstrate', 'spell out'],
            'indicate': ['show', 'suggest', 'point to', 'signal', 'mean'],
            'investigate': ['look into', 'explore', 'check out', 'dig into', 'research'],
            'methodology': ['method', 'approach', 'way', 'process', 'technique'],
            'nevertheless': ['still', 'anyway', 'even so', 'but', 'yet'],
            'obtain': ['get', 'receive', 'acquire', 'gain', 'secure'],
            'particularly': ['especially', 'mainly', 'mostly', 'above all', 'specifically'],
            'possess': ['have', 'own', 'hold', 'carry', 'keep'],
            'primarily': ['mainly', 'mostly', 'chiefly', 'largely', 'first and foremost'],
            'require': ['need', 'must have', 'call for', 'demand', 'take'],
            'specifically': ['exactly', 'precisely', 'particularly', 'namely', 'to be exact'],
            'sufficient': ['enough', 'adequate', 'plenty', 'ample', 'satisfactory'],
            'ultimately': ['finally', 'in the end', 'eventually', 'at last', 'when all is said and done'],
            'undergo': ['go through', 'experience', 'face', 'endure', 'deal with'],
            'whereas': ['while', 'but', 'although', 'on the other hand', 'in contrast']
        };

        this.contractions = {
            'cannot': "can't",
            'will not': "won't",
            'do not': "don't",
            'does not': "doesn't",
            'did not': "didn't",
            'would not': "wouldn't",
            'should not': "shouldn't",
            'could not': "couldn't",
            'might not': "mightn't",
            'must not': "mustn't",
            'is not': "isn't",
            'are not': "aren't",
            'was not': "wasn't",
            'were not': "weren't",
            'have not': "haven't",
            'has not': "hasn't",
            'had not': "hadn't",
            'will have': "will've",
            'would have': "would've",
            'should have': "should've",
            'could have': "could've",
            'might have': "might've",
            'must have': "must've",
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
            'how is': "how's",
            'there is': "there's",
            'here is': "here's",
            'she is': "she's",
            'he is': "he's",
            'they have': "they've",
            'we have': "we've",
            'you have': "you've",
            'i am': "I'm",
            'let us': "let's"
        };

        this.fillerPhrases = [
            'you know', 'I mean', 'basically', 'actually', 'literally',
            'honestly', 'frankly', 'to be honest', 'in fact', 'as a matter of fact',
            'well', 'so', 'like', 'kind of', 'sort of', 'pretty much',
            'more or less', 'you see', 'the thing is', 'here\'s the thing',
            'interestingly', 'surprisingly', 'obviously', 'clearly', 'naturally',
            'of course', 'sure', 'right', 'okay', 'anyway', 'anyhow',
            'I guess', 'I suppose', 'I think', 'I believe', 'in my opinion',
            'if you ask me', 'from my perspective', 'the way I see it'
        ];

        this.sentenceStarters = [
            'Look,', 'Listen,', 'See,', 'Okay so,', 'Right,',
            'Now,', 'First off,', 'To start,', 'Basically,', 'Simply put,',
            'The thing is,', 'Here\'s what happened:', 'Let me explain:',
            'Think about it:', 'Consider this:', 'Picture this:',
            'Imagine:', 'Believe it or not,', 'Funny enough,', 'Interestingly enough,',
            'You might think', 'Some people say', 'It turns out', 'As it happens',
            'Truth be told,', 'To be fair,', 'In all honesty,', 'Between you and me,'
        ];
    }

    initializePatterns() {
        this.sentencePatterns = [
            { pattern: /^(This|That|It|These|Those)\s+(is|are|was|were)\s+/i, weight: 0.3 },
            { pattern: /^(The|A|An)\s+\w+\s+(is|are|was|were)\s+/i, weight: 0.25 },
            { pattern: /^\w+ly,\s+/i, weight: 0.4 },
            { pattern: /^(In|On|At|By|For|With|From|To)\s+/i, weight: 0.35 },
            { pattern: /^(Although|While|Despite|Because|Since|If|When|After|Before)\s+/i, weight: 0.45 }
        ];

        this.redundancyPatterns = [
            { find: /in order to/gi, replace: 'to' },
            { find: /due to the fact that/gi, replace: 'because' },
            { find: /in the event that/gi, replace: 'if' },
            { find: /at the present time/gi, replace: 'now' },
            { find: /at this point in time/gi, replace: 'now' },
            { find: /in close proximity to/gi, replace: 'near' },
            { find: /in the near future/gi, replace: 'soon' },
            { find: /has the ability to/gi, replace: 'can' },
            { find: /is able to/gi, replace: 'can' },
            { find: /in regard to/gi, replace: 'about' },
            { find: /with regards to/gi, replace: 'about' }
        ];
    }

    humanize(text, options = {}) {
        const defaults = {
            casualLevel: 0.7,
            errorRate: 0.02,
            personalTouch: 0.6,
            sentenceVariation: 0.8,
            contractionRate: 0.75,
            idiomRate: 0.3
        };
        
        const settings = { ...defaults, ...options };
        
        let result = text;
        
        result = this.preprocessText(result);
        result = this.comprehensiveSentenceTransform(result, settings);
        result = this.replaceAcademicWords(result, settings.casualLevel);
        result = this.addContractions(result, settings.contractionRate);
        result = this.simplifyRedundancies(result);
        result = this.varysentenceStructure(result, settings.sentenceVariation);
        result = this.addNaturalFlow(result, settings.personalTouch);
        result = this.insertFillers(result, settings.casualLevel);
        result = this.addIdioms(result, settings.idiomRate);
        result = this.varyPunctuation(result);
        result = this.addHumanErrors(result, settings.errorRate);
        result = this.breakMonotony(result);
        result = this.addPersonality(result, settings.personalTouch);
        result = this.ensureConversationalFlow(result, settings);
        result = this.finalPolish(result);
        
        return result;
    }

    preprocessText(text) {
        text = text.replace(/\s+/g, ' ').trim();
        text = text.replace(/([.!?])\s*([A-Z])/g, '$1 $2');
        return text;
    }

    comprehensiveSentenceTransform(text, settings) {
        let sentences = this.splitIntoSentences(text);
        
        sentences = sentences.map((sentence, index) => {
            const transformations = {
                'It is important to note that': 'Here\'s something worth knowing:',
                'It should be emphasized that': 'What really matters is',
                'It is evident that': 'Clearly,',
                'It is apparent that': 'You can tell that',
                'It has been observed that': 'We\'ve noticed that',
                'It can be argued that': 'Some would say',
                'It is generally accepted that': 'Most people agree that',
                'It is widely recognized that': 'Everyone knows that',
                'The purpose of this': 'This is meant to',
                'The objective is to': 'We\'re trying to',
                'The goal is to': 'We want to',
                'The aim is to': 'We\'re aiming to',
                'In order to understand': 'To get',
                'In order to achieve': 'To reach',
                'For the purpose of': 'To',
                'With regard to': 'About',
                'In relation to': 'When it comes to',
                'With respect to': 'Regarding',
                'In terms of': 'When talking about',
                'As a result of': 'Because of',
                'Due to the fact that': 'Since',
                'In light of': 'Considering',
                'In view of': 'Given',
                'In conclusion,': 'So,',
                'To conclude,': 'Wrapping up,',
                'In summary,': 'To sum up,',
                'To summarize,': 'Basically,',
                'All things considered,': 'Overall,',
                'Taking everything into account,': 'All in all,',
                'Based on the above,': 'From all this,',
                'As previously mentioned,': 'Like I said earlier,',
                'As stated earlier,': 'As mentioned before,',
                'As discussed above,': 'Like we talked about,'
            };
            
            for (const [formal, casual] of Object.entries(transformations)) {
                const regex = new RegExp(formal, 'gi');
                if (regex.test(sentence)) {
                    sentence = sentence.replace(regex, casual);
                }
            }
            
            sentence = this.transformComplexStructures(sentence, settings.casualLevel);
            
            if (index > 0 && Math.random() < settings.personalTouch * 0.3) {
                sentence = this.addConversationalTransition(sentence);
            }
            
            return sentence;
        });
        
        return sentences.join(' ');
    }

    transformComplexStructures(sentence, casualLevel) {
        sentence = sentence.replace(/not only\s+(.+?)\s+but also\s+(.+)/gi, (match, p1, p2) => {
            if (Math.random() < casualLevel) {
                return `${p1} and ${p2} too`;
            }
            return match;
        });
        
        sentence = sentence.replace(/both\s+(.+?)\s+and\s+(.+)/gi, (match, p1, p2) => {
            if (Math.random() < casualLevel) {
                return `${p1} as well as ${p2}`;
            }
            return match;
        });
        
        sentence = sentence.replace(/Despite the fact that (.+?),/gi, 'Even though $1,');
        sentence = sentence.replace(/Notwithstanding (.+?),/gi, 'Even with $1,');
        sentence = sentence.replace(/Inasmuch as (.+?),/gi, 'Since $1,');
        sentence = sentence.replace(/Insofar as (.+?),/gi, 'As far as $1,');
        
        return sentence;
    }

    addConversationalTransition(sentence) {
        const transitions = [
            'Now, ', 'See, ', 'Thing is, ', 'Actually, ', 'Anyway, ',
            'Meanwhile, ', 'By the way, ', 'Oh, and ', 'Speaking of which, '
        ];
        
        if (Math.random() < 0.3) {
            const transition = transitions[Math.floor(Math.random() * transitions.length)];
            return transition + sentence.charAt(0).toLowerCase() + sentence.slice(1);
        }
        
        return sentence;
    }

    ensureConversationalFlow(text, settings) {
        let sentences = this.splitIntoSentences(text);
        sentences = this.fixRepetitivePatterns(sentences);
        sentences = this.varySentenceOpenings(sentences, settings.sentenceVariation);
        return sentences.join(' ');
    }

    fixRepetitivePatterns(sentences) {
        let previousStart = '';
        
        return sentences.map((sentence, index) => {
            const currentStart = sentence.split(' ').slice(0, 2).join(' ').toLowerCase();
            
            if (currentStart === previousStart && index > 0) {
                const alternatives = [
                    () => 'Additionally, ' + sentence.charAt(0).toLowerCase() + sentence.slice(1),
                    () => 'Also, ' + sentence.charAt(0).toLowerCase() + sentence.slice(1),
                    () => sentence.replace(/^The\s+/i, 'This '),
                    () => sentence.replace(/^This\s+/i, 'That '),
                    () => sentence.replace(/^It\s+/i, 'This ')
                ];
                
                const alternative = alternatives[Math.floor(Math.random() * alternatives.length)];
                sentence = alternative();
            }
            
            previousStart = currentStart;
            return sentence;
        });
    }

    varySentenceOpenings(sentences, variation) {
        return sentences.map((sentence, index) => {
            if (Math.random() < variation * 0.3 && index > 0) {
                const openers = ['And', 'But', 'So', 'Yet', 'Plus', 'Though'];
                if (!openers.some(opener => sentence.startsWith(opener))) {
                    const opener = openers[Math.floor(Math.random() * openers.length)];
                    return opener + ', ' + sentence.charAt(0).toLowerCase() + sentence.slice(1);
                }
            }
            return sentence;
        });
    }

    replaceAcademicWords(text, casualLevel) {
        let words = text.split(/(\s+|[,.!?;:])/);
        
        words = words.map(word => {
            const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
            
            if (this.academicToHuman[cleanWord] && Math.random() < casualLevel) {
                const replacements = this.academicToHuman[cleanWord];
                const replacement = replacements[Math.floor(Math.random() * replacements.length)];
                return this.preserveCase(word, replacement);
            }
            
            return word;
        });
        
        return words.join('');
    }

    addContractions(text, rate) {
        for (const [full, contraction] of Object.entries(this.contractions)) {
            const regex = new RegExp(`\\b${full}\\b`, 'gi');
            text = text.replace(regex, match => {
                return Math.random() < rate ? this.preserveCase(match, contraction) : match;
            });
        }
        return text;
    }

    simplifyRedundancies(text) {
        for (const pattern of this.redundancyPatterns) {
            text = text.replace(pattern.find, pattern.replace);
        }
        return text;
    }

    varysentenceStructure(text, variation) {
        let sentences = this.splitIntoSentences(text);
        
        sentences = sentences.map((sentence, index) => {
            if (Math.random() < variation) {
                sentence = this.restructureSentence(sentence);
                
                if (sentence.length > 100 && Math.random() < 0.6) {
                    sentence = this.breakLongSentence(sentence);
                }
                
                if (Math.random() < 0.5) {
                    sentence = this.addSentenceVariation(sentence);
                }
            }
            
            return sentence;
        }).filter(s => s.length > 0);
        
        return sentences.join(' ');
    }

    restructureSentence(sentence) {
        const transformations = [
            {
                pattern: /^(It is|It's) (important|essential|crucial|necessary|vital) (that|to)/i,
                replacements: [
                    (match, p1, p2, p3) => `We ${p3 === 'to' ? 'need to' : 'should'}`,
                    (match, p1, p2, p3) => `You ${p3 === 'to' ? 'have to' : 'must'}`,
                    (match, p1, p2, p3) => `Make sure ${p3 === 'to' ? 'to' : 'you'}`
                ]
            },
            {
                pattern: /^(This|That) (demonstrates|shows|indicates|reveals|suggests) that/i,
                replacements: [
                    () => `What this tells us is that`,
                    () => `We can see from this that`,
                    () => `This basically means`,
                    () => `The point here is that`
                ]
            }
        ];
        
        for (const transform of transformations) {
            if (transform.pattern.test(sentence)) {
                const replacement = transform.replacements[Math.floor(Math.random() * transform.replacements.length)];
                sentence = sentence.replace(transform.pattern, replacement);
                break;
            }
        }
        
        return sentence;
    }

    addSentenceVariation(sentence) {
        if (!sentence || sentence.length === 0) {
            return sentence;
        }
        
        const variations = [
            () => {
                if (Math.random() < 0.15 && !sentence.includes('?')) {
                    const questions = ['Ever notice how ', 'Have you considered that ', 'Did you know that '];
                    const question = questions[Math.floor(Math.random() * questions.length)];
                    return question + sentence.charAt(0).toLowerCase() + sentence.slice(1);
                }
                return sentence;
            },
            () => {
                if (Math.random() < 0.2) {
                    const emphatics = ['Actually, ', 'In fact, ', 'Truth is, ', 'Honestly, '];
                    const emphatic = emphatics[Math.floor(Math.random() * emphatics.length)];
                    return emphatic + sentence.charAt(0).toLowerCase() + sentence.slice(1);
                }
                return sentence;
            },
            () => {
                const rephrases = {
                    'It should be noted that': 'Keep in mind that',
                    'It is worth mentioning that': 'Worth noting:',
                    'It can be seen that': 'You can see that',
                    'It has been shown that': 'We\'ve learned that',
                    'It is believed that': 'People think',
                    'It is known that': 'We know',
                    'It appears that': 'Looks like',
                    'It seems that': 'Seems like'
                };
                
                for (const [formal, casual] of Object.entries(rephrases)) {
                    const regex = new RegExp('^' + formal, 'i');
                    if (regex.test(sentence)) {
                        return sentence.replace(regex, casual);
                    }
                }
                return sentence;
            }
        ];
        
        const variation = variations[Math.floor(Math.random() * variations.length)];
        const result = variation();
        return result || sentence;
    }

    addNaturalFlow(text, personalTouch) {
        let sentences = this.splitIntoSentences(text);
        
        sentences = sentences.map((sentence, index) => {
            if (Math.random() < personalTouch * 0.5) {
                for (const pattern of this.sentencePatterns) {
                    if (pattern.pattern.test(sentence) && Math.random() < pattern.weight) {
                        const starter = this.sentenceStarters[Math.floor(Math.random() * this.sentenceStarters.length)];
                        sentence = starter + ' ' + sentence.charAt(0).toLowerCase() + sentence.slice(1);
                        break;
                    }
                }
            }
            
            if (index > 0 && Math.random() < 0.3) {
                const connectors = ['And', 'But', 'So', 'Plus', 'Also', 'Though', 'Yet', 'Still'];
                const connector = connectors[Math.floor(Math.random() * connectors.length)];
                sentence = connector + ', ' + sentence.charAt(0).toLowerCase() + sentence.slice(1);
            }
            
            return sentence;
        });
        
        return sentences.join(' ');
    }

    insertFillers(text, casualLevel) {
        let sentences = this.splitIntoSentences(text);
        
        sentences = sentences.map(sentence => {
            if (Math.random() < casualLevel * 0.4 && sentence.split(' ').length > 5) {
                const filler = this.fillerPhrases[Math.floor(Math.random() * this.fillerPhrases.length)];
                const words = sentence.split(' ');
                
                if (Math.random() < 0.3) {
                    sentence = filler.charAt(0).toUpperCase() + filler.slice(1) + ', ' + 
                              sentence.charAt(0).toLowerCase() + sentence.slice(1);
                } else {
                    const position = Math.floor(Math.random() * (words.length - 2)) + 1;
                    words.splice(position, 0, filler);
                    sentence = words.join(' ');
                }
            }
            
            return sentence;
        });
        
        return sentences.join(' ');
    }

    addIdioms(text, idiomRate) {
        const idioms = [
            { phrase: 'at the end of the day', meaning: 'ultimately' },
            { phrase: 'piece of cake', meaning: 'easy' },
            { phrase: 'hit the nail on the head', meaning: 'exactly right' },
            { phrase: 'break the ice', meaning: 'start conversation' },
            { phrase: 'in a nutshell', meaning: 'summarized' },
            { phrase: 'the bottom line is', meaning: 'the conclusion is' }
        ];
        
        if (Math.random() < idiomRate) {
            const idiom = idioms[Math.floor(Math.random() * idioms.length)];
            let sentences = this.splitIntoSentences(text);
            
            if (sentences.length > 2) {
                const position = Math.floor(Math.random() * (sentences.length - 1)) + 1;
                sentences[position] = idiom.phrase.charAt(0).toUpperCase() + idiom.phrase.slice(1) + 
                                     ', ' + sentences[position].charAt(0).toLowerCase() + sentences[position].slice(1);
            }
            
            text = sentences.join(' ');
        }
        
        return text;
    }

    varyPunctuation(text) {
        text = text.replace(/\. ([A-Z])/g, (match, p1) => {
            const rand = Math.random();
            if (rand < 0.1) return '! ' + p1;
            if (rand < 0.15) return '? ' + p1;
            if (rand < 0.25) return '... ' + p1;
            return match;
        });
        
        return text;
    }

    addHumanErrors(text, errorRate) {
        if (errorRate === 0) return text;
        
        const commonTypos = {
            'the': ['teh', 'th', 'hte'],
            'and': ['adn', 'nad', 'an'],
            'that': ['taht', 'htat', 'tht'],
            'have': ['hvae', 'ahve', 'hav'],
            'with': ['wtih', 'wiht', 'wth']
        };
        
        const words = text.split(' ');
        const numErrors = Math.floor(words.length * errorRate);
        const errorPositions = new Set();
        
        while (errorPositions.size < numErrors) {
            errorPositions.add(Math.floor(Math.random() * words.length));
        }
        
        errorPositions.forEach(pos => {
            const word = words[pos].toLowerCase();
            if (commonTypos[word] && Math.random() < 0.7) {
                const typo = commonTypos[word][Math.floor(Math.random() * commonTypos[word].length)];
                words[pos] = this.preserveCase(words[pos], typo);
            }
        });
        
        return words.join(' ');
    }

    breakMonotony(text) {
        let sentences = this.splitIntoSentences(text);
        let previousLength = 0;
        
        sentences = sentences.map((sentence, index) => {
            const currentLength = sentence.split(' ').length;
            
            if (index > 0 && Math.abs(currentLength - previousLength) < 3) {
                if (Math.random() < 0.5) {
                    if (currentLength > 15 && Math.random() < 0.5) {
                        sentence = this.breakLongSentence(sentence);
                    }
                }
            }
            
            previousLength = currentLength;
            return sentence;
        }).filter(s => s.length > 0);
        
        return sentences.join(' ');
    }

    addPersonality(text, personalTouch) {
        if (Math.random() < personalTouch * 0.3) {
            const expressions = [
                'to be honest', 'honestly speaking', 'between you and me',
                'if you ask me', 'in my experience', 'from what I\'ve seen'
            ];
            
            let sentences = this.splitIntoSentences(text);
            if (sentences.length > 2) {
                const position = Math.floor(Math.random() * (sentences.length - 1)) + 1;
                const expression = expressions[Math.floor(Math.random() * expressions.length)];
                sentences[position] = expression.charAt(0).toUpperCase() + expression.slice(1) + 
                                     ', ' + sentences[position].charAt(0).toLowerCase() + 
                                     sentences[position].slice(1);
            }
            
            text = sentences.join(' ');
        }
        
        return text;
    }

    finalPolish(text) {
        text = text.replace(/\s+/g, ' ');
        text = text.replace(/\s+([,.!?;:])/g, '$1');
        text = text.replace(/([.!?])\s*([a-z])/g, (match, p1, p2) => {
            return p1 + ' ' + p2.toUpperCase();
        });
        text = text.replace(/^([a-z])/g, (match, p1) => p1.toUpperCase());
        text = text.replace(/i\s/g, 'I ');
        text = text.replace(/\si'/g, ' I\'');
        text = text.replace(/([.!?])([A-Z])/g, '$1 $2');
        text = text.replace(/\.\.\.\./g, '...');
        text = text.replace(/!!+/g, '!');
        text = text.replace(/\?\?+/g, '?');
        text = text.replace(/\s+$/g, '');
        text = text.replace(/^\s+/g, '');
        
        if (!/[.!?]$/.test(text)) {
            text += '.';
        }
        
        return text;
    }

    splitIntoSentences(text) {
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        return sentences.map(s => s.trim());
    }

    breakLongSentence(sentence) {
        const conjunctions = [', and', ', but', ', so', ', which', ', because', ', although'];
        let bestBreak = -1;
        let bestConjunction = '';
        
        for (const conj of conjunctions) {
            const index = sentence.indexOf(conj);
            if (index > 30 && index < sentence.length - 30) {
                bestBreak = index;
                bestConjunction = conj;
                break;
            }
        }
        
        if (bestBreak > 0) {
            const firstPart = sentence.substring(0, bestBreak) + '.';
            const secondPart = sentence.substring(bestBreak + bestConjunction.length).trim();
            return firstPart + ' ' + secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
        }
        
        return sentence;
    }

    preserveCase(original, replacement) {
        if (original === original.toUpperCase()) {
            return replacement.toUpperCase();
        } else if (original[0] === original[0].toUpperCase()) {
            return replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase();
        }
        return replacement.toLowerCase();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedHumanizer;
}