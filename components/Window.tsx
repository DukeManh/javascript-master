import React, { FC } from 'react';
import styles from '../styles/App.module.css';

import Menubar from './Menubar';

export interface WindowProps {
  title: string,
}

const Window: FC<WindowProps> = ({children, title}) => {
  return <div className={styles.container}>
    <div className={styles.window}>
      <Menubar title={title}/>
      {children}
    </div>
  </div>;
};

export default Window;
