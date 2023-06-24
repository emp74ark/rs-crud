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

const fakeUpdatedData = {
  'username': 'NewUserName',
  'age': 20,
  'hobbies': ['chess'],
};

describe('PUT requests', () => {
  it('update user data', async () => {
    const post = await request
    .post('/api/users/')
    .send(fakeData);
    const users = await request.get('/api/users/');
    expect(post.statusCode).toBe(201);
    const userId = await JSON.parse(users.text).find((el: IUser) => el.username === fakeData.username).id;
    const result = await request.put(`/api/users/${userId}`).send(fakeUpdatedData);
    expect(result.statusCode).toBe(200);
  });
  it('use wrong address to update data', async () => {
    const post = await request
    .post('/api/users/')
    .send(fakeData);
    const users = await request.get('/api/users/');
    expect(post.statusCode).toBe(201);
    const userId = await JSON.parse(users.text).find((el: IUser) => el.username === fakeData.username).id;
    const result = await request.put(`/api/wrong_address/${userId}`).send(fakeUpdatedData);
    expect(result.statusCode).toBe(404);
  });
  it('use wrong uuid', async () => {
    const result = await request.put(`/api/users/123`).send(fakeUpdatedData);
    expect(result.statusCode).toBe(400);
  });
});
