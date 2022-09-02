import BarLoader from 'react-spinners/BarLoader';

export default function Loader() {
  return (
    <div className='w-full h-screen bg-gray-100 flex items-center justify-center'>
      <BarLoader />
    </div>
  );
}
