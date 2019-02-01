/* eslint-disable func-names */
import store from '../store';


function loginFailed(err) {
  store.dispatch('Auth/LOGOUT');
  console.log(`login failed ${err}`);
  return 'login failed';
}
function signupFailed(err) {
  console.log(err);
  return 'signUp failed';
}

const myHeaders = new Headers({
  'Content-Type': 'application/json',
});
let signalBody = {};

export const sendSignal = async function (data) {
  const params = `/workflow/${data.signal}/${data.id}`;
  if (data.signal === 'ItemCanceled') {
    signalBody = { cause: data.cause, message: data.message };
  } else if (data.signal === 'ItemError') {
    signalBody = { cause: data.cause, delay: data.delay };
  } else if (data.signal === 'ItemShipped') {
    signalBody = { tracking: data.tracking, shipping_option: data.shipping_option };
  }
  const token = store.getters['Auth/isAuthenticated'];
  return fetch(`${process.env.VUE_APP_CLOUD_PRINTER_URL}${params}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(signalBody),
  })
    .then(response => response.json()
      .then((body) => {
        store.dispatch('Orders/UpdateSignal', { id: data.id, body });
        return body;
      }))
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const getOrders = async function () {
  return fetch(`${process.env.VUE_APP_CLOUD_PRINTER_URL}/orders`, {
    method: 'GET',
    mode: 'cors',
    headers: myHeaders,
  })
    .then(response => response.json()
      .then((body) => {
        if (body.length > 0) {
          store.dispatch('Orders/LoadOrders', body);
        }
      }))
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const getArchivedOrders = async function () {
  return fetch(`${process.env.VUE_APP_CLOUD_PRINTER_URL}/orders/archives`, {
    method: 'GET',
    mode: 'cors',
    headers: myHeaders,
  })
    .then(response => response.json()
      .then((body) => {
        if (body.length > 0) {
          store.dispatch('Orders/LoadArchivedOrders', body);
        }
      }))
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const signUp = async function (formContent) {
  return fetch(`${process.env.VUE_APP_CLOUD_PRINTER_URL}/account/register`, {
    method: 'POST',
    mode: 'cors',
    headers: myHeaders,
    body: JSON.stringify(formContent),
  })
    .then(response => response.json()
      .then(body => body))
    .catch(err => signupFailed(err));
};

export const logIn = async function (user) {
  return fetch(`${process.env.VUE_APP_CLOUD_PRINTER_URL}/account/login`, {
    method: 'POST',
    mode: 'cors',
    headers: myHeaders,
    body: JSON.stringify(user),
  })
    .then(res => res.json()
      .then((userRes) => {
        if (!userRes.token) {
          return loginFailed('message vide');
        }
        return userRes;
      }))
    .catch(err => loginFailed(err));
};

export const logOut = function () {
  store.dispatch('Auth/LOGOUT');
};
