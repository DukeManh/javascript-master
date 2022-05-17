import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>OpenAI explorer</title>
        <meta name="description" content="OpenAI playground" />
        <link rel="icon" href="/openai.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://beta.openai.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/openai.svg" alt="Vercel Logo" width={32} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
