<template>
  <div id="app">
    <v-app>
        <v-content>
            <v-toolbar color="teal lighten-3">
                <h1>DDelp</h1>
                <v-spacer></v-spacer>
                <search></search>
                <v-spacer></v-spacer>
                <v-btn @click="isAddingDish = true"><a><span class="glyphicon"></span>Add Dish</a></v-btn>
                <v-spacer></v-spacer>
                <authentication class="z nav navbar-nav navbar-right"
                    :getUser="getUser"
                    :setUser="setUser">
                </authentication>
            </v-toolbar>
            <div id="main-page">
                <top-restaurants :onVote="vote" :title="day" :setDish="viewDish" v-if="displayHome"></top-restaurants>
                <recent-dishes :onVote="vote" :title="day" :setDish="viewDish" v-if="displayHome"></recent-dishes>  
                <add-dish v-if="isAddingDish" :onClick="exitAddForm"></add-dish>
                <dish-info v-if="dishDict" :dish="dishDict" :user="user" :onClick="exitDishInfo" :onVote="vote"></dish-info>
            </div>
        </v-content>
    </v-app>
  </div>
</template>

<script>
import Firebase from 'firebase'
import { dishesRef } from './database'
import { db } from './database'
import Authentication from './components/Authentication'
import Search from './components/Search'
import TopRestaurants from './components/TopRestaurants'
import RecentDishes from './components/MostRecent'
import AddDish from './components/AddDish'
import DishInfo from './components/DishInfo'
    
export default {
    name: 'app',
    data () {
        return {
            // useful data about the current user
            user: null,
            day: 'Monday',
            dishDict: null,     // is not null if someone clicks on a dish card
            isAddingDish: false     // is true if someone clicks on add dish
        }
    },
    
    computed: {
        displayHome: function () {
            return (!this.dishDict) && (!this.isAddingDish)
        }
    },
    
    components: {
        Authentication,
        Search,
        AddDish,
        DishInfo,
        TopRestaurants,
        RecentDishes
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
            this.dishDict = value
        },
        
        exitAddForm () {
            this.isAddingDish = false
        },
        
        exitDishInfo () {
            this.dishDict = null
        },
        
        vote (dish, amount) {
            dishesRef.child(dish['.key']).once('value', function(snapshot) {
                var newNumVotes = snapshot.val().numVotes;
                newNumVotes += amount;
                
                var d = new Date();
                var date = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
                
                if (amount > 0) { //upvoting
                    var newUpVotes = snapshot.val().upVotes;
                    if (newUpVotes == null) {
                        newUpVotes = [];
                    }
                    newUpVotes.push(date);
                    dishesRef.child(dish['.key']).update({
                        numVotes : newNumVotes,
                        upVotes: newUpVotes
                    });
                }
                
                if (amount < 0) { //downvoting
                    var newDownVotes = snapshot.val().downVotes;
                    if (newDownVotes == null) {
                        newDownVotes = [];
                    }
                    newDownVotes.push(date);
                    dishesRef.child(dish['.key']).update({
                        numVotes : newNumVotes,
                        downVotes: newDownVotes
                    });
                }
                
            });
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
    
#main-page {
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
