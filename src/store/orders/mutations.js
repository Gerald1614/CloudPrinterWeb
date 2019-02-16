import Vue from 'vue';
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
export const loadOrders = (state, orders) => {
  state.orders = orders;
};
export const loadArchivedOrders = (state, archivedOrders) => {
  state.archivedOrders = archivedOrders;
};
export const updateSignal = (state, item) => {
  const index = state.orders.findIndex(order => order._id === item.id);
  Vue.set(state.orders, index, item.body);
};
