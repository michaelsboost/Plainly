// keep project and data in the global scope
window.PlainlyState = {
  editorVisible: true,
  dark: true,
  name: `Welcome file`,
  md: `# Welcome to Plainly!

This is a **Markdown editor** with live preview. You can use it to quickly prototype notes, guides, or documentation.

---

## ✨ Features Showcase

### ✅ Lists
- Bullet list item 1
- Bullet list item 2
  - Nested item

1. Numbered list item 1
2. Numbered list item 2

### 📦 Code Blocks

\`\`\`javascript
function greet(name) {
  console.log("Hello, " + name);
}
greet("World");
\`\`\`

Inline code: \`const x = 42;\`

### 🖼️ Images

![Sample Image](https://live.staticflickr.com/29/67513019_31941426ac.jpg)

### 📊 Tables

| Feature       | Supported | Notes                      |
|---------------|-----------|----------------------------|
| Headers       | ✅        | All heading levels         |
| Lists         | ✅        | Nested supported           |
| Code blocks   | ✅        | Fenced + inline code       |
| Tables        | ✅        | With alignment (optional)  |
| Blockquotes   | ✅        | Styling varies by theme    |

### 💬 Blockquotes

> “Markdown is not a replacement for HTML, or even close to it... The idea is that a Markdown-formatted document should be publishable as-is.” — John Gruber

---

## 📄 Getting Started

Edit the left panel and see your preview update in real time.

---

### 🛠️ Customize It

You can change the theme, import/export your project, and build PDFs or HTML exports.

Happy writing! ✍️

---

`
};
const Modal = {
  render({
    large,
    title = "Are you sure you want to proceed?",
    content,
    CloseLabel,
    ConfirmLabel,
    onLoad,
    onClose,
    onConfirm
  }) {
    // if (!options) return false;
    const hClass = "text-lg font-thin m-0";
    const buttonClass = "text-xs w-auto px-3 py-2 m-0 capitalize rounded-md";
    const svgClass = "w-3";
    const times = `<svg class="${svgClass}" viewBox="0 0 384 512">
        <path 
          fill="currentColor" 
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
      </svg>`;

    const html = `<article class="${large ? 'flex flex-col h-3/4' : ''} rounded-md">
      <header class="${large ? 'flex-none' : ''} flex justify-between items-center">
        <h1 class="${hClass}">${title}</h1>
        <button class="border-0 bg-transparent text-sm focus:shadow-none bg-transparent border-0" style="color: unset;" aria-label="Close">
          ${times}
        </button>
      </header>
      <main class="font-thin ${large ? 'flex-grow' : ''}">
        ${content ? content : ''}
      </main>
      <footer ${large ? 'class="flex-none"' : ''}>
        <button class="border-0 bg-transparent text-sm focus:shadow-none bg-transparent border ${PlainlyState.dark ? 'border-gray-600' : 'border-gray-200'}" style="color: unset;" aria-label="Close" onclick="this.closest('dialog').remove()">${CloseLabel ? CloseLabel : 'close'}</button>
        ${onConfirm ? `<button class="border-0 text-sm focus:shadow-none" aria-label="Confirm">${ConfirmLabel ? ConfirmLabel : 'confirm'}</button>` : ''}
      </footer>
    </article>`;

    const modal = document.createElement('dialog');
    modal.open = true;
    modal.innerHTML = html;

    document.body.appendChild(modal);
    if (onLoad && typeof onLoad === 'function') {
      onLoad();
    }

    const timesBtn = modal.querySelector('header button');
    const closeBtn = modal.querySelector('footer button:first-child');
    const confirmBtn = modal.querySelector('footer button:last-child');

    // Confirm handler function
    timesBtn.onclick = function() {
      if (onClose && typeof onClose === 'function') {
        onClose();
      }
      document.body.removeChild(modal);
    }
    closeBtn.onclick = function() {
      if (onClose && typeof onClose === 'function') {
        onClose();
      }
      document.body.removeChild(modal);
    }
    confirmBtn.onclick = function() {
      if (onConfirm && typeof onConfirm === 'function') {
        onConfirm();
      }
      document.body.removeChild(modal);
    }
  }
}
let data = {
  version: '0.0.2',
  logo: `imgs/logo.svg`
}

