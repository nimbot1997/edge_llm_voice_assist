





import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);

marked.setOptions({
  highlight: function(code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
  breaks: true,
  gfm: true
} as any);

export function Message({ role, content, isStreaming = false }: {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}) {
  const htmlContent = marked.parse(content);

  return `
    <div class="chat ${role === 'user' ? 'chat-end' : 'chat-start'}">
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <div class="w-10 h-10 flex items-center justify-center bg-base-200 rounded-full">
            ${role === 'user' ? '👤' : '🤖'}
          </div>
        </div>
      </div>
      <div class="chat-header">
        ${role === 'user' ? 'You' : 'Gemma'}
      </div>
      <div class="chat-bubble ${role === 'user' ? 'chat-bubble-primary' : 'chat-bubble'}">
        <div class="prose prose-sm max-w-none ${isStreaming ? 'animate-pulse' : ''}">
          ${htmlContent}
        </div>
      </div>
    </div>
  `;
}







