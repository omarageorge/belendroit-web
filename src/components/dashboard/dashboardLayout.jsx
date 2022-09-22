import Link from 'next/link';
import { FaUser, FaBriefcase, FaPlusSquare } from 'react-icons/fa';

import style from '../../styles/dashboard.module.scss';

export default function DashboardLayout({ children }) {
  return (
    <main id={style.wrapper}>
      <section className=' container mx-auto flex  justify-between '>
        <Link href='#'>
          <div className='w-[15rem] h-[8rem] bg-gray-100  rounded-xl flex flex-col justify-center items-center cursor-pointer'>
            <div>
              <FaUser size={60} />
            </div>
            <span className='font-bold text-xl mt-1'>100 users</span>
          </div>
        </Link>

        <Link href='#'>
          <div className='w-[15rem] h-[8rem] bg-gray-100  rounded-xl flex flex-col justify-center items-center  cursor-pointer'>
            <div>
              <FaBriefcase size={60} />
            </div>
            <span className='font-bold text-xl mt-1'>30 Hangouts</span>
          </div>
        </Link>

        <Link href='#'>
          <div className='w-[15rem] h-[8rem] bg-gray-100  rounded-xl flex flex-col justify-center items-center  cursor-pointer'>
            <div>
              <FaPlusSquare size={60} />
            </div>
            <span className='font-bold text-xl mt-1'>450 Offers</span>
          </div>
        </Link>
      </section>

      {/* Content */}
      <section className='container mx-auto mt-4'>{children}</section>
    </main>
  );
}
