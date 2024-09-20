import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate, Link } from 'react-router-dom';

export default function Register(props) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }
  async function userRegister(values) {
    setLoading(true);
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      if (data.message === "success") {
        setSuccessMessage("Account has created Successfully");
        setTimeout(function () {
          navigate('/login')
        }, 1000)
      }
      console.log(data);
    } catch (error) {
      setErrorMessage(error.response.data.message)
      console.log(error.response.data.message);
    }
    setLoading(false);
  }


  const formikObj = useFormik({
    initialValues: user,
    onSubmit: userRegister,
    validate: function (values) {
      setErrorMessage(null);
      const errors = {}
      if (values.name.length < 4 || values.name.length > 10) { errors.name = "Name must be from 4 characters and 10 characters " }
      if (values.password.length < 6 || values.password.length > 12) { errors.password = "Password must be from 6 characters and 12 characters " }
      if (values.rePassword !== values.password) { errors.rePassword = "Password and RePassword doesn't match" }
      if (values.email.includes("@") === false || values.email.includes('.') === false) { errors.email = "Email Invalid ." }
      if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) { errors.phone = 'Phone Invalid.' }
      console.log(errors);
      return errors;

    }




  })




  return <>
    <Helmet>
      <title>Register</title>
    </Helmet>
    <div className="container mx-auto p-6 ">
      <div className="w-1/2 mx-auto py-10 drop-shadow-xl bg-white ">
        <div className="regester w-3/4 m-auto py-5">
        <div className="flex text-3xl justify-center gap-x-2 text-green-700 font-bold mb-10">
          <i className="fa-solid fa-user"></i>
          <h1>Register Now</h1>
        </div>
          {successMessage ? <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>{successMessage}</div> : ""}
          {errorMessage ? <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>{errorMessage}</div> : ""}
          <form onSubmit={formikObj.handleSubmit}>

            <input placeholder='Enter Your Name' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name} id='name' type="text"
              className='w-full  p-2 border-0 border-b border-gray-300 rounded mb-4 
                    focus:outline-none focus:ring-0 focus:ring-green-600 '/>
            {formikObj.errors.name && formikObj.touched.name ?
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert">{formikObj.errors.name}</div> : ""}


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


            <input placeholder='Enter RePassword' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.rePassword} id='rePassword' type="password"
              className='w-full p-2 border-0 border-b border-gray-300 rounded mb-4
                    focus:outline-none focus:ring-0 focus:ring-green-600'/>
            {formikObj.errors.rePassword && formikObj.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert">{formikObj.errors.rePassword}</div> : ""}


            <input placeholder='Enter Your Phone' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} id='phone' type="tel"
              className='w-full p-2 border-0 border-b border-gray-300 rounded mb-4
                    focus:outline-none focus:ring-0 focus:ring-green-600'/>
            {formikObj.errors.phone && formikObj.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert">{formikObj.errors.phone}</div> : ""}

            <button className='bg-green-700 px-8 py-2 text-white rounded-md ' type='submit' disabled={!formikObj.isValid || !formikObj.dirty}>
              {loading ? <FallingLines color="#4fa94d" width="30" visible={true} ariaLabel="falling-circles-loading" /> : "Register"}
            </button>
            <Link to={"/login"}>
              <span className='pl-3'>
                Alredy Have an account ?{" "}
                <span className="text-green-700">Login Now</span>{" "}
              </span>
            </Link>
          </form>

        </div>
      </div>
    </div>
  </>
}