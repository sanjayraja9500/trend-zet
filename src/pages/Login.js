import { AiOutlineSend, AiFillDownCircle } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase.config';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isTestBtn, setIsTestBtn] = useState(false);
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);

  const handleLogin = (user) => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem('email', data.user.email);
      setTimeout(() => {
        navigate('/');
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 1500);

      toast.success('Login Successfully');
    });
  };
  useEffect(() => {
    setValue(localStorage.getItem('email'));
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const { providerData } = user;
        setEmail('');
        setPassword('');
        setTimeout(() => {
          navigate('/');
        }, 1000);
        toast.success('Login successfully');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      })
      .catch((err) => {
        console.log('Err', err.message);
      });
  };

  return (
    <div className='contact mb-4 mt-24 ' id='contact'>
      <div className='title-container bg-gradient-to-r from-orange-200 to-transparent items-center justify-center '>
        <div className='flex  justify-center items-center '>
          <h3
            style={{
              color: '#000',
              padding: '10px 50px',
            }}
            className='rounded-md mt-3'
          >
            Sign In
          </h3>
        </div>
        <div className='row h-100 justify-content-center align-items-center'>
          <div className='col-10 col-md-8 col-g-6'>
            <form
              className='contact-form flex flex-col justify-center items-center'
              onSubmit={onSubmit}
            >
              <div className='col-6 py-3'>
                <input
                  type='email'
                  className='form-control input-text-box text-[15px]h-[45px] tracking-normal'
                  name='email'
                  placeholder='Enter a valid email address'
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className='col-6 py-3 '>
                <input
                  type='password'
                  name='password'
                  className='form-control input-text-box text-[15px]h-[45px] tracking-normal'
                  placeholder='Enter New Password'
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                ></input>
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
                  LogIn
                </button>
                <div className=' flex  flex-col justify-center items-center rounded mt-3'>
                  <button
                    onClick={handleLogin}
                    className='bg-gradient-to-r from-green-300 to-blue-400 hover:from-pink-300 hover:to-yellow-200  text-black py-2.5 px-12 font-bold  '
                  >
                    <FcGoogle className='ml-16 text-2xl' />
                    Sign-In with Google
                  </button>
                </div>
              </div>

              <div className='already-acc'>
                Not account yet ?{'   '}
                <span className='already-acc-log'>
                  <NavLink to='/registration'>Click here to Register</NavLink>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <button
          onClick={() => setShow(!show)}
          className='bg-yellow-200 text-black text-sm p-2  mt-2 font-semibold rounded'
        >
          Show Crediential
        </button>
        {show ? (
          <div className=' p-1 ml-4 mt-3 bg-orange-100 border b-2 rounded'>
            <h6 className='text-center font-bold'>User Credential</h6>
            <p>
              <span className='font-semibold'>Email:</span> john01@gmail.com
            </p>
            <p className='-mt-4'>
              <span className='font-semibold'>Password:</span>123456
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
