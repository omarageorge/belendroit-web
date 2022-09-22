import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { FaList, FaPlusCircle, FaBell, FaPaperPlane } from 'react-icons/fa';

import Meta from '../Meta';
import Loader from '../Loader';
import { auth } from '../../utils/firebase';

export default function Layout({ children }) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        router.push('/');
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
        <Meta title='Belendroid: Hangout Admin' />

        {/* Top menu  */}
        <nav className='fixed z-50 w-full h-20  bg-slate-900 flex flex-row items-center  justify-start gap-x-6 px-6 md:hidden'>
          <Link href='/admin'>
            <a className='flex items-center gap-x-2 text-white bg-slate-700 p-3'>
              <FaList />
              All Offers
            </a>
          </Link>

          <Link href='/admin/add'>
            <a className='flex items-center gap-x-2 text-white bg-slate-700 p-3 rounded-sm'>
              <FaPlusCircle />
              Add Offer
            </a>
          </Link>
        </nav>

        {/* Side menu */}
        <aside className='hidden md:block fixed w-1/5 h-screen px-6 pt-6  space-y-6 bg-gray-900'>
          <span className='block w-full text-3xl text-white font-medium text-center'>
            Belendroit
          </span>

          <Link href='/admin'>
            <a
              className={`flex items-center gap-x-3 py-3 px-4 rounded-md text-white  ${
                router.pathname === '/admin' ? 'bg-gray-700' : 'bg-slate-800 '
              } hover:bg-gray-700 transition-all delay-200  ease-linear`}
            >
              <FaList />
              All Offers
            </a>
          </Link>

          <Link href='/admin/add'>
            <a
              className={`flex items-center gap-x-3 py-3 px-4 rounded-md text-white  ${
                router.pathname === '/admin/add'
                  ? 'bg-gray-700'
                  : 'bg-slate-800 '
              } hover:bg-gray-700 transition-all delay-200  ease-linear`}
            >
              <FaPlusCircle />
              Add Offer
            </a>
          </Link>

          <Link href='/admin/notifications'>
            <a
              className={`flex items-center gap-x-3 py-3 px-4 rounded-md text-white  ${
                router.pathname === '/admin/notifications'
                  ? 'bg-gray-700'
                  : 'bg-slate-800 '
              } hover:bg-gray-700 transition-all delay-200  ease-linear`}
            >
              <FaBell />
              All Notifications
            </a>
          </Link>

          <Link href='/admin/send'>
            <a
              className={`flex items-center gap-x-3 py-3 px-4 rounded-md text-white  ${
                router.pathname === '/admin/send'
                  ? 'bg-gray-700'
                  : 'bg-slate-800 '
              } hover:bg-gray-700 transition-all delay-200  ease-linear`}
            >
              <FaPaperPlane />
              Send Notification
            </a>
          </Link>

          <a
            onClick={logOutUser}
            className='flex items-center justify-center py-3 px-4 rounded-md text-white  bg-red-600 hover:bg-red-700 transition-all delay-200  ease-linear cursor-pointer'
          >
            Logout
          </a>
        </aside>

        {/*  Main content */}
        <main className='w-full md:w-4/5 min-h-screen pt-28 md:ml-[20%] px-6 md:pt-6 bg-gray-50  '>
          {children}
        </main>
      </>
    );
  }
}
