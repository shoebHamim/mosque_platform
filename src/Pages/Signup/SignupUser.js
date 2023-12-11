import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { app } from "../../firebase/firebase.init";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import toast from 'react-hot-toast';


const auth = getAuth(app);

const SignupUser = () => {
  const navigate=useNavigate()
  const OnSubmit = (data) => {

    const saveUserToDB = async({name,division,address,imamName,contactNo,email}) => {
      const mosque = {name,division,address,imamName,contactNo,email}
      fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(mosque),
      })
        .then(res => res.json())
        .then(data => {
          if(data._id){
            toast.success('User Registration was Successful!')
            navigate('/registered')
          }
          else{
            toast.error('something went Wrong!')
          }
        })
    }
  
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(res => {
        saveUserToDB(data)
      })
      .catch(error => {
        toast.error('Already Registered!')
      })
  }
  const { register, handleSubmit, formState: { errors } } = useForm()
  return (
    <form onSubmit={handleSubmit(OnSubmit)} >

    <div className="form-control w-full">
      <label className="label"><span className="label-text">
         Name</span></label>
      <input type='text'
        className="input input-bordered w-full" {...register('name', {
          required: 'Enter Your Name',
          pattern: { value: /^[a-zA-Z]+(\s[a-zA-Z]+)*$/, message: 'Valid Name Please' }

        })} />
      {errors.name && <p className='text-xs text-red-600'>{errors.name.message}</p>}
    </div>



    <div className="form-control w-full">
      <label className="label"><span className="label-text">
        Contact Number</span></label>
      <input type='text'
        className="input input-bordered w-full" {...register('contactNo', {
          required: 'Provide Contact Number',
          pattern: { value: /^(\+88)?01[0-9]{9}$/, message: 'Enter a valid Number' }
        })} />
      {errors.contactNo && <p className='text-xs text-red-600'>{errors.contactNo.message}</p>}
    </div>

    <div className="form-control w-full">
      <label className="label"><span className="label-text">
        Email</span></label>
      <input type='text'
        className="input input-bordered w-full" {...register('email', {
          required: 'Email required',
          pattern: { value: /^[\w.]+@\w+(\.[\w]+)+$/, message: 'Enter a valid Email' }

        })} />
      {errors.email && <p className='text-xs text-red-600'>{errors.email.message}</p>}

    </div>
    <div className="form-control w-full">
      <label className="label"><span className="label-text">
        Password</span></label>
      <input type='password'
        className="input input-bordered w-full " {...register('password', {
          required: 'Password Required',
          minLength: { value: 6, message: 'Password must be at least 6 characters long' },
          // pattern: { value: /^[A-Za-z0-9.]+$/i, message: 'Password must be strong' }
        })} />
      {errors.password && <p className='text-xs text-red-600'>{errors.password.message}</p>}

    </div>
    <input value={'Register'} className='btn w-full my-4 ' type="submit" />
  <p>Already have an account? <Link to={'/login'} className='text-primary'>Login</Link></p>
  </form>
  );
};

export default SignupUser;