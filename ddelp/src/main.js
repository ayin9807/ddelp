import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
import App from './App.vue'
new Vue({
    el: '#app'
    , render: h => h(App)
})