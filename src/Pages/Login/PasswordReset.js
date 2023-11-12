import React from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../firebase/firebase.init";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app)

const PasswordReset = () => {
  const navigate=useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();


  function handleForgotPassword(data) {
    sendPasswordResetEmail(auth,data.email)
      .then(() => {
        toast.success('Reset Link is sent to your email!')
        navigate('/login',{replace:true})
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className='h-[600px]  flex justify-center items-center'>
      <div className='w-96'>
        <h2 className='text-center text-xl font-bold'>Password Reset Request</h2>
        <form onSubmit={handleSubmit(handleForgotPassword)} >
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

          <input value={'Send Reset Link'} className='normal-case btn w-full my-4 ' type="submit" />
        </form>

      </div>
    </div>
  );
};

export default PasswordReset;