import Vue from 'vue';
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
export const loadOrders = (state, orders) => {
  orders.forEach((order) => {
    order.order.priority = dueDate(order.order.date, order.order.priority);
  });
  state.orders = orders;
};
export const loadArchivedOrders = (state, archivedOrders) => {
  state.archivedOrders = archivedOrders;
};
export const updateSignal = (state, item) => {
  const index = state.orders.findIndex(order => order._id === item.id);
  Vue.set(state.orders, index, item.body);
};

function dueDate(orderDate, duration) {
  const date = new Date(orderDate);
  return date.setDate(date.getDate() + parseInt(duration, 10));
}
