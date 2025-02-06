import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { paykit } from 'payman-paykit';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const tools = paykit({
  apiSecret: process.env.PAYMAN_API_SECRET!,
  environment: process.env.PAYMAN_ENVIRONMENT as 'sandbox' | 'production'
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const model = openai('gpt-4');

    try {
      const result = streamText({
        model,
        toolCallStreaming: true,
        system: 'You are a payment assistant that can help send money and manage financial transactions.',
        messages,
        tools,
      });

      return result.toDataStreamResponse();
    } catch (streamError) {
      throw new Error(`Stream error: ${streamError.message}`);
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 