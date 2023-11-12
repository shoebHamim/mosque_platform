import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/firebase.init";
import toast, { Toaster } from 'react-hot-toast';


const auth=getAuth(app)

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    signInWithEmailAndPassword(auth,data.email,data.password)
    .then((userCredential) => {
      const user = userCredential.user;
      // firebase auth complete. now role auth
      console.log(data.role);
      if(data.role==='User'){
        fetch(`http://localhost:5000/users/${user.email}`)
          .then(res=>res.json())
          .then(data=>{
            if(data.found){
              toast.success('User Logged in')
            }
            else{
              toast.error('User not Found')
            }
           
          })
          .catch(error => {
            console.log(error);
          });
          // res.ok && 
          // toast.success('User Logged in!')
        
      }
      else{
        fetch(`http://localhost:5000/mosques/${user.email}`)
        .then(res=>res.json())
        .then(data=>{
          if(data.found){
            toast.success('Mosque Logged in')
          }
          else{
            toast.error('Mosque not Found')
          }
         
        })
        .catch(error => {
          console.log(error);
        });

      }



    })
    .catch((error) => {
      toast.error('Wrong credentials')
      const errorMessage = error.message;
      console.log(errorMessage);
    });
    

  }

  return (
    <div className='h-[600px]  flex justify-center items-center'>
      <div className='w-96'>
        <h2 className='text-center text-2xl font-bold'>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} >
        <Toaster></Toaster>
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

            <select  {...register('role')} className="select select-bordered w-1/3 mt-4 focus:outline-none">
              <option>Mosque</option>
              <option>User</option>
            </select>
            {/* <label className="label"><span className="label-text">
              Forgot Password?</span></label> */}
              
          </div>
          <input value={'Login'} className='normal-case btn w-full my-4 ' type="submit" />
        </form>
        <p>New to Mosque Platform? <Link to={'/signup'} className='text-primary'>Signup</Link></p>

      </div>
    </div>
  );
};

export default Login;