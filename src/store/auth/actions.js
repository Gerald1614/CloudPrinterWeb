
export const LOGIN = ({ commit }, user) => {
  commit('login', user);
};

export const LOGOUT = ({ commit }) => {
  commit('logout');
};
