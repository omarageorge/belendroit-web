import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import Meta from '../../components/Meta';
import { auth, db } from '../../utils/firebase';

import style from '../../styles/form.module.scss';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

    if (formData.email !== 'admin@belendroit.com') {
      setErrorMessage('Only admin can login');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      router.push('/dashboard/hangouts');

      setLoading(false);
    } catch (error) {
      console.error(error.message);

      if (error.code === 'auth/invalid-email') {
        setErrorMessage('Please provide a valid email.');
      }

      if (error.code === 'auth/user-not-found') {
        setErrorMessage('Username not found.');
      }
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('Invalid password.');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard/hangouts');
      } else {
        return;
      }
    });
  });

  return (
    <>
      <Meta title='Super User'></Meta>

      <main id={style.wrapper}>
        <form
          id={style.form}
          onSubmit={handleFormSubmission}
          autoComplete='false'
        >
          <div className={`${style.form_group} text-center cursor-pointer`}>
            <span className='font-medium text-xl'>Administrator</span>
          </div>

          <div className='mb-3 text-center text-red-600'>
            <p>{errorMessage}</p>
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
              {loading ? <ScaleLoader color='white' height='1rem' /> : 'Login'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
