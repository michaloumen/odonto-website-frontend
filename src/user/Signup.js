import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    success: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  const { name, email, password, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (!name || !email || !password) {
      setValues({ ...values, error: 'Por favor, preencha todos os campos.', success: false });
      return;
    }

    if (!/\d/.test(password)) {
      setValues({ ...values, error: 'A senha deve conter pelo menos um número.', success: false });
      return;
    }

    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false })
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            error: '',
            success: true
          });
          setRedirectToSignin(true); 
        }
      })
      .catch(error => {
        console.error("Erro na inscrição:", error);
        setValues({ ...values, error: "Erro ao tentar se inscrever. Por favor, tente novamente.", success: false });
      });
  };

  const signupForm = () => (
    <form className={`needs-validation ${submitted ? 'was-validated' : ''}`} noValidate>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className={`form-control ${submitted && !name ? 'is-invalid' : ''}`}
          value={name}
          required
        />
        {submitted && !name && <div className='invalid-feedback'>Name is required.</div>}
      </div>

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

  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. Please <Link to='/signin'>Signin</Link>.
    </div>
  );

  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }

  return (
    <Layout
      title='Signup'
      description='Signup to Node React E-commerce App'
      className='container col-md-8 offset-md-2'
    >
      {showSuccess()}
      {signupForm()}
    </Layout>
  );
};

export default Signup;
