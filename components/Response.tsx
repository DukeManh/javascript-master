import React from 'react';
import styles from '../styles/Terminal.module.css';

export interface ResponseProps {
  id: string;
  prompt: string;
  result: string;
}

const Response = ({ prompt, result }: ResponseProps) => {
  return (
    <div className={styles.response}>
      <div className={styles.pastPrompt}>
        <span className={styles.promptArrow}> {'>'} </span>
        {prompt}
      </div>
      <div>{result}</div>
    </div>
  );
};

export default Response;
