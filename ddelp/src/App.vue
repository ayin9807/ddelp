<template>
  <div id="app">
    <v-app>
        <v-content>
            <v-toolbar color="teal lighten-3">
                <h1>DDelp</h1>
                <v-btn v-if="user" @click="isAddingDish = true"><a><span class="glyphicon"></span>Add Dish</a></v-btn>
                <v-text-field prepend-icon="search" placeholder="Search for existing dishes... Press enter to see results" v-model="searchWord" @keyup.enter="searchingDishes"></v-text-field>
                <authentication class="z nav navbar-nav navbar-right"
                    :getUser="getUser"
                    :setUser="setUser"
                    :viewProfile="viewProfile"
                    :show="showPopup">
                </authentication>
            </v-toolbar>
            <div id="main-page">
                <top-dishes-today :onVote="vote" :setDish="viewDish" v-if="displayHome"></top-dishes-today>
                <top-restaurants :onVote="vote" :setDish="viewDish" v-if="displayHome"></top-restaurants>
                <recent-dishes :onVote="vote" :setDish="viewDish" v-if="displayHome"></recent-dishes>  
                <add-dish v-if="isAddingDish" :onClick="exitAddForm"></add-dish>
                <search v-if="showResults" :keyword="searchWord" :setDish="viewDish" :onVote="vote" :exit="exitSearch"></search>
                <dish-info v-if="dishDict" :getDish="getDish" :getUser="getUser" :onClick="exitDishInfo" :onVote="vote" :admin="admin" :delete="deleteDish"></dish-info>
                <profile v-if="viewingProfile" :user="user" :onClick="exitProfile" :setUser="setUser"></profile>
            </div>
        </v-content>
    </v-app>
  </div>
</template>

<script>
import Firebase from 'firebase'
import { dishesRef, usersRef } from './database'
import { db } from './database'
import Authentication from './components/Authentication'
import Search from './components/Search'
import TopRestaurants from './components/TopRestaurants'
import RecentDishes from './components/MostRecent'
import AddDish from './components/AddDish'
import DishInfo from './components/DishInfo'
import Profile from './components/Profile'
import TopDishesToday from './components/TopDishesToday'
    
export default {
    name: 'app',
    data () {
        return {
            // useful data about the current user
            user: null,
            dishDict: null,     // is not null if someone clicks on a dish card
            isAddingDish: false,     // is true if someone clicks on add dish
            viewingProfile: false,
            searchWord: null,
            showResults: false,
            loggingIn: false
        }
    },
    
    computed: {
        displayHome: function () {
            return (!this.dishDict) && (!this.isAddingDish) && (!this.viewingProfile) && (!this.showResults) && (!this.loggingIn)
        },
        admin: function () {
            if (this.user) {
                for (var i=0; i < this.users.length; i++) {
                    if (this.user.uid == this.users[i]['.key']) {
                        return this.users[i].isAdmin
                    }
                }
                // this.admin = this.users.child(this.user.uid).isAdmin
            }
            return false
        }
    },
    
    firebase: {
        users: usersRef,
        dishes: dishesRef
    },
    
    components: {
        Authentication,
        Search,
        AddDish,
        DishInfo,
        TopRestaurants,
        RecentDishes,
        Profile,
        TopDishesToday
    },
    
    methods: {
        // allow child component to change user value
        getUser () {
            return this.user
        },
        setUser (user) {
            this.user = user
            this.loggingIn = false
        },
        viewDish (value) {
            this.dishDict = value
        },
        
        exitAddForm () {
            this.isAddingDish = false
        },
        
        getDish () {
            for (var i=0; i < this.dishes.length; i++) {
                if (this.dishDict['.key'] == this.dishes[i]['.key']) {
                    return this.dishes[i]
                }
            }
            return this.dishDict  
        },
        
        exitDishInfo () {
            this.dishDict = null
        },

        exitSearch() {
            this.showResults = false
            this.searchWord = null
        },
        
        viewProfile () {
            this.viewingProfile = true  
        },
        
        exitProfile() {
            this.viewingProfile = false
        },

        showPopup () {
            this.loggingIn = true
        },
        
        vote (dish, amount) {
            var d = new Date();
            var date = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
            dishesRef.child(dish['.key']).once('value', function(snapshot) {
                var newNumVotes = snapshot.val().numVotes;
                newNumVotes += amount;
                
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
            
            var d = new Date();
            var date = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
            //check if last vote was from today
            var lastVote = null;
            if(dish.upVotes!=null){
                lastVote = dish.upVotes[dish.upVotes.length-1];
            }
            if(dish.downVotes!=null && dish.downVotes[dish.upVotes.length-1] > lastVote){
                lastVote = dish.downVotes[dish.upVotes.length-1];
            }
            if(lastVote != date){ 
                dishesRef.child(dish['.key']).once('value', function(snapshot) {
                var newNumVotesToday = snapshot.val().numVotesToday;
                if(amount > 0) {
                    dishesRef.child(dish['.key']).update({
                        numVotesToday : 1
                    });
                } else{
                    dishesRef.child(dish['.key']).update({
                        numVotesToday : -1
                    });
                }
                
                
                });
            } else {
                dishesRef.child(dish['.key']).once('value', function(snapshot) {
                var newNumVotesToday = snapshot.val().numVotesToday;
                newNumVotesToday += amount;
                dishesRef.child(dish['.key']).update({
                        numVotesToday : newNumVotesToday
                    });
                
                });
            }
        },
        
        deleteDish () {
            dishesRef.child(this.dishDict['.key']).remove()
            this.exitDishInfo()
        },
        
        searchingDishes () {
            console.log(this.searchWord)
            this.showResults = true
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
    align-items: center;
    margin-top: 2%;
    margin-left: 5%;
    margin-right: 5%;
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
