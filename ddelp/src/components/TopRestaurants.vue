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
                    <v-icon @click="vote(key, 1)">keyboard_arrow_up</v-icon>
                    <v-list-tile-action-text>{{ key.numVotes }}</v-list-tile-action-text>
                    <v-icon @click="vote(key, -1)">keyboard_arrow_down</v-icon>
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

export default {
    data () {
        return {
        }
    }, methods:{
        vote(dish, amount){
            dishesRef.child(dish['.key']).once('value', function(snapshot) {
                var newNumVotes = snapshot.val().numVotes;
                newNumVotes += amount;
                dishesRef.child(dish['.key']).update({
                    numVotes : newNumVotes
                });
            });
     }
      ,printkey(key){
          
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
    v-list-tile{
        margin-bottom: 10px
    }
#list-title {
    color: darkgray;
}
    
</style>