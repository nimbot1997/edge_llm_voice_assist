







export function Composer({ isLoading }: {
  isLoading: boolean;
}) {
  return `
    <div class="bg-base-100 border-t border-base-300 p-4">
      <div class="flex gap-2">
        <textarea
          id="message-input"
          class="textarea textarea-bordered flex-1 resize-none"
          placeholder="Type your message..."
          rows="1"
          ${isLoading ? 'disabled' : ''}
        ></textarea>
        <button
          id="send-button"
          class="btn btn-primary"
          ${isLoading ? 'disabled' : ''}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg>
        </button>
        <button
          id="mic-button"
          class="btn btn-ghost"
          ${isLoading ? 'disabled' : ''}
          title="Voice input (coming soon)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
        </button>
      </div>
    </div>
  `;
}









