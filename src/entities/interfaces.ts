export interface IRoute {
  code: number;
  data: string;
}

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface ClusterMessage {
  type: string;
  payload: IUser[];
}
