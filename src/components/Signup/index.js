import React, { useState } from 'react';
import styles from "./styles.module.scss";
import axios from 'axios';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/feather/eye';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Signup = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const { firstName, lastName, email, password, confirmPassword } = formValues
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues)
    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }
    try {
      await axios.post(`http://localhost:3333/users/`, { firstName, lastName, email, password })
      Cookies.set('Poc-User-Data', JSON.stringify({ formValues }))
      navigate("/dashboard/list")
    } catch (error) {
      console.log("Something Went Wrong")
    }
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "Please input your firstname!";
    }
    if (!values.lastName) {
      errors.lastName = "Please input your lastname!";
    }
    if (!values.email) {
      errors.email = "Please input your email!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Please input your password!";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    } else if (values.password.length > 20) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please input your confirm-password!"
    } else if (values.confirmPassword != values.password) {
      errors.confirmPassword = "Passwords don't match"

    }
    return errors;
  };
  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    }
    else {
      setIcon(eyeOff);
      setType('password');
    }
  }
  return <div className={styles.container}>
    <form onSubmit={handleSubmit}>
      <h4 className={styles.heading}>Signup Here</h4>

      <div className="input-group mb-1">
        <div className={styles.input_field}>
          <input
            type="text"
            value={firstName}
            name='firstName'
            onChange={handleChange}
            placeholder='First Name'
            autoComplete='off'
          />
        </div>
        <p className={styles.showerror}>{formErrors.firstName}</p>
      </div>

      <div className="input-group mb-1">
        <div className={styles.input_field}>
          <input
            type="text"
            value={lastName}
            name='lastName'
            onChange={handleChange}
            placeholder='Last Name'
            autoComplete='off'
          />
        </div>
        <p className={styles.showerror}>{formErrors.lastName}</p>
      </div>

      <div className="input-group mb-1">
        <div className={styles.input_field}>
          <input
            type="text"
            value={email}
            name='email'
            onChange={handleChange}
            placeholder='Email'
            autoComplete='off' />
        </div>
        <p className={styles.showerror} >{formErrors.email}</p>
      </div>

      <div className="input-group mb-1">
        <div className={styles.input_field}>
          <input
            type={type}
            value={password}
            name='password'
            onChange={handleChange}
            placeholder='Password'
            autoComplete='off'
          />
          <span onClick={handleToggle}><Icon icon={icon} size={25} /></span>
        </div>
        <p className={styles.showerror} >{formErrors.password}</p>
      </div>

      <div className="input-group mb-1">
        <div className={styles.input_field}>
          <input
            type={type}
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            placeholder='Confirm-Password'
            autoComplete='off' />
        </div>
        <p className={styles.showerror} >{formErrors.confirmPassword}</p>
      </div>

      <div>
        <button className={styles.button} >Create Your Account</button>
      </div>
      I have Already Account <Link to="/login">Login?</Link>
    </form>
  </div>
};
export default Signup;