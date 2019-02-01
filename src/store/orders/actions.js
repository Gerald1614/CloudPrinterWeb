
// eslint-disable-next-line import/prefer-default-export
export const LoadOrders = ({ commit }, orders) => {
  commit('loadOrders', orders);
};
export const LoadArchivedOrders = ({ commit }, archivedOrders) => {
  commit('loadArchivedOrders', archivedOrders);
};
export const UpdateSignal = ({ commit }, signal) => {
  commit('updateSignal', signal);
};
