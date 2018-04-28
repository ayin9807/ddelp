<template>
<div>
    <v-card color="blue-grey lighten-3" class="white--text">
        <v-container fluid>
        <v-layout row justify-center>
            <v-card-media></v-card-media>
        </v-layout>
        <v-layout row justify-center>
            <v-card-title>
                <h1>{{ dish.dishName }}</h1>
            </v-card-title>
        </v-layout>
        <v-layout row justify-center>
            <v-card-text><h3>Location: {{ dish.location }}</h3></v-card-text>
            <v-card-text><h3>{{ dish.numVotes }} votes so far</h3></v-card-text>
        </v-layout>
        <v-layout row justify-left>
            <h3>Comments from your fellow Duke students:</h3>
        </v-layout>
        
        <v-layout row justify-center>
            <v-text-field v-model="commentText" placeholder="Leave a comment"></v-text-field>
        </v-layout>
        </v-container>
    </v-card>
    <v-btn flat @click="exitDishInfo">Exit</v-btn>
</div>    
</template>

<script>
import Firebase from 'firebase'
import { dishesRef, storageRef } from '../database'
    
export default {
    data () {
        return {
            commentText: ''
        }
    },

    props: [
        'dish',
        'onClick',
        'user'
    ],

    methods: {
        exitDishInfo () {
            this.onClick();
        },

        addComment () {
            
        }
    }
}
</script>

<style>
    
</style>