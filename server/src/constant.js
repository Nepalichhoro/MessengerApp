const PORT = 4000;

const EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  NEW_MESSAGE: 'NEW_MESSAGE',
  USER_JOINS: 'USER_JOINS',
  USER_LEAVES: 'USER_LEAVES',
};

module.exports = {
  EVENTS,
  PORT,
};
