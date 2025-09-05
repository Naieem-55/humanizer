import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox, font
import threading
from humanizer import TextHumanizer
import os
from datetime import datetime
import pyperclip  # For clipboard operations

class ModernHumanizerGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("AI Text Humanizer Pro")
        self.root.geometry("1200x800")
        self.root.minsize(1000, 600)
        
        # Initialize variables
        self.humanizer = None
        self.is_processing = False
        self.current_theme = "light"
        
        # Define color schemes
        self.themes = {
            "light": {
                "bg": "#F5F7FA",
                "fg": "#2D3748",
                "card_bg": "#FFFFFF",
                "input_bg": "#FFFFFF",
                "button_bg": "#4299E1",
                "button_fg": "#FFFFFF",
                "accent": "#3182CE",
                "border": "#E2E8F0",
                "success": "#48BB78",
                "warning": "#ED8936",
                "error": "#F56565"
            },
            "dark": {
                "bg": "#1A202C",
                "fg": "#E2E8F0",
                "card_bg": "#2D3748",
                "input_bg": "#2D3748",
                "button_bg": "#4299E1",
                "button_fg": "#FFFFFF",
                "accent": "#63B3ED",
                "border": "#4A5568",
                "success": "#68D391",
                "warning": "#F6AD55",
                "error": "#FC8181"
            }
        }
        
        # Apply initial theme
        self.apply_theme()
        
        # Configure custom fonts
        self.title_font = font.Font(family="Segoe UI", size=24, weight="bold")
        self.heading_font = font.Font(family="Segoe UI", size=12, weight="bold")
        self.body_font = font.Font(family="Segoe UI", size=10)
        self.mono_font = font.Font(family="Consolas", size=10)
        
        # Create main layout
        self.create_header()
        self.create_main_content()
        self.create_footer()
        
        # Load model in background
        self.load_model_thread = threading.Thread(target=self.load_model)
        self.load_model_thread.start()
    
    def apply_theme(self):
        """Apply the current theme colors"""
        colors = self.themes[self.current_theme]
        self.root.configure(bg=colors["bg"])
        
        # Configure ttk styles
        style = ttk.Style()
        style.theme_use('clam')
        
        style.configure("Title.TLabel", 
                       background=colors["bg"], 
                       foreground=colors["fg"],
                       font=('Segoe UI', 24, 'bold'))
        
        style.configure("Card.TFrame",
                       background=colors["card_bg"],
                       relief="flat",
                       borderwidth=1)
        
        style.configure("Header.TFrame",
                       background=colors["card_bg"])
        
        style.configure("Accent.TButton",
                       background=colors["button_bg"],
                       foreground=colors["button_fg"],
                       borderwidth=0,
                       focuscolor='none',
                       font=('Segoe UI', 10, 'bold'))
        
        style.map("Accent.TButton",
                 background=[('active', colors["accent"])])
        
        style.configure("Secondary.TButton",
                       background=colors["border"],
                       foreground=colors["fg"],
                       borderwidth=0,
                       focuscolor='none')
    
    def create_header(self):
        """Create the header section"""
        colors = self.themes[self.current_theme]
        
        # Header frame
        header_frame = tk.Frame(self.root, bg=colors["card_bg"], height=80)
        header_frame.pack(fill=tk.X, padx=0, pady=0)
        header_frame.pack_propagate(False)
        
        # Inner container for padding
        inner_header = tk.Frame(header_frame, bg=colors["card_bg"])
        inner_header.pack(fill=tk.BOTH, padx=30, pady=15)
        
        # Logo/Title
        title_label = tk.Label(inner_header, 
                              text="🤖 AI Text Humanizer Pro",
                              font=self.title_font,
                              bg=colors["card_bg"],
                              fg=colors["fg"])
        title_label.pack(side=tk.LEFT)
        
        # Right side controls
        controls_frame = tk.Frame(inner_header, bg=colors["card_bg"])
        controls_frame.pack(side=tk.RIGHT)
        
        # Theme toggle button
        self.theme_btn = tk.Button(controls_frame,
                                   text="🌙" if self.current_theme == "light" else "☀",
                                   font=('Segoe UI', 14),
                                   bg=colors["card_bg"],
                                   fg=colors["fg"],
                                   bd=0,
                                   padx=10,
                                   command=self.toggle_theme)
        self.theme_btn.pack(side=tk.LEFT, padx=5)
        
        # Settings button
        settings_btn = tk.Button(controls_frame,
                                text="⚙",
                                font=('Segoe UI', 14),
                                bg=colors["card_bg"],
                                fg=colors["fg"],
                                bd=0,
                                padx=10,
                                command=self.show_settings)
        settings_btn.pack(side=tk.LEFT, padx=5)
    
    def create_main_content(self):
        """Create the main content area"""
        colors = self.themes[self.current_theme]
        
        # Main container
        main_container = tk.Frame(self.root, bg=colors["bg"])
        main_container.pack(fill=tk.BOTH, expand=True, padx=30, pady=20)
        
        # Create two-column layout
        left_panel = tk.Frame(main_container, bg=colors["bg"])
        left_panel.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(0, 10))
        
        right_panel = tk.Frame(main_container, bg=colors["bg"])
        right_panel.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=(10, 0))
        
        # Input Section (Left Panel)
        self.create_input_section(left_panel)
        
        # Output Section (Right Panel)
        self.create_output_section(right_panel)
        
        # Control Panel (Center)
        self.create_control_panel(main_container)
    
    def create_input_section(self, parent):
        """Create the input text section"""
        colors = self.themes[self.current_theme]
        
        # Card frame
        input_card = tk.Frame(parent, bg=colors["card_bg"], relief=tk.RAISED, bd=1)
        input_card.pack(fill=tk.BOTH, expand=True)
        
        # Header
        header_frame = tk.Frame(input_card, bg=colors["card_bg"])
        header_frame.pack(fill=tk.X, padx=20, pady=(15, 10))
        
        tk.Label(header_frame,
                text="📝 Input Text",
                font=self.heading_font,
                bg=colors["card_bg"],
                fg=colors["fg"]).pack(side=tk.LEFT)
        
        # Character counter
        self.char_count_label = tk.Label(header_frame,
                                        text="0 characters",
                                        font=self.body_font,
                                        bg=colors["card_bg"],
                                        fg=colors["fg"])
        self.char_count_label.pack(side=tk.RIGHT)
        
        # Paste button
        paste_btn = tk.Button(header_frame,
                            text="📋 Paste",
                            font=self.body_font,
                            bg=colors["button_bg"],
                            fg=colors["button_fg"],
                            bd=0,
                            padx=15,
                            pady=5,
                            command=self.paste_text)
        paste_btn.pack(side=tk.RIGHT, padx=5)
        
        # Text area
        text_frame = tk.Frame(input_card, bg=colors["card_bg"])
        text_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=(0, 15))
        
        self.input_text = tk.Text(text_frame,
                                 wrap=tk.WORD,
                                 font=self.mono_font,
                                 bg=colors["input_bg"],
                                 fg=colors["fg"],
                                 insertbackground=colors["accent"],
                                 relief=tk.FLAT,
                                 bd=10)
        self.input_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        # Scrollbar
        scrollbar = ttk.Scrollbar(text_frame, command=self.input_text.yview)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.input_text.config(yscrollcommand=scrollbar.set)
        
        # Bind character counter
        self.input_text.bind('<KeyRelease>', self.update_char_count)
    
    def create_output_section(self, parent):
        """Create the output text section"""
        colors = self.themes[self.current_theme]
        
        # Card frame
        output_card = tk.Frame(parent, bg=colors["card_bg"], relief=tk.RAISED, bd=1)
        output_card.pack(fill=tk.BOTH, expand=True)
        
        # Header
        header_frame = tk.Frame(output_card, bg=colors["card_bg"])
        header_frame.pack(fill=tk.X, padx=20, pady=(15, 10))
        
        tk.Label(header_frame,
                text="✨ Humanized Output",
                font=self.heading_font,
                bg=colors["card_bg"],
                fg=colors["fg"]).pack(side=tk.LEFT)
        
        # Copy button
        self.copy_btn = tk.Button(header_frame,
                                 text="📄 Copy",
                                 font=self.body_font,
                                 bg=colors["button_bg"],
                                 fg=colors["button_fg"],
                                 bd=0,
                                 padx=15,
                                 pady=5,
                                 state='disabled',
                                 command=self.copy_text)
        self.copy_btn.pack(side=tk.RIGHT, padx=5)
        
        # Save button
        self.save_btn = tk.Button(header_frame,
                                 text="💾 Save",
                                 font=self.body_font,
                                 bg=colors["success"],
                                 fg=colors["button_fg"],
                                 bd=0,
                                 padx=15,
                                 pady=5,
                                 state='disabled',
                                 command=self.save_result)
        self.save_btn.pack(side=tk.RIGHT, padx=5)
        
        # Text area
        text_frame = tk.Frame(output_card, bg=colors["card_bg"])
        text_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=(0, 15))
        
        self.output_text = tk.Text(text_frame,
                                  wrap=tk.WORD,
                                  font=self.mono_font,
                                  bg=colors["input_bg"],
                                  fg=colors["fg"],
                                  state='disabled',
                                  relief=tk.FLAT,
                                  bd=10)
        self.output_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        # Scrollbar
        scrollbar = ttk.Scrollbar(text_frame, command=self.output_text.yview)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.output_text.config(yscrollcommand=scrollbar.set)
    
    def create_control_panel(self, parent):
        """Create the central control panel"""
        colors = self.themes[self.current_theme]
        
        # Control panel frame
        control_frame = tk.Frame(parent, bg=colors["bg"])
        control_frame.place(relx=0.5, rely=0.5, anchor='center')
        
        # Process button
        self.process_btn = tk.Button(control_frame,
                                    text="⚡ HUMANIZE",
                                    font=('Segoe UI', 12, 'bold'),
                                    bg=colors["button_bg"],
                                    fg=colors["button_fg"],
                                    bd=0,
                                    padx=30,
                                    pady=15,
                                    state='disabled',
                                    command=self.humanize_text)
        self.process_btn.pack(pady=10)
        
        # Progress bar
        self.progress = ttk.Progressbar(control_frame,
                                       length=200,
                                       mode='indeterminate',
                                       style="Accent.Horizontal.TProgressbar")
        
        # Clear button
        clear_btn = tk.Button(control_frame,
                            text="🗑 Clear All",
                            font=self.body_font,
                            bg=colors["border"],
                            fg=colors["fg"],
                            bd=0,
                            padx=20,
                            pady=8,
                            command=self.clear_all)
        clear_btn.pack(pady=5)
        
        # Statistics panel
        stats_frame = tk.Frame(control_frame, bg=colors["card_bg"], relief=tk.RAISED, bd=1)
        stats_frame.pack(pady=20, padx=10, fill=tk.X)
        
        # Stats header
        tk.Label(stats_frame,
                text="📊 Analysis",
                font=self.heading_font,
                bg=colors["card_bg"],
                fg=colors["fg"]).pack(pady=(10, 5))
        
        # Stats grid
        stats_grid = tk.Frame(stats_frame, bg=colors["card_bg"])
        stats_grid.pack(padx=20, pady=10)
        
        # Perplexity
        self.perplexity_frame = self.create_stat_item(stats_grid, "Perplexity", "-", 0, 0)
        
        # Human Score
        self.human_score_frame = self.create_stat_item(stats_grid, "Human Score", "-", 1, 0)
        
        # Processing Time
        self.time_frame = self.create_stat_item(stats_grid, "Process Time", "-", 2, 0)
        
        # Verdict
        self.verdict_label = tk.Label(stats_frame,
                                     text="",
                                     font=('Segoe UI', 11, 'bold'),
                                     bg=colors["card_bg"],
                                     fg=colors["success"])
        self.verdict_label.pack(pady=(5, 10))
    
    def create_stat_item(self, parent, label, value, row, col):
        """Create a statistics display item"""
        colors = self.themes[self.current_theme]
        
        frame = tk.Frame(parent, bg=colors["card_bg"])
        frame.grid(row=row, column=col, padx=10, pady=5)
        
        tk.Label(frame,
                text=label,
                font=('Segoe UI', 9),
                bg=colors["card_bg"],
                fg=colors["fg"]).pack()
        
        value_label = tk.Label(frame,
                             text=value,
                             font=('Segoe UI', 11, 'bold'),
                             bg=colors["card_bg"],
                             fg=colors["accent"])
        value_label.pack()
        
        return value_label
    
    def create_footer(self):
        """Create the footer status bar"""
        colors = self.themes[self.current_theme]
        
        footer_frame = tk.Frame(self.root, bg=colors["border"], height=30)
        footer_frame.pack(fill=tk.X, side=tk.BOTTOM)
        footer_frame.pack_propagate(False)
        
        # Status text
        self.status_var = tk.StringVar()
        self.status_var.set("⏳ Loading models...")
        
        status_label = tk.Label(footer_frame,
                               textvariable=self.status_var,
                               font=('Segoe UI', 9),
                               bg=colors["border"],
                               fg=colors["fg"])
        status_label.pack(side=tk.LEFT, padx=20, pady=5)
        
        # Version
        version_label = tk.Label(footer_frame,
                                text="v1.0.0",
                                font=('Segoe UI', 9),
                                bg=colors["border"],
                                fg=colors["fg"])
        version_label.pack(side=tk.RIGHT, padx=20, pady=5)
    
    def toggle_theme(self):
        """Toggle between light and dark theme"""
        self.current_theme = "dark" if self.current_theme == "light" else "light"
        self.theme_btn.config(text="🌙" if self.current_theme == "light" else "☀")
        # Note: Full theme switching would require recreating widgets
        messagebox.showinfo("Theme", f"Theme changed to {self.current_theme}. Restart for full effect.")
    
    def show_settings(self):
        """Show settings dialog"""
        settings_window = tk.Toplevel(self.root)
        settings_window.title("Settings")
        settings_window.geometry("400x300")
        
        colors = self.themes[self.current_theme]
        settings_window.configure(bg=colors["bg"])
        
        # Settings content
        tk.Label(settings_window,
                text="Settings",
                font=self.heading_font,
                bg=colors["bg"],
                fg=colors["fg"]).pack(pady=20)
        
        # Perplexity threshold
        threshold_frame = tk.Frame(settings_window, bg=colors["bg"])
        threshold_frame.pack(pady=10)
        
        tk.Label(threshold_frame,
                text="Perplexity Threshold:",
                font=self.body_font,
                bg=colors["bg"],
                fg=colors["fg"]).pack(side=tk.LEFT, padx=5)
        
        self.threshold_var = tk.StringVar(value="25.0")
        threshold_entry = tk.Entry(threshold_frame,
                                  textvariable=self.threshold_var,
                                  font=self.body_font,
                                  width=10)
        threshold_entry.pack(side=tk.LEFT)
        
        # Max iterations
        iter_frame = tk.Frame(settings_window, bg=colors["bg"])
        iter_frame.pack(pady=10)
        
        tk.Label(iter_frame,
                text="Max Iterations:",
                font=self.body_font,
                bg=colors["bg"],
                fg=colors["fg"]).pack(side=tk.LEFT, padx=5)
        
        self.iter_var = tk.StringVar(value="2")
        iter_entry = tk.Entry(iter_frame,
                             textvariable=self.iter_var,
                             font=self.body_font,
                             width=10)
        iter_entry.pack(side=tk.LEFT)
        
        # Close button
        tk.Button(settings_window,
                 text="Close",
                 font=self.body_font,
                 bg=colors["button_bg"],
                 fg=colors["button_fg"],
                 bd=0,
                 padx=20,
                 pady=8,
                 command=settings_window.destroy).pack(pady=20)
    
    def load_model(self):
        """Load the humanizer model in background"""
        try:
            self.humanizer = TextHumanizer(perplexity_threshold=25.0)
            self.root.after(0, self.model_loaded)
        except Exception as e:
            self.root.after(0, lambda: self.show_error(f"Failed to load models: {str(e)}"))
    
    def model_loaded(self):
        """Called when model is loaded"""
        self.status_var.set("✅ Ready")
        self.process_btn.config(state='normal')
    
    def update_char_count(self, event=None):
        """Update character counter"""
        text = self.input_text.get(1.0, tk.END).strip()
        self.char_count_label.config(text=f"{len(text)} characters")
    
    def paste_text(self):
        """Paste text from clipboard"""
        try:
            text = pyperclip.paste()
            self.input_text.delete(1.0, tk.END)
            self.input_text.insert(1.0, text)
            self.update_char_count()
        except:
            # Fallback to tkinter clipboard
            try:
                text = self.root.clipboard_get()
                self.input_text.delete(1.0, tk.END)
                self.input_text.insert(1.0, text)
                self.update_char_count()
            except:
                pass
    
    def copy_text(self):
        """Copy output text to clipboard"""
        text = self.output_text.get(1.0, tk.END).strip()
        try:
            pyperclip.copy(text)
            self.status_var.set("✅ Copied to clipboard")
        except:
            # Fallback to tkinter clipboard
            self.root.clipboard_clear()
            self.root.clipboard_append(text)
            self.status_var.set("✅ Copied to clipboard")
    
    def humanize_text(self):
        """Process the text through humanizer"""
        if self.is_processing:
            return
        
        input_text = self.input_text.get(1.0, tk.END).strip()
        if not input_text:
            messagebox.showwarning("No Input", "Please enter some text to humanize.")
            return
        
        self.is_processing = True
        self.process_btn.config(state='disabled')
        self.save_btn.config(state='disabled')
        self.copy_btn.config(state='disabled')
        
        # Show progress
        self.progress.pack(pady=5)
        self.progress.start(10)
        self.status_var.set("🔄 Processing...")
        
        # Clear output
        self.output_text.config(state='normal')
        self.output_text.delete(1.0, tk.END)
        self.output_text.config(state='disabled')
        
        # Clear stats
        self.perplexity_frame.config(text="-")
        self.human_score_frame.config(text="-")
        self.time_frame.config(text="-")
        self.verdict_label.config(text="")
        
        # Record start time
        self.start_time = datetime.now()
        
        # Process in thread
        thread = threading.Thread(target=self.process_text, args=(input_text,))
        thread.start()
    
    def process_text(self, text):
        """Process text in background thread"""
        try:
            # Get settings
            try:
                max_iterations = int(self.iter_var.get())
            except:
                max_iterations = 2
            
            # Run humanization
            results = self.humanizer.humanize(text, max_iterations=max_iterations)
            
            # Calculate metrics
            process_time = (datetime.now() - self.start_time).total_seconds()
            original_perplexity = self.humanizer.stage4_calculate_perplexity(text)
            final_perplexity = results['final_perplexity']
            
            human_score = max(0, min(100, 100 - (final_perplexity * 2)))
            
            if final_perplexity < 20:
                verdict = "✨ Very Human-like"
                verdict_color = self.themes[self.current_theme]["success"]
            elif final_perplexity < 30:
                verdict = "👍 Human-like"
                verdict_color = self.themes[self.current_theme]["success"]
            elif final_perplexity < 50:
                verdict = "📝 Somewhat Human"
                verdict_color = self.themes[self.current_theme]["warning"]
            else:
                verdict = "🤖 Still AI-like"
                verdict_color = self.themes[self.current_theme]["error"]
            
            # Store results
            self.current_results = {
                'original': text,
                'humanized': results['final'],
                'original_perplexity': original_perplexity,
                'final_perplexity': final_perplexity,
                'human_score': human_score,
                'verdict': verdict,
                'verdict_color': verdict_color,
                'process_time': process_time
            }
            
            # Update UI in main thread
            self.root.after(0, self.display_results)
            
        except Exception as e:
            self.root.after(0, lambda: self.show_error(f"Processing failed: {str(e)}"))
    
    def display_results(self):
        """Display results in UI"""
        self.progress.stop()
        self.progress.pack_forget()
        
        # Update output text
        self.output_text.config(state='normal')
        self.output_text.delete(1.0, tk.END)
        self.output_text.insert(1.0, self.current_results['humanized'])
        self.output_text.config(state='disabled')
        
        # Update stats
        self.perplexity_frame.config(text=f"{self.current_results['final_perplexity']:.2f}")
        self.human_score_frame.config(text=f"{self.current_results['human_score']:.1f}%")
        self.time_frame.config(text=f"{self.current_results['process_time']:.1f}s")
        self.verdict_label.config(text=self.current_results['verdict'],
                                 fg=self.current_results['verdict_color'])
        
        # Update status
        self.status_var.set("✅ Processing complete")
        self.process_btn.config(state='normal')
        self.save_btn.config(state='normal')
        self.copy_btn.config(state='normal')
        self.is_processing = False
    
    def clear_all(self):
        """Clear all text fields"""
        self.input_text.delete(1.0, tk.END)
        self.output_text.config(state='normal')
        self.output_text.delete(1.0, tk.END)
        self.output_text.config(state='disabled')
        self.perplexity_frame.config(text="-")
        self.human_score_frame.config(text="-")
        self.time_frame.config(text="-")
        self.verdict_label.config(text="")
        self.save_btn.config(state='disabled')
        self.copy_btn.config(state='disabled')
        self.status_var.set("✅ Ready")
        self.update_char_count()
    
    def save_result(self):
        """Save the humanized result to file"""
        if not hasattr(self, 'current_results'):
            return
        
        # Create outputs directory
        os.makedirs('outputs', exist_ok=True)
        
        # Generate filename
        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        filename = f"outputs/{timestamp}.txt"
        
        # Save to file
        with open(filename, 'w', encoding='utf-8') as f:
            f.write("="*60 + "\n")
            f.write("TEXT HUMANIZER OUTPUT\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write("="*60 + "\n\n")
            
            f.write("ORIGINAL TEXT:\n")
            f.write("-"*40 + "\n")
            f.write(self.current_results['original'] + "\n\n")
            
            f.write("HUMANIZED TEXT:\n")
            f.write("-"*40 + "\n")
            f.write(self.current_results['humanized'] + "\n\n")
            
            f.write("ANALYSIS:\n")
            f.write("-"*40 + "\n")
            f.write(f"Original Perplexity: {self.current_results['original_perplexity']:.2f}\n")
            f.write(f"Final Perplexity: {self.current_results['final_perplexity']:.2f}\n")
            f.write(f"Human Score: {self.current_results['human_score']:.1f}%\n")
            f.write(f"Process Time: {self.current_results['process_time']:.1f}s\n")
            f.write(f"Verdict: {self.current_results['verdict']}\n")
        
        self.status_var.set(f"💾 Saved to {filename}")
        messagebox.showinfo("Saved", f"Results saved to {filename}")
    
    def show_error(self, message):
        """Show error message"""
        self.progress.stop()
        self.progress.pack_forget()
        self.status_var.set("❌ Error")
        self.process_btn.config(state='normal')
        self.is_processing = False
        messagebox.showerror("Error", message)

def main():
    root = tk.Tk()
    app = ModernHumanizerGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()