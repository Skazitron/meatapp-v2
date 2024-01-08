'use client';
import { doc, getDoc } from 'firebase/firestore';
import moment from 'moment';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import '../../../styles/calendarStyles.css';

import { firestore } from '@/firebase/firebaseConfig';
import { useGlobalStore } from '@/zustand/globalStore';

export default function CalendarPage() {
  const params = useParams();

  const user = useGlobalStore((state) => state.user);

  const localizer = momentLocalizer(moment);

  const [thisDoc, setThisDoc] = useState(null);

  const myEventsList = [
    {
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Some title'
    }
    // ... more events
  ];

  useEffect(() => {
    //
    const fetchCalendar = async () => {
      try {
        if (user != null) {
          const docRef = doc(firestore, 'calendar', params.slug);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
            setThisDoc(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user == null) {
    return <div>User not logged in</div>;
  } else if (thisDoc == null) {
    return <div>Document Doesn't exist</div>;
  } else
    return (
      <div>
        <h1>{thisDoc.title}</h1>
        <div>
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor='start'
            endAccessor='end'
          />
        </div>
      </div>
    );
}
