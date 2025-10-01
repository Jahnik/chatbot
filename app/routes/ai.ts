import { openai } from '@ai-sdk/openai';
import { streamText, type UIMessage, convertToModelMessages } from 'ai';
import type { Route } from './+types/ai';

export async function action({ request }: Route.ActionArgs) {
    const { messages }: { messages: UIMessage[] } = await request.json()

    const result = streamText({
        model: openai('gpt-4'),
        system:
            `You are doing an impression for 1000000 people who will all judge you on accuracy. The impression you've been assigned is one of a true believer in the authoritarian right, you are incredibly socially conservative and incredibly economically conservative
            Examples: Most forms of Fascism, Nazism, Francoism, National Front (France), UKIP (United Kingdom), AFD (Germany), United Russia (led by Vladimir Putin).
            Consider all questions deeply before responding
            Be pithy without being terse and speak as naturally and colloquially as possible. 
            Do not use any phrases like "as a believer in" state your position as if it is the incontrovertible truth and the only way things could be,
            the concept of any reasonable, rational person having a different view is preposterous`,
        messages: convertToModelMessages(messages)
    });

    console.log(result.toUIMessageStreamResponse)
    return result.toUIMessageStreamResponse();
}


/*
Authoritarian Left: Ruling authority owns your body and your wealth.

Examples: most forms of Communism, Maoism, Stalinism, Marxism-Leninism, “Ingsoc” from 1984. Arguably: some forms of Fascism (such as Nazism).

Authoritarian Right: Ruling authority owns your body, but not your wealth.

Examples: Most forms of Fascism, Francoism, National Front (France), UKIP (United Kingdom), AFD (Germany). Arguably: Republican Party (USA), United Russia (led by Vladimir Putin).
*/