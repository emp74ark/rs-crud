import supertest from 'supertest';
import { config } from 'dotenv';

config();

const { HOST, PORT } = process.env;

const request = supertest(`${HOST}:${PORT}`);

const fakeData = {
  'username': 'UserName',
  'age': 20,
  'hobbies': ['chess'],
};

interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const fakeWrongData = '123457890123';

describe('DELETE requests', () => {
  it('delete user', async () => {
    const post = await request
      .post('/api/users/')
      .send(fakeData);
    const users = await request.get('/api/users/');
    expect(post.statusCode).toBe(201); // user created
    const userId = await JSON.parse(users.text).find((el: IUser) => el.username === fakeData.username).id;
    const result = await request.delete(`/api/users/${userId}`)
    expect(result.statusCode).toBe(204)
  });
  it('delete wrong user', async () => {
    const post = await request
      .delete(`/api/users/${fakeWrongData}`)
    expect(post.statusCode).toBe(400);
    expect(post.text).toBe('User id is invalid');
  });
  it('delete user on wrong address', async () => {
    const post = await request
      .post('/api/users/')
      .send(fakeData);
    const users = await request.get('/api/users/');
    expect(post.statusCode).toBe(201); // user created
    const userId = await JSON.parse(users.text).find((el: IUser) => el.username === fakeData.username).id;
    const result = await request.delete(`/api/wrong_address/${userId}`)
    expect(result.statusCode).toBe(404)
  });
});
