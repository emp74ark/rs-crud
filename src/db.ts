import { IUser } from './entities/interfaces.js';

export let db: IUser[] = [
  {
    id: "12345",
    username: "UserName",
    age: 100,
    hobbies: ["hobby1"]
  }
];

export const getAllUsers = () => {
  return JSON.stringify(db);
};

export const getUserById = (id: string) => {
  const user = db.find((el) => el.id === id);
  if (user) return JSON.stringify(user);
};

export const addUser = (user: IUser) => {
  try {
    db.push(user);
    return true;
  } catch (e) {
    if (e) return false;
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
