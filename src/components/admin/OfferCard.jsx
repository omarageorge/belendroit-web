import Image from 'next/image';
import { FaPen, FaTrash } from 'react-icons/fa';

export default function OfferCard() {
  return (
    <div className='w-full h-auto  bg-gray-900 rounded-md shadow-sm overflow-hidden'>
      <Image
        src='/burger.jpg'
        width='100%'
        height='55rem'
        objectFit='cover'
        layout='responsive'
        alt=''
      />
      <div className='w-full p-4 flex'>
        <div className=' flex-2 flex-[5]'>
          <span className='text-md font-medium text-white'>
            30% discounts on all beers and whiskys.
          </span>
        </div>
        <div className='flex-[1.2] flex justify-between items-center'>
          <FaPen color='white' size='1.2rem' />
          <FaTrash color='red' size='1.2rem' />
        </div>
      </div>
    </div>
  );
}
