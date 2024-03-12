import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import Signin from './Signin';

const Dashboard = () => {
    return isAuthenticated() ? (
      <Layout
        title='User Dashboard'
        description='User Dashboard'>
        ...
      </Layout>
    ) : (
      <Signin />
    );
  };

  export default Dashboard;
