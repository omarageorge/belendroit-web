import Meta from '../../components/Meta';
import Layout from '../../components/admin/Layout';
import OfferCard from '../../components/admin/OfferCard';
import Title from '../../components/admin/Title';

export default function Admin() {
  return (
    <>
      <Meta title='Admin: Welcome' />
      <Layout>
        {/* <Title>Offer</Title> */}

        <section className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6'>
          <OfferCard />
          <OfferCard />
          <OfferCard />
          <OfferCard />
          <OfferCard />
          <OfferCard />
          <OfferCard />
        </section>
      </Layout>
    </>
  );
}
