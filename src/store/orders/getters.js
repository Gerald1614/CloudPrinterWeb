export const getOrders = state => state.orders.filter(order => typeof order.status !== 'undefined');
export const getNewOrders = state => state.orders.filter(order => typeof order.status === 'undefined');

export const getOrderbyId = state => (id) => {
  return state.Orders.find(order => order._id === id);
};
