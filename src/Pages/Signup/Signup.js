import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { app } from "../../firebase/firebase.init";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';


const auth = getAuth(app);

const OnSubmit = (data) => {


  createUserWithEmailAndPassword(auth,data.mEmail,data.mPassword)
    .then(res => {
      // console.log('user created');
      toast.success('Mosque Registration was Successful!')
      // updateUser(userInfo)
      //   .then(res => saveUserToDB(data.name,data.email,data.address))
      //   .catch(e => console.log(e))

    })
    .catch(error =>{
      console.log(error)
      toast.error('something went wront!')
      
    })
   
}


const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  return (
    <div className='h-[800px]  flex justify-center items-center'>
      <Toaster></Toaster>
      <div className='w-96'>
        <h2 className='text-center text-2xl font-bold'>Sign Up</h2>

        <form onSubmit={handleSubmit(OnSubmit)} >
          <div className="form-control w-full">
            <label className="label"><span className="label-text">
             Mosque Name</span></label>
            <input type='text'
              className="input input-bordered w-full" {...register('mName', {
                required: 'Enter Mosque Name',
              })} />
            {errors.name && <p className='text-xs text-red-600'>{errors.name.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text">
              Mosque Address</span></label>
            <input type='text'
              className="input input-bordered w-full" {...register('mAddress', {
                required: 'Enter Mosque Address',
              })} />
            {errors.address && <p className='text-xs text-red-600'>{errors.address.message}</p>}
          </div>
          <div className="form-control w-full">
            <label className="label"><span className="label-text">
             Imam's Name</span></label>
            <input type='text'
              className="input input-bordered w-full" {...register('imamName', {
                required: 'Enter Imam\'s Name',
              })} />
            {errors.name && <p className='text-xs text-red-600'>{errors.name.message}</p>}
          </div>
          <div className="form-control w-full">
            <label className="label"><span className="label-text">
             Contact Details</span></label>
            <input type='text'
              className="input input-bordered w-full" {...register('contactDetails', {
                required: 'Provide Contact Details',
              })} />
            {errors.name && <p className='text-xs text-red-600'>{errors.name.message}</p>}
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text">
              Email</span></label>
            <input type='text'
              className="input input-bordered w-full" {...register('mEmail', {
                required: 'Email required',
              })} />
            {errors.email && <p className='text-xs text-red-600'>{errors.email.message}</p>}

          </div>
          <div className="form-control w-full">
            <label className="label"><span className="label-text">
              Password</span></label>
            <input type='password'
              className="input input-bordered w-full " {...register('mPassword', {
                required: 'Password Required',
                minLength: { value: 6, message: 'Password must be at least 6 characters long' },
                pattern: { value: /^[A-Za-z0-9]+$/i, message: 'Password must be strong' }
              })} />
            {errors.password && <p className='text-xs text-red-600'>{errors.password.message}</p>}
            <label className="label"><span className="label-text">
              Forgot Password?</span></label>
          </div>
          <input value={'Register'} className='btn w-full my-4' type="submit" />
        </form>
        <p>Already have an account? <Link to={'/login'} className='text-primary'>Login</Link></p>
        
      </div>
    </div>
  );
};

export default Signup;