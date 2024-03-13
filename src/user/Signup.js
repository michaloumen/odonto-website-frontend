import { useState } from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { signup } from '../auth';
import { useLanguageContext } from '../hooks/LanguageContext';
import texts from '../components/Texts';

const Signup = () => {
  const { isEnglishLanguage } = useLanguageContext();
  const signupMessages = texts[isEnglishLanguage ? 'en' : 'ptbr'];

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
        setValues({ ...values, errors: signupMessages.signup.errorEmail, success: false });
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
        <label className='text-muted'>{signupMessages.signup.name}</label>
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
        <label className='text-muted'>{signupMessages.password}</label>
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
        {signupMessages.button}
      </button>
    </form>
  );

  const showError = (errors) => {
    if (errors && (typeof errors === 'string' || Array.isArray(errors))) {
      if (errors.length > 0) {
        return (
          <div className='alert alert-danger'>
            {(typeof errors === 'string') ? (
              <div className='error-message'>{errors}</div>
            ) : (
              errors.map((error, index) => (
                error !== 'Invalid value' && (
                  <div key={index} className='error-message'>{error}</div>
                )
              ))
            )}
          </div>
        );
      }
    }
    return null;
  };

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      {signupMessages.signup.showSuccess} <Link to='/signin'>{signupMessages.navigation.signin}</Link>.
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
