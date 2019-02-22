/* eslint-disable no-underscore-dangle */
export const getOrders = state => state.orders.filter(order => typeof order.status !== 'undefined');
export const getNewOrders = state => state.orders.filter(order => typeof order.status === 'undefined');
export const getArchivedOrders = state => state.archivedOrders;
export const getOrdersCount = state => state.orders.filter(order => typeof order.status !== 'undefined').length;
export const getNewOrdersCount = state => state.orders.filter(order => typeof order.status === 'undefined').length;
export const getArchivedOrdersCount = state => state.archivedOrders.length;
export const getOrderbyId = state => id => state.orders.find(order => order._id === id);
export const statsOrderStages = (state) => {
  const stages = ['ItemRegistered', 'ItemProduce', 'ItemProduced', 'ItemPacked'];
  const result = [];
  for (let i = 0; i < stages.length; i++) {
    result.push(state.orders.filter((x) => {
      if (typeof x.status !== 'undefined') {
        return x.status.type === stages[i];
      }
    }).length);
  }
  result.push(state.archivedOrders.filter(order => order.hasOwnProperty('ItemShipped')).length);
  result.unshift(state.orders.filter(order => typeof order.status === 'undefined').length);
  return result;
};
export const statsOrdersCurrentMonth = (state) => {
  const steps = ['ItemShipped', 'ItemCanceled'];
  const result = [];
  for (let i = 0; i < steps.length; i++) {
    const today = new Date();
    result.push(state.archivedOrders.filter((x) => {
      return x.hasOwnProperty(steps[i]) && new Date(x.order.date) >= today.setDate(today.getDate() - 30);
    }).length);
  }
  const today = new Date();
  result.push(state.orders.filter(order => order.hasOwnProperty('ItemError') && new Date(order.order.date) >= today.setDate(today.getDate() - 30)).length);
  result.push(state.orders.filter(order => order.hasOwnProperty('reorder_cause') && new Date(order.order.date) >= today.setDate(today.getDate() - 30)).length);
  result.unshift(state.orders.filter(order => typeof order.status === 'undefined' && new Date(order.order.date) >= today.setDate(today.getDate() - 30)).length);
  return result;
};
export const statsOrdersProdTime = (state) => {
  const timeframe = [-10, -5, -2, -1, 1, 5, 10];
  const result = [];

  for (let i = 0; i < timeframe.length - 1; i++) {
    const day1 = new Date();
    const day2 = new Date();
    const minDate = new Date(day1.setDate(day1.getDate() + timeframe[i]));
    const maxDate = new Date(day2.setDate(day2.getDate() + timeframe[i + 1]));
    result.push(state.orders.filter((x) => {
      return new Date(x.order.dueDate) >= minDate && new Date(x.order.dueDate) <= maxDate;
    }).length);
  }
  const today = new Date();
  const minDate = today.setDate(today.getDate() + timeframe[timeframe.length - 1]);
  result.push(state.orders.filter((x) => {
    return new Date(x.order.dueDate) >= minDate;
  }).length);
  const today2 = new Date();
  const maxDate = today2.setDate(today2.getDate() + timeframe[0]);
  result.unshift(state.orders.filter((x) => {
    return new Date(x.order.dueDate) <= maxDate;
  }).length);
  console.log(result)
  return result;
};
