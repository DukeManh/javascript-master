import React from 'react';
import styles from '../styles/Window.module.css';

export interface MenubarProps {
  title: string;
}

const Menubar = ({ title }: MenubarProps) => {
  return (
    <div className={styles.menubar}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};
export default Menubar;
