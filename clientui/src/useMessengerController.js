import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

import { EVENTS, SOCKET_SERVER_URL } from './constant';

/**
 * 
 * @param {*} channelId 
 * @returns an channel object with associated properties
 */
const useMessengerController = (channelId) => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();

    const socketRef = useRef();

    // create a new user on the fly the client
    useEffect(() => {
      const fetchUser = async () => {
        const response = await axios.get('https://api.randomuser.me/');
        const result = response.data.results[0];
        setUser({
          name: result.name.first,
        });
      };
      fetchUser();
    }, []);

    // set current users on the backend
    useEffect(() => {
      const fetchUsers = async () => {
        const response = await axios.get(
          `${SOCKET_SERVER_URL}/channels/${channelId}/users`
        );
        const result = response.data.users;
        setUsers(result);
      };
      fetchUsers();
    }, [channelId]);
  
    // take care of conversation
    useEffect(() => {
      if (!user) {
        return;
      }
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
          query: { channelId, name: user.name},
        });

        socketRef.current.on(EVENTS.CONNECT, () => {
          console.log(socketRef.current.id);
        });

        socketRef.current.on(EVENTS.USER_JOINS, (user) => {
          if (user.id === socketRef.current.id) return;
          setUsers((users) => [...users, user]);
        });

        socketRef.current.on(EVENTS.USER_LEAVES, (user) => {
          setUsers((users) => users.filter((u) => u.id !== user.id));
        });

        socketRef.current.on(EVENTS.NEW_MESSAGE, (message) => {
          const incomingMessage = {
            ...message,
            ownedByCurrentUser: message.senderId === socketRef.current.id,
          };
          setMessages((messages) => [...messages, incomingMessage]);
        });

        return () => {
          socketRef.current.disconnect();
        };
    }, [channelId, user]);
      
    const sendMessage = (messageBody) => {
        if (!socketRef.current) return;
        socketRef.current.emit(EVENTS.NEW_MESSAGE, {
          body: messageBody,
          senderId: socketRef.current.id,
          user: user,
        });
    };

      return {
        messages,
        sendMessage,
        user,
        users,
      }
}

export default useMessengerController;