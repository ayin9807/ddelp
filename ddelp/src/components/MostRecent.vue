<template>
<div >
    <h1 class="list-title">Most Recently Added</h1>
    <v-layout>
    <v-card>
    <v-list three-line>
        <template v-for="(key, index) in dishesAdded">
            <div>
            <v-list-tile avatar ripple :key="index" @click="updateDish(key)">
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
import { dishesRef } from '../database'
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
        dishesAdded: dishesAddedRef
    },
    props: [
        'setDish',
        'onVote'
    ], 
    
    methods: {
        updateDish: function(value) {
            this.setDish(value)
        },
        vote(dish, amount) {            
            this.onVote(dish, amount)
        },
        
        filter(criteria, cat){
            if(cat == 'date'){
                if(criteria == 'today'){
                    dishesRef.once('value', function (dishesSnapshot) {
                        var dishes = dishesSnapshot.val();
                        dishesSnapshot.forEach(function (dishesSnapshot) {
                            dishesSnapshot.ref.update({
                                        'visible': false
                                });
                            dishesSnapshot.child('upVotes').forEach(function (upVoteSnapshot) {
                                
                                var d = new Date();
                                var today = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
                                var upvoteDate = upVoteSnapshot.val();
                                if (today == upvoteDate) {
                                    dishesSnapshot.ref.update({
                                        'visible': true
                                    });
                                }
                            });
                        });
                    });
                } else if(criteria == 'week'){
                    dishesRef.once('value', function (dishesSnapshot) {
                        var dishes = dishesSnapshot.val();
                        dishesSnapshot.forEach(function (dishesSnapshot) {
                            dishesSnapshot.ref.update({
                                        'visible': false
                                });
                            dishesSnapshot.child('upVotes').forEach(function (upVoteSnapshot) {
                                
                                var d = new Date();
                                var today = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
                                var upvoteDate = upVoteSnapshot.val();
                                if (today.split("/")[0] == upvoteDate.split("/")[0]) { //check month
                                    if(today.split("/")[1] - 7 <= upvoteDate.split("/")[1] <= today.split("/")[1] + 7)
                                    dishesSnapshot.ref.update({
                                        'visible': true
                                    });
                                }
                            });
                        });
                    });
                } else if(criteria == 'month'){
                    dishesRef.once('value', function (dishesSnapshot) {
                        var dishes = dishesSnapshot.val();
                        dishesSnapshot.forEach(function (dishesSnapshot) {
                            dishesSnapshot.ref.update({
                                        'visible': false
                                });
                            dishesSnapshot.child('upVotes').forEach(function (upVoteSnapshot) {
                                
                                var d = new Date();
                                var today = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
                                var upvoteDate = upVoteSnapshot.val();
                                if (today.split("/")[0] == upvoteDate.split("/")[0]) {
                                    dishesSnapshot.ref.update({
                                        'visible': true
                                    });
                                }
                            });
                        });
                    });
                } else if(criteria == 'all'){
                    dishesRef.once('value', function (dishesSnapshot) {
                        var dishes = dishesSnapshot.val();
                        dishesSnapshot.forEach(function (dishesSnapshot) {
                            dishesSnapshot.ref.update({
                                        'visible': true
                                });
                        });
                    });
                }
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