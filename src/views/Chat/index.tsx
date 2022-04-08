import { Button } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  
  const [socket] = useState(
    io('http://localhost:4000', { 
      autoConnect: true,
      transports: ['websocket']
    })    
  );

  const send = () => {
    socket.emit('message', { message: 'hug' }, (data: any) => {
      console.log(data);
    });
  };

  useEffect(() => {
    console.log(socket);
  }, [socket]);

  return (
    <div style={{ zIndex: 1000, background: 'white', top: 0, width: '100vw', height: '100vh', position: 'fixed' }}>
      <div style={{ padding: '10px', letterSpacing: '2px', fontSize: '18px', color: 'white', background: '#165dff', textAlign: 'center' }}>
        聊天室
      </div>
      <Button onClick={send} type="primary">123</Button>
    </div>
  );
};

export default Chat;