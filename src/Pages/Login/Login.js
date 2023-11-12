import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className='h-[600px]  flex justify-center items-center'>
      <div className='w-96'>
        <h2 className='text-center text-2xl font-bold'>Login</h2>
        <form onSubmit={handleSubmit()} >
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

            <select className="select select-bordered w-1/3 mt-4 focus:outline-none">
              <option>Mosque</option>
              <option>User</option>
            </select>
            {/* <label className="label"><span className="label-text">
              Forgot Password?</span></label> */}
              
          </div>
          <input value={'Register'} className='btn w-full my-4 ' type="submit" />
        </form>
        <p>New to Mosque Platform? <Link to={'/signup'} className='text-primary'>Signup</Link></p>

      </div>
    </div>
  );
};

export default Login;