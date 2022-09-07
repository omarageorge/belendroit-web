import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { FaCamera, FaPlusCircle } from 'react-icons/fa';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';

import Meta from '../../components/Meta';
import Layout from '../../components/admin/Layout';
import Title from '../../components/admin/Title';
import { auth, db, storage } from '../../utils/firebase';
import style from '../../styles/admin.module.scss';

export default function Add() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
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

    const storageRef = ref(storage, selectedFile.name);
    const docRef = doc(db, 'hangouts', auth.currentUser.uid);
    const timestamp = Date.now();

    try {
      const docSnapShot = await getDoc(docRef);
      const hangoutData = docSnapShot.data();

      await uploadBytes(storageRef, selectedFile);
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'offers'), {
        image: imageUrl,
        title: formData.title,
        description: formData.description,
        city: hangoutData.city,
        hangout: hangoutData.hangout,
        created: timestamp,
      });

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
        <Title>Create New Offer</Title>

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
                    <div className='flex flex-col items-center justify-center'>
                      <span className='text-5xl text-gray-500'>
                        <FaCamera />
                      </span>
                      <span className='text-md  text-gray-500 pt-4'>
                        Click to select an image
                      </span>
                    </div>
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
