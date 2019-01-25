export const login = (state, user) => {
  localStorage.username = user.username;
  localStorage.name = user.name;
  localStorage.id = user.id;
  state.user = user;
};

export const logout = (state) => {
  state.user.name = '';
  state.user.username = '';
  state.user.id = '';
  delete localStorage.token;
  delete localStorage.username;
  delete localStorage.id;
  delete localStorage.name;
};
