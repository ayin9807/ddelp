<template>
  <div id="app">
    <v-app>
        <v-content>
            <v-toolbar color="teal lighten-3">
                <h1>DDelp</h1>
                <v-spacer></v-spacer>
                <search></search>
                <v-spacer></v-spacer>
                <addDish></addDish>
                <v-spacer></v-spacer>
                <authentication class="nav navbar-nav navbar-right"
                    :getUser="getUser"
                    :setUser="setUser">
                </authentication>
            </v-toolbar>
            <div id="top-fives">
                <top-restaurants :title="day" :setDish="viewDish"></top-restaurants>
                <top-restaurants></top-restaurants>
            </div>
        </v-content>
    </v-app>
  </div>
</template>

<script>
import { db } from './database'
import Authentication from './components/Authentication'
import Search from './components/Search'
import TopRestaurants from './components/TopRestaurants'
import AddDish from './components/AddDish'
import DishInfo from './components/DishInfo'
    
export default {
  name: 'app',
  data () {
    return {
        // useful data about the current user
        user: null,
        day: 'Monday',
        dishName: null
    }
  },
    components: {
        Authentication,
        Search,
        AddDish
        DishInfo
        TopRestaurants,
    },
    methods: {
        // allow child component to change user value
        getUser () {
            return this.user
        },
        setUser (user) {
            this.user = user
        },
        viewDish (value) {
            this.dishName = value
            console.log(this.dishName)
        }
    }
}
</script>

<style>
body {
    margin: 0 0;
}    

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
    font-size: 30px;
    font-weight: bold;
    font-family: 'Futura';
    color: white;
}
    
#top-fives {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 2%;
    margin-left: 10%;
    margin-right: 10%;
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
