This is a terminal-like web app that answer questions about using Javascript using the public OpenAI API.

## Deployment

https://chipper-sfogliatella-2f49a2.netlify.app/

## Usage

```
This is a message-style chatbot that can answer questions about using JavaScript.

Usage: Hit enter to submit a non-empty prompt.
History: Use Up and Down arrow keys to navigate next and previous commands.
Session: Responses are saved in the local storage.
Help: Type "help"
```

## Development

First, install the recommended package manager and run the development server:

```bash
npm install -g pnpm
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/openai](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/openai.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
