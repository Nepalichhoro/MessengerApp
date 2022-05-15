const uuid = require('uuid');

const messages = [];
/**
 *
 * @param {*} channel
 * @param {*} message
 * @returns message object
 */
const addMessage = (channel, message) => {
  const msg = { id: uuid.v4(), channel, ...message };
  messages.push(msg);
  return msg;
};

/**
 *
 * @param {*} id
 * @returns modified messages collection
 */
const removeMessage = (id) => {
  const index = messages.findIndex((message) => message.id === id);
  if (index !== -1) return messages.splice(index, 1)[0];
  return null;
};

/**
 *
 * @param {*} id
 * @returns message object specific to the id
 */
const getMessage = (id) => messages.find((message) => message.id === id);

/**
 *
 * @param {*} channel
 * @returns
 */
const getMessagesInChannel = (channel) => messages.filter((message) => message.channel === channel);

module.exports = {
  addMessage,
  getMessage,
  getMessagesInChannel,
  removeMessage,
};
