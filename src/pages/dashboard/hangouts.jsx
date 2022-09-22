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

export default function Hangouts({ users, hangouts, offers }) {
  const router = useRouter();

  return (
    <DashboardLayout users={users} hangouts={hangouts.length} offers={offers}>
      <table id={style.table}>
        <thead>
          <tr>
            <th>Hangout</th>
            <th>Email</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hangouts.map((hangout) => (
            <tr key={hangout.id}>
              <td>{hangout.data.hangout}</td>
              <td>{hangout.data.email}</td>
              <td>{hangout.data.city}</td>
              <td
                className='flex items-center cursor-pointer text-red-600 hover:text-red-800'
                onClick={async () => {
                  try {
                    await deleteDoc(doc(db, 'hangouts', hangout.id));
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
  let hangouts = [];
  let users = [];
  let offers = [];

  try {
    const querySnapshot = await getDocsFromServer(collection(db, 'hangouts'));
    const userSnapshot = await getDocsFromServer(collection(db, 'users'));
    const offerSnapshot = await getDocsFromServer(collection(db, 'offers'));

    querySnapshot.forEach((doc) => {
      hangouts.push({ id: doc.id, data: doc.data() });
    });

    userSnapshot.forEach((doc) => {
      users.push(doc.data());
    });

    offerSnapshot.forEach((doc) => {
      offers.push(doc.data());
    });
  } catch (error) {
    console.error(error.message);
  }

  return {
    props: {
      hangouts,
      users: users.length,
      offers: offers.length,
    },
  };
}
