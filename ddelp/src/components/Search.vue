<template>
<div>
    <h1 class="list-title">Search Results</h1>
    <v-card>
    <v-list three-line>
        <template v-for="(key, index) in dishes">
            <v-list-tile avatar ripple :key="index" @click="updateDish(key)" v-if="showDish(key)">
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
            <v-divider v-if="index+1 < dishes.length"></v-divider>
        </template>
    </v-list>
    </v-card>
    <h3>Don't see what you're looking for? Add the dish!</h3>
    <v-btn  @click="exitSearch">Exit</v-btn>
</div>
</div>
</template>

<script>
import Firebase from 'firebase'
import { dishesRef, usersRef } from '../database'

    export default {
        data () {
            return {
                dishes: dishesRef
                
            }
        },
        
        props: [
            'keyword',
            'setDish',
            'onVote',
            'exit',
            'user'
        ],

        firebase: {
            users: usersRef,
            dishes: dishesRef
        },
        
        methods: {
            updateDish (value) {
                this.setDish(value)
                // also need to exit search
            },

            vote(dish, amount) {
                this.onVote(dish, amount)
            },

            showDish (dish) {
                var keywords = this.keyword.toLowerCase().split(/[ -]+/)
                var name = dish.dishName.toLowerCase().split(/[ -]+/)
                return keywords.some(r=> name.indexOf(r) >= 0)
            },

            exitSearch () {
                this.exit()
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

<style>
    
</style>