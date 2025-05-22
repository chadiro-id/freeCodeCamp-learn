const markdownInput = document.getElementById('markdown-input');
const htmlOutput = document.getElementById('html-output');
const previewElement = document.getElementById('preview');

markdownInput.addEventListener('input', () => {
  const htmlText = convertMarkdown();
  htmlOutput.textContent = htmlText;
  previewElement.innerHTML = htmlText;
  console.log(htmlText);
});

function convertMarkdown() {
  const markdownText = markdownInput.value;
  const htmlText = markdownToHtmlAdvanced(markdownText);
  return htmlText;
}

function markdownToHtml(markdown) {
  let html = markdown;
  
  // Headers (# ## ### #### ##### ######)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  
  // Bold (**text** or __text__)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  // Italic (*text* or _text_)
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');
  
  // Code blocks (```code```)
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  
  // Inline code (`code`)
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Images ![alt](src)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  
  // Unordered lists (- item or * item)
  html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  // Ordered lists (1. item)
  html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, (match) => {
    // Check if this is already wrapped in ul tags
    if (match.includes('<ul>')) {
      return match;
    }
    return '<ol>' + match + '</ol>';
  });
  
  // Blockquotes (> text)
  html = html.replace(/^>\s+(.*$)/gim, '<blockquote>$1</blockquote>');
  
  // Line breaks (two spaces at end of line or double newline)
  html = html.replace(/  \n/g, '<br>\n');
  html = html.replace(/\n\n/g, '</p><p>');
  
  // Wrap in paragraph tags if not already wrapped
  if (!html.startsWith('<')) {
    html = '<p>' + html + '</p>';
  }
  
  // Clean up extra paragraph tags around block elements
  html = html.replace(/<p>(<h[1-6]>.*?<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>.*?<\/ul>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ol>.*?<\/ol>)<\/p>/g, '$1');
  html = html.replace(/<p>(<blockquote>.*?<\/blockquote>)<\/p>/g, '$1');
  html = html.replace(/<p>(<pre>.*?<\/pre>)<\/p>/g, '$1');
  
  return html;
}

// Enhanced version with better list handling
function markdownToHtmlAdvanced(markdown) {
  const lines = markdown.split('\n');
  let html = '';
  let inList = false;
  let inOrderedList = false;
  let inCodeBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Handle code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        html += '</code></pre>\n';
        inCodeBlock = false;
      } else {
        html += '<pre><code>';
        inCodeBlock = true;
      }
      continue;
    }
    
    if (inCodeBlock) {
      html += line + '\n';
      continue;
    }
    
    // Handle headers
    if (line.match(/^#{1,6}\s/)) {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#+\s/, '');
      html += `<h${level}>${processInlineMarkdown(text)}</h${level}>\n`;
      continue;
    }
    
    // Handle unordered lists
    if (line.match(/^\s*[-*]\s+/)) {
      if (!inList) {
        html += '<ul>\n';
        inList = true;
      }
      const text = line.replace(/^\s*[-*]\s+/, '');
      html += `<li>${processInlineMarkdown(text)}</li>\n`;
      continue;
    }
    
    // Handle ordered lists
    if (line.match(/^\s*\d+\.\s+/)) {
      if (!inOrderedList) {
        html += '<ol>\n';
        inOrderedList = true;
      }
      const text = line.replace(/^\s*\d+\.\s+/, '');
      html += `<li>${processInlineMarkdown(text)}</li>\n`;
      continue;
    }
    
    // Close lists if we're not in one anymore
    if (inList && !line.match(/^\s*[-*]\s+/)) {
      html += '</ul>\n';
      inList = false;
    }
    
    if (inOrderedList && !line.match(/^\s*\d+\.\s+/)) {
      html += '</ol>\n';
      inOrderedList = false;
    }
    
    // Handle blockquotes
    if (line.startsWith('> ')) {
      const text = line.replace(/^>\s+/, '');
      html += `<blockquote>${processInlineMarkdown(text)}</blockquote>\n`;
      continue;
    }
    
    // Handle empty lines
    if (line.trim() === '') {
      html += '\n';
      continue;
    }
    
    // Handle regular paragraphs
    html += `<p>${processInlineMarkdown(line)}</p>\n`;
  }
  
  // Close any remaining lists
  if (inList) html += '</ul>\n';
  if (inOrderedList) html += '</ol>\n';
  
  return html.trim();
}

function processInlineMarkdown(text) {
  let result = text;
  
  // Bold
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  // Italic
  result = result.replace(/\*(.*?)\*/g, '<em>$1</em>');
  result = result.replace(/_(.*?)_/g, '<em>$1</em>');
  
  // Inline code
  result = result.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Images
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  
  // Links
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  return result;
}

// Example usage:
const markdownText = `
# My Blog Post

This is a **bold** statement and this is *italic*.

## Features

- Easy to use
- Fast conversion
- Supports most markdown features

### Links and Images

Check out [Google](https://google.com) for more info.

Here's some \`inline code\` and a code block:

\`\`\`javascript
function hello() {
  console.log("Hello World!");
}
\`\`\`

> This is a blockquote with some **bold** text.

1. First item
2. Second item
3. Third item
`;

// Test the converter
console.log("Simple converter:");
console.log(markdownToHtml(markdownText));

console.log("\n\nAdvanced converter:");
console.log(markdownToHtmlAdvanced(markdownText));

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    markdownToHtml,
    markdownToHtmlAdvanced,
    processInlineMarkdown
  };
}