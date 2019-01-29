// eslint-disable-next-line import/prefer-default-export
export const loadOrders = (state, orders) => {
  orders.forEach((order) => {
    order.order.priority = dueDate(order.order.date, order.order.priority)
  })
  state.orders = orders;
};


function dueDate (orderDate, duration) {
  const date = new Date(orderDate);
  return date.setDate(date.getDate() + parseInt(duration));
};
