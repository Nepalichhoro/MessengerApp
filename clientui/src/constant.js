const SOCKET_SERVER_URL = 'http://localhost:4000';

const EVENTS = {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    NEW_MESSAGE: 'NEW_MESSAGE',
    USER_JOINS: 'USER_JOINS',
    USER_LEAVES: 'USER_LEAVES',
}
module.exports = {
    EVENTS: EVENTS,
    SOCKET_SERVER_URL: SOCKET_SERVER_URL,
}