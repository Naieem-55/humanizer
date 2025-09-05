from humanizer import TextHumanizer, detector_test
import os
from datetime import datetime

def main():
    humanizer = TextHumanizer(perplexity_threshold=25.0)
    
    print("="*60)
    print("TEXT HUMANIZER - Interactive Mode")
    print("="*60)
    
    print("\nEnter your AI text to humanize:")
    custom_text = input()
    
    if not custom_text.strip():
        print("No text provided. Exiting.")
        return
    
    print("\nProcessing your text...")
    results = humanizer.humanize(custom_text, max_iterations=3)
    
    print("\n" + "="*60)
    print("RESULTS")
    print("="*60)
    
    print("\nORIGINAL TEXT:")
    print(custom_text[:500] + "..." if len(custom_text) > 500 else custom_text)
    
    print("\nHUMANIZED TEXT:")
    print(results['final'][:500] + "..." if len(results['final']) > 500 else results['final'])
    
    print("\nPERPLEXITY SCORES:")
    for j, score in enumerate(results['perplexity_scores']):
        print(f"  Iteration {j+1}: {score:.2f}")
    print(f"  Final: {results['final_perplexity']:.2f}")
    
    detection = detector_test(results['final'], humanizer)
    print(f"\nHuman Likelihood: {detection['human_likelihood']:.1f}%")
    print(f"Verdict: {detection['verdict']}")
    
    # Create outputs directory if it doesn't exist
    os.makedirs('outputs', exist_ok=True)
    
    # Generate filename with current date and time
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    filename = f"outputs/{timestamp}.txt"
    
    # Save results to file
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("="*60 + "\n")
        f.write("TEXT HUMANIZER OUTPUT\n")
        f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("="*60 + "\n\n")
        
        f.write("ORIGINAL TEXT:\n")
        f.write("-"*40 + "\n")
        f.write(custom_text + "\n\n")
        
        f.write("HUMANIZED TEXT:\n")
        f.write("-"*40 + "\n")
        f.write(results['final'] + "\n\n")
        
        f.write("ANALYSIS:\n")
        f.write("-"*40 + "\n")
        f.write(f"Original Perplexity: {humanizer.stage4_calculate_perplexity(custom_text):.2f}\n")
        f.write(f"Final Perplexity: {results['final_perplexity']:.2f}\n")
        f.write(f"Iterations: {len(results['perplexity_scores'])}\n")
        f.write(f"Human Likelihood: {detection['human_likelihood']:.1f}%\n")
        f.write(f"Verdict: {detection['verdict']}\n")
    
    print(f"\nResults saved to: {filename}")

if __name__ == "__main__":
    print("\nLoading models (this may take a moment on first run)...")
    main()