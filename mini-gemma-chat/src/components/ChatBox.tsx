









export function ChatBox({ messages }: { messages: any[] }) {
  return `
    <div class="flex-1 overflow-y-auto p-4">
      <div class="space-y-4">
        ${messages.map(msg => msg.html).join('')}
      </div>
    </div>
  `;
}











