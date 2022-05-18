import React from 'react';
import styles from '../styles/Terminal.module.css';

export interface ResponseProps {
  prompt: string;
  result: string;
}

const Response = ({ prompt, result }: ResponseProps) => {
  return (
    <div className={styles.response}>
      <div className={styles.pastPrompt}>
        <span className={styles.promptArrow}> {'>'} </span>
        {prompt.trim()}
      </div>
      <pre>{result.trim()}</pre>
    </div>
  );
};

export default Response;
