/* eslint-disable no-underscore-dangle */
export const getOrders = state => state.orders.filter(order => typeof order.status !== 'undefined');
export const getNewOrders = state => state.orders.filter(order => typeof order.status === 'undefined');
export const getArchivedOrders = state => state.archivedOrders;
export const getOrderbyId = state => id => state.orders.find(order => order._id === id);
export const statsOrderStages = (state) => {
  const stages = ['ItemRegistered', 'ItemProduce', 'ItemProduced', 'ItemPacked', 'ItemShipped'];
  const result = [];
  for (let i = 0; i < stages.length; i++) {
    result.push(state.orders.filter((x) => {
      if (typeof x.status !== 'undefined') {
        return x.status.type === stages[i];
      }
    }).length);
  }
  result.unshift(state.orders.filter(order => typeof order.status === 'undefined').length);
  console.log(result);
  return result;
};

