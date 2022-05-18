import React, { useLayoutEffect, useState } from 'react';
import styles from '../styles/Terminal.module.css';
import { initialPrompts, submitPrompt, updateScrollPosition, responseStop } from './Terminal.util';
import useLocalStorage from '../hooks/use-local-storage';

import Prompt from './Prompt';
import Window from './Window';
import Response, { ResponseProps } from './Response';

const Terminal = () => {
  const [history, setHistory] = useLocalStorage<ResponseProps[]>('response-history', []);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [commandIndex, setCommandIndex] = useState(history.length);

  useLayoutEffect(() => {
    updateScrollPosition();
    setCommandIndex(history.length);
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
    if (prompt === 'help') {
      setHistory(
        history.concat({
          prompt,
          result:
            'This is a message-style chatbot that can answer questions about using JavaScript.\n\nUsage: Hit enter to submit a non-empty prompt.\nHistory: Use Up and Down arrow keys to navigate next and previous commands.\nSession: Responses are saved in the local storage.\nHelp: Type "help"',
        })
      );
      return;
    }
    setLoading(true);
    submitPrompt(prompt)
      .then((result) => {
        let answer: string = result.choices[0].text.trim();
        if (answer.startsWith(responseStop)) {
          answer = answer.substring(responseStop.length);
        }
        setHistory(
          history.concat({
            prompt,
            result: answer,
          })
        );
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
        <div className={styles.history}>
          {initialPrompts.map(({ prompt, result }, i) => (
            <Response
              key={`examples-${i}`}
              prompt={prompt}
              result={result.substring(responseStop.length)}
            />
          ))}
        </div>
        <div id="history" className={styles.history}>
          {history.map(({ prompt, result }, i) => (
            <Response key={i} prompt={prompt} result={result} />
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
