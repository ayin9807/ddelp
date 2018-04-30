<template>
<div>
    {{keyword}}
    <div >
    <v-layout>
    <v-card>
    <v-list three-line>
        <template v-for="key in dishes">
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
            <v-divider v-if="index+1 < dishes.length"></v-divider>
                </div>
        </template>
    </v-list>
    </v-card>
    </v-layout>
</div>
</div>
</template>

<script>
import { dishesRef } from '../database'

    export default {
        data () {
            return {
                dishes: dishesRef
                
            }
        },
        
        props: [
            'keyword'
        ],
        
        methods: {
            
        }
    }
</script>

<style>
    
</style>