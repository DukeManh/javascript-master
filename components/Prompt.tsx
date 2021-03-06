/* eslint-disable @next/next/no-img-element */
import React, {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  KeyboardEventHandler,
  SetStateAction,
} from 'react';
import styles from '../styles/Terminal.module.css';

export interface PromptProps {
  handleSubmit: (prompt: string) => void;
  loading: boolean;
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
  getNextCommand: () => void;
  getPreviousCommand: () => void;
}

const Prompt = ({
  handleSubmit,
  loading,
  prompt,
  setPrompt,
  getNextCommand,
  getPreviousCommand,
}: PromptProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (prompt.trim() && !loading) {
        handleSubmit(prompt);
      }
    } else if (e.key == 'ArrowUp') {
      getPreviousCommand();
    } else if (e.key == 'ArrowDown') {
      getNextCommand();
    }
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!loading) {
      handleSubmit(prompt);
    }
  };

  return (
    <div className={styles.promptWrap}>
      <form onSubmit={handleFormSubmit} className={styles.prompt}>
        <div className={styles.dollar}>
          <div className={styles.promptHelper}>
            <img
              alt=""
              width="1rem"
              height="1rem"
              src="/javascript-logo.png"
              className={styles.javascriptLogo}
            ></img>
            <label className={styles.label} htmlFor="prompt">
              Javascript master - help
            </label>
          </div>
          <div className={styles.promptKey}>
            <span className={styles.promptArrow}>{'>'}</span>
          </div>
        </div>
        <textarea
          style={{
            opacity: loading ? '0.5' : 1,
          }}
          onKeyDown={handleKeyDown}
          className={styles.input}
          onChange={handleChange}
          name="prompt"
          id="prompt"
          value={prompt}
        ></textarea>
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};

export default Prompt;
