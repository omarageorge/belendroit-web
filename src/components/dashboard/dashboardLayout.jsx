import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { FaUser, FaBriefcase, FaPlusSquare } from 'react-icons/fa';

import Meta from '../Meta';
import Loader from '../Loader';
import { auth } from '../../utils/firebase';
import style from '../../styles/dashboard.module.scss';

export default function DashboardLayout({ users, hangouts, offers, children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        router.push('/dashboard');
      }
    });
  }, [router]);

  const logOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <Meta title='Super Admin' />
        <main id={style.wrapper}>
          <div className='container mx-auto mb-4  text-right pr-1 '>
            <span
              onClick={logOutUser}
              className='font-medium underline cursor-pointer hover:text-green-600'
            >
              Logout
            </span>
          </div>
          <section className=' container mx-auto flex  justify-between '>
            <Link href='/dashboard/users'>
              <div
                className={`w-[15rem] h-[8rem] ${
                  router.pathname === '/dashboard/users'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100'
                }   rounded-xl flex flex-col justify-center items-center cursor-pointer`}
              >
                <div>
                  <FaUser size={60} />
                </div>
                <span className='font-bold text-xl mt-1'>{users} users</span>
              </div>
            </Link>

            <Link href='/dashboard/hangouts'>
              <div
                className={`w-[15rem] h-[8rem] ${
                  router.pathname === '/dashboard/hangouts'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100'
                }   rounded-xl flex flex-col justify-center items-center cursor-pointer`}
              >
                <div>
                  <FaBriefcase size={60} />
                </div>
                <span className='font-bold text-xl mt-1'>
                  {hangouts} Hangouts
                </span>
              </div>
            </Link>

            <Link href='/dashboard/offers'>
              <div
                className={`w-[15rem] h-[8rem] ${
                  router.pathname === '/dashboard/offers'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100'
                }   rounded-xl flex flex-col justify-center items-center cursor-pointer`}
              >
                <div>
                  <FaPlusSquare size={60} />
                </div>
                <span className='font-bold text-xl mt-1'>{offers} Offers</span>
              </div>
            </Link>
          </section>

          {/* Content */}
          <section className='container mx-auto mt-4'>{children}</section>
        </main>
      </>
    );
  }
}
