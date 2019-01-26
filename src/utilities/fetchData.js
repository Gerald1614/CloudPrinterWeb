/* eslint-disable func-names */
import store from '../store/index';

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
          loginFailed('message vide');
        } else {
          return userRes;
        }
      }))
    .catch(err => loginFailed(err));
};

export const logOut = function () {
  store.dispatch('Auth/LOGOUT');
};

