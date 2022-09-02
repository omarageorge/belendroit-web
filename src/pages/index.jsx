import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import Meta from '../components/Meta';
import { auth } from '../utils/firebase';
import logo from '../assets/belendroid.png';
import style from '../styles/form.module.scss';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      router.push('/admin');

      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/admin');
      } else {
        return;
      }
    });
  });

  return (
    <>
      <Meta title='Belendroid: Sign in'></Meta>

      <main id={style.wrapper}>
        <form
          id={style.form}
          onSubmit={handleFormSubmission}
          autoComplete='false'
        >
          <div className={`${style.form_group} text-center cursor-pointer`}>
            <Link href='/'>
              <Image src={logo} width={50} height={50} alt='logo' />
            </Link>
          </div>

          <div className={style.form_group}>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Email'
              required
            />
          </div>

          <div className={style.form_group}>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Password'
              required
            />
          </div>

          <div className={style.form_group}>
            <button type='submit' disabled={loading ? true : false}>
              {loading ? (
                <ScaleLoader color='white' height='1rem' />
              ) : (
                'Sign in'
              )}
            </button>
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
