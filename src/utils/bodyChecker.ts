import { IUser } from '../entities/interfaces.js';

export function bodyChecker(body: Omit<IUser, 'id'>) {
  const { age, username, hobbies } = body;
  return Boolean(age) && Boolean(username.trim()) && Boolean(hobbies);
}
