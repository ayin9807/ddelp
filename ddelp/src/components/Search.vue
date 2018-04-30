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
    <v-btn  @click="exitDishInfo">Exit</v-btn>
</div>
</template>

<script>
import Firebase from 'firebase'
import { dishesRef, usersRef } from '../database'

    export default {
        data () {
            return {
                
            }
        },
        
        props: [
            'keyword',
            'setDish',
            'onVote'
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
            }
            
        }
    }
</script>

<style>
    
</style>