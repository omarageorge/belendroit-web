import { useEffect, useState } from 'react';
import { collection, getDocsFromServer } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Layout from '../../components/admin/Layout';
import OfferCard from '../../components/admin/OfferCard';
import { db } from '../../utils/firebase';

export default function Admin({ offers }) {
  const [uid, setUid] = useState();

  const hangoutOffers = offers.filter((offer) => offer.data.uid == uid);

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

  if (hangoutOffers.length === 0) {
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
        {hangoutOffers.map((offer) => (
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

  try {
    const offersRef = collection(db, 'offers');

    const querySnapshot = await getDocsFromServer(offersRef);

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
