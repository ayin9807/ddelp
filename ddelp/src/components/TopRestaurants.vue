<template>
<div>
    <h1 id="list-title">Top 5 Dishes</h1>
    <v-layout>
    <v-card>
    <v-list three-line>
        <template v-for="(key, index) in dishes">
            <v-list-tile avatar ripple :key="index" @click="updateDish(key)">
                <v-list-tile-content>
                    <v-list-tile-title>{{ key.dishName }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ key.location }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn flat @click.stop="vote(key, 1)"><v-icon>keyboard_arrow_up</v-icon></v-btn>
                    <v-list-tile-action-text>{{ key.numVotes }}</v-list-tile-action-text>
                    <v-btn flat @click.stop="vote(key, -1)"><v-icon>keyboard_arrow_down</v-icon></v-btn>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index+1 < dishes.length"></v-divider>
        </template>
    </v-list>
    </v-card>
    </v-layout>
</div>
</template>

<script>
import Firebase from 'firebase'
import { dishesRef } from '../database'

export default {
    data () {
        return {
            
        }
    }, 
    
    firebase: {
        dishes: dishesRef  
    },
    
    props: [
        'title',
        'setDish',
        'onVote'
    ], 
    
    methods: {
        updateDish: function(value) {
            this.setDish(value)
        },
        
        vote(dish, amount) {            
            this.onVote(dish, amount)
        }
    }
}
</script>

<style>
    v-list-tile{
        margin-bottom: 10px
    }
#list-title {
    color: darkgray;
}
    
</style>