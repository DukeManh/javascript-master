import React, { FC } from 'react';
import styles from '../styles/App.module.css';
import Prompt from './Prompt';

import Window from './Window';

const Terminal: FC = () => {
  return (
    <Window title="Javascript helper">
      <div className={styles.terminal}>
        <Prompt />
      </div>
    </Window>
  );
};

export default Terminal;