// Enhance the menu modal with actual functionality
window.openMenu = () => {
  Modal.render({
    title: "Menu",
    large: true,
    content: `
      <div class="grid grid-cols-1 gap-2 px-4">
        <div class="text-center">
          <a aria-label="project homepage" name="project homepage" target="_blank" href="https://github.com/michaelsboost/Plainly/">
            <img alt="logo" class="my-4 w-24 m-auto rounded-2xl" src="${data.logo}" loading="lazy">
          </a>
          <div class="text-2xl">
            About Plainly
          </div>
          <div class="my-2 text-xs">
            Version ${data.version}
          </div>
          <a target="_blank" class="text-sm underline mb-2 text-blue-500" href="https://github.com/michaelsboost/Plainly/blob/main/LICENSE">
            Open Source License
          </a>
        </div>
        
        <nav class="flex justify-between mt-5 items-center">
          <label for="if2s51d22" class="mb-2 flex justify-between items-center cursor-pointer">
            <span>Dark mode:</span>
          </label>
          <input id="if2s51d22" class="m-0" type="checkbox" role="switch" name="toggle dark mode" 
            onchange="theme()" ${PlainlyState.dark ? `checked=""` : ""}>
        </nav>
        
        <div class="grid grid-cols-2 gap-2 py-4">
          <button onclick="newProject()">New Project</button>
          <button onclick="importProject()">Import</button>
        </div>
        
        <div class="border-t ${PlainlyState.dark ? 'border-gray-600' : 'border-gray-200'} pt-4">
          <h3 class="text-sm font-bold mb-2">Export Options:</h3>
          <div class="grid grid-cols-2 gap-2">
            <button onclick="exportAsMarkdown()">Markdown (.md)</button>
            <button onclick="exportAsHTML()">HTML (.html)</button>
            <button onclick="exportAsDOCX()">Word (.docx)</button>
            <button onclick="exportAsPDF()">PDF (.pdf)</button>
            <button onclick="exportAsTXT()">Text (.txt)</button>
            <button onclick="exportAsJSON()">JSON (.json)</button>
          </div>
        </div>
      </div>
    `,
    CloseLabel: "Close"
  });
};

// Import/Export Functions
window.newProject = () => {
  // Ask user for confirmation
  Modal.render({
    title: "Are you sure you want to start a new project?",
    content: `<div class="p-4 text-center">All current data will be lost.</div>`,
    onConfirm() {
      if (!PlainlyState.dark) theme();
      PlainlyState = {
        editorVisible: true,
        dark: true,
        name: `New file`,
        md: ``
      };

      projectName.value = PlainlyState.name;
      input.value = PlainlyState.md;
      updatePreview(); // ✅ This renders into the iframe
    }
  });
}
window.importProject = () => {
  Modal.render({
    title: "Import Options",
    content: `
      <div class="grid grid-cols-1 gap-2 p-4">
        <button onclick="importFile('json')">Import (.json)</button>
        <button onclick="importFile('md')">Import Markdown (.md)</button>
        <button onclick="importFile('html')">Import HTML (.html)</button>
        <button onclick="importFile('txt')">Import Text (.txt)</button>
      </div>
    `,
    CloseLabel: "Cancel"
  });
};
window.importFile = (type) => {
  // Close the modal
  document.querySelector('dialog')?.remove();

  // Create file input
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  
  // Set accept attribute based on file type
  switch(type) {
    case 'json':
      fileInput.accept = '.json';
      break;
    case 'md':
      fileInput.accept = '.md,.markdown';
      break;
    case 'html':
      fileInput.accept = '.html,.htm';
      break;
    case 'txt':
      fileInput.accept = '.txt,.text';
      break;
  }

  fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = async function(event) {
      try {
        let content = event.target.result;
        let fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
        
        // Process different file types
        switch(type) {
          case 'json':
            const importedData = JSON.parse(content);
            PlainlyState = {...PlainlyState, ...importedData};
            break;
            
          case 'md':
            PlainlyState.md = content;
            PlainlyState.name = fileName || 'Imported Markdown';
            break;
            
          case 'html':
            // Convert HTML to Markdown
            const markdown = await htmlToMarkdown(content);
            PlainlyState.md = markdown;
            PlainlyState.name = fileName || 'Imported HTML';
            break;
            
          case 'txt':
            PlainlyState.md = content;
            PlainlyState.name = fileName || 'Imported Text';
            break;
        }

        // Update UI
        document.getElementById('projectName').value = PlainlyState.name;
        document.getElementById('input').value = PlainlyState.md;
        updatePreview();
        
      } catch (error) {
        Modal.render({
          title: "Import Error",
          content: `<div class="p-4">Failed to import file: ${error.message}</div>`,
          CloseLabel: "OK"
        });
        console.error("Import failed:", error);
      }
    };

    reader.readAsText(file);
  });

  fileInput.click();
};

// HTML to Markdown converter
async function htmlToMarkdown(html) {
  const turndownService = new TurndownService();
  return turndownService.turndown(html);
}

