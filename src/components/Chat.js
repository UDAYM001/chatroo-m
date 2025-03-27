import React, { useState, useEffect, useRef } from 'react';
import SignOut from './SignOut';
import { db, auth } from '../firebase';
import SendMessage from './SendMessage';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

function Chat() {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();


  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  

  return (
    <div>
      <SignOut />
      <div className="msgs">
  {messages.map(({ id, text, photoURL, uid }) => (
    <div
      key={id}
      className={`msg ${uid === (auth.currentUser && auth.currentUser.uid) ? 'sent' : 'received'}`}
    >
      <img src={photoURL} alt="User" />
      <p>{text}</p>
    </div>
  ))}
  <div ref={scrollRef}></div>
</div>
<SendMessage scrollRef={scrollRef} />
    </div>
  );
}

export default Chat;
