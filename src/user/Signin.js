import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth';
import { useLanguageContext } from '../hooks/LanguageContext';
import texts from '../components/Texts';

const Signin = () => {
  const { isEnglishLanguage } = useLanguageContext();
  const signinMessages = texts[isEnglishLanguage ? 'en' : 'ptbr'];

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, redirectToReferrer, error } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password })
      .then(data => {
        if (data.err || data.error) {
          setValues({ ...values, error: data.err || data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              redirectToReferrer: true
            });
          });
        }
      })
      .catch(err => {
        setValues({ ...values, error: err, loading: false });
      });
  };

  const signupForm = () => (
    <form>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange('email')}
          type='email'
          className='form-control'
          value={email}
          required
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>{signinMessages.password}</label>
        <input
          onChange={handleChange('password')}
          type='password'
          className='form-control'
          value={password}
          required
        />
      </div>

      <button
        onClick={clickSubmit}
        className='btn btn-primary mt-3'
      >
        {signinMessages.button}
      </button>
    </form>
  );
  const showError = (error) => (
    error && (
      <div className='alert alert-danger'>
        <div className='error-message'>{error}</div>
      </div>
    )
  );

  const showLoading = () => (
    loading && (
      <div className='alert alert-info'>
        <h2>{signinMessages.loading}</h2>
      </div>
    )
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Navigate to='/admin/dashboard' />
      } else {
        return <Navigate to='/user/dashboard' />
      }
    }
  };

  return (
    <Layout
      title='Signin'
      description='Signin to Node React E-commerce App'
      className='container col-md-8 offset-md-2'
    >
      {showLoading()}
      {showError(error)}
      {signupForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