/**
 * Sanitizes a filename by removing/replacing invalid characters
 * @param {string} filename The original filename
 * @returns {string} Sanitized filename safe for all operating systems
 */
function sanitizeFilename(filename) {
  if (!filename) return '';
  
  // Replace invalid characters with underscores
  const invalidChars = /[<>:"/\\|?*\x00-\x1F]/g;
  const windowsReserved = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i;
  const trailingPeriods = /\.+$/;
  
  // Basic sanitization
  let sanitized = filename
    .replace(invalidChars, '_')
    .replace(trailingPeriods, '')
    .trim();
  
  // Handle reserved names in Windows
  if (windowsReserved.test(sanitized)) {
    sanitized = '_' + sanitized;
  }
  
  // Ensure filename isn't empty after sanitization
  if (!sanitized) {
    sanitized = 'document';
  }
  
  // Limit length to 255 characters (common filesystem limit)
  return sanitized.substring(0, 255);
}
function timestamp() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based
  const year = today.getFullYear();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  return timestamp;
}

// Export as Markdown
window.exportAsMarkdown = () => {
  try {
    const safeName = sanitizeFilename(PlainlyState.name);
    const blob = new Blob([PlainlyState.md], { type: 'text/markdown' });
    saveAs(blob, `${safeName || timestamp()}.md`);
  } catch (error) {
    Modal.render({
      title: "Export Error",
      content: `<div class="p-4">Failed to create Markdown export: ${error.message}</div>`,
      CloseLabel: "OK"
    });
    console.error("Markdown export failed:", error);
  }
};

// Export as HTML
window.exportAsHTML = () => {
  try {
    const safeName = sanitizeFilename(PlainlyState.name);
    const htmlContent = marked.parse(PlainlyState.md);
    const fullHtml = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css">
        <title>${safeName || 'Document'}</title>
      </head>
      <body>
        <main class="container">
          ${htmlContent}
        </main>
      </body>
    </html>`;
    
    const blob = new Blob([fullHtml], { type: 'text/html' });
    saveAs(blob, `${safeName || timestamp()}.html`);
  } catch (error) {
    Modal.render({
      title: "Export Error",
      content: `<div class="p-4">Failed to create HTML export: ${error.message}</div>`,
      CloseLabel: "OK"
    });
    console.error("HTML export failed:", error);
  }
};

// Export as DOCX
window.exportAsDOCX = async () => {
  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    Table,
    TableRow,
    TableCell,
    AlignmentType,
    WidthType,
    Media,
  } = window.docx;

  const html = marked.parse(PlainlyState.md);
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // Inline code parser
  function parseInlineCode(text) {
    const regex = /(`)(.*?)\1/g;
    const result = [];
    let last = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > last) {
        result.push(new TextRun(text.slice(last, match.index)));
      }
      result.push(new TextRun({
        text: match[2],
        font: "Courier New",
        size: 22,
        color: "222222",
      }));
      last = regex.lastIndex;
    }

    if (last < text.length) {
      result.push(new TextRun(text.slice(last)));
    }

    return result;
  }

  const children = [];

  for (const node of temp.childNodes) {
    if (node.nodeType !== Node.ELEMENT_NODE) continue;

    const tag = node.tagName.toLowerCase();
    const text = node.innerText || node.textContent || '';

    if (tag === 'h1') {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] }));
    } else if (tag === 'h2') {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] }));
    } else if (tag === 'h3') {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(text)] }));
    } else if (tag === 'p') {
      children.push(new Paragraph({ children: parseInlineCode(text) }));
    } else if (tag === 'blockquote') {
      children.push(new Paragraph({ children: [new TextRun({ text, italics: true })] }));
    } else if (tag === 'pre') {
      const codeText = node.querySelector('code')?.textContent || node.textContent;
      const codeLines = codeText.trim().split('\n');
      const codeParagraphs = codeLines.map(line => new Paragraph({
        children: [new TextRun({ text: line, font: "Courier New", size: 22 })],
      }));
      children.push(...codeParagraphs);
    } else if (tag === 'ul' || tag === 'ol') {
      const isOrdered = tag === 'ol';
      for (const li of node.querySelectorAll('li')) {
        children.push(new Paragraph({
          text: li.innerText,
          bullet: !isOrdered ? { level: 0 } : undefined,
        }));
      }
    } else if (tag === 'table') {
      const rows = [...node.querySelectorAll('tr')].map((tr) => {
        const cells = [...tr.children].map((td) =>
          new TableCell({
            children: [new Paragraph({ text: td.innerText.replace(/\n/g, ' ').trim() })],
            verticalAlign: "center",
            width: { size: 4500, type: WidthType.DXA },
            margins: {
              top: 100,
              bottom: 100,
              left: 200,
              right: 200,
            },
          })
        );
        return new TableRow({ children: cells });
      });

      children.push(new Table({
        rows,
        width: { size: 100, type: WidthType.PERCENTAGE },
        alignment: AlignmentType.LEFT,
      }));
    } else if (tag === 'img') {
      const imageUrl = node.getAttribute('src');
      try {
        let imageBuffer;

        if (imageUrl.startsWith('data:')) {
          const base64 = imageUrl.split(',')[1];
          imageBuffer = Uint8Array.from(atob(base64), c => c.charCodeAt(0)).buffer;
        } else {
          const response = await fetch(imageUrl, { mode: 'cors' });
          const blob = await response.blob();
          imageBuffer = await blob.arrayBuffer();
        }

        const image = Media.addImage(doc, imageBuffer, 400, 300);
        children.push(new Paragraph(image));
      } catch (err) {
        children.push(new Paragraph({ children: [new TextRun(`⚠️ Could not load image: ${imageUrl}`)] }));
      }
    } else {
      children.push(new Paragraph({ children: parseInlineCode(text) }));
    }
  }

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
            size: 24,
            color: "000000",
          },
          paragraph: {
            spacing: { line: 276 },
          },
        },
      },
    },
    sections: [{ children }],
  });

  const blob = await Packer.toBlob(doc);
  const safeName = sanitizeFilename(PlainlyState.name);
  saveAs(blob, `${safeName || 'document'}.docx`);
};

