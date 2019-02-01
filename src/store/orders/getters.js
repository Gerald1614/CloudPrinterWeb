/* eslint-disable no-underscore-dangle */
export const getOrders = state => state.orders.filter(order => typeof order.status !== 'undefined');
export const getNewOrders = state => state.orders.filter(order => typeof order.status === 'undefined');
export const getArchivedOrders = state => state.archivedOrders;
export const getOrderbyId = state => id => state.orders.find(order => order._id === id);
