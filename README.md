# AI Text Humanizer Pro

A sophisticated multi-stage text humanization pipeline that transforms AI-generated content into natural, human-like text using advanced NLP techniques and transformer models.

## Features

### Core Functionality
- **Multi-Stage Processing Pipeline**: Transforms text through paraphrasing, burstiness injection, style enhancement, and perplexity optimization
- **Smart Perplexity Scoring**: Uses GPT-2 to evaluate and ensure human-like text quality
- **Adaptive Iteration**: Automatically refines text until it meets quality thresholds
- **Real-time Analysis**: Provides instant feedback on text humanization quality

### User Interfaces
- **Professional GUI**: Modern desktop application with real-time processing
- **Command Line Interface**: Simple terminal-based interaction
- **Python API**: Integrate into your own applications

## Installation

### Prerequisites
- Python 3.8 or higher
- 4GB RAM minimum (8GB recommended)
- ~2GB disk space for models

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Naieem-55/humanizer/
python .\example.py
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

The first run will automatically download required models (~500MB).

## Usage

### GUI Application (Recommended)

Launch the professional graphical interface:

```bash
python gui.py
```

Features:
- Split-panel design for input and output
- Real-time character counting
- Copy/Paste functionality
- Save results with timestamps
- Light/Dark theme support
- Adjustable processing parameters

### Command Line Interface

For terminal users:

```bash
python example.py
```

Then paste your text and press Enter to process.

## How It Works

### Processing Pipeline

1. **Stage 1 - Paraphrasing**: Uses T5 transformer to semantically restructure text
2. **Stage 2 - Burstiness**: Varies sentence lengths and structures for natural flow
3. **Stage 3 - Style Injection**: Adds human-like elements (transitions, idioms, casual phrases)
4. **Stage 4 - Perplexity Check**: Evaluates text using GPT-2 perplexity scoring
5. **Stage 5 - Detection Testing**: Optional validation against AI detection

## Configuration

### Adjustable Parameters

- `perplexity_threshold`: Target perplexity score (default: 25.0, lower = more human-like)
- `max_iterations`: Maximum refinement cycles (default: 3)

### Quality Metrics

- **Perplexity Score**: Lower scores indicate more human-like text (target: <25)
- **Human Likelihood**: Percentage estimate of human-like qualities (0-100%)
- **Processing Iterations**: Number of refinement cycles performed

### GUI Settings

Access via settings button:
- Modify perplexity threshold
- Adjust maximum iterations
- Toggle light/dark themes

## Output

Results are saved to `outputs/` directory with timestamp:
- Format: `YYYYMMDD-HHMMSS.txt`
- Contains: Original text, humanized text, and analysis metrics

## File Structure

```
humanizer/
├── humanizer.py       # Core transformation engine
├── gui.py            # Professional GUI application
├── example.py        # CLI interface
├── requirements.txt  # Python dependencies
├── outputs/          # Saved results directory
└── README.md        # This file
```

## System Requirements

### Minimum
- OS: Windows 10/11, macOS 10.14+, Linux (Ubuntu 18.04+)
- RAM: 4GB
- Python: 3.8+
- Storage: 2GB free space

### Recommended
- RAM: 8GB or more
- GPU: CUDA-compatible for faster processing (optional)
- Storage: 5GB free space

## Dependencies

- `torch>=2.0.0` - Deep learning framework
- `transformers>=4.35.0` - Hugging Face transformers
- `sentencepiece>=0.1.99` - Tokenization
- `nltk>=3.8.0` - Natural language processing
- `numpy>=1.24.0` - Numerical computing
- `pyperclip>=1.9.0` - Clipboard operations

## Troubleshooting

### Model Loading Issues
If models fail to load:
```bash
pip install --upgrade transformers torch
```

### Memory Errors
For systems with limited RAM:
- Close other applications
- Reduce `max_iterations` to 1-2
- Process shorter texts

### NLTK Data
If tokenization fails:
```python
import nltk
nltk.download('punkt')
nltk.download('punkt_tab')
```

## Performance Tips

1. **First Run**: Initial model download takes 2-5 minutes
2. **Processing Speed**: ~5-10 seconds per paragraph
3. **Batch Processing**: Use API for multiple texts
4. **GPU Acceleration**: Install CUDA for 2-3x speedup

## Use Cases

- **Content Creation**: Transform AI drafts into engaging content
- **Academic Writing**: Make research more accessible
- **Business Communication**: Convert formal reports to approachable language
- **Blog Posts**: Create conversational, engaging articles
- **Marketing Copy**: Add personality to promotional content

## Tips for Best Results

1. Keep input text concise (under 500 words per batch)
2. Use lower perplexity thresholds (20-25) for maximum human-likeness
3. Allow 2-3 iterations for optimal results
4. Review and fine-tune output as needed

## License

MIT License - See LICENSE file for details

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## Support

For issues or questions:
- Open an issue on GitHub
- Check existing issues for solutions

## Acknowledgments

- Hugging Face for transformer models
- OpenAI for GPT-2 perplexity scoring
- NLTK for text processing utilities

---

**Version**: 1.0.0  
**Last Updated**: September 2025

*Transform AI-generated content into authentic, human-sounding text that engages readers naturally.*