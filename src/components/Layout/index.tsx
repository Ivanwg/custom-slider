import { ReactNode } from 'react';
import styles from './style.module.scss';


interface IProps {
  children: ReactNode;
}

const Layout = ({children}: IProps) => {
  return ( 
    <main>
      <div className={styles.container}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </main> 
  );
}
 
export default Layout;