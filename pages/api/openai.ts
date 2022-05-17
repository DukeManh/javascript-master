import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi, CreateCompletionResponse } from 'openai';

const openaiConfiguration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(openaiConfiguration);

/**
 * Create OpenAI from a prompt
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateCompletionResponse>
) {
  const {
    body: { prompt, engineId },
    method,
  } = req;
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  if (!prompt) {
    res.status(400).end('Please provide a valid prompt');
    return;
  }

  let engine = engineId || 'text-curie-001';

  try {
    const response = await openai.createCompletion(engine, {
      prompt,
      temperature: 0.7,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status).end(error.response.data);
    } else {
      res.status(400).end(error.message);
    }
  }
}
