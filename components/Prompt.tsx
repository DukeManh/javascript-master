import React, { ChangeEvent, FC, FormEventHandler, KeyboardEventHandler, useState } from 'react';
import styles from '../styles/Terminal.module.css';

export interface PromptProps {
  handleSubmit: (prompt: string) => void;
}

const Prompt: FC<PromptProps> = ({ handleSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && prompt) {
      e.preventDefault();
      handleSubmit(prompt);
      setPrompt('');
    }
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleSubmit(prompt);
  };

  return (
    <div className={styles.promptWrap}>
      <form onSubmit={handleFormSubmit} className={styles.prompt}>
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
