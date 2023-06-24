import {IUser} from '../entities/interfaces.js';

export function bodyChecker(body: IUser) {
  const {age, username, hobbies} = body;
  return Boolean(age) && Boolean(username.trim()) && Boolean(hobbies)
}
