// keep project and data in the global scope
window.PlainlyState = {
  name: 'Welcome file',
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

`,
  dark: true
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
let logo = {
  src: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgdmVyc2lvbj0iMS4yIgogICB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IgogICB3aWR0aD0iMTAyNCIKICAgaGVpZ2h0PSIxMDI0IgogICBpZD0ic3ZnMSIKICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcwogICAgIGlkPSJkZWZzMSIgLz48dGl0bGUKICAgICBpZD0idGl0bGUxIj5DaGF0R1BUIEltYWdlIEp1biA2LCAyMDI1LCAwOV8zNl80MCBQTTwvdGl0bGU+PHN0eWxlCiAgICAgaWQ9InN0eWxlMSI+CgkJLnMwIHsgZmlsbDogIzE3MTgxOCB9IAoJCS5zMSB7IG9wYWNpdHk6IDE7ZmlsbDogIzdmNWI0ZiB9IAoJCS5zMiB7IGZpbGw6ICNlNzc5NjUgfSAKCQkuczMgeyBvcGFjaXR5OiAxO2ZpbGw6ICNlM2I4OGQgfSAKCQkuczQgeyBmaWxsOiAjMWExYzFlIH0gCgkJLnM1IHsgZmlsbDogI2YwOGI0OCB9IAoJCS5zNiB7IGZpbGw6ICNmY2ZiZWMgfSAKCTwvc3R5bGU+PGcKICAgICBpZD0iQmFja2dyb3VuZCI+PHBhdGgKICAgICAgIGlkPSJQYXRoIDIiCiAgICAgICBjbGFzcz0iczIiCiAgICAgICBkPSJtIDIyNC45OTI1OSwyNC4xNTk0NzYgYyAtMi41LDAuMSAtMTAuMywwLjggLTE3LjUsMS40IC03LjIsMC42IC0xNy45LDIgLTI0LDMgLTYuMSwxIC0xNS4xLDMgLTIwLDQuMyAtNC45LDEuNCAtMTIuOCw0IC0xNy41LDUuNyAtNC43LDEuOCAtMTIuNiw1LjQgLTE3LjUsNy45IC01LDIuNiAtMTMsNy40IC0xOCwxMC43IC01LDMuMyAtMTMuMDAwMDAyLDkuNCAtMTguMDAwMDAyLDEzLjUgLTUsNC4xIC0xMS45LDEwLjYgLTE1LjUsMTQuNCAtMy42LDMuOCAtOSwxMC4zIC0xMi4xLDE0LjQgLTMuMSw0LjEwMDAwNCAtNy4zLDEwLjIwMDAwNCAtOS40LDEzLjUwMDAwNCAtMi4xLDMuMyAtNiwxMC4zIC04LjYsMTUuNSAtMi42LDUuMiAtNi4zLDEzLjYgLTguMiwxOC41IC0yLDQuOSAtNC43LDEzLjUgLTYuMiwxOSAtMS40LDUuNSAtMy41LDE1LjYgLTQuNSwyMi41IC0xLjEsNi45IC0yLjUsMjMuMSAtMy4xLDM2IC0wLjcsMTUuNiAtMC45LDExNy42IC0wLjYsMzAyIDAuMiwyMTEuNyAwLjYsMjgxLjEgMS41LDI4OS41IDAuNyw2IDIuNCwxNy4xIDMuOCwyNC41IDEuNCw3LjQgNC4xLDE4IDUuOSwyMy41IDEuOCw1LjUgNS42LDE1IDguNCwyMSAyLjksNiA2LjksMTMuNyA4LjgsMTcgMiwzLjMgNi43LDEwLjMgMTAuNCwxNS41IDMuNiw1LjIgMTAuNiwxMy43IDE1LjUsMTguOSA0LjksNS4yIDEyLjMsMTIuMiAxNi40LDE1LjUgNC4xLDMuNCA5LjcwMDAwMiw3LjggMTIuNTAwMDAyLDkuNyAyLjcsMS45IDcuNyw1LjEgMTEsNy4xIDMuMywxLjkgOCw0LjcgMTAuNSw2IDIuNSwxLjQgOC4xLDQuMSAxMi41LDYgNC40LDIgMTIuOSw1LjIgMTksNy4yIDYuMSwyIDE2LjQsNC43IDIzLDYgNi42LDEuNCAxNi40LDMgMjEuOCwzLjUgNS4zLDAuNiAyMC40LDEuNSAzMy40LDIuMSAxNC40LDAuNjAwMDIgMTI1LDAuOTAwMDIgMjc5LjMsMC45MDAwMiAxNDAuNSwtMC4xIDI2NCwtMC41MDAwMiAyNzQuNSwtMS4wMDAwMiAxMC41LC0wLjQgMjUuNSwtMS44IDMzLjUsLTIuOSA4LC0xLjIgMTkuNSwtMy40IDI1LjUsLTUgNiwtMS41IDE1LjUsLTQuNSAyMSwtNi41IDUuNSwtMi4xIDEzLjQsLTUuNCAxNy41LC03LjUgNC4xLC0yLjEgMTEuMywtNi4xIDE2LC05IDQuNywtMi45IDEyLjMsLTguMiAxNywtMTEuOSA0LjYsLTMuNiAxMS4xLC05LjEgMTQuNCwtMTIuMSAzLjMsLTMgOS4zLC05LjMgMTMuNCwtMTQgNC4xLC00LjcgMTAuNywtMTMuNSAxNC43LC0xOS41IDQuMSwtNiA5LjksLTE2LjIgMTMuMSwtMjIuNSAzLjEsLTYuMyA3LjQsLTE2LjcgOS41LC0yMyAyLjEsLTYuMyA0LjUsLTE0LjkgNS40LC0xOSAwLjksLTQuMSAyLjIsLTExLjggMywtMTcgMC44LC01LjIgMS45LC0xOC41IDIuNSwtMjkuNSAwLjgsLTE0IDEsLTEwNi4yIDAuOCwtMzA1IC0wLjQsLTI2MS4zIC0wLjUsLTI4NiAtMi4xLC0yOTcuMyAtMC45LC02LjcgLTIuOSwtMTcuNSAtNC4zLC0yMy45IC0xLjUsLTYuNSAtNC4yLC0xNi4zIC02LjEsLTIxLjggLTEuOSwtNS41IC01LjYsLTE0LjUgLTguMiwtMjAgLTIuNiwtNS41IC03LjIsLTEzLjggLTEwLjIsLTE4LjUgLTIuOSwtNC43IC04LjgsLTEyLjUgLTEyLjksLTE3LjUwMDAwNCAtNC4yLC00LjkgLTExLC0xMi4yIC0xNSwtMTYuMiAtNC4xLC00IC0xMC42LC05LjcgLTE0LjUsLTEyLjggLTMuOSwtMy4xIC0xMSwtOC4xIC0xNiwtMTEuMiAtNSwtMy4xIC0xNCwtOCAtMjAsLTEwLjkgLTYsLTIuOSAtMTUuNywtNi44IC0yMS41LC04LjcgLTUuOCwtMS45IC0xNi40LC00LjcgLTIzLjUsLTYuMSAtNy4xLC0xLjQgLTE2LjYsLTMgLTIxLC0zLjYgLTQuNCwtMC41IC0xNS42LC0xLjQgLTI1LC0yIC0xMC44LC0wLjYgLTExOC40LC0wLjkgLTI5My41LC0wLjggLTE1Mi4xLDAuMSAtMjc4LjUsMC4zIC0yODEsMC41IHoiCiAgICAgICBzdHlsZT0iZmlsbDojZTc3YTY1O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMWExYzFlO3N0cm9rZS13aWR0aDozMDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiIC8+PGcKICAgICAgIGlkPSJnMSI+PGcKICAgICAgICAgaWQ9ImczIgogICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLjI2MzU3MTksMCwwLDEuMjYzNTcxOSwtMTQxLjIyODgsMjkuMTc3ODgpIj48cGF0aAogICAgICAgICAgIGlkPSJQYXRoIDQiCiAgICAgICAgICAgY2xhc3M9InM0IgogICAgICAgICAgIGQ9Im0gMjc0LjEsMTYyLjggYyAtMS45LDAuMyAtNi45LDEuMiAtMTEsMiAtNC4yLDAuOCAtMTAuOCwyLjggLTE0LjYsNC4zIC0zLjksMS42IC05LjQsNC40IC0xMi40LDYuMiAtMi45LDEuNyAtOC41LDYuMSAtMTIuNCw5LjcgLTMuOCwzLjYgLTkuMiw5LjYgLTExLjksMTMuNSAtMi43LDMuOCAtNi4yLDEwLjEgLTcuOCwxNCAtMS42LDMuOCAtMy42LDEwLjEgLTQuNiwxNCAtMS40LDYuMSAtMS43LDE2LjEgLTIuMSw3OS41IC0wLjMsNDcuMSAtMC4xLDc3LjkgMC42LDg4IDAuNiw4LjUgMS44LDE4LjIgMi43LDIxLjUgMC45LDMuMyAzLjEsOS40IDUuMSwxMy41IDEuOSw0LjEgNS40LDEwLjIgNy43LDEzLjUgMi40LDMuMyA2LjgsOC4zIDkuNywxMSAzLDIuOCA3LjYsNi42IDEwLjQsOC41IDIuNywxLjkgOC4xLDQuOCAxMiw2LjYgMy44LDEuOCA5LjcsMy45IDEzLDQuOCAzLjMsMC45IDkuNSwxLjkgMTMuNywyLjMgbCA3LjcsMC44IGMgMC42LDQ1LjcgMC44LDQ4LjQgMi42LDUyLjUgMS4yLDIuNSA0LjEsNi40IDYuNSw4LjggMi44LDIuNyA2LjQsNC45IDkuNSw1LjkgMy4zLDEgNy4yLDEuNCAxMS41LDEuMSA0LjgsLTAuMyA3LjksLTEuMiAxMS43LC0zLjQgMi44LC0xLjYgMjAuMiwtMTYgMzguNSwtMzIuMSAxOC4zLC0xNiAzNC41LC0zMC4xIDM2LC0zMS4yIDIuOCwtMi4xIDMuMiwtMi4xIDc3LjMsLTIuMSBIIDU0OCB2IDExMi41IGMgMy41LDcgNi4xLDEwIDgsMTEuMyAyLjEsMS4zIDUsMi4yIDcuMiwyLjIgMi4xLDAgNSwtMC41IDYuNSwtMS4xIDEuNiwtMC42IDE1LjQsLTkuMyAzMC44LC0xOS4yIDE1LjMsLTEwIDM4LjcsLTI1LjIgNTEuOCwtMzMuNyBsIDI0LC0xNS41IGMgMzcuNCwtNjcuNCA1OC40LC0xMDUgNzAuNywtMTI3IDEyLjIsLTIyIDI5LjUsLTUzLjEgMzguMywtNjkgOC44LC0xNS45IDIyLjcsLTQxLjQgMzAuOSwtNTYuNSA4LjIsLTE1LjEgMTUuNywtMjkuOSAxNi44LC0zMi44IDEuMSwtMi44IDIuNSwtOC4yIDMuMSwtMTIgMC45LC01IDAuOSwtOC4xIDAsLTEyLjUgLTAuNiwtMy4xIC0yLjMsLTguMyAtMy45LC0xMS41IC0xLjcsLTMuNyAtNS41LC04LjYgLTEwLjcsLTEzLjggLTQuNCwtNC40IC0xMC45LC05LjkgLTE0LjUsLTEyLjMgLTMuNiwtMi4zIC0xMS45LC02LjkgLTE4LjUsLTEwLjEgLTYuNiwtMy4yIC0xNS42LC02LjkgLTIwLC04LjQgLTQuNCwtMS40IC0xMS40LC0zLjEgLTE1LjUsLTMuNyAtNC4xLC0wLjYgLTEwLjQsLTAuOSAtMTQsLTAuNSAtMy45LDAuNCAtOC45LDEuNyAtMTIuNSwzLjQgLTMuMywxLjUgLTguMiw0LjggLTEwLjgsNy4yIC0yLjcsMi41IC02LjQsNi43IC04LjEsOS41IC0xLjgsMi43IC04LjUsMTQuMiAtMTQuOCwyNS41IC02LjQsMTEuMyAtMTcuOCwzMiAtMjUuNSw0NiAtNy43LDE0IC0xNS43LDI4LjggLTE3LjksMzIuOCBsIC0zLjksNy40IC0xLC02Ny43IGMgLTQuNywtMTMuMiAtOC4xLC0yMC40IC0xMC43LC0yNC41IC0yLjUsLTQuMSAtNy43LC0xMC42IC0xMS40LC0xNC40IC0zLjgsLTMuOCAtOS42LC04LjcgLTEyLjksLTEwLjkgLTMuMywtMi4zIC04LjksLTUuNCAtMTIuNSwtNyAtMy42LC0xLjYgLTkuOSwtMy45IC0xNCwtNS4xIC03LjUsLTIuMSAtNy43LC0yLjEgLTE1Ni41LC0yLjIgLTgyLC0wLjEgLTE1MC41LDAuMSAtMTUyLjQsMC40IHoiCiAgICAgICAgICAgc3R5bGU9InN0cm9rZS13aWR0aDoyNTtzdHJva2UtZGFzaGFycmF5Om5vbmUiIC8+PHBhdGgKICAgICAgICAgICBpZD0iUGF0aCA3IgogICAgICAgICAgIGNsYXNzPSJzMSIKICAgICAgICAgICBkPSJtIDcwMS4yLDI0MSBjIC0yLjksNC44IC0zLjgsNy4xIC0zLDcuNSAwLjcsMC4yIDMuMywwLjkgNS44LDEuNiAyLjUsMC42IDksMi45IDE0LjUsNS4xIDUuNSwyLjIgMTQuNyw2LjQgMjAuNSw5LjUgNS44LDMgMTQuNSw4LjMgMTkuNCwxMS43IDQuOSwzLjMgMTIuMyw5LjIgMTYuNSwxMy4xIDQuMSwzLjkgNy4yLDYuNCA2LjgsNS44IC0wLjQsLTAuNyAtMC40LC0xLjMgMCwtMS4zIDAuNSwwLjEgMi4xLC0yLjQgMy44LC01LjUgbCAzLC01LjcgYyAtNywtNi4xIC0xMS41LC05LjkgLTE0LjUsLTEyLjMgLTMsLTIuMyAtMTAuNSwtNy4zIC0xNi41LC0xMSAtNiwtMy43IC0xNiwtOS4xIC0yMiwtMTIgLTYsLTIuOSAtMTUuMSwtNy4yIC0yMCwtOS40IC01LC0yLjMgLTkuMywtNC4xIC05LjYsLTQuMSAtMC4zLDAgLTIuNCwzLjIgLTQuNyw3IHogTSAzMDIuNCw0OTUuNSBjIDAsMTIuNiAwLjIsMTcuNiAwLjMsMTEgMC4yLC02LjYgMC4yLC0xNi45IDAsLTIzIC0wLjEsLTYuMSAtMC4zLC0wLjYgLTAuMywxMiB6IgogICAgICAgICAgIHN0eWxlPSJmaWxsOiM3ZTg0OGI7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjI1O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIgLz48cGF0aAogICAgICAgICAgIGlkPSJQYXRoIDgiCiAgICAgICAgICAgY2xhc3M9InMzIgogICAgICAgICAgIGQ9Im0gNTcwLjIsNDgxLjkgYyAtMC4zLDAuMiAtMC41LDEzLjUgLTAuNCwyOS41IGwgMC4yLDI5LjEgYyA3LjQsMSAxMS4zLDIuMiAxMy41LDMuMyAyLjIsMS4xIDUuOSw0IDguMiw2LjYgMi40LDIuNSA0LjMsNS4xIDQuMyw1LjYgMCwwLjUgMC4zLDEgMC43LDEgMC41LDAuMSA1LjEsLTIuNyAxMC4zLC02LjEgNS4yLC0zLjUgMTcsLTExIDI2LjEsLTE2LjggbCAxNi42LC0xMC42IGMgLTguMywtMTIuNCAtMTAuOCwtMTYuMyAtMTEsLTE2LjggLTAuMSwtMC40IC0yLjUsLTAuMyAtNS4yLDAuMiAtMy4xLDAuNiAtNi45LDAuNiAtMTAsMCAtMi44LC0wLjUgLTcsLTIuMiAtOS40LC0zLjcgLTIuNSwtMS41IC02LC00LjcgLTcuOSwtNy4yIC0xLjksLTIuNSAtMy45LC02LjQgLTQuNSwtOC44IC0xLjEsLTMuNyAtMS41LC00LjIgLTQuMiwtNC4zIC0xLjcsMCAtOC4zLC0wLjQgLTE0LjgsLTAuNyAtNi41LC0wLjQgLTEyLjEsLTAuNSAtMTIuNSwtMC4zIHoiCiAgICAgICAgICAgc3R5bGU9ImRpc3BsYXk6aW5saW5lO3N0cm9rZS13aWR0aDoyNTtzdHJva2UtZGFzaGFycmF5Om5vbmUiIC8+PHBhdGgKICAgICAgICAgICBpZD0iUGF0aCA5IgogICAgICAgICAgIGNsYXNzPSJzMCIKICAgICAgICAgICBkPSJtIDMwMS4zLDE4NCBjIC04LjMsMC4zIC0xNS41LDAuOCAtMTUuOSwxLjMgLTAuNCwwLjQgNjIsMC43IDEzOC43LDAuNyAxMTAuMSwtMC4xIDEzOSwtMC4zIDEzNy40LC0xLjMgLTEuNSwtMC45IC0yOS43LC0xLjIgLTEyMy41LC0xLjIgLTY2LjgsMCAtMTI4LjMsMC4yIC0xMzYuNywwLjUgeiBNIDIxMywyNjkuNSBWIDI5MCBoIC04IHYgNjkgaCA4IGMgMC40LDIzLjYgMC43LC0xLjEgMC44LC0zOS44IDAuMSwtMzguNiAwLC03MC4yIC0wLjMsLTcwLjIgLTAuMywwIC0wLjUsOS4yIC0wLjUsMjAuNSB6IG0gNi42LC00LjggYyAtMC40LDguNyAtMS4xLDIzLjQgLTEuNiwzMi44IC0wLjYsOS40IC0wLjgsMzEuNCAtMC42LDQ5IDAuMywxNy42IDEsMzUuNCAxLjYsMzkuNSAwLjYsNC4xIDEuMyw3LjcgMS42LDggMC4yLDAuMyAwLjQsLTMyLjIgMC40LC03Mi4zIDAsLTQwIC0wLjIsLTcyLjcgLTAuNCwtNzIuNyAtMC4yLDAgLTAuNyw3LjEgLTEsMTUuOCB6IG0gNDAyLjUsMzYuMiBjIDAuMSwxNSAwLjUsMjIuNiAwLjksMTkuNSAwLjQsLTIuOCAwLjUsLTEzLjYgMC4zLC0yNCAtMC4zLC0xMC40IC0wLjcsLTE5LjIgLTAuOSwtMTkuNSAtMC4zLC0wLjMgLTAuNCwxMC41IC0wLjMsMjQgeiIKICAgICAgICAgICBzdHlsZT0ic3Ryb2tlLXdpZHRoOjI1O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIgLz48cGF0aAogICAgICAgICAgIGlkPSJQYXRoIDEwIgogICAgICAgICAgIGNsYXNzPSJzMiIKICAgICAgICAgICBkPSJtIDczNi41LDE4Ni41IGMgLTIuMiwwLjggLTQuOCwyLjMgLTUuOCwzLjMgLTEsMC45IC00LjUsNi44IC03LjgsMTIuOSAtMy4yLDYuMiAtNS44LDExLjUgLTUuNywxMS43IDAuMiwwLjIgMy40LDEuNiA3LjMsMy4xIDMuOSwxLjUgMTMuNSw2IDIxLjUsMTAgOCwzLjkgMTguOCw5LjggMjQsMTIuOSA1LjIsMy4yIDEyLjQsNy45IDE2LDEwLjQgMy42LDIuNiA4LjEsNi4xIDEwLDcuOSAxLjksMS44IDMuOCwzLjIgNC4zLDMuMyAwLjQsMCAzLjcsLTYgNy4zLC0xMy4zIDUuNiwtMTEgNi43LC0xNCA2LjYsLTE4LjIgMCwtMi44IC0wLjcsLTYuNSAtMS42LC04LjMgLTAuOSwtMS43IC0zLjUsLTUuMyAtNS44LC03LjggLTIuNCwtMi42IC03LC02LjYgLTEwLjMsLTguOSAtMy4zLC0yLjQgLTEwLjUsLTYuNiAtMTYsLTkuMyAtNS41LC0yLjggLTEzLjYsLTYuMyAtMTgsLTcuNyAtNC40LC0xLjUgLTExLjEsLTIuOSAtMTUsLTMuMSAtNC44LC0wLjMgLTguMywwIC0xMSwxLjEgeiIKICAgICAgICAgICBzdHlsZT0iZmlsbDojZTU3NTY5O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDoyNTtzdHJva2UtZGFzaGFycmF5Om5vbmUiIC8+PHBhdGgKICAgICAgICAgICBpZD0iUGF0aCAxMSIKICAgICAgICAgICBjbGFzcz0iczUiCiAgICAgICAgICAgZD0ibSA2NTguOCwzMTguMiBjIC0xNS4yLDI3LjEgLTM0LjYsNjEuNyAtNDMuMSw3Ni44IC04LjUsMTUuMSAtMjAsMzUuOCAtMjUuNSw0NiAtNS42LDEwLjIgLTEwLjEsMTguNiAtOS45LDE4LjYgMC4xLDAuMSA1LjgsMC42IDEyLjcsMS4yIDYuOSwwLjYgMTIuNiwxIDEyLjYsMC45IDAuMSwtMC4xIDguOSwtMTUuNSAxOS42LC0zNC4yIDEwLjcsLTE4LjcgMjQuNCwtNDIuOCAzMC41LC01My41IDYuMSwtMTAuNyAxNS4zLC0yNy4xIDIwLjUsLTM2LjUgNS4yLC05LjQgMTQuOSwtMjYuOCAyMS42LC0zOC43IDYuNywtMTIgMTIuMSwtMjIgMTIsLTIyLjIgLTAuMiwtMC4yIC00LjYsLTEuNyAtOS44LC0zLjQgLTUuMiwtMS42IC0xMC40LC0zLjIgLTExLjYsLTMuNiAtMS44LC0wLjUgLTQuOSw0LjUgLTI5LjYsNDguNiB6IG0gNTAuNCwtMTIuNCBjIC03LjEsMTIuNSAtMjAuNSwzNi4yIC0yOS43LDUyLjcgLTkuMiwxNi41IC0yMi42LDQwLjQgLTI5LjgsNTMgLTcuMiwxMi42IC0xNy41LDMwLjggLTIyLjksNDAuMyBMIDYxNyw0NjkgYyAyLjQsOC43IDMuOSwxMS41IDUuOSwxMy4zIDEuOSwxLjYgNC44LDIuOSA3LjQsMy4zIDIuOCwwLjQgNS4yLDAuMSA3LjIsLTAuOSAxLjcsLTAuOCAzLjcsLTIuMyA0LjUsLTMuMiAwLjgsLTEgNC4yLC02LjggNy42LC0xMi45IDMuMywtNi4xIDkuOSwtMTguMSAxNC42LC0yNi42IDQuNywtOC41IDEzLjksLTI1LjIgMjAuNSwtMzcgNi42LC0xMS44IDE2LjksLTMwLjMgMjIuOCwtNDEgNS45LC0xMC43IDE2LjksLTMwLjMgMjQuMywtNDMuNSBsIDEzLjUsLTI0IGMgLTQuNSwtMy40IC05LjQsLTYuNSAtMTMuOCwtOSAtNC40LC0yLjQgLTguMywtNC41IC04LjcsLTQuNSAtMC4zLDAgLTYuNSwxMC4yIC0xMy42LDIyLjggeiBtIDM5LjUsMTIuNCBjIC00LjYsNy45IC0xMy4zLDIzLjMgLTE5LjIsMzQuMyAtNiwxMSAtMTcuMiwzMS4zIC0yNSw0NSAtNy44LDEzLjggLTIyLjMsMzkuNiAtMzIuMyw1Ny41IC0xMCwxNy45IC0xOC4xLDMyLjggLTE4LjIsMzMuMyAwLDAuNCAyLjMsNC4zIDUsOC43IDIuOCw0LjQgNS41LDggNiw4IDAuNSwwIDIuNSwtMi44IDQuMywtNi4yIDEuOCwtMy41IDkuNiwtMTcuOCAxNy4zLC0zMS44IDcuNywtMTQgMTcuNywtMzEuOCAyMi4xLC0zOS41IDQuNCwtNy43IDEyLjcsLTIyLjMgMTguNSwtMzIuNSA1LjgsLTEwLjIgMTYuNywtMzAgMjQuMywtNDQgNy42LC0xNCAxNS4xLC0yNy41IDE2LjYsLTMwIGwgMi43LC00LjUgLTEzLjYsLTEyLjYgeiIKICAgICAgICAgICBzdHlsZT0iZmlsbDojZWU5OTJmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDoyNTtzdHJva2UtZGFzaGFycmF5Om5vbmUiIC8+PHBhdGgKICAgICAgICAgICBpZD0iUGF0aCAxMiIKICAgICAgICAgICBjbGFzcz0iczYiCiAgICAgICAgICAgZD0ibSAyNjcsMTg3LjYgYyAtMy42LDAuOCAtOS44LDMgLTEzLjgsNC45IC00LjYsMi4yIC05LjYsNS44IC0xMy45LDkuOSAtMy44LDMuNSAtOC40LDkgLTEwLjMsMTIuMyAtMS45LDMuMiAtNC40LDguMyAtNS41LDExLjMgLTEuOSw1LjMgLTIsOC41IC0yLjMsODkgLTAuMiw1NC42IDAuMSw4NS45IDAuOCw5MC41IDAuNiw0LjUgMi41LDEwIDUuMiwxNS41IDMsNi4zIDUuOCwxMC4yIDEwLjcsMTUgMy42LDMuNiA5LjMsNy45IDEyLjYsOS43IDMuMywxLjcgOC41LDMuOCAxMS41LDQuNyAzLDAuOSAxMCwxLjkgMTUuNSwyLjMgNS41LDAuMyAxMS4zLDEuMiAxMywyLjEgMS42LDAuOCA0LjEsMi40IDUuMywzLjYgMS4zLDEuMSAzLjQsMy45IDQuNSw2LjEgMiwzLjcgMi4yLDUuOCAyLjcsMjkuOCAwLjUsMjQuNCAwLjYsMjUuOSAyLjUsMjcuMyAxLjEsMC44IDIuOCwxLjMgMy43LDEuMiAwLjksLTAuMiAxNS41LC0xMi40IDMyLjMsLTI3LjMgMTYuOSwtMTQuOSAzMy41LC0yOS40IDM2LjgsLTMyLjQgMy40LC0yLjkgOC4yLC02LjMgMTAuNywtNy41IDQuNSwtMi4xIDUuMSwtMi4xIDg2LjMsLTIuMyBMIDU1Nyw0NTMgYyA0LC03LjQgMTguNiwtMzMuNyAzNS4xLC02My4zIEwgNjIyLDMzNiBjIC0wLjYsLTk5LjQgLTAuOCwtMTA1IC0yLjQsLTExMCAtMSwtMyAtMy4yLC04IC00LjksLTExIC0xLjgsLTMgLTUuNCwtNy45IC04LjIsLTEwLjkgLTIuNywtMi45IC03LjksLTcuMSAtMTEuNSwtOS4xIC0zLjYsLTIuMSAtOS42LC00LjkgLTEzLjUsLTYuMiBsIC03LC0yLjMgYyAtMjc4LjYsLTAuMyAtMzAyLC0wLjEgLTMwNy41LDEuMSB6IgogICAgICAgICAgIHN0eWxlPSJzdHJva2Utd2lkdGg6MjU7c3Ryb2tlLWRhc2hhcnJheTpub25lIiAvPjxwYXRoCiAgICAgICAgICAgaWQ9IlBhdGggMTMiCiAgICAgICAgICAgY2xhc3M9InMxIgogICAgICAgICAgIGQ9Im0gMzY5LDI5NS43IGMgNS44LDAuMiAxNS43LDAuMiAyMiwwIDYuMywtMC4xIDEuNiwtMC4zIC0xMC41LC0wLjMgLTEyLjEsMCAtMTcuMywwLjIgLTExLjUsMC4zIHogbSAtMjQsNzYgYyAyNi43LDAuMiA3MC44LDAuMiA5OCwwIDI3LjIsLTAuMSA1LjQsLTAuMiAtNDguNSwtMC4yIC01My45LDAgLTc2LjIsMC4xIC00OS41LDAuMiB6IgogICAgICAgICAgIHN0eWxlPSJzdHJva2Utd2lkdGg6MjU7c3Ryb2tlLWRhc2hhcnJheTpub25lIiAvPjxwYXRoCiAgICAgICAgICAgaWQ9IlBhdGggMTQiCiAgICAgICAgICAgY2xhc3M9InMzIgogICAgICAgICAgIGQ9Im0gNDA1LjUsMjYwLjcgYyAyNS4zLDAuMiA2Ni45LDAuMiA5Mi41LDAgMjUuNiwtMC4xIDQuOSwtMC4yIC00NiwtMC4yIC01MC45LDAgLTcxLjgsMC4xIC00Ni41LDAuMiB6IG0gMzIuNSwzNSBjIDIwLjEsMC4yIDUyLjUsMC4yIDcyLDAgMTkuNSwtMC4xIDMuMSwtMC4yIC0zNi41LC0wLjIgLTM5LjYsMCAtNTUuNiwwLjEgLTM1LjUsMC4yIHogbSAtOTIuNSw0MSBjIDI3LjUsMC4yIDcyLjEsMC4yIDk5LDAgMjYuOSwtMC4xIDQuNSwtMC4yIC01MCwtMC4yIC01NC41LDAgLTc2LjUsMC4xIC00OSwwLjIgeiIKICAgICAgICAgICBzdHlsZT0ic3Ryb2tlLXdpZHRoOjI1O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIgLz48cGF0aAogICAgICAgICAgIGlkPSJQYXRoIDE1IgogICAgICAgICAgIGNsYXNzPSJzMCIKICAgICAgICAgICBkPSJtIDQ5Ny41LDM0MC40IHEgNCwyLjQgNiw2LjcgYyAxLjEsMi42IDEuOSw2LjEgMS43LDguNCAtMC4xLDIuMiAtMSw1LjQgLTIsNyAtMSwxLjYgLTMuNCw0IC01LjMsNS4zIC0xLjksMS4yIC0yLjgsMi4yIC0yLDIuMiAwLjcsMCAzLC0xLjcgNS4xLC0zLjcgMi4zLC0yLjMgNC4zLC01LjYgNSwtOC4zIDEuMSwtMy43IDEuMSwtNS4zIDAsLTguNSAtMC43LC0yLjIgLTIuOSwtNS43IC00LjksLTcuNyAtMiwtMiAtNC41LC0zLjcgLTUuNiwtMy43IC0xLjQsLTAuMSAtMC44LDAuNiAyLDIuMyB6IG0gLTIxMy45LDguMSBjIC0wLjMsMC44IC0wLjYsMy4zIC0wLjYsNS41IDAsMi4yIDAuOCw1LjcgMS44LDcuNyAwLjksMiAzLjEsNC43IDQuNyw1LjkgMS42LDEuMyA0LjYsMi42IDYuNSwzLjEgMi4yLDAuNCAzLjMsMC4zIDIuOSwtMC4yIC0wLjQsLTAuNiAtMi4yLC0xLjMgLTQsLTEuNyAtMS45LC0wLjQgLTQuOSwtMi4yIC02LjcsLTQgLTIuNywtMi42IC0zLjMsLTQgLTMsLTYuNSAwLjIsLTEuOCAtMC4xLC0zLjMgLTAuNywtMy4zIC0wLjYsMCAtMC44LC0xLjYgLTAuNCwtNCAwLjMsLTIuMiAwLjUsLTQgMC4zLC00IC0wLjEsMCAtMC41LDAuNyAtMC44LDEuNSB6IgogICAgICAgICAgIHN0eWxlPSJzdHJva2Utd2lkdGg6MjU7c3Ryb2tlLWRhc2hhcnJheTpub25lIiAvPjxwYXRoCiAgICAgICAgICAgaWQ9IlBhdGggMTYiCiAgICAgICAgICAgY2xhc3M9InM0IgogICAgICAgICAgIGQ9Im0gMjkyLjEsMjYzLjIgYyAtMi41LDEuMyAtNS4zLDMuNCAtNi4zLDQuOCAtMS4zLDEuOCAtMS45LDQuNSAtMi4xLDkuMyAtMC4xLDMuNyAwLjEsNi43IDAuNSw2LjcgMC41LDAgMC42LDAuNiAwLjQsMS4zIC0wLjMsMC42IDAuNiwyLjQgMiw0IDEuMywxLjUgMy45LDMuNSA1LjYsNC41IDMuMSwxLjYgMTAuOCwxLjcgMTI5LjMsMS4zIDEyMC44LC0wLjMgMTI2LjIsLTAuNCAxMjkuNywtMi4yIDIuMSwtMS4xIDQuNywtMy40IDUuNywtNS4xIDEuMSwtMS44IDEuOCwtMy45IDEuNSwtNC41IC0wLjIsLTAuNyAtMC4xLC0xLjMgMC4zLC0xLjMgMC41LDAgMC44LC0xLjggMC44LC0zLjkgMCwtMi4zIC0wLjQsLTMuNiAtMSwtMy4zIC0wLjUsMC40IC0wLjYsLTAuMiAtMC4yLC0xLjUgMC40LC0xLjQgMC4zLC0yLjMgLTAuMywtMi4zIC0wLjUsMCAtMC44LC0wLjQgLTAuNSwtMSAwLjMsLTAuNiAwLC0xIC0wLjUsLTEgLTAuNSwwIC0xLjEsLTAuOCAtMS4zLC0xLjcgLTAuMiwtMSAtMi4zLC0yLjggLTQuOCwtNCBsIC00LjQsLTIuMyBoIC0yNTAgeiBtIDAuMSw3NS4xIGMgLTEuOCwwLjcgLTQuMSwyLjUgLTUuMiwzLjkgLTEuMSwxLjUgLTEuNiwzIC0xLjIsMy4zIDAuNCwwLjMgMC4yLDAuNSAtMC41LDAuNSAtMC44LDAgLTEsMC42IC0wLjUsMS43IDAuNCwxLjEgMC4zLDEuNSAtMC4zLDEuMSAtMC42LC0wLjQgLTAuOSwwLjcgLTAuNywyLjcgMC4xLDEuOSAwLjYsMy40IDEsMy40IDAuNCwwIDAuNiwyLjEgMC41LDQuNSAtMC4xLDIuNSAwLjEsNC40IDAuNSw0LjMgMC40LC0wLjEgMS43LDAuNyAyLjksMS44IDEuMywxIDIuMSwyLjIgMS45LDIuNCAtMC4yLDAuMyAxLjMsMC43IDMuMywwLjggMiwwLjEgNC4xLDAuNyA0LjYsMS4yIDAuNywwLjYgMzYuNiwxIDk4LjgsMSA2NC41LDAgOTcuNywtMC4zIDk3LjcsLTEgMCwtMC41IDEuMSwtMS4zIDIuMywtMS43IDEuMiwtMC4zIDIuNSwtMC43IDIuOSwtMC43IDAuNCwwIDEsLTAuNCAxLjUsLTAuOSAwLjUsLTAuNSAxLC0xLjIgMS4xLC0xLjcgMC4xLC0wLjUgMC4yLC0xLjQgMC4yLC0yIDAsLTAuNSAwLjUsLTAuNyAxLC0wLjUgMC42LDAuMyAwLjgsLTAuMiAwLjMsLTEuMiAtMC40LC0xLjEgLTAuMywtMS41IDAuMywtMS4xIDAuNiwwLjQgMC45LC0xLjMgMC44LC00LjUgLTAuMSwtMyAtMSwtNi44IC0yLjIsLTkuMiAtMS4yLC0yLjIgLTEuOCwtNC40IC0xLjQsLTQuOSAwLjQsLTAuNSAwLjIsLTAuNiAtMC41LC0wLjIgLTAuNywwLjMgLTIuNiwtMC4xIC00LjMsLTEuMSAtMS42LC0xIC0yLjcsLTIuMSAtMi4zLC0yLjUgMC4zLC0wLjQgLTQ0LjQsLTAuNyAtOTkuMywtMC43IC03OC4zLDAgLTEwMC42LDAuMyAtMTAzLjIsMS4zIHoiCiAgICAgICAgICAgc3R5bGU9ImZpbGw6IzFkMWQxZDtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MjU7c3Ryb2tlLWRhc2hhcnJheTpub25lIiAvPjwvZz48L2c+PC9nPjwvc3ZnPgo=`
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
            <img alt="logo" class="my-4 w-24 m-auto" src="${logo.src}" loading="lazy">
          </a>
          <div class="text-2xl">
            About Plainly
          </div>
          <div class="my-2 text-xs">
            Version 0.0.1
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
          <button onclick="newProject()" class="btn">New Project</button>
          <button onclick="importProject()" class="btn">Import (.json)</button>
        </div>
        
        <div class="border-t ${PlainlyState.dark ? 'border-gray-600' : 'border-gray-200'} pt-4">
          <h3 class="text-sm font-bold mb-2">Export Options:</h3>
          <div class="grid grid-cols-2 gap-2">
            <button onclick="exportAsMarkdown()" class="btn">Markdown (.md)</button>
            <button onclick="exportAsHTML()" class="btn">HTML (.html)</button>
            <button onclick="exportAsDOCX()" class="btn">Word (.docx)</button>
            <button onclick="exportAsPDF()" class="btn">PDF (.pdf)</button>
            <button onclick="exportAsJSON()" class="btn col-span-2">JSON (.json)</button>
          </div>
        </div>
      </div>
    `,
    CloseLabel: "Close"
  });
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
  
  // Apply the loaded theme immediately
  document.documentElement.setAttribute('data-theme', PlainlyState.dark ? 'dark' : 'light');

  // Apply project name
  const projectName = document.getElementById('projectName');
  projectName.value = PlainlyState.name;
}

// Import/Export Functions
window.newProject = () => {
  // Ask user for confirmation
  Modal.render({
    title: "Are you sure you want to start a new project?",
    content: `<div class="p-4 text-center">All current data will be lost.</div>`,
    onConfirm() {
      if (!PlainlyState.dark) theme();
      PlainlyState = {
        name: 'New file',
        md: ``,
        dark: true
      };

      projectName.value = PlainlyState.name;
      input.value = PlainlyState.md;
      updatePreview(); // ✅ This renders into the iframe
    }
  });
}
window.importProject = () => {
  // Ask user for confirmation
  Modal.render({
    title: "Are you sure you want to load a new project?",
    content: `<div class="p-4 text-center">All current data will be lost.</div>`,
    onConfirm() {
      // Create an input element of type file
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.json'; // Accept only .json files
    
      // Add event listener for file selection
      fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        
        if (!file) {
          console.error('No file selected.');
          return;
        }
    
        const reader = new FileReader();
    
        // Define what happens once file is loaded
        reader.onload = function(event) {
          try {
            const importedData = JSON.parse(event.target.result);
            
            // Replace project data with imported JSON data
            PlainlyState = {...PlainlyState, ...importedData};

            // set theme
            theme();
            theme();
      
            projectName.value = PlainlyState.name;
            input.value = PlainlyState.md;
            updatePreview(); // ✅ This renders into the iframe
    
            console.log('Project imported successfully:', importedData);
          } catch (error) {
            console.error('Error parsing JSON file:', error);
          }
        };
    
        // Read the file as text
        reader.readAsText(file);
        fileInput.remove();
      });
    
      // Click the input element to trigger file selection dialog
      fileInput.click();
    }
  });
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
      </head>
      <body>
        <main class="container">
          ${marked.parse(PlainlyState.md)}
        </main>
      </body>
    </html>`;
    
    const blobURL = createBlobURL(html, 'text/html');
    iframe.src = blobURL;
  }, 300);
};

// once dom has loaded init functions
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme based on saved state
  document.documentElement.setAttribute('data-theme', PlainlyState.dark ? 'dark' : 'light');
  
  // Update border colors based on theme
  document.querySelectorAll('[data-theme="border"]').forEach(element => {
    element.classList.toggle("border-gray-800", PlainlyState.dark);
    element.classList.toggle("border-gray-200", !PlainlyState.dark);
  });

  // Initialize and render components
  const projectName = document.getElementById('projectName');
  projectName.value = PlainlyState.name;
  const input = document.getElementById('input');
  input.value = PlainlyState.md;
  updatePreview();
});