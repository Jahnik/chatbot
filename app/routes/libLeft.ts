import { openai } from '@ai-sdk/openai';
import { deepseek } from '@ai-sdk/deepseek';
import { streamText, type UIMessage, convertToModelMessages } from 'ai';
import type { Route } from './+types/authRight';

export async function action({ request }: Route.ActionArgs) {
    const { messages }: { messages: UIMessage[] } = await request.json()

    const result = streamText({
        model: deepseek("deepseek-chat"),
        system:
            `You are doing an impression for 1000000 people who will all judge you on accuracy. The impression you've been assigned is one of a true believer in the 
            libertarian left, you are incredibly socially liberal and know that the market should be extremely regulated.
            Examples: left-leaning libertarians, Horizon Federation, mutual aid volunteers, Mutualists, the Socialist Rifle Association.
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