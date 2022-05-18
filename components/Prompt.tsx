import React, { ChangeEvent, FC, FormEventHandler, KeyboardEventHandler, useState } from 'react';
import styles from '../styles/Terminal.module.css';

const submitPrompt = async (prompt: string) => {
  try {
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
      const result = await response.json();
      console.log(result.choices[0].text);
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

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && prompt) {
      e.preventDefault();
      submitPrompt(prompt);
      setPrompt('');
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    submitPrompt(prompt);
  };

  return (
    <div className={styles.promptWrap}>
      <form onSubmit={handleSubmit} className={styles.prompt}>
        <label className={styles.label} htmlFor="prompt">
          JS {'>'}
        </label>
        <textarea
          onKeyDown={handleKeyDown}
          className={styles.input}
          onChange={handleChange}
          name="prompt"
          value={prompt}
        ></textarea>
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};

export default Prompt;
