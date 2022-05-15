const { expect } = require('chai');
const { describe, it } = require('mocha');
const { addUser } = require('../src/users');

describe('Users', () => {
  describe('addUser', () => {
    it('should add a new user to the channel and return the newly added user object', () => {
      const returnedObject = addUser(1, 'Doncic', 'mavericks');
      const expectedObject = { id: 1, name: 'mavericks' };
      expect(returnedObject).to.deep.equal(expectedObject);
    });

    it('should return error when a channel is not passed', () => {
      const returnedObject = addUser(1, 'Jokic');
      const expectedObject = { error: 'Id, username and channel are required.' };
      expect(returnedObject).to.deep.equal(expectedObject);
    });

    it('should return error when a username is not passed', () => {
      const returnedObject = addUser(1, null, 'Celtics');
      const expectedObject = { error: 'Id, username and channel are required.' };
      expect(returnedObject).to.deep.equal(expectedObject);
    });

    it('should return error when an id is not passed', () => {
      const returnedObject = addUser(null, 'Giannis', 'Celtics');
      const expectedObject = { error: 'Id, username and channel are required.' };
      expect(returnedObject).to.deep.equal(expectedObject);
    });
  });
});
