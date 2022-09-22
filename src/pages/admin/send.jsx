import moment from 'moment';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaPaperPlane } from 'react-icons/fa';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';

import { auth, db } from '../../utils/firebase';
import Meta from '../../components/Meta';
import Layout from '../../components/admin/Layout';
import Title from '../../components/admin/Title';
import style from '../../styles/admin.module.scss';

export default function Notifications() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    setSaving(true);

    const docRef = doc(db, 'hangouts', auth.currentUser.uid);

    try {
      const docSnapShot = await getDoc(docRef);
      const hangoutData = docSnapShot.data();

      await addDoc(collection(db, 'notifications'), {
        title: formData.title,
        date: moment(formData.date).format('DD/MM/YYYY'),
        hangout: hangoutData.hangout,
        city: hangoutData.city,
      });

      setSaving(false);
      router.push('/admin/notifications');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Meta title='Admin: Notifications' />
      <Layout>
        <Title>Post New notification</Title>

        <section id={style.wrapper}>
          <form onSubmit={handleSubmission}>
            <div className={style.group}>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                placeholder='Message'
              />
            </div>

            <div className={style.group}>
              <input
                type='date'
                name='date'
                placeholder='dd/mm/yyyy'
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <div className={style.group}>
              <button
                type='submit'
                disabled={saving ? true : false}
                className=' bg-gray-900 hover:bg-gray-800 text-white py-4 px-8 rounded-md'
              >
                {saving ? (
                  <ScaleLoader color='white' height='1rem' />
                ) : (
                  <span className='flex  items-center gap-x-2'>
                    <FaPaperPlane /> <span>Send</span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </section>
      </Layout>
    </>
  );
}
