const users = [];

/**
 *
 * @param {*} id
 * @param {*} channel
 * @param {*} name
 * @returns added user object
 */
const addUser = (id, channel, name) => {
  const existingUser = users.find(
    (user) => user.channel === channel && user.name === name,
  );

  if (!id || !name || !channel) return { error: 'Id, username and channel are required.' };
  if (existingUser) return { error: 'Username is taken.' };

  const user = { id, name, channel };

  users.push(user);
  return { id, name: user.name };
};

/**
 *
 * @param {*} id
 * @param {*} channel
 * @param {*} name
 * @returns modified collection
 */
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
  return null;
};

/**
 *
 * @param {*} id
 * @returns a user object
 */
const getUser = (id) => users.find((user) => user.id === id);

/**
 *
 * @param {*} channel
 * @returns list of users
 */
const getUsersInChannel = (channel) => users.filter((user) => user.channel === channel);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInChannel,
};
