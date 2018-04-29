import 'firebaseui/dist/firebaseui.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
import App from './App.vue'
    // turn off the console note about switching to production mode
Vue.config.productionTip = false
var VueFire = require('vuefire')
var firebase = require('firebase')
    // explicit installation required in module environments
Vue.use(VueFire)
new Vue({
    el: '#app'
    , render: h => h(App)
})