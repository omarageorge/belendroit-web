import { useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { FaPlusCircle } from 'react-icons/fa';
import Meta from '../../components/Meta';
import Layout from '../../components/admin/Layout';
import Title from '../../components/admin/Title';
import style from '../../styles/admin.module.scss';

export default function Notifications() {
  const [saving, setSaving] = useState(false);

  return (
    <>
      <Meta title='Admin: Notifications' />
      <Layout>
        <Title>Post New notification</Title>

        <section id={style.wrapper}>
          <form>
            <div className={style.group}>
              <input type='text' name='title' placeholder='Title' />
            </div>

            <div className={style.group}>
              <input type='date' name='date' />
            </div>

            <div className={style.group}>
              <textarea placeholder='Message'></textarea>
            </div>

            <div className={style.group}>
              <button
                type='submit'
                disabled={saving && true}
                className=' bg-gray-900 hover:bg-gray-800 text-white py-4 px-8 rounded-md'
              >
                {saving ? (
                  <ScaleLoader color='white' height='1rem' />
                ) : (
                  <span className='flex  items-center gap-x-2'>
                    <FaPlusCircle /> <span>Post</span>
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
