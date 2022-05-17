import React, { FC } from 'react';
import styles from '../styles/App.module.css';

export  interface MenubarProps {
  title: string,
};

const Menubar: FC<MenubarProps> = ({title}) => {
  return (
    <div className={styles.menubar}>
      <div>{title}</div>
    </div>
  )
}
export default Menubar; 
