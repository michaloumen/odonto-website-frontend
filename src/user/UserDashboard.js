import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import Signin from './Signin';

const Dashboard = () => {
  const auth = isAuthenticated();

  if (!auth) {
    return <Signin />;
  }

  const { user: { _id, name, email, role } } = auth;

  return (
    <Layout
      title='User Dashboard'
      description='User Dashboard'
      className='container'
    >
      <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>{role === 1 ? 'Admin' : 'Registered User'}</li>
        </ul>
      </div>

      <div className='card mb-5'>
        <h3 className='card-header'>Purchase history</h3>
        <ul className='list-group'>
          <li className='list-group-item'>history</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Dashboard;
