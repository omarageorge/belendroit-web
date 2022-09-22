import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';
import {
  doc,
  deleteDoc,
  collection,
  getDocsFromServer,
} from 'firebase/firestore';

import DashboardLayout from '../../components/dashboard/dashboardLayout';
import { db } from '../../utils/firebase';

import style from '../../styles/dashboard.module.scss';

export default function Offers({ users, hangouts, offers }) {
  const router = useRouter();

  return (
    <DashboardLayout users={users} hangouts={hangouts} offers={offers.length}>
      <table id={style.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Hangout</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.data.title}</td>
              <td>{offer.data.hangout}</td>
              <td
                className='flex items-center cursor-pointer text-red-600 hover:text-red-800'
                onClick={async () => {
                  try {
                    await deleteDoc(doc(db, 'offers', offer.id));
                    router.reload();
                  } catch (error) {
                    console.error(error.message);
                  }
                }}
              >
                <FaTrash />
                <span className='ml-1  font-medium'>DELETE</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export async function getServerSideProps(context) {
  let offers = [];
  let users = [];
  let hangouts = [];

  try {
    const querySnapshot = await getDocsFromServer(collection(db, 'offers'));
    const userSnapshot = await getDocsFromServer(collection(db, 'users'));
    const hangoutSnapshot = await getDocsFromServer(collection(db, 'hangouts'));

    querySnapshot.forEach((doc) => {
      offers.push({ id: doc.id, data: doc.data() });
    });

    hangoutSnapshot.forEach((doc) => {
      hangouts.push(doc.data());
    });

    userSnapshot.forEach((doc) => {
      users.push(doc.data());
    });
  } catch (error) {
    console.error(error.message);
  }

  return {
    props: {
      offers,
      users: users.length,
      hangouts: hangouts.length,
    },
  };
}
