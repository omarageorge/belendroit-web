import Head from 'next/head';
import logo from '../assets/belendroid.png';

export default function Meta({ title, keywords, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
    </Head>
  );
}
