
import type { UIMessage } from 'ai';


// tiny factory for a text part
const text = (t: string) => ({ type: 'text' as const, text: t });

// system / user / assistant message helpers
export const systemMsg = (t: string): UIMessage => ({
    id: "test",
    role: 'system',
    parts: [text(t)],
});

export const userMsg = (t: string): UIMessage => ({
    id: "test",
    role: 'user',
    parts: [text(t)],
});

export const asstMsg = (t: string): UIMessage => ({
    id: "test",
    role: 'assistant',
    parts: [text(t)],
});


export function makeDummyHistory(count = 6): UIMessage[] {
    const msgs: UIMessage[] = [systemMsg('You are a helpful, concise assistant.')];
    for (let i = 0; i < count; i++) {
        msgs.push(
            systemMsg('talk to me'),
            userMsg(`Sample user question #${i + 1}: How do I do X? Sample user question #${i + 1}: How do I do X Sample user question #${i + 1}: How do I do X Sample user question #${i + 1}: How do I do X`),
            asstMsg(`Sample answer #${i + 1}: You can do X by ...`)
        );
    }
    return msgs;
}
