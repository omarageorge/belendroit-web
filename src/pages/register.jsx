import Link from 'next/link';
import Image from 'next/image';
import Meta from '../components/Meta';
import logo from '../assets/belendroid.png';
import style from '../styles/form.module.scss';

export default function Register() {
  return (
    <>
      <Meta title='Belendroid: Register'></Meta>

      <main id={style.wrapper}>
        <form id={style.form}>
          <div className={`${style.form_group} text-center cursor-pointer`}>
            <span className='font-medium text-xl'>Register Hangout Spot</span>
          </div>

          <div className={style.form_group}>
            <input
              type='text'
              name='hangout'
              placeholder='Name of the place'
              required
            />
          </div>

          <div className={style.form_group}>
            <input type='text' name='city' placeholder='City' required />
          </div>

          <div className={style.form_group}>
            <input
              type='email'
              name='email'
              placeholder='Email address'
              required
            />
          </div>

          <div className={style.form_group}>
            <input
              type='password'
              name='password'
              placeholder='Secure password'
              required
            />
          </div>

          <div className={style.form_group}>
            <button type='submit'>Register</button>
          </div>

          <div className={style.form_group}>
            <span>Already have an account? </span>
            <Link href='/'>
              <a className={style.link}>Sign in</a>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
