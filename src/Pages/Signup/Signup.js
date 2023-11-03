import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { app } from "../../firebase/firebase.init";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';


const auth = getAuth(app);

const saveMosqueToDB = async({name,division,address,imamName,contactNo,email}) => {

  const mosque = {name,division,address,imamName,contactNo,email}
  fetch('http://localhost:5000/mosques', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(mosque),
  })
    .then(res => res.json())
    .then(data => {
      if(data.acknowledged){
        toast.success('Mosque Registration was Successful!')
      }
      else{
        toast.error('something went Wrong!')
      }
    })

}

const OnSubmit = (data) => {

  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(res => {
      saveMosqueToDB(data)
    })
    .catch(error => {
      // console.log(error)
      toast.error('Already Registered!')
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
              className="input input-bordered w-full" {...register('name', {
                required: 'Enter Mosque Name',
                pattern: { value: /^[a-zA-Z]+(\s[a-zA-Z]+)*$/, message: 'Valid Name Please' }

              })} />
            {errors.name && <p className='text-xs text-red-600'>{errors.name.message}</p>}
          </div>
          <div className='form-control'>
          <label className="label"><span className="label-text">
              Select Division</span></label>
          <select className='input input-bordered' {...register("division")}>
            <option value=" Dhaka"> Dhaka</option>
            <option value=" Barisal"> Barisal</option>
            <option value=" Chittagong"> Chittagong</option>
            <option value=" Khulna"> Khulna</option>
            <option value=" Mymensingh"> Mymensingh</option>
            <option value=" Rajshahi"> Rajshahi</option>
            <option value=" Rangpur"> Rangpur</option>
            <option value=" Sylhet"> Sylhet</option>
          </select>
          </div>


          <div className="form-control w-full">
            <label className="label"><span className="label-text">
              Mosque Address</span></label>
            <input type='text'
              className="input input-bordered w-full" {...register('address', {
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
            {errors.imamName && <p className='text-xs text-red-600'>{errors.imamName.message}</p>}
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
            <label className="label"><span className="label-text">
              Forgot Password?</span></label>
          </div>
          <input value={'Register'} className='btn w-full my-4 ' type="submit" />
        </form>
        <p>Already have an account? <Link to={'/login'} className='text-primary'>Login</Link></p>

      </div>
    </div>
  );
};

export default Signup;