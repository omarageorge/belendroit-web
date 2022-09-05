import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { doc, deleteDoc } from 'firebase/firestore';
import { FaPen, FaTrash } from 'react-icons/fa';

import { db, storage } from '../../utils/firebase';
import { deleteObject, ref } from 'firebase/storage';

export default function OfferCard({ docRef, image, title }) {
  const router = useRouter();

  const deleteOffer = async () => {
    try {
      await deleteDoc(doc(db, 'offers', docRef));
      await deleteObject(ref(storage, image));
    } catch (error) {
      console.error(error.message);
    }

    router.reload();
  };

  return (
    <div className='w-full h-auto  bg-gray-900 rounded-md shadow-sm overflow-hidden'>
      <Image
        src={image}
        width='100%'
        height='55rem'
        objectFit='cover'
        layout='responsive'
        alt=''
      />
      <div className='w-full p-4 flex'>
        <div className=' flex-2 flex-[5]'>
          <span className='text-md font-medium text-white '>{title}</span>
        </div>
        <div className='flex-[1.2] flex justify-between items-center cursor-pointer'>
          <Link href={`/admin/edit/${docRef}`}>
            <FaPen color='white' size='1.2rem' />
          </Link>
          <FaTrash color='red' size='1.2rem' onClick={deleteOffer} />
        </div>
      </div>
    </div>
  );
}
