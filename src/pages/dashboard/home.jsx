import { FaTrash } from 'react-icons/fa';
import DashboardLayout from '../../components/dashboard/dashboardLayout';

import style from '../../styles/dashboard.module.scss';

export default function dashboard() {
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
