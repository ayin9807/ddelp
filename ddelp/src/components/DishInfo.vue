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
        <v-layout row justify-center align-center>
            <v-card-text><h3>Location: {{ dish.location }}</h3></v-card-text>
            <v-card-text>
                <v-btn flat @click="vote(dish, 1)"><v-icon>keyboard_arrow_up</v-icon></v-btn>
                <h3>{{ dish.numVotes }}</h3>
                <v-btn flat @click="vote(dish, -1)"><v-icon>keyboard_arrow_down</v-icon></v-btn>
            </v-card-text>
        </v-layout>
        <v-layout row justify-left>
            <h3>Comments from your fellow Duke students:</h3>
        </v-layout>
        
        <v-layout row justify-center>
            <v-text-field v-if="user" v-model="commentText" placeholder="Leave a comment..." @keyup.enter="addComment(dish, user)"></v-text-field>
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
        'user',
        'onVote'
    ],

    methods: {
        exitDishInfo () {
            this.onClick();
        },

        addComment (dish, user) {
            console.log(this.commentText)
            dishesRef.child(dish['.key']).once('value', function(snapshot) {
                console.log(snapshot.val().comments)
            })
            this.commentText = ''
        },
        
        vote (dish, amount) {
            this.onVote(dish, amount)
        }
    }
}
</script>

<style>
    
</style>