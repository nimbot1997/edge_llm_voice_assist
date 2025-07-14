



import localforage from 'localforage';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const messagesStore = localforage.createInstance({
  name: 'mini-gemma-chat',
  storeName: 'messages'
});

export async function saveMessage(message: Message): Promise<void> {
  await messagesStore.setItem(message.id, message);
}

export async function getMessages(): Promise<Message[]> {
  const messages: Message[] = [];
  await messagesStore.iterate((value: Message) => {
    messages.push(value);
  });
  return messages.sort((a, b) => a.timestamp - b.timestamp);
}

export async function clearMessages(): Promise<void> {
  await messagesStore.clear();
}

export async function exportMessages(): Promise<string> {
  const messages = await getMessages();
  return JSON.stringify(messages, null, 2);
}

export async function importMessages(json: string): Promise<void> {
  const messages: Message[] = JSON.parse(json);
  await clearMessages();
  for (const message of messages) {
    await saveMessage(message);
  }
}




