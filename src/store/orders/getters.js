export const getOrders = state => state.Orders;
export const getOrderbyId = state => (id) => {
  return state.Orders.find(order => order._id === id);
}

