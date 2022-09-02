import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

import Meta from '../components/Meta';
import { auth, db } from '../utils/firebase';
import style from '../styles/form.module.scss';

export default function Register() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    hangout: '',
    city: '',
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
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, 'hangouts', user.uid), {
        uid: user.uid,
        hangout: formData.hangout,
        city: formData.city,
        email: formData.email,
      });

      setLoading(false);
    } catch (error) {
      router.push('/admin');
      setError(error.message);
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
      <Meta title='Belendroid: Register'></Meta>

      <main id={style.wrapper}>
        <form
          id={style.form}
          onSubmit={handleFormSubmission}
          autoComplete='false'
        >
          <div className={`${style.form_group} text-center cursor-pointer`}>
            <span className='font-medium text-xl'>Register Hangout Spot</span>
          </div>

          {error !== null && (
            <div className={`${style.form_group} text-center cursor-pointer`}>
              <p className='text-red-600'>{error}</p>
            </div>
          )}

          <div className={style.form_group}>
            <input
              type='text'
              name='hangout'
              value={formData.hangout}
              onChange={handleInputChange}
              placeholder='Name of the place'
              required
            />
          </div>

          <div className={style.form_group}>
            <input
              type='text'
              name='city'
              value={formData.city}
              onChange={handleInputChange}
              placeholder='City'
              required
            />
          </div>

          <div className={style.form_group}>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Email address'
              required
            />
          </div>

          <div className={style.form_group}>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Secure password'
              required
            />
          </div>

          <div className={style.form_group}>
            <button type='submit' disabled={loading ? true : false}>
              {loading ? (
                <ScaleLoader color='white' height='1rem' />
              ) : (
                'Register'
              )}
            </button>
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
