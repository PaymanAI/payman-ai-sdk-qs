import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { paymanToolkit } from 'payman-ai-toolkit';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const tools = paymanToolkit({
  apiSecret: process.env.PAYMAN_API_SECRET!,
  environment: process.env.PAYMAN_ENVIRONMENT as 'sandbox' | 'production'
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('Received messages:', messages);
    
    const model = openai('gpt-4');
    console.log('Using model:', model);

    console.log('Starting stream...');
    try {
      const result = streamText({
        model,
        toolCallStreaming: true,
        system: 'You are a payment assistant that can help send money and manage financial transactions.',
        messages,
        tools,
        temperature: 0.7,
        maxTokens: 1000,
      });
      console.log('Stream created:', result);

      const response = result.toDataStreamResponse();
      console.log('Response created');
      return response;
    } catch (streamError) {
      console.error('Stream Error:', {
        name: streamError.name,
        message: streamError.message,
        stack: streamError.stack,
        cause: streamError.cause
      });
      throw new Error(`Stream error: ${streamError.message}`);
    }
  } catch (error) {
    console.error('API Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 