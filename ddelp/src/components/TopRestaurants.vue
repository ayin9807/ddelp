<template>
<div >
     <v-btn-toggle v-model="toggle_one">
              <v-btn @click="filter('today', 'date')" flat v-model="toggle_one" value="today">
                Today
              </v-btn>
              <v-btn flat value="week">
                This Week
              </v-btn>
              <v-btn flat value="month">
                This Month
              </v-btn>
              <v-btn  flat value="all">
                All Time
              </v-btn>
            </v-btn-toggle>
    <h1 class="list-title">Top 5 Dishes</h1>
    <v-layout>
    <v-card>
    <v-list three-line>
        <template v-for="(key, index) in sortedDishes">
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
            toggle_one: 'today'
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
        },
        
        filter(criteria, cat){
            if(cat == 'date'){
                if(criteria == 'today'){
                    dishesRef.once('value', function (dishesSnapshot) {
                        var dishes = dishesSnapshot.val();
//                        listSnapshot.forEach(function (listSnapshot) {
                            listSnapshot.child('upvotes').forEach(function (upVoteSnapshot) {
                                var upvote = upVoteSnapshot.val();
                                if (card.timestamp != filterDateInput) {
                                    console.log(filterDateInput);
                                    cardSnapshot.ref.update({
                                        'show': false
                                    });
                                }
                                else {
                                    cardSnapshot.ref.update({
                                        'show': true
                                    });
                                }
                            });
//                        });
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