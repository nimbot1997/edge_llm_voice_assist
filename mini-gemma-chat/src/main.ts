

import './styles/index.css';
import { initLLM, stream } from './lib/llm';
import { saveMessage, getMessages, Message } from './lib/storage';
import { initTheme } from './lib/theme';

class MiniGemmaChat {
  private app: HTMLElement;
  private messages: Message[] = [];

  constructor() {
    this.app = document.getElementById('app')!;
    this.init();
  }

  private async init() {
    initTheme();
    await this.loadMessages();
    this.render();
    await this.initLLM();
    this.setupEventListeners();
  }

  private async loadMessages() {
    this.messages = await getMessages();
  }

  private render() {
    this.app.innerHTML = `
      <div class="h-screen flex flex-col">
        ${this.renderHeader()}
        <div id="chat-container" class="flex-1 flex flex-col">
          ${this.renderChatBox()}
          ${this.renderComposer()}
        </div>
      </div>
    `;
  }

  private renderHeader() {
    const themeIcon = localStorage.getItem('theme') === 'dark'
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

    return `
      <header class="navbar bg-base-100 border-b border-base-300">
        <div class="flex-1">
          <h1 class="text-xl font-bold">Mini-Gemma Chat</h1>
        </div>
        <div class="flex-none gap-2">
          <button
            class="btn btn-ghost btn-circle"
            id="theme-toggle"
            title="Toggle theme"
          >
            ${themeIcon}
          </button>
          <button
            class="btn btn-ghost btn-circle"
            id="delete-all"
            title="Delete all data"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          </button>
        </div>
      </header>
    `;
  }

  private renderChatBox() {
    const messagesHtml = this.messages.map(msg => this.renderMessage(msg)).join('');
    return `
      <div class="flex-1 overflow-y-auto p-4">
        <div class="space-y-4">
          ${messagesHtml}
        </div>
      </div>
    `;
  }

  private renderMessage(msg: Message) {
    return `
      <div class="chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <div class="w-10 h-10 flex items-center justify-center bg-base-200 rounded-full">
              ${msg.role === 'user' ? '👤' : '🤖'}
            </div>
          </div>
        </div>
        <div class="chat-header">
          ${msg.role === 'user' ? 'You' : 'Gemma'}
        </div>
        <div class="chat-bubble ${msg.role === 'user' ? 'chat-bubble-primary' : 'chat-bubble'}">
          <div class="prose prose-sm max-w-none">
            ${msg.content}
          </div>
        </div>
      </div>
    `;
  }

  private renderComposer() {
    return `
      <div class="bg-base-100 border-t border-base-300 p-4">
        <div class="flex gap-2">
          <textarea
            id="message-input"
            class="textarea textarea-bordered flex-1 resize-none"
            placeholder="Type your message..."
            rows="1"
          ></textarea>
          <button
            id="send-button"
            class="btn btn-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg>
          </button>
          <button
            id="mic-button"
            class="btn btn-ghost"
            title="Voice input (coming soon)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
          </button>
        </div>
      </div>
    `;
  }

  private async initLLM() {
    try {
      console.log('Initializing LLM...');
      await initLLM();
      console.log('LLM initialized successfully');
    } catch (error) {
      console.error('Failed to initialize LLM:', error);
      alert('Failed to load AI model. Please refresh the page.');
    }
  }

  private setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle?.addEventListener('click', () => {
      import('./lib/theme').then(({ toggleTheme }) => toggleTheme());
    });

    // Delete all
    const deleteAll = document.getElementById('delete-all');
    deleteAll?.addEventListener('click', async () => {
      if (confirm('Are you sure you want to delete all chat history? This cannot be undone.')) {
        const { clearMessages } = await import('./lib/storage');
        await clearMessages();
        window.location.reload();
      }
    });

    // Send message
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input') as HTMLTextAreaElement;

    const handleSend = () => {
      const text = messageInput.value.trim();
      if (text) {
        this.handleSend(text);
        messageInput.value = '';
      }
    };

    sendButton?.addEventListener('click', handleSend);
    messageInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    // Auto-resize textarea
    messageInput?.addEventListener('input', () => {
      messageInput.style.height = 'auto';
      messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
    });
  }

  private async handleSend(text: string) {
    const sendButton = document.getElementById('send-button') as HTMLButtonElement;
    const messageInput = document.getElementById('message-input') as HTMLTextAreaElement;

    if (sendButton?.disabled) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now()
    };

    this.messages.push(userMessage);
    await saveMessage(userMessage);
    this.render();

    sendButton.disabled = true;
    messageInput.disabled = true;

    try {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '...',
        timestamp: Date.now()
      };

      this.messages.push(assistantMessage);
      this.render();

      const streamGenerator = stream(text);
      let fullResponse = '';

      for await (const token of streamGenerator) {
        fullResponse += token;
        assistantMessage.content = fullResponse;
        this.render();
      }

      await saveMessage(assistantMessage);
    } catch (error) {
      console.error('Error generating response:', error);
      this.messages.pop(); // Remove the assistant message
      alert('Error generating response. Please try again.');
    } finally {
      sendButton.disabled = false;
      messageInput.disabled = false;
      messageInput.focus();
    }
  }
}

// Initialize the app
new MiniGemmaChat();

