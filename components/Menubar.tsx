import React, { FC } from 'react';
import styles from '../styles/Window.module.css';

export interface MenubarProps {
  title: string;
}

const Menubar: FC<MenubarProps> = ({ title }) => {
  return (
    <div className={styles.menubar}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};
export default Menubar;
