// pages/register.tsx
'use client';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useGlobalStore } from '@/zustand/globalStore';

import { auth } from '../../firebase/firebaseConfig';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const updateUser = useGlobalStore((state) => state.updateUser);
  const router = useRouter();
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      console.log(user);

      updateUser(user);

      router.push('/');
    }
  });

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // console.log(collectionRef);
      const user = await createUserWithEmailAndPassword(auth, email, password);

      // console.log(user);

      // Registration successful
      // Redirect or do something after successful registration
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='mt-4 bg-white px-8 py-6 text-left shadow-lg'>
        <h3 className='text-center text-2xl font-bold'>Register</h3>
        {error && <div className='text-red-500'>{error}</div>}
        <form onSubmit={register}>
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
              <button className='mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-900'>
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
