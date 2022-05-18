import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from '../styles/Terminal.module.css';
import { submitPrompt, updateScrollPosition } from './Terminal.util';

import Prompt from './Prompt';
import Window from './Window';
import Response, { ResponseProps } from './Response';

const Terminal = () => {
  const [history, setHistory] = useState<ResponseProps[]>([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [commandIndex, setCommandIndex] = useState(history.length);

  useLayoutEffect(() => {
    updateScrollPosition();
  }, [history]);

  const getNextCommand = () => {
    const index = commandIndex + 1;
    if (index > history.length) {
      return;
    }
    if (index == history.length) {
      setCommandIndex(index);
      setPrompt('');
      return;
    }

    setCommandIndex(index);
    setPrompt(history[index].prompt);
  };

  const getPreviousCommand = () => {
    const index = commandIndex - 1;
    if (index < 0) {
      return;
    }
    setCommandIndex(index);
    setPrompt(history[index].prompt);
  };

  const handleSubmit = (prompt: string) => {
    setLoading(true);
    submitPrompt(prompt)
      .then((result) => {
        let answer: string = result.choices[0].text.trim();
        const type = 'JavaScript chatbot:';
        if (answer.startsWith('JavaScript chatbot:')) {
          answer = answer.substring(type.length);
        }
        setHistory(
          history.concat({
            id: result.id,
            prompt,
            result: answer,
          })
        );
        setCommandIndex(history.length + 1);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setPrompt('');
      });
  };

  return (
    <Window title="Javascript helper">
      <div className={styles.terminal}>
        <div id="history" className={styles.history}>
          {history.map(({ id, prompt, result }) => (
            <Response key={id} id={id} prompt={prompt} result={result} />
          ))}
        </div>
        <Prompt
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          handleSubmit={handleSubmit}
          getNextCommand={getNextCommand}
          getPreviousCommand={getPreviousCommand}
        />
      </div>
    </Window>
  );
};

export default Terminal;
