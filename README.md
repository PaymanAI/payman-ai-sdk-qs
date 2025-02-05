# Payman + AI SDK Quickstart

This is a starter template showing how to use the Payman Toolkit with the Vercel AI SDK to create an AI that can send and receive payments.

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your API keys:
   ```bash
   cp .env.example .env
   ```
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `PAYMAN_API_SECRET`: Your Payman API secret
   - `PAYMAN_ENVIRONMENT`: `sandbox` or `production`

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework
- [Vercel AI SDK](https://sdk.vercel.ai/docs) - AI streaming and function calling
- [Payman API](https://docs.paymanai.com) - Payment processing
- [Tailwind CSS](https://tailwindcss.com) - Styling

## How It Works

The app uses the Vercel AI SDK to create a streaming chat interface that can process payment instructions. When a user sends a message, the AI analyzes it and can call Payman API functions to:

- Send payments
- Search payment destinations
- Create new payees
- Check balances
- Process deposits

The interface shows real-time updates as these operations are performed. 