import { useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { FaCamera, FaPlusCircle } from 'react-icons/fa';

import Meta from '../../components/Meta';
import Layout from '../../components/admin/Layout';
import Title from '../../components/admin/Title';
import style from '../../styles/admin.module.scss';

export default function Add() {
  const [saving, setSaving] = useState(false);

  return (
    <>
      <Meta title='Admin: Create New Offer' />
      <Layout>
        <Title>Create New Offer</Title>

        <section id={style.wrapper}>
          <form>
            <div className={style.group}>
              <label>
                <input type='file' name='image' className='hidden' />
                <div className='w-full h-48 p-6 bg-white border-2 border-dashed border-gray-300 rounded-md  cursor-pointer flex flex-col items-center justify-center'>
                  <div className='flex flex-col items-center justify-center'>
                    <span className='text-5xl text-gray-500'>
                      <FaCamera />
                    </span>
                    <span className='text-md  text-gray-500 pt-4'>
                      Click to select an image
                    </span>
                  </div>
                </div>
              </label>
            </div>

            <div className={style.group}>
              <input type='text' name='title' placeholder='Title' />
            </div>

            <div className={style.group}>
              <textarea placeholder='Description'></textarea>
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
                    <FaPlusCircle /> <span>Add</span>
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
