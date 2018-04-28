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
                    <v-icon @click="vote(key, 1)">keyboard_arrow_up</v-icon>
                    <v-list-tile-action-text>{{ key.numVotes }}</v-list-tile-action-text>
                    <v-icon @click="vote(key, -1)">keyboard_arrow_down</v-icon>
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
        'setDish'
    ], 
    
    methods: {
        updateDish: function(value) {
            this.setDish(value)
        },
        
        vote(dish, amount) {
            // stop propagation
            if (!e) var e = window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
                
            dishesRef.child(dish['.key']).once('value', function(snapshot) {
                var newNumVotes = snapshot.val().numVotes;
                newNumVotes += amount;
                
                var d = new Date();
                
                if (amount > 0) { //upvoting
                    var newUpVotes = snapshot.val().upVotes;
                    if (newUpVotes == null) {
                        newUpVotes = [];
                    }
                    newUpVotes.push(d);
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
                    newDownVotes.push(d);
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
    v-list-tile{
        margin-bottom: 10px
    }
#list-title {
    color: darkgray;
}
    
</style>