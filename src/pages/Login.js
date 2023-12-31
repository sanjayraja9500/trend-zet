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
      }, 3000);

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
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      })
      .catch((err) => {
        console.log('Err', err.message);
      });
  };

  return (
    <div className='contact mb-24 mt-8' id='contact'>
      <div className='title-container bg-gradient-to-r from-orange-200 to-transparent items-center justify-center '>
        <div className='flex  justify-center items-center '>
          <h3
            style={{
              color: '#000',
              padding: '10px 50px',
            }}
            className='rounded-md mt-3 text-xl font-bold underline uppercase'
          >
            Sign In
          </h3>
        </div>
        <div className='flex w-[100%] h-100 justify-center align-items-center '>
          <div className='mb-4 '>
            <form
              className='contact-form flex flex-col justify-center items-center backdrop-opacity-10 backdrop-invert bg-orange-300/20 rounded-md  p-8'
              onSubmit={onSubmit}
            >
              <div className='col-6 py-3'>
                <input
                  type='email'
                  className='form-control input-text-box text-lg h-[35px] w-[300px] tracking-normal'
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
                  className='input-text-box text-lg h-[35px] w-[300px] tracking-normal'
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
                    hover: '#c43421',
                  }}
                  className='btn connect uppercase transition ease-in-out delay-150 hover:-translate-y-1 hover:scale--50 duration-300 ...'
                >
                  Login
                </button>
                <div className=' flex  flex-col justify-center items-center rounded mt-3'>
                  <button
                    onClick={handleLogin}
                    className='bg-gradient-to-r from-green-300 to-blue-400 hover:from-pink-300 hover:to-yellow-200  text-black py-2.5 px-12 font-bold transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1   duration-300  '
                  >
                    <FcGoogle className='ml-16 text-2xl' />
                    Sign-In with Google
                  </button>
                </div>
              </div>

              <div className='already-acc'>
                Not account yet ?{'   '}
                <span className='already-acc-log'>
                  <NavLink
                    to='/registration'
                    className='text-base font-bold text-blue-400 underline'
                  >
                    Click here to Register
                  </NavLink>
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
          <div className=' p-1 ml-4 mt-3 bg-orange-100 border b-2 rounded gap-4'>
            <h6 className='text-center font-bold'>User Credential</h6>
            <p>
              <span className='font-semibold'>Email:</span> john01@gmail.com
            </p>
            <p className='mb-5'>
              <span className='font-semibold'>Password:</span>john01
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
