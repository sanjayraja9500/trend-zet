import { UserConsumer } from '../context/userContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase.config';
import { toast } from 'react-toastify';

import { IoHome } from 'react-icons/io5';
import { FaCircleArrowLeft } from 'react-icons/fa6';

const Profile = () => {
  const {
    userName,
    setUserName,
    email,
    setEmail,
    number,
    setNumber,
    city,
    setCity,
    imageURL,
    setImageURL,
    getImageUrl,
    id,
    setId,
    userProfile,
    profileData,
    setProfileData,
    fetchProfileData,
    setAccessToken,
  } = UserConsumer();

  useEffect(() => {
    fetchProfileData();
    userProfile();
  }, []);

  const navigate = useNavigate();

  const updateFunc = async (e) => {
    e.preventDefault();
    if (userName && email && number && city && imageURL) {
      if (number.length === 10) {
        try {
          const itemToEditRef = doc(db, 'usersProfileData', id);
          await updateDoc(itemToEditRef, {
            id,
            userName,
            email,
            number,
            city,
            image: imageURL,
          });
          fetchProfileData();

          toast.success('Profile Update Successfully !');
        } catch (error) {
          console.log(error);
        }
      } else toast.warning('Enter valid phone number !');
    } else toast.warning('Input Field Is Mandatory !');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  // const clearFormInput = () => {
  //   setId('');
  //   setUserName('');
  //   setEmail('');
  //   setCity('');
  //   setNumber('');
  //   setImageURL('');
  // };

  return (
    <section className=' h-screen w-full flex flex-col justify-center items-center  p-8'>
      <div className=' bg-slate-800 border-2 p-8'>
        <Link to='/'>
          <FaCircleArrowLeft className='text-2xl font-extrabold text-white' />
        </Link>
        {imageURL && (
          <div className='profile-img w-44 h-44 mx-auto rounded-full border-4 border-white '>
            <img
              className='w-44 h-44 rounded-full'
              src={imageURL}
              alt={userName}
            />
          </div>
        )}

        <div className='profile-data flex flex-col justify-center items-center  '>
          <h1 className='text-center text-white tracking-wide mt-2'>PROFILE</h1>

          <div className='border-4 border-zinc-200 bg-slate-600 text-white p-2 backdrop-opacity-10 '>
            <div className='profile-name flex flex-row gap-2 '>
              <label className='text-start text-xl flex justify-center items-center'>
                UserName <span className='p-1'>:</span>
              </label>
              <input
                value={userName}
                name='name'
                onChange={(e) => setUserName(e.target.value)}
                className='bg-transparent flex justify-center items-center text-[20px] w-[50%] h-[2rem] '
              />
            </div>

            <div className='profile-email  flex flex-row   gap-2 '>
              <label className='text-start text-xl flex justify-center items-center'>
                Email <span className='p-2'>:</span>
              </label>
              <input
                type='email'
                value={email}
                name='cmp_email'
                id='id_cmp_email'
                className='bg-transparent flex justify-center items-center text-[20px] w-[60%] h-[2rem] mt-1'
                readOnly
              />
            </div>

            <div className='profile-number flex flex-row  gap-2 p-1'>
              <label className='text-start text-xl flex justify-center items-center'>
                Mobile Number <span className='p-2'>:</span>
              </label>
              <input
                type='number'
                value={number}
                name='number'
                onChange={(e) => setNumber(e.target.value)}
                className='bg-transparent flex justify-center items-center text-[20px] w-[50%] h-[2rem] mt-1'
              />
            </div>

            <div className='profile-city flex flex-row  gap-2 p-1'>
              <label className='text-start text-xl flex justify-center items-center'>
                City <span className='p-2'>:</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                id='city'
                placeholder='City'
                className='text-black flex justify-center items-center text-[20px] w-[50%] h-[2rem] mt-1'
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

            <div className='profile-profilePic  flex flex-row  gap-2 '>
              <label
                className='text-start text-xl flex justify-center items-center'
                htmlFor='image'
              >
                Image <span className='p-2'>:</span>
              </label>
              <input
                type='file'
                name='image'
                accept='image/*'
                id='image'
                onChange={(event) => getImageUrl(event)}
              />
            </div>
          </div>

          <div className='py-3'>
            <button
              style={{
                background: '#c43421',
                color: '#ffff',
                padding: '10px 50px',
              }}
              className='rounded-md text-xl'
              onClick={updateFunc}
            >
              Update Profile
            </button>
          </div>
          <Link to='/'>
            {' '}
            <button
              className='flex justify-center items-center gap-2 rounded-md   '
              style={{
                background: '#c43421',
                color: '#ffff',
                padding: '10px 50px',
              }}
            >
              Back to Home
              <IoHome className='mb-1 text-xl' />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Profile;
