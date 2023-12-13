import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setProfileData } from '../utils/firebase.Function';
import { storage, auth } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { UserConsumer } from '../context/userContext';

const Registration = () => {
  const { fetchProfileData } = UserConsumer();
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [number, setNumber] = useState();
  const [city, setCity] = useState();
  const [imageURL, setImageURL] = useState();

  const onSubmit = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/');
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          alert('Email already exist');
          navigate('/login');
          toast.warning('Email already exist');
        }
      });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const getImageUrl = (event) => {
    const imageFile = event.target.files[0];

    const storageRef = ref(
      storage,
      `usersImage/${Date.now()}/${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            toast.info('Upload is Paused!');
            break;
          case 'running':
            toast.warning('Waiting for Image Upload!!');
            break;
        }
      },
      (error) => {
        console.log('Error', error);
        toast.error('Error... Try Again!');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          toast.success('Image Uploaded Successfully!');
        });
      }
    );
  };

  const formValidation = (e) => {
    e.preventDefault();
    if (userName && email && password && number && city && imageURL) {
      if (number.length === 10) {
        const data = {
          id: Date.now(),
          userName,
          email,
          password,
          number,
          city,
          image: imageURL,
        };
        setProfileData(data);
        fetchProfileData();
        onSubmit();
        clearFormInput();
      } else toast.warning('Enter valid phone number !');
    } else toast.warning('Input Field Is Mandatory !');
  };

  const clearFormInput = () => {
    setUserName('');
    setEmail('');
    setPassword('');
    setCity('');
    setNumber('');
    setImageURL('');
  };

  return (
    <div className='contact  mb-4 mt-24' id='contact'>
      <div className='title-container bg-gradient-to-r from-blue-400 to-transparent items-center justify-center'>
        <div className='flex  justify-center items-center '>
          <h3
            style={{
              color: '#000',
              padding: '10px 50px',
            }}
            className='rounded-md mt-3'
          >
            Sign Up
          </h3>
        </div>

        <div className='row h-100 justify-content-center align-items-center'>
          <div className='col-10 col-md-8 col-g-6'>
            <form
              className='contact-form flex flex-col justify-center items-center '
              onSubmit={formValidation}
            >
              <div className='col-6 py-3 text-center '>
                <input
                  type='text'
                  name='name'
                  placeholder='User Name'
                  className='contact-form-name input-text-box text-[15px]h-[45px] tracking-normal w-[50%] md:h-[2rem] md:w-[70%]'
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </div>

              <div className='col-6 py-3 text-center'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email address'
                  className='contact-form-email input-text-box text-[15px]h-[45px] tracking-normal w-[50%] md:h-[2rem] md:w-[70%]'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className='col-6 py-3 text-center'>
                <input
                  type='password'
                  name='password'
                  className='contact-form-message input-text-box text-[15px]h-[45px] tracking-normal w-[50%] md:h-[2rem] md:w-[70%] '
                  placeholder='Password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                ></input>
              </div>

              <div className='col-6 py-3 text-center'>
                <input
                  type='number'
                  name='mobile number'
                  className='contact-form-message input-text-box text-[15px]h-[45px] tracking-normal w-[50%] md:h-[2rem] md:w-[70%]'
                  placeholder='Mobile Number'
                  value={number}
                  onChange={(event) => setNumber(event.target.value)}
                ></input>
              </div>

              <div className='signFrom-gende col-6 py-3 text-center'>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  id='city'
                  placeholder='City'
                  className='w-[50%] h-[2rem] md:h-[2rem] md:w-[70%]'
                >
                  <option defaultChecked>City</option>
                  <option value='Chennai'>Chennai</option>
                  <option value='Coimbatore'>Coimbatore</option>
                  <option value='Tirupur'>Tirupur</option>
                  <option value='Erode'>Erode</option>
                  <option value='Salem'>Salem</option>
                  <option value='Vellore'>Vellore</option>
                  <option value='Madurai'>Madurai</option>
                  <option value='Tirchy'>Tirchy</option>
                  <option value='Dindigul'>Dindigul</option>
                  <option value='Villupuram'>Villupuram</option>
                  <option value='Others'>Others</option>
                </select>
              </div>

              <div className='signFrom-profilePic ml-10 col-6 py-3 text-center '>
                {/* <label htmlFor='image'>Profile Picture</label> */}
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  id='image'
                  onChange={(event) => getImageUrl(event)}
                  className=' input-text-box text-[15px]h-[45px] tracking-normal w-[50%] h-[2rem] md:h-[2rem] md:w-[70%]'
                />
              </div>

              <div className='btn-container col-12 py-3 text-center'>
                <button
                  type='submit'
                  style={{
                    background: '#c43421',
                    color: '#ffff',
                    padding: '10px 50px',
                  }}
                  className='btn connect'
                >
                  Register
                </button>
              </div>

              <div className='already-acc'>
                Already have an account ?{'   '}
                <span
                  className='already-acc-log '
                  style={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                    color: '#298af2',
                  }}
                >
                  <NavLink to='/'>Click here to Login</NavLink>
                  <br />
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
