import React, { ChangeEvent, FC, FormEvent, useState } from 'react';

const SubmitPrompt = async (prompt: string) => {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt:
          'I am a Javascript chatbot. I will answer any Javascript-related questions. If the question is not related to Javascript, I\'ll answer: "I only care about Javascript"\n\n.You: How do I combine arrays?\nJavaScript chatbot: You can use the concat() method.\nYou: How?\n\nJavaScript chatbot:\n\nvar firstArray = [1, 2, 3];\nvar secondArray = firstArray.concat(4);\n\nYou:\'' +
          prompt +
          '\n',
      }),
    });
    if (response.ok) {
      const result = await response.json();
      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
};

const Prompt: FC = () => {
  const [prompt, setPrompt] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    SubmitPrompt(prompt);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea onChange={handleChange} name="prompt" value={prompt} rows={2} cols={30}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Prompt;
