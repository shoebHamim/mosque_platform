import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { app } from "../../firebase/firebase.init";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const auth = getAuth(app);
const imgHostKey=process.env.REACT_APP_imgbb_key;




const SignupMosque = () => {
  const navigate = useNavigate();
  const saveMosqueToDB = async({name,division,address,imamName,contactNo,email,description,img}) => {
    const mosque = {name,division,address,imamName,contactNo,email,description,img};
    // generating img url uploading it to imgbb
    const formData =new FormData()
    formData.append('image',img[0])
    const url=`https://api.imgbb.com/1/upload?key=${imgHostKey}`
    fetch(url,{
      method:'POST',
      body:formData
    })
    .then(res=>res.json())
    .then(imgData=>{
      if(imgData.success){
        // img uploaded and imgData.data.url is the url
        mosque.img=imgData.data.url
        fetch('http://localhost:5000/mosques', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(mosque),
        })
          .then(res => res.json())
          .then(data => {
            if(data._id){
              toast.success('Mosque Registration was Successful!')
              navigate(`/registered`);
            }
            else{
              toast.error('something went Wrong!')
            }
          })
      }
      })
      
  };
  
  const OnSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(res => {
        saveMosqueToDB(data)
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
      <option value="Dhaka"> Dhaka</option>
      <option value="Barisal"> Barisal</option>
      <option value="Chittagong"> Chittagong</option>
      <option value="Khulna"> Khulna</option>
      <option value="Mymensingh"> Mymensingh</option>
      <option value="Rajshahi"> Rajshahi</option>
      <option value="Rangpur"> Rangpur</option>
      <option value="Sylhet"> Sylhet</option>
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
        Description </span></label>
      <textarea
        className="input input-bordered w-full h-20" {...register('description', {
          required: 'Enter Description',
        })} />
      {errors.description && <p className='text-xs text-red-600'>{errors.description.message}</p>}
    </div>

    <div className="form-control w-full">
      <label className="label"><span className="label-text">
        Image of Mosque </span></label>
      <input type='file'
        className="input input-bordered w-full p-2 cursor-pointer" {...register('img', {
          required: 'Upload an Image',
        })} />
      {errors.img && <p className='text-xs text-red-600'>{errors.img.message}</p>}
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

export default SignupMosque;