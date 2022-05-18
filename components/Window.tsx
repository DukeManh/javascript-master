import React, { ReactNode } from 'react';
import styles from '../styles/Window.module.css';

import Menubar from './Menubar';

export interface WindowProps {
  children: ReactNode | undefined;
  title: string;
}

const Window = ({ children, title }: WindowProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <Menubar title={title} />
        {children}
      </div>
    </div>
  );
};

export default Window;
