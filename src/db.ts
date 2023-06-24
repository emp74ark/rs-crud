import { IUser } from './entities/interfaces.js';
import {bodyChecker} from './utils/index.js';
import {v4 as uuid} from 'uuid'

export let db: IUser[] = [];

export const getAllUsers = () => {
  return JSON.stringify(db);
};

export const getUserById = (id: string) => {
  const user = db.find((el) => el.id === id);
  if (user) return JSON.stringify(user);
};

export const addUser = (user: Omit<IUser, 'id'>) => {
  if (bodyChecker(user)) {
    db.push({
      id: uuid(),
      ...user,
    });
    return true;
  } else {
    return false;
  }
};

export const updateUser = (id: string, data: Partial<IUser>) => {
  try {
    const user = db.find((el) => el.id === id);
    if (user) {
      const updated = { ...user, ...data };
      db = db.filter((el) => el.id !== updated.id);
      db.push(updated);
      return true;
    }
    return false;
  } catch (e) {
    if (e) return false;
  }
};

export const deleteUser = (id: string) => {
  const user = db.find((el) => el.id === id);
  if (user) {
    db = db.filter((el) => el.id !== id);
    return true;
  }
  return false
};
