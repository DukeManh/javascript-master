import React, { useState } from 'react';
import styles from '../styles/Terminal.module.css';

import Prompt from './Prompt';
import Window from './Window';
import Response, { ResponseProps } from './Response';

const submitPrompt = async (prompt: string) => {
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt:
        '\nYou: How do I combine arrays?\nJavaScript chatbot: You can use the concat() method.\n\nYou: How?\n\nJavaScript chatbot:\nJS:var firstArray = [1, 2, 3];\nvar secondArray = firstArray.concat(4);\n\nYou:  How do you make an alert appear after 10 seconds?\n\nJavaScript chatbot:\nJS:var timer = setInterval(function(){\nalert("Hello, world!");\n}, 10);\n\nYou: Find the largest number in an array.\n\nJavaScript chatbot:\n\nvar largestNumber = Math.max(arr[0], arr[1]);\nYou: What is the reduce function used for?\n\nJavaScript chatbot:\n\nThe reduce function is used to reduce an array of data. It takes two arguments: the first is the initial value, and the second is the reducer function.\nYou: Find the median of an array.\n\nJavaScript chatbot:\n\nvar median = arr.reduce(function(a, b) {\nreturn a + b / 2;\n}, 0);\n' +
        +'You: ' +
        prompt.trim() +
        '\n',
    }),
  });
  if (response.ok) {
    return response.json();
  }

  throw new Error('Uncaught Error :(');
};

const Terminal = () => {
  const [history, setHistory] = useState<ResponseProps[]>([]);

  const handleSubmit = (prompt: string) => {
    submitPrompt(prompt)
      .then((result) => {
        setHistory(
          history.concat({
            id: result.id,
            prompt,
            result: result.choices[0].text,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Window title="Javascript helper">
      <div className={styles.terminal}>
        {history.map(({ id, prompt, result }) => (
          <Response key={id} id={id} prompt={prompt} result={result} />
        ))}
        <Prompt handleSubmit={handleSubmit} />
      </div>
    </Window>
  );
};

export default Terminal;
