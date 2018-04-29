<template>
<div>
<div id="dish-info">
    <v-card color="blue-grey lighten-3" class="white--text" v-if="dish.images">
        <v-container fluid>
        <v-card-media>
            <v-carousel height="300px">
                <v-carousel-item v-for="i in dish.images" :src="i"></v-carousel-item>
            </v-carousel>
        </v-card-media>
        <v-layout row justify-center>
            <v-card-title>
                <h1>{{ dish.dishName }}</h1>
            </v-card-title>
        </v-layout>
        </v-container>
    </v-card>
    <v-card color="blue-grey lighten-3" class="white--text">
        <v-container fluid>
        <v-layout row justify-center v-if="!dish.images">
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
        <v-card color="blue-grey lighten-4" v-if="dish.comments">
            <v-list two-line>
                <template v-for="c in dish.comments">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img v-if="c.avatar">
                            <img v-else src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=1280">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-sub-title>{{ c.user.name }} &mdash; {{ c.text }}</v-list-tile-sub-title> 
                            <v-list-tile-sub-title>{{ c.date }} </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-card>
        <v-layout row justify-center>
            <v-text-field v-if="user" v-model="commentText" placeholder="Leave a comment..." @keyup.enter="addComment(dish, user)"></v-text-field>
        </v-layout>
        </v-container>
    </v-card>
</div>
<v-btn flat color="orange" @click="exitDishInfo">Exit</v-btn>
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
        'getDish',
        'onClick',
        'user',
        'onVote'
    ],
    
    computed: {
        dish: function () {
            return this.getDish()
        }
    },
    
    firebase: {
        dishes: dishesRef
    },

    methods: {
        exitDishInfo () {
            this.onClick();
        },

        addComment (dish, user) {
            console.log(this.commentText)
            var comment = this.commentText
            dishesRef.child(dish['.key']).once('value', function(snapshot) {
                if (comment != '' || comment != null) {
                    var newComments = snapshot.val().comments
                    if (newComments == null) {
                        var newComments = []
                    }
                    var d = new Date()
                    var date = (d.getMonth() + 1) + '/' + d.getDate()
                    newComments.push({
                        user: user,
                        text: comment,
                        date: date
                    })
                    
                    dishesRef.child(dish['.key']).update({
                        comments: newComments
                    })
                }
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
    #dish-info {
        display: flex;
        flex-direction: row;
    }
</style>
