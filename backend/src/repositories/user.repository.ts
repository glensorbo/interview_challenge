import { User } from './../models/User.model';

export const getAll = async () => {
  return await User.find();
};

export const save = async (user: { name: string; socket_id: string }) => {
  const newChatter = new User(user);
  return newChatter.save();
};

export const deleteUser = async (socket_id: string) => {
  return await User.deleteOne({ socket_id });
};
