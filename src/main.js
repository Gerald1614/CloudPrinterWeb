import Vue from 'vue';
import Vuelidate from 'vuelidate';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

Vue.filter('date', (value) => {
  if (!value) return '';
  const d = new Date(value);
  const n = d.toLocaleDateString();
  return n;
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');


const applicationServerPublicKey = 'BE1201Avf-peP6-sYK73UPr4Ayn3LVSs3yjprvN8JGAFldj9JfaSGW_1P1wIu_qIOrGSHcgJeL-Lh0GsAQepPTs';
let isSubscribed = false;
let swRegistration = null;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('/sw.js')
      .then(async (swReg) => {
        console.log('Service Worker is registered', swReg);
        swRegistration = await swReg;
        subscribeUser();
      })
      .catch((err) => {
        console.error('Service Worker Error', err);
      });
  });
} else {
  console.warn('Push messaging is not supported');
}


if (!('Notification' in window)) {
  console.log('This browser does not support notifications!');
}
Notification.requestPermission((status) => {
  console.log('Notification permission status:', status);
});


async function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  await swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
    .then((subscription) => {
      console.log('User is subscribed:', subscription);
      updateSubscriptionOnServer(subscription);
      isSubscribed = true;

    })
    .catch((err) => {
      if (Notification.permission === 'denied') {
        console.warn('Permission for notifications was denied');
      } else {
        console.error('Failed to subscribe the user: ', err);
      }
    });
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updateSubscriptionOnServer(subscription) {
  // Here's where you would send the subscription to the application server
  if (subscription) {
    var jsonSubscription = JSON.stringify(subscription);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/v1/subscribe', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = () => {
      // do something to response
      console.log('user subscribed');
    };
    xhr.send(jsonSubscription);
  }
}
