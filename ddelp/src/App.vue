<template>
  <div id="app">
    <div id="nav-bar"> 
        <h3>DDelp</h3>
        <input id="search-bar">
    </div>
      <v-app>
            <v-content>
                <v-container>Hello world</v-container>
                <v-btn>hello</v-btn>
                <authentication class="nav navbar-nav navbar-right"
                    :getUser="getUser"
                    :setUser="setUser">
                </authentication>
            </v-content>
          
        </v-app>
  </div>
</template>

<script>
import { db } from './database'
import Authentication from './components/Authentication'
export default {
  name: 'app',
  data () {
    return {
        // useful data about the current user
        user: null
    }
  },
    components: {
        Authentication
    },
    methods: {
        // allow child component to change user value
        getUser () {
            return this.user
        },
        setUser (user) {
            this.user = user
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
    
#nav-bar {
    display: flex;
    flex-direction: row;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
