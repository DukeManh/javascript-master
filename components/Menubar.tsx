import React from 'react';
import styles from '../styles/Window.module.css';

export interface MenubarProps {
  title: string;
}

const Menubar = ({ title }: MenubarProps) => {
  return (
    <div className={styles.menubar}>
      <div className={styles.buttons}>
        <span className={styles.close}></span>
        <span className={styles.minimize}></span>
        <span className={styles.fullscreen}></span>
      </div>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};
export default Menubar;
