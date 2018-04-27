<template>
<div>
    <h1 id="list-title">{{ title }}'s Top 5 Dishes</h1>
    <v-layout row>
    <v-card>
    <v-list three-line>
        <template v-for="(key, value, index) in dishesInfo">
            <v-list-tile ripple @click="updateDish(value)">
                <v-list-tile-content>
                    <v-list-tile-title>{{ value }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ key.location }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-icon @click="upvote">keyboard_arrow_up</v-icon>
                    <v-list-tile-action-text>{{ key.votes }}</v-list-tile-action-text>
                    <v-icon @click="downvote">keyboard_arrow_down</v-icon>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index+1 < Object.keys(dishesInfo).length"></v-divider>
        </template>
    </v-list>
    </v-card>
    </v-layout>
</div>
</template>

<script>
import Firebase from 'firebase'
var content = require('../assets/dishes.json')

export default {
    data () {
        return {
            dishesInfo: content
        }
    },
    
    firebase: {
        
    },
    
    props: [
        'title',
        'setDish'
    ], 
    
    methods: {
        updateDish: function(value) {
            this.setDish(value)
        },
        
        upvote () {
            
        },
        
        downvote () {
            
        }
    }
}
</script>

<style>

#list-title {
    color: darkgray;
}
    
</style>