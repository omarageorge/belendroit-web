import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaTimes } from 'react-icons/fa';
import {
  doc,
  deleteDoc,
  query,
  orderBy,
  collection,
  getDocsFromServer,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { db } from '../../utils/firebase';
import Meta from '../../components/Meta';
import Layout from '../../components/admin/Layout';
import Title from '../../components/admin/Title';
import style from '../../styles/admin.module.scss';

export default function Notifications({ notifications }) {
  const router = useRouter();

  const [uid, setUid] = useState();

  const hangoutNotifications = notifications.filter(
    (notification) => notification.data.uid == uid
  );

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
      } else {
        console.log('Nothing...');
      }
    });
  });

  if (hangoutNotifications.length === 0) {
    return (
      <Layout>
        <span className='block text-center text-blue-600'>
          No notifications to show.
        </span>
      </Layout>
    );
  }

  return (
    <>
      <Meta title='Admin: Notifications' />
      <Layout>
        <Title>Notifications</Title>

        <section id={style.wrapper} className='space-y-4'>
          {hangoutNotifications.map((notification) => (
            <div
              key={notification.id}
              className='w-full h-auto bg-gray-200 rounded-md  px-4 py-3 flex justify-between'
            >
              {/* Text content */}
              <div className='space-y-1'>
                <p className='font-medium'>{notification.data.title}</p>
                <p className='text-sm'>{notification.data.date}</p>
              </div>

              {/* Delete Icon */}
              <div
                className='text-gray-800 hover:text-red-600 cursor-pointer'
                onClick={async () => {
                  await deleteDoc(doc(db, 'notifications', notification.id));
                  router.reload();
                }}
              >
                <FaTimes size={18} />
              </div>
            </div>
          ))}
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  let notifications = [];

  try {
    const q = query(collection(db, 'notifications'), orderBy('date', 'desc'));
    const querySnapshot = await getDocsFromServer(q);

    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, data: doc.data() });
    });
  } catch (error) {
    console.error(error.message);
  }

  return { props: { notifications } };
}
