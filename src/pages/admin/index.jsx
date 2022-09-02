import Layout from '../../components/admin/Layout';
import OfferCard from '../../components/admin/OfferCard';

export default function Admin() {
  return (
    <Layout>
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
  );
}
