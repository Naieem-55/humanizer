import torch
from transformers import (
    T5ForConditionalGeneration, T5Tokenizer,
    GPT2LMHeadModel, GPT2Tokenizer
)
import random
import re
import numpy as np
from typing import List, Tuple, Dict
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
import warnings
warnings.filterwarnings('ignore')

try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', quiet=True)

try:
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    nltk.download('punkt_tab', quiet=True)


class TextHumanizer:
    def __init__(self, perplexity_threshold=30.0):
        self.perplexity_threshold = perplexity_threshold
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
        print("Loading models...")
        self.t5_tokenizer = T5Tokenizer.from_pretrained('t5-base')
        self.t5_model = T5ForConditionalGeneration.from_pretrained('t5-base').to(self.device)
        
        self.gpt2_tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
        self.gpt2_model = GPT2LMHeadModel.from_pretrained('gpt2').to(self.device)
        self.gpt2_model.eval()
        
        self.idioms = [
            "at the end of the day", "when all is said and done", 
            "the bottom line is", "to be honest", "in my opinion",
            "it goes without saying", "needless to say", "as a matter of fact",
            "believe it or not", "long story short", "all things considered"
        ]
        
        self.transitions = [
            "Moreover,", "Furthermore,", "However,", "Nevertheless,", 
            "On the other hand,", "In addition,", "Consequently,", 
            "Therefore,", "Meanwhile,", "Subsequently,", "Indeed,"
        ]
        
        self.casual_phrases = [
            "you know", "I mean", "basically", "actually", "honestly",
            "literally", "seriously", "obviously", "clearly", "definitely"
        ]
        
    def stage1_paraphrase(self, text: str) -> str:
        """Stage 1: Paraphrase using T5 model"""
        # T5 doesn't have a built-in paraphrase task, so we'll use a different approach
        # Using the summarization task as a workaround for rephrasing
        input_text = f"summarize: {text}"
        
        inputs = self.t5_tokenizer(
            input_text, 
            return_tensors="pt", 
            max_length=512, 
            truncation=True
        ).to(self.device)
        
        with torch.no_grad():
            outputs = self.t5_model.generate(
                **inputs,
                max_length=len(text.split()) + 50,  # Slightly longer than original
                min_length=len(text.split()) - 10,   # Not too short
                num_beams=4,
                temperature=0.9,
                do_sample=True,
                top_p=0.95,
                repetition_penalty=1.2
            )
        
        paraphrased = self.t5_tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # If the output is too short or invalid, return a slightly modified version
        if len(paraphrased) < 20 or paraphrased.lower() == "true" or paraphrased.lower() == "false":
            # Fallback: simple word substitution and restructuring
            words = text.split()
            if len(words) > 5:
                # Shuffle middle section slightly
                mid_start = len(words) // 4
                mid_end = 3 * len(words) // 4
                middle = words[mid_start:mid_end]
                paraphrased = ' '.join(words[:mid_start] + middle + words[mid_end:])
            else:
                paraphrased = text
        
        return paraphrased
    
    def stage2_add_burstiness(self, text: str) -> str:
        """Stage 2: Add burstiness through sentence restructuring"""
        sentences = sent_tokenize(text)
        if len(sentences) < 2:
            return text
        
        restructured = []
        
        for i, sent in enumerate(sentences):
            words = word_tokenize(sent)
            word_count = len(words)
            
            if i % 3 == 0 and word_count > 15:
                split_point = random.randint(word_count//3, 2*word_count//3)
                part1 = ' '.join(words[:split_point])
                part2 = ' '.join(words[split_point:])
                restructured.append(part1 + '.')
                restructured.append(part2)
                
            elif i % 4 == 1 and len(restructured) > 0 and word_count < 20:
                if random.random() > 0.5:
                    prev_sent = restructured[-1] if restructured else sent
                    combined = prev_sent.rstrip('.') + ', and ' + sent.lower()
                    if restructured:
                        restructured[-1] = combined
                    else:
                        restructured.append(combined)
                else:
                    restructured.append(sent)
                    
            else:
                if random.random() > 0.7:
                    words_shuffled = words.copy()
                    if len(words_shuffled) > 5:
                        mid_section = words_shuffled[2:-2]
                        random.shuffle(mid_section)
                        words_shuffled[2:-2] = mid_section
                    restructured.append(' '.join(words_shuffled))
                else:
                    restructured.append(sent)
        
        return ' '.join(restructured)
    
    def stage3_inject_style(self, text: str) -> str:
        """Stage 3: Inject human-like style elements"""
        sentences = sent_tokenize(text)
        styled_sentences = []
        
        for i, sent in enumerate(sentences):
            if i == 0 and random.random() > 0.6:
                transition = random.choice(self.transitions)
                sent = transition + ' ' + sent.lower()
            
            elif i > 0 and random.random() > 0.7:
                transition = random.choice(self.transitions)
                sent = transition + ' ' + sent.lower()
            
            if random.random() > 0.8:
                casual = random.choice(self.casual_phrases)
                words = sent.split()
                insert_pos = random.randint(1, max(1, len(words)-1))
                words.insert(insert_pos, casual + ',')
                sent = ' '.join(words)
            
            if random.random() > 0.85 and i == len(sentences) - 1:
                idiom = random.choice(self.idioms)
                sent = sent.rstrip('.') + ' - ' + idiom + '.'
            
            if random.random() > 0.9:
                sent = sent.replace('. ', '... ')
            
            if random.random() > 0.95:
                sent = re.sub(r'(\w+)', lambda m: m.group(1).upper() if random.random() > 0.9 else m.group(1), sent, count=1)
            
            styled_sentences.append(sent)
        
        result = ' '.join(styled_sentences)
        
        result = re.sub(r'\.{4,}', '...', result)
        result = re.sub(r'\s+', ' ', result)
        result = re.sub(r'\s+([,.!?])', r'\1', result)
        
        return result
    
    def stage4_calculate_perplexity(self, text: str) -> float:
        """Stage 4: Calculate perplexity using GPT-2"""
        # Handle empty or very short text
        if not text or len(text.strip()) < 10:
            return 100.0  # Return high perplexity for invalid text
        
        encodings = self.gpt2_tokenizer(text, return_tensors='pt', truncation=True, max_length=1024)
        
        # Check if tokenization produced valid output
        if encodings.input_ids.size(1) == 0:
            return 100.0
        
        max_length = self.gpt2_model.config.n_positions
        stride = 512
        
        nlls = []
        for i in range(0, encodings.input_ids.size(1), stride):
            begin_loc = max(i + stride - max_length, 0)
            end_loc = min(i + stride, encodings.input_ids.size(1))
            trg_len = end_loc - i
            
            # Skip if no target length
            if trg_len <= 0:
                continue
            
            input_ids = encodings.input_ids[:, begin_loc:end_loc].to(self.device)
            target_ids = input_ids.clone()
            target_ids[:, :-trg_len] = -100
            
            with torch.no_grad():
                outputs = self.gpt2_model(input_ids, labels=target_ids)
                neg_log_likelihood = outputs.loss * trg_len
            
            nlls.append(neg_log_likelihood)
        
        # Handle case where no valid segments were processed
        if not nlls:
            return 100.0
        
        ppl = torch.exp(torch.stack(nlls).sum() / end_loc)
        ppl_value = ppl.item()
        
        # Handle NaN or infinite values
        if np.isnan(ppl_value) or np.isinf(ppl_value):
            return 100.0
        
        return ppl_value
    
    def humanize(self, text: str, max_iterations: int = 3) -> Dict:
        """Main humanization pipeline"""
        results = {
            'original': text,
            'stages': [],
            'final': None,
            'perplexity_scores': []
        }
        
        print("\n=== Starting Humanization Process ===\n")
        print(f"Original text: {text[:100]}...")
        
        print("\n[Stage 1] Paraphrasing...")
        current_text = self.stage1_paraphrase(text)
        results['stages'].append(('paraphrase', current_text))
        print(f"Paraphrased: {current_text[:100]}...")
        
        iteration = 0
        while iteration < max_iterations:
            print(f"\n[Iteration {iteration + 1}]")
            
            print("[Stage 2] Adding burstiness...")
            current_text = self.stage2_add_burstiness(current_text)
            results['stages'].append(('burstiness', current_text))
            
            print("[Stage 3] Injecting style...")
            current_text = self.stage3_inject_style(current_text)
            results['stages'].append(('style', current_text))
            
            print("[Stage 4] Calculating perplexity...")
            perplexity = self.stage4_calculate_perplexity(current_text)
            results['perplexity_scores'].append(perplexity)
            print(f"Perplexity: {perplexity:.2f} (threshold: {self.perplexity_threshold})")
            
            if perplexity < self.perplexity_threshold:
                print("Perplexity below threshold, humanization complete!")
                break
            else:
                print("Perplexity above threshold, repeating stages 2-3...")
                iteration += 1
        
        results['final'] = current_text
        results['final_perplexity'] = perplexity
        
        print(f"\n=== Humanization Complete ===")
        print(f"Final text: {current_text[:100]}...")
        print(f"Final perplexity: {perplexity:.2f}")
        
        return results


def detector_test(text: str, humanizer: TextHumanizer) -> Dict:
    """Optional Stage 5: Test against detector (simplified version)"""
    perplexity = humanizer.stage4_calculate_perplexity(text)
    
    detection_score = min(100, perplexity * 3.3)
    
    human_likelihood = 100 - detection_score
    
    return {
        'text': text,
        'perplexity': perplexity,
        'detection_score': detection_score,
        'human_likelihood': human_likelihood,
        'verdict': 'Human-like' if human_likelihood > 50 else 'AI-like'
    }


if __name__ == "__main__":
    humanizer = TextHumanizer(perplexity_threshold=25.0)
    
    sample_text = """
    Artificial intelligence has revolutionized many industries by automating complex tasks 
    and providing insights from large datasets. Machine learning algorithms can identify 
    patterns that humans might miss, leading to improved decision-making processes.
    """
    
    results = humanizer.humanize(sample_text)
    
    print("\n" + "="*50)
    print("DETECTOR TEST (Optional Stage 5)")
    print("="*50)
    detector_results = detector_test(results['final'], humanizer)
    print(f"Human likelihood: {detector_results['human_likelihood']:.1f}%")
    print(f"Verdict: {detector_results['verdict']}")