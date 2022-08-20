import { User } from './../models/User.model';

export const getAll = async () => {
  return await User.find().sort({ name: 1 });
};

export const save = async (user: { name: string; socket_id: string; avatar: string }) => {
  const newChatter = new User(user);
  return newChatter.save();
};

export const deleteUser = async (socket_id: string) => {
  return await User.deleteOne({ socket_id });
};

export const updateUserStatus = async (socket_id: string, status: string) => {
  return await User.findOneAndUpdate({ socket_id }, { status });
};
