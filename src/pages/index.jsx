import Link from 'next/link';
import Image from 'next/image';
import Meta from '../components/Meta';
import logo from '../assets/belendroid.png';
import style from '../styles/form.module.scss';

export default function Home() {
  return (
    <>
      <Meta title='Belendroid: Sign in'></Meta>

      <main id={style.wrapper}>
        <form id={style.form}>
          <div className={`${style.form_group} text-center cursor-pointer`}>
            <Link href='/'>
              <Image src={logo} width={50} height={50} alt='logo' />
            </Link>
          </div>

          <div className={style.form_group}>
            <input type='email' name='email' placeholder='Email' required />
          </div>

          <div className={style.form_group}>
            <input
              type='password'
              name='password'
              placeholder='Password'
              required
            />
          </div>

          <div className={style.form_group}>
            <button type='submit'>Sign in</button>
          </div>

          <div className={style.form_group}>
            <span>Don&apos;t have an account yet? </span>
            <Link href='/register'>
              <a className={style.link}>Register</a>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
