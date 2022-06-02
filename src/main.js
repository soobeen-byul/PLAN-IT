import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './route/index.js'
import { store } from './store/store.js'



Vue.config.productionTip = false


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getFirestore(app);
// const analytics = getAnalytics(app);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
