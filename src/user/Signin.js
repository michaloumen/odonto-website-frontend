import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin } from '../auth';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, redirectToReferrer, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        }
      })
      .catch(err => {
        console.error("Erro na inscrição:", err);
        setValues({ ...values, error: "Erro ao tentar se inscrever. Por favor, tente novamente.", loading: false });
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
        <div className='invalid-feedback'>Email is required.</div>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={handleChange('password')}
          type='password'
          className='form-control'
          value={password}
          required
        />
        <div className='invalid-feedback'>Password is required.</div>
      </div>

      <button
        onClick={clickSubmit}
        className='btn btn-primary mt-3'
      >
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  );

  const showLoading = () => (
    loading && (
      <div className='alert alert-info'>
        <h2>Loading...</h2>
      </div>
    )
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Navigate to='/' />;
    }
  };

  return (
    <Layout
      title='Signin'
      description='Signin to Node React E-commerce App'
      className='container col-md-8 offset-md-2'
    >
      {showLoading()}
      {showError()}
      {signupForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
