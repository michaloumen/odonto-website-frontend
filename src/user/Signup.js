import { useState } from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { signup } from '../auth';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    errors: '',
    success: false
  });

  const { name, email, password, success, errors } = values;

  const handleChange = name => event => {
    setValues({ ...values, errors: false, [name]: event.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await signup({ name, email, password });
      if (data && (data.error || data.errors)) {
        setValues({ ...values, errors: data.error ? [data.error] : data.errors, success: false });
      } else if (data && data.err && data.err.includes("11000 duplicate key error collection")) {
        setValues({ ...values, errors: ["Email already exists"], success: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          errors: [],
          success: true
        });
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setValues({ ...values, errors: err.errors.map(error => error.msg), success: false });
    }
  };

  const signupForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange('name')}
          value={name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          className='form-control'
          onChange={handleChange('email')}
          value={email}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          className='form-control'
          onChange={handleChange('password')}
          value={password}
        />
      </div>

      <button
        className='btn btn-primary mt-3'
        onClick={clickSubmit}
      >
        Submit
      </button>
    </form>
  );

  const showError = (errors) => (
    errors.length > 0 && (
      <div className='alert alert-danger'>
        {errors.map((error, index) => (
          error !== 'Invalid value' && (
            <div key={index} className='error-message'>{error}</div>
          )
        ))}
      </div>
    )
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. Please <Link to='/signin'>Signin</Link>.
    </div>
  );

  return (
    <Layout
      title='Signup'
      description='Signup to Node React E-commerce App'
      className='container col-md-8 offset-md-2'
    >
      {showSuccess()}
      {showError(errors)}
      {signupForm()}
    </Layout>
  );
};

export default Signup;
