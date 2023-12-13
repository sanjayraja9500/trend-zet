import { UserConsumer } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase.config';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';

const Profile = () => {
  const {
    userName,
    setUserName,
    email,
    setEmail,
    number,
    setNumber,
    gender,
    setGender,
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
    if (userName && email && number && gender && imageURL) {
      if (number.length === 10) {
        try {
          const itemToEditRef = doc(db, 'usersProfileData', id);
          await updateDoc(itemToEditRef, {
            id,
            userName,
            email,
            number,
            gender,
            image: imageURL,
          });
          fetchProfileData();
          toast.success('Profile Update Successfully !');
        } catch (error) {
          console.log(error);
        }
      } else toast.warning('Enter valid phone number !');
    } else toast.warning('Input Field Is Mandatory !');
  };

  const logOut = () => {
    signOut(auth);
    setProfileData(null);
    setAccessToken(null);
    clearFormInput();
    navigate('/');
  };

  const clearFormInput = () => {
    setId('');
    setUserName('');
    setEmail('');
    setGender('');
    setNumber('');
    setImageURL('');
  };

  return (
    <section className='profile'>
      {imageURL && (
        <div className='profile-img'>
          <img src={imageURL} alt={userName} />
        </div>
      )}

      <div className='profile-data'>
        <h1>Your Profile</h1>
        <div className='profile-id'>
          <label>ID</label>
          <input
            type='number'
            value={id}
            name='cmp_no'
            id='id_cmp_no'
            readOnly
          />
        </div>

        <div className='profile-name'>
          <label>User Name</label>
          <input
            type='text'
            value={userName}
            name='name'
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className='profile-email'>
          <label>Email</label>
          <input
            type='email'
            value={email}
            name='cmp_email'
            id='id_cmp_email'
            readOnly
          />
        </div>

        <div className='profile-number'>
          <label>Mobile Number</label>
          <input
            type='number'
            value={number}
            name='number'
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className='profile-gender'>
          <label>Email</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            id='gender'
            placeholder='gender'
          >
            <option defaultChecked>Gender</option>
            <option value='Male'>Male</option>
            <option value='Women'>Women</option>
            <option value='Other'>Other</option>
          </select>
        </div>

        <div className='profile-profilePic'>
          <label htmlFor='image'>Profile Picture</label>
          <input
            type='file'
            name='image'
            accept='image/*'
            id='image'
            onChange={(event) => getImageUrl(event)}
          />
        </div>

        <button onClick={updateFunc}>Update Profile</button>
        <button onClick={logOut}>Logout</button>
      </div>
    </section>
  );
};

export default Profile;
