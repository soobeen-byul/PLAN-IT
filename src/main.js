import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './route/index.js'
import { store } from './store/store.js'

Vue.config.productionTip = false

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLU0vxFCQhjK-BTPgLGcPmCvaPshZKw1Y",
  authDomain: "planit-8ee56.firebaseapp.com",
  projectId: "planit-8ee56",
  storageBucket: "planit-8ee56.appspot.com",
  messagingSenderId: "921159487217",
  appId: "1:921159487217:web:24a7170d10510f9d1ce350",
  measurementId: "G-82WF4PWDC9"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

new Vue({
  render: h => h(App),
  router,
  store
})

.$mount('#app')
