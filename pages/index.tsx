import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Terminal from '../components/Terminal';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Javascript master</title>
        <meta name="description" content="Terminal style Q/A to answer your javascript questions" />
        <link rel="icon" href="/openai.ico" />
      </Head>

      <main className={styles.main}>
          <Terminal/>
      </main>
    </div>
  );
};

export default Home;
