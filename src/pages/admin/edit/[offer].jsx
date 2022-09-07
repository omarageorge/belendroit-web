import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { FaSave, FaTimes } from 'react-icons/fa';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { doc, setDoc, getDocFromServer } from 'firebase/firestore';

import Meta from '../../../components/Meta';
import Layout from '../../../components/admin/Layout';
import Title from '../../../components/admin/Title';
import { db, storage } from '../../../utils/firebase';
import style from '../../../styles/admin.module.scss';

export default function Add({ offer }) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [formData, setFormData] = useState({
    title: offer.data.title,
    description: offer.data.description,
  });

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    setSaving(true);

    const timestamp = Date.now();

    try {
      if (isFilePicked) {
        const storageRef = ref(storage, selectedFile.name);
        await uploadBytes(storageRef, selectedFile);
        const imageUrl = await getDownloadURL(storageRef);

        await setDoc(
          doc(db, 'offers', offer.id),
          {
            image: imageUrl,
            title: formData.title,
            description: formData.description,
            created: timestamp,
          },
          { merge: true }
        );

        await deleteObject(ref(storage, offer.data.image));

        setSaving(false);
        router.push('/admin');
      }

      await setDoc(
        doc(db, 'offers', offer.id),
        {
          title: formData.title,
          description: formData.description,
          created: timestamp,
        },
        { merge: true }
      );

      setSaving(false);
      router.push('/admin');
    } catch (error) {
      setSaving(false);
    }
  };

  return (
    <>
      <Meta title='Admin: Create New Offer' />
      <Layout>
        <Title>Edit Offer</Title>

        <section id={style.wrapper}>
          <form onSubmit={handleFormSubmission}>
            <div className={style.group}>
              <label>
                <input
                  type='file'
                  accept='image/*'
                  name='image'
                  onChange={handleImageChange}
                  className='hidden'
                />
                <div className='w-full h-48 p-6 bg-white border-2 border-dashed border-gray-300 rounded-md  cursor-pointer flex flex-col items-center justify-center'>
                  {isFilePicked ? (
                    <Image
                      src={URL.createObjectURL(selectedFile)}
                      width='200'
                      height='200'
                      style={{
                        display: 'block',
                        borderRadius: '5px',
                      }}
                      alt=''
                    />
                  ) : (
                    <Image
                      src={offer.data.image}
                      width='200'
                      height='200'
                      style={{
                        display: 'block',
                        borderRadius: '5px',
                      }}
                      alt=''
                    />
                  )}
                </div>
              </label>
            </div>

            <div className={style.group}>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                placeholder='Title'
              />
            </div>

            <div className={style.group}>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                placeholder='Description'
              ></textarea>
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
                    <FaSave /> <span>Save</span>
                  </span>
                )}
              </button>
              <span className='pr-4'></span>
              <button
                type='reset'
                onClick={() => router.push('/admin')}
                className=' bg-red-700 hover:bg-red-900 text-white py-4 px-8 rounded-md'
              >
                <span className='flex  items-center gap-x-2'>
                  <FaTimes /> <span>Cancel</span>
                </span>
              </button>
            </div>
          </form>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  let docSnapShot;
  const { offer } = context.query;

  try {
    docSnapShot = await getDocFromServer(doc(db, 'offers', offer));
  } catch (error) {
    console.error(error.message);
  }

  return {
    props: { offer: { id: docSnapShot.id, data: docSnapShot.data() } },
  };
}
