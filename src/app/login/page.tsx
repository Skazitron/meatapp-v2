// pages/login.tsx
'use client';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useGlobalStore } from '@/zustand/globalStore';

import { auth } from '../../firebase/firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const updateUser = useGlobalStore((state) => state.updateUser);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      console.log(user);

      updateUser(user);

      router.push('/'); // Redirect to home page or dashboard after login
    }
  });

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Login successful
      // Redirect or do something after successful login
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='mt-4 bg-white px-8 py-6 text-left shadow-lg'>
        <h3 className='text-center text-2xl font-bold'>Login</h3>
        {error && <div className='text-red-500'>{error}</div>}
        <form onSubmit={login}>
          <div className='mt-4'>
            <div>
              <label className='block' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                className='mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1'
                required
              />
            </div>
            <div className='mt-4'>
              <label className='block'>Password</label>
              <input
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                className='mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1'
                required
              />
            </div>
            <div className='flex items-baseline justify-between'>
              <button
                type='submit'
                className='mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-900'
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
