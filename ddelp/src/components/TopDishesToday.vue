<template>
<div >
     <h1 class="list-title">Top Dishes Today</h1>
    <v-layout>
    <v-card>
    <v-list three-line>
        <template v-for="(key, index) in sortedDishes">
            <div v-show="key.visible">
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
        ,showDish (dish) {
                var keywords = this.keyword.toLowerCase().split(/[ -]+/)
                var name = dish.dishName.toLowerCase().split(/[ -]+/)
                return keywords.some(r=> name.indexOf(r) >= 0)
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