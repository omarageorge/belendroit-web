import style from '../../styles/dashboard.module.scss';
import { FaUser, FaBriefcase, FaPlusSquare, FaTrash } from 'react-icons/fa';

export default function dashboard() {
  return (
    <main id={style.wrapper}>
      <section className=' container mx-auto flex  justify-between '>
        <div className='w-[15rem] h-[8rem] bg-gray-100  rounded-xl flex flex-col justify-center items-center'>
          <div>
            <FaUser size={60} />
          </div>
          <span className='font-bold text-xl mt-1'>100 users</span>
        </div>

        <div className='w-[15rem] h-[8rem] bg-gray-100  rounded-xl flex flex-col justify-center items-center'>
          <div>
            <FaBriefcase size={60} />
          </div>
          <span className='font-bold text-xl mt-1'>30 Hangouts</span>
        </div>

        <div className='w-[15rem] h-[8rem] bg-gray-100  rounded-xl flex flex-col justify-center items-center'>
          <div>
            <FaPlusSquare size={60} />
          </div>
          <span className='font-bold text-xl mt-1'>450 Offers</span>
        </div>
      </section>

      {/* Content */}
      <section className='container mx-auto mt-4'>
        <table id={style.table}>
          <thead>
            <tr>
              <th>Hangout</th>
              <th>Offers</th>
              <th>Notifications</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bioviands</td>
              <td>20</td>
              <td>14</td>
              <td className='flex items-center'>
                <FaTrash color='red' />
                <span className='ml-1 text-red-600 font-medium'>DELETE</span>
              </td>
            </tr>
            <tr>
              <td>Jacooz</td>
              <td>18</td>
              <td>12</td>
              <td className='flex items-center'>
                <FaTrash color='red' />
                <span className='ml-1 text-red-600 font-medium'>DELETE</span>
              </td>
            </tr>
            <tr>
              <td>Jacooz</td>
              <td>18</td>
              <td>12</td>
              <td className='flex items-center'>
                <FaTrash color='red' />
                <span className='ml-1 text-red-600 font-medium'>DELETE</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
