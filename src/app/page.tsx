'use client';
import { signOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  where
} from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';

import { auth, firestore } from '@/firebase/firebaseConfig';
import { useGlobalStore } from '@/zustand/globalStore';

import { CalendarType } from '@/types/CalendarType';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const user = useGlobalStore((state) => state.user);
  const logout = useGlobalStore((state) => state.logout);

  const [calendarName, setCalendarName] = useState('');
  const [error, setError] = useState('');

  const calendarRef = collection(firestore, 'calendar');

  const router = useRouter();

  const [calendarList, setCalendarList] = useGlobalStore((state) => [
    state.calendarList,
    state.setCalendarList
  ]);

  // useEffect(() => {
  //   const fetchCalendars = async () => {
  //     if (user) {
  //       try {
  //         // Reference to the 'calendar' collection
  //         const q = query(
  //           collection(firestore, 'calendar'),
  //           where('adminRef', '==', user.uid)
  //         );

  //         // Execute the query
  //         const querySnapshot = await getDocs(q);
  //         const fetchedCalendars: CalendarType[] = [];
  //         querySnapshot.forEach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           fetchedCalendars.push({ id: doc.id, ...doc.data() });
  //         });

  //         setCalendarList(fetchedCalendars);
  //       } catch (error) {
  //         console.error('Error fetching calendars: ', error);
  //         // Handle the error appropriately
  //       }
  //     }
  //   };

  //   fetchCalendars();
  // }, [user]);

  useEffect(() => {
    const fetchCalendars = async () => {
      if (user) {
        try {
          const q = query(calendarRef, where('adminRef', '==', user.uid));

          const querySnapshot = await getDocs(q);
          console.log(querySnapshot);
          const fetchedCalendars: CalendarType[] = [];
          querySnapshot.forEach((doc) => {
            fetchedCalendars.push({ id: doc.id, ...doc.data() });
          });

          setCalendarList(fetchedCalendars);
        } catch (error: any) {
          console.log(error.message);
        }
      }
    };

    fetchCalendars();
  }, [calendarRef, user]);

  const createCalendar = async (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Prevent the default form submission
    try {
      const docRef = await addDoc(calendarRef, {
        title: calendarName,
        startDate: Timestamp.fromDate(new Date()),
        adminRef: user?.uid
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error(error);
      setError('Failed to create calendar'); // Set the error state
    }
  };

  const deleteCalendar = async (id: string) => {
    const docRef = doc(firestore, 'calendar', id);

    try {
      await deleteDoc(docRef);
      console.log('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const singout = async () => {
    await signOut(auth);
    logout();
    router.push('/login');
  };

  if (user == null) {
    router.push('/login');
    return <div>User not logged in</div>;
  }

  if (calendarList == null) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <h1>{user.email}</h1>
          <div className='mt-6 scale-75 md:scale-100'>
            {error && <div className='text-red-500'>{error}</div>}
            <form onSubmit={createCalendar}>
              <div className=' flex flex-row items-center space-x-2'>
                <label className='label'>Name</label>
                <input
                  type='text'
                  className='input input-bordered'
                  placeholder='Calendar title'
                  required
                  onChange={(e) => setCalendarName(e.target.value)}
                />
                <button type='submit' className='btn'>
                  Create Calendar
                </button>
              </div>
            </form>
          </div>
          <div className='mt-6'>
            <ul className='menu'>
              {calendarList && calendarList.length > 0 ? (
                calendarList.map((calendar, key) => (
                  <li className='flex flex-row pt-3' key={key}>
                    <UnstyledLink
                      className='btn btn-wide mr-1 flex items-center font-bold'
                      href={'/calendar/' + calendar.id}
                    >
                      {calendar.title}
                    </UnstyledLink>
                    <button
                      onClick={() => deleteCalendar(calendar.id)}
                      className='btn btn-square btn-error btn-outline'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </li>
                ))
              ) : (
                <li>No calendars</li>
              )}
            </ul>
          </div>
          <div className='mt-6 space-x-2'>
            <Button onClick={singout} variant='light'>
              Logout
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
