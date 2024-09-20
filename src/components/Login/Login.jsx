import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import { authenticationContext } from './../../Context/authentication';
import { Helmet } from 'react-helmet';


export default function Login() {
  const { setToken } = useContext(authenticationContext)
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  let user = {
    email: "",
    password: ""
  }
  async function loginOnAccount(values) {
    setLoading(true);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values); // Fixed double slash
      if (data.message === 'success') {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setSuccessMessage("Welcome Back");
        setTimeout(() => { navigate('/products') }, 1000);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
    setLoading(false);
  }


  const formikObj = useFormik({
    initialValues: user,
    onSubmit: loginOnAccount,
    validate: function (values) {
      setErrorMessage(null);
      const errors = {};
      if (values.password.length < 6 || values.password.length > 12) { errors.password = "Password must be from 6 characters and 12 characters " }
      if (values.email.includes("@") === false || values.email.includes('.') === false) { errors.email = "Email Invalid ." }
      return errors;
    }
  })
  return <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <div className="container mx-auto py-8 ">
      <div className="w-1/2 mx-auto py-10 drop-shadow-xl bg-white ">
        <div className="login w-3/4 m-auto py-5">
          <div className="flex text-3xl justify-center gap-x-2 text-green-700 font-bold mb-10">
            <i className="fa-solid fa-user"></i>
            <h2>Login Now:</h2>
          </div>
          {successMessage ? <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>{successMessage}</div> : ""}
          {errorMessage ? <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>{errorMessage}</div> : ""}
          <form onSubmit={formikObj.handleSubmit}>


            <input placeholder='Enter Your Email' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} id='email' type="email"
              className='w-full p-2 border-0 border-b border-gray-300 rounded mb-4
                    focus:outline-none focus:ring-0 focus:ring-green-600'/>
            {formikObj.errors.email && formikObj.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert">{formikObj.errors.email}</div> : ""}


            <input placeholder='Enter Your Password' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password' type="password"
              className='w-full p-2 border-0 border-b border-gray-300 rounded mb-4
                    focus:outline-none focus:ring-0 focus:ring-green-600'/>
            {formikObj.errors.password && formikObj.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert">{formikObj.errors.password}</div> : ""}


            <button className='bg-green-700 px-8 py-2 text-white rounded-md ' type='submit' disabled={!formikObj.isValid || !formikObj.dirty}>
              {loading ? <FallingLines color="#4fa94d" width="30" visible={true} ariaLabel="falling-circles-loading" /> : "Login"}
            </button>
            <Link to={"/register"}>
              <span className='pl-3'>don't Have an account ? <span class="text-green-700">Register Now</span> </span>
            </Link>
          </form>

        </div>
      </div>
    </div>
  </>

}