// Export as PDF
window.exportAsPDF = async () => {
  try {
    const safeName = sanitizeFilename(PlainlyState.name);
    const htmlContent = marked.parse(PlainlyState.md);
    const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css">
        <style>
          @media print {
            .page-break {
              page-break-after: always;
            }
          }
          
          body {
            font-size: 12pt;
            line-height: 1.6;
          }
          
          @page {
            margin: 2cm;
          }
          main.container {
            background-color: var(--pico-background-color);
            color: var(--pico-color);
          }
        </style>
      </head>
      <body>
        <main class="container" style="padding: 2rem;">
          ${htmlContent}
        </main>
      </body>
    </html>`;
    
    const options = {
      margin: 10,
      filename: `${safeName || timestamp()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: PlainlyState.dark ? '#13171f' : '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    await html2pdf().set(options).from(fullHtml).save();
  } catch (error) {
    Modal.render({
      title: "Export Error",
      content: `<div class="p-4">Failed to create PDF export: ${error.message}</div>`,
      CloseLabel: "OK"
    });
    console.error("PDF export failed:", error);
  }
};

// Export as JSON
window.exportAsJSON = () => {
  try {
    const safeName = sanitizeFilename(PlainlyState.name);
    const jsonData = JSON.stringify(PlainlyState, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, `${safeName || 'project'}.json`);
  } catch (error) {
    Modal.render({
      title: "Export Error",
      content: `<div class="p-4">Failed to create JSON export: ${error.message}</div>`,
      CloseLabel: "OK"
    });
    console.error("JSON export failed:", error);
  }
};

// Export as Txt
window.exportAsTXT = () => {
  try {
    const safeName = sanitizeFilename(PlainlyState.name);
    
    // Basic Markdown stripping (keep it simple)
    let plainText = PlainlyState.md
      // Remove headers
      .replace(/^#+\s+(.*$)/gm, '$1\n')
      // Remove bold/italic
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      // Remove links
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      // Remove images
      .replace(/!\[(.*?)\]\(.*?\)/g, '$1')
      // Remove code blocks
      .replace(/`{3}[\s\S]*?`{3}/g, '')
      .replace(/`(.*?)`/g, '$1')
      // Clean up multiple newlines
      .replace(/\n{3,}/g, '\n\n');
    
    const blob = new Blob([plainText], { type: 'text/plain' });
    saveAs(blob, `${safeName || timestamp()}_plain.txt`);
    
  } catch (error) {
    Modal.render({
      title: "Export Error",
      content: `<div class="p-4">Failed to create text export: ${error.message}</div>`,
      CloseLabel: "OK"
    });
    console.error("Text export failed:", error);
  }
};

// other functions for app
window.theme = () => {
  // Toggle dark mode
  PlainlyState.dark = !PlainlyState.dark;
  autosavePlainly();
  
  // Update the checkbox if it exists
  const darkModeCheckbox = document.getElementById('if2s51d22');
  if (darkModeCheckbox) {
    darkModeCheckbox.checked = PlainlyState.dark;
  }
  
  // Update theme attribute
  document.documentElement.setAttribute('data-theme', PlainlyState.dark ? 'dark' : 'light');
  
  // Update border colors
  document.querySelectorAll('[data-theme="border"]').forEach(element => {
    element.classList.toggle("border-gray-800", PlainlyState.dark);
    element.classList.toggle("border-gray-200", !PlainlyState.dark);
  });
}
window.toggleEditor = () => {
  // Toggle panel
  PlainlyState.editorVisible = !PlainlyState.editorVisible;
  autosavePlainly();
  
  // Update icon color
  const icon = document.getElementById('icon');
  icon.style.color = PlainlyState.editorVisible ? '#22c55e' : 'unset';

  // Toggle panel state
  const panel = document.querySelector('[data-panel=code]');
  panel.style.display = PlainlyState.editorVisible ? '' : 'none';
  const preview = document.querySelector('[data-panel=preview]');
  preview.classList.toggle('flex-[1]', 'flex-[0]', PlainlyState.editorVisible);
}

// ✅ This renders into the iframe
window.createBlobURL = (content, type) => {
  const blob = new Blob([content], { type });
  return URL.createObjectURL(blob);
}
// Debounce the preview update to prevent lag with large documents
let previewTimeout;
window.updatePreview = () => {
  clearTimeout(previewTimeout);
  previewTimeout = setTimeout(() => {
    const iframe = document.getElementById('iframe');
    if (!iframe) return;

    const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
          }
          main.container {
            height: 100vh;
            overflow-y: auto;
            box-sizing: border-box;
            padding: 2rem;
          }
        </style>
      </head>
      <body>
        <main class="container">
          ${marked.parse(PlainlyState.md)}
        </main>
      </body>
    </html>`;

    const blobURL = createBlobURL(html, 'text/html');
    iframe.src = blobURL;

    iframe.onload = () => {
      const editor = document.getElementById('input');
      const preview = iframe.contentDocument?.querySelector('main');
      if (!editor || !preview) return;

      let isSyncing = false;
      let syncSource = null;

      function syncScroll(from, to) {
        if (!from || !to) return;

        const fromRatio = from.scrollTop / (from.scrollHeight - from.clientHeight);
        const targetScrollTop = fromRatio * (to.scrollHeight - to.clientHeight);

        const diff = Math.abs(to.scrollTop - targetScrollTop);
        if (diff > 2) {
          to.scrollTop = targetScrollTop;
        }
      }

      function handleEditorScroll() {
        if (isSyncing || syncSource === 'preview') return;
        syncSource = 'editor';
        isSyncing = true;
        requestAnimationFrame(() => {
          syncScroll(editor, preview);
          isSyncing = false;
          syncSource = null;
        });
      }

      function handlePreviewScroll() {
        if (isSyncing || syncSource === 'editor') return;
        syncSource = 'preview';
        isSyncing = true;
        requestAnimationFrame(() => {
          syncScroll(preview, editor);
          isSyncing = false;
          syncSource = null;
        });
      }

      editor.addEventListener('scroll', handleEditorScroll);
      preview.addEventListener('scroll', handlePreviewScroll);
    };
  }, 300);
};

// Add to your init function
window.addEventListener('beforeunload', () => {
  localStorage.setItem('plainly_autosave', JSON.stringify(PlainlyState));
});
window.autosavePlainly = () => {
  localStorage.setItem('plainly_autosave', JSON.stringify(PlainlyState));
}

// Check for autosave on load
const autosave = localStorage.getItem('plainly_autosave');
if (autosave) {
  PlainlyState = JSON.parse(autosave);
  init();
}

// once dom has loaded init functions
function init() {
  // Initialize theme based on saved state
  document.documentElement.setAttribute('data-theme', PlainlyState.dark ? 'dark' : 'light');
  
  // Update border colors based on theme
  document.querySelectorAll('[data-theme="border"]').forEach(element => {
    element.classList.toggle("border-gray-800", PlainlyState.dark);
    element.classList.toggle("border-gray-200", !PlainlyState.dark);
  });

  // Toggle panel state
  const panel = document.querySelector('[data-panel=code]');
  panel.style.display = PlainlyState.editorVisible ? '' : 'none';
  
  // Update icon color
  const icon = document.getElementById('icon');
  icon.style.color = PlainlyState.editorVisible ? '#22c55e' : 'unset';

  // Initialize and render components
  const projectName = document.getElementById('projectName');
  projectName.value = PlainlyState.name;
  const input = document.getElementById('input');
  input.value = PlainlyState.md;
  updatePreview();
}
document.addEventListener('DOMContentLoaded', () => init());