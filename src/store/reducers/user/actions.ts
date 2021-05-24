
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

export const setUserAction = (user: { name: string, phone: string, email: string }) => ({
  type: SET_USER,
  payload: user
});

export const clearUserAction = () => ({
  type: CLEAR_USER
});
