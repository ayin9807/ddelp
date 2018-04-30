<template>
<div >
    <h1 class="list-title">5 Most Recently Added</h1>
    <v-layout>
    <v-card>
    <v-list three-line>
        <template v-for="(key, index) in dishesAdded">
            <div>
            <v-list-tile avatar ripple :key="index" @click="updateDish(key)">
                <v-list-tile-content>
                    <v-list-tile-title>{{ key.dishName }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ key.location }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title v-if="showPrefs(key)">
                    <v-layout row>
                        <div style="color: limegreen; height: 21px; margin-right: 4px;" v-for="p in showPrefs(key)">{{ p }}</div>
                    </v-layout>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn flat icon @click.stop="vote(key, 1)"><v-icon>keyboard_arrow_up</v-icon></v-btn>
                    <v-list-tile-action-text>{{ key.numVotes }}</v-list-tile-action-text>
                    <v-btn flat icon @click.stop="vote(key, -1)"><v-icon>keyboard_arrow_down</v-icon></v-btn>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index+1 < dishesAdded.length"></v-divider>
                </div>
        </template>
    </v-list>
    </v-card>
    </v-layout>
</div>
</template>

<script>
import Firebase from 'firebase'
import { dishesRef, usersRef } from '../database'
import { dishesAddedRef } from '../database'

 

export default {
    data () {
        return {
            toggle_one: 'all',
            sorted: false
        }
    },
    firebase: {
        dishes: dishesRef,
        dishesAdded: dishesAddedRef,
        users: usersRef
    },
    props: [
        'setDish',
        'onVote',
        'user'
    ], 
    
    methods: {
        updateDish: function(value) {
            this.setDish(value)
        },
        vote(dish, amount) {            
            this.onVote(dish, amount)
        },
        
        showPrefs (dish) {
            if (this.user == null || dish.labels == null) {
                return false
            }

            var labels = []
            var userPrefs = null
            for (var i=0; i < this.users.length; i++) {
                if (this.user.uid == this.users[i]['.key']) {
                    userPrefs = this.users[i].prefs
                }
            }

            if (userPrefs == null) {
                return false
            }

            for (var i=0; i < dish.labels.length; i++) {
                if (userPrefs.indexOf(dish.labels[i]) > -1) {
                    labels.push(dish.labels[i])
                }
            }
    
            if (labels.length > 0) {
                return labels
            }
            return false 
        }  
    }
}
</script>

<style >
    v-list-tile{
        margin-bottom: 10px
    }
.list-title {
    color: darkgray;
}
    
</style>