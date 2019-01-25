import store from '../store/index';

let that;

export const signUp = (formContent) => {
  return fetch(`${process.env.VUE_APP_BASE_URI}/account/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formContent),
  })
    .then(response => response.json())
    .then((body) => {
      console.log(body);
      return Promise.resolve(body);
    })
    .catch(err => signupFailed(err));
};

export const logIn = (data) => {
  const user = data.formContent;
  that = data.that;
  return fetch(`${process.env.VUE_APP_BASE_URI}/account/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then((userRes) => {
      if (!userRes.token) {
        loginFailed('message vide');
      } else {
        localStorage.token = userRes.token;
        return Promise.resolve(userRes);
      }
    })
    .catch(err => loginFailed(err));
};

export const logOut = (self) => {
  that = self;
  store.dispatch('Auth/LOGOUT');
  that.$router.push('/');
}

function loginFailed(err) {
  store.dispatch('Auth/LOGOUT');
  console.log(`login failed ${err}`);
  return 'login failed';
}
function signupFailed(err) {
  console.log(err);
  that.$router.push('/signup');
  return 'signUp failed';
}
