import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';
import { collection, getDocsFromServer } from 'firebase/firestore';

import DashboardLayout from '../../components/dashboard/dashboardLayout';
import { db } from '../../utils/firebase';

import style from '../../styles/dashboard.module.scss';

export default function Users({ users, hangouts, offers }) {
  const router = useRouter();

  return (
    <DashboardLayout users={users.length} hangouts={hangouts} offers={offers}>
      <table id={style.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.data.name}</td>
              <td>{user.data.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export async function getServerSideProps(context) {
  let users = [];
  let hangouts = [];
  let offers = [];

  try {
    const querySnapshot = await getDocsFromServer(collection(db, 'users'));
    const hangoutSnapshot = await getDocsFromServer(collection(db, 'hangouts'));
    const offerSnapshot = await getDocsFromServer(collection(db, 'offers'));

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, data: doc.data() });
    });

    hangoutSnapshot.forEach((doc) => {
      hangouts.push(doc.data());
    });

    offerSnapshot.forEach((doc) => {
      offers.push(doc.data());
    });
  } catch (error) {
    console.error(error.message);
  }

  return {
    props: {
      users,
      hangouts: hangouts.length,
      offers: offers.length,
    },
  };
}
