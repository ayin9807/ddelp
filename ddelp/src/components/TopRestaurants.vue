<template>
<div>
    <h1 id="list-title">Top 5 Dishes</h1>
    <v-list three-line>
        <template v-for="(key, value, index) in dishes">
            <v-list-tile avatar ripple :key="value">
                <v-list-tile-content>
                    <v-list-tile-title @click="printkey(key)">{{ key.dishName }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ key.location }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-icon>keyboard_arrow_up</v-icon>
                    <v-list-tile-action-text>{{ key.numVotes }}</v-list-tile-action-text>
                    <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
            </v-list-tile>
<!--            <v-divider v-if="index+1 < Object.keys(dishName).length"></v-divider>-->
        </template>
    </v-list>
</div>
</template>

<script>
import Firebase from 'firebase'
import { dishesRef } from '../database'
//var content = require('../assets/dishes.json')

export default {
    data () {
        return {
        }
    }, methods:{
      printkey(key){
          
          console.log(key['.key']);
      }  
    },
    
    firebase: {
        dishes: dishesRef
        
    },
    
    props: [
        'title'
    ]
}
</script>

<style>

#list-title {
    color: darkgray;
}
    
</style>