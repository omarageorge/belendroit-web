import {
  collection,
  getDocsFromServer,
  query,
  where,
} from 'firebase/firestore';

import Layout from '../../components/admin/Layout';
import OfferCard from '../../components/admin/OfferCard';
import { auth, db } from '../../utils/firebase';

export default function Admin({ offers }) {
  if (offers.length === 0) {
    return (
      <Layout>
        <span className='block text-center text-blue-600'>
          No offers to show.
        </span>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6'>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            docRef={offer.id}
            image={offer.data.image}
            title={offer.data.title}
          />
        ))}
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let offers = [];

  const { hangout } = context.query;

  // const user = auth.currentUser.uid;
  // console.log('Logging user...');
  // console.log(user);

  try {
    const offersRef = collection(db, 'offers');
    const q = query(offersRef, where('hangout', '==', 'Billy Bar'));

    const querySnapshot = await getDocsFromServer(q);

    querySnapshot.forEach((doc) => {
      offers.push({ id: doc.id, data: doc.data() });
    });
  } catch (error) {
    console.error(error.message);
  }

  return {
    props: {
      offers,
    },
  };
}
