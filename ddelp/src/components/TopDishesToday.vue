<template>
<div >
     <h1 class="list-title">Top Dishes Today</h1>
    <v-layout>
    <v-card>
    <v-list three-line>
        <template v-for="(key, index) in sortedDishes">
            <div v-show="key.visible">
            <v-list-tile avatar ripple :key="index" @click="updateDish(key)" >
                <v-list-tile-content>
                    <v-list-tile-title @click="showDish(key)">{{ key.dishName }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ key.location }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn flat icon @click.stop="vote(key, 1)"><v-icon>keyboard_arrow_up</v-icon></v-btn>
                    <v-list-tile-action-text>{{ key.numVotesToday }}</v-list-tile-action-text>
                    <v-btn flat icon @click.stop="vote(key, -1)"><v-icon>keyboard_arrow_down</v-icon></v-btn>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index+1 < dishes.length"></v-divider>
                </div>
        </template>
    </v-list>
    </v-card>
    </v-layout>
</div>
</template>

<script>
import Firebase from 'firebase'
import { dishesRef } from '../database'
import { dishesAddedRef } from '../database'

export default {
    data () {
        return {
            toggle_one: 'all'
        }
    }, 
    
    firebase: {
        dishes: dishesRef
    }
    , computed: {
        sortedDishes() {
            return this.dishes.sort((a, b) => {
                return b.numVotes - a.numVotes;
            });
        }
    }
    , props: [
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
        , showDish (dish) {
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
                return false;
            } else{ 
                var upVotesToday = 0;
                if(dish.upVotes != null){
                    for(var i = 0; i < dish.upVotes.length; i++){
                        if(dish.upVotes[i] == date){
                         upVotesToday += 1;
                        }
                    }
                }
                var downVotesToday = 0;
                if(dish.downVotes != null){
                    for(var i = 0; i < dish.downVotes.length; i++){
                        if(dish.downVotes[i] == date){
                         downVotesToday += 1;
                        }
                    }
                }
                var totalToday = upVotesToday - downVotesToday;
                // var dishKey = dish.child('key');
                // console.log(dish);
                dishesRef.child(dish['.key']).update({numVotesToday: totalToday})
                return true;
            }
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