<template>
<div>
    <div id="add-dish">
    <v-card width="600px">
        <v-container fluid>
        <v-card-title><h1 style="color: darkgray;">Add Dish</h1></v-card-title>
        <v-layout row justify-center>
            <v-text-field id="cardTitle" v-model="newDishName" placeholder="Dish Name"></v-text-field>
        </v-layout>
        <v-layout row justify-center>
            <v-text-field id="cardTitle" v-model="newDishLocation" placeholder="Location"></v-text-field>
        </v-layout>
        <v-layout row>
            <h3 style="color:darkgray;">When is this dish available?</h3>
        </v-layout>
        <v-layout row justify-center>
            <v-checkbox label="Mon" v-model="newDishAvailability" value="Mon"></v-checkbox>
            <v-checkbox label="Tue" v-model="newDishAvailability" value="Tue"></v-checkbox>
            <v-checkbox label="Wed" v-model="newDishAvailability" value="Wed"></v-checkbox>
            <v-checkbox label="Thur" v-model="newDishAvailability" value="Thur"></v-checkbox>
            <v-checkbox label="Fri" v-model="newDishAvailability" value="Fri"></v-checkbox>
            <v-checkbox label="Sat" v-model="newDishAvailability" value="Sat"></v-checkbox>
            <v-checkbox label="Sun" v-model="newDishAvailability" value="Sun"></v-checkbox>
        </v-layout>
        <v-layout row>
            <h3 style="color:darkgray;">Is this dish...</h3>
        </v-layout>
        <v-layout row justify-center>
            <v-checkbox label="Vegetarian" v-model="newLabels" value="Vegetarian"></v-checkbox>
            <v-checkbox label="Vegan" v-model="newLabels" value="Vegan"></v-checkbox>
            <v-checkbox label="Gluten-Free" v-model="newLabels" value="Gluten-Free"></v-checkbox>
            <v-checkbox label="Pescetarian" v-model="newLabels" value="Pescetarian"></v-checkbox>
        </v-layout>
        <v-layout row>
            <h3 style="color:darkgray;">Have pictures?</h3>
        </v-layout>
        <v-layout row>
            <input type="file" id="dish-files" name="files[]" multiple />
        </v-layout>
        <v-layout row justify-center>
               <v-btn flat value="Add Card" @click="addDish">Add Dish</v-btn>
               <v-btn flat value="Cancel" @click="resetAddDish">Cancel</v-btn>
        </v-layout>
        </v-container>
    </v-card>
    </div>
</div>
</template>

<script>
import Firebase from 'firebase'
import { dishesRef, storageRef } from '../database'

export default {
    data () {
        return {
            newDishName: '',
            newDishLocation: '',
            newDishUpVotes: [],
            newDishDownVotes: [],
            newDishComments: [],
            newDishAvailability: [],
            newShow: true,
            newLabels: []
        }
    },
    methods: {
        getURLPromise (f) {
            return storageRef.child('images/' + f.name).put(f).then(function(snapshot) {
                return snapshot.downloadURL;  
            });
        }, 
        
        addDish () {
            var images = document.getElementById('dish-files');
            var name = this.newDishName;
            var location = this.newDishLocation;
            var upvotes = this.newDishUpVotes;
            var downvotes = this.newDishDownVotes;
            var comments = this.newDishComments;
            var availability = this.newDishAvailability;
            var labels = this.newLabels;
            var show = this.newShow;
            
            if (images.files.length > 0) {
                var file = images.files
                var allURLs = []
                for (var i = 0; i < file.length; i++) {
                    allURLs.push(this.getURLPromise(file[i]));
                }

                Promise.all(allURLs).then(function(results) {
                    dishesRef.push({
                        dishName: name,
                        location: location,
                        upVotes: upvotes,
                        downVotes: downvotes,
                        numVotes: 0,
                        comments: comments,
                        availability: availability,
                        images: results,
                        labels: labels,
                        visible: show
                    });
                })
            } else {
                dishesRef.push({
                    dishName: name,
                    location: location,
                    upVotes: upvotes,
                    downVotes: downvotes,
                    numVotes: 0,
                    comments: comments,
                    availability: availability,
                    labels: labels,
                    visible: show
                });
            }
            
            this.resetAddDish();
        }, 
        
        resetAddDish(){
            this.newDishName = '';
            this.newDishLocation='';
            this.newDishVotes=[];
            this.newDishComments=[];
            this.newDishDaysOfTheWeek = [];
            this.onClick();
            this.newDateAdded = '';
            this.newLabels = [];
        },
        
        
    },
    
    firebase: {
        
    },
    
    props: [
        'title',
        'onClick'
    ]
}
</script>

<style>

#add-dish {
    color: darkgray;
}
    
</style>