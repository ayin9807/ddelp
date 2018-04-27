<template>
<div>
    <div></div>
    <div class="add-item">
         <form v-if="isAddingDish" @submit.prevent="addDish()">
            <v-layout row>
               <label for="cardTitle">Dish Name: </label>
                <input class="input-margin" type="text" v-model="newDishName" /> </v-layout>
             <v-layout row>
               <label for="cardTitle">Dish Location: </label>
                <input class="input-margin" type="text" v-model="newDishLocation" /> </v-layout>
                <v-layout row>
                   <v-btn type="submit" value="Add Dish">Add Dish</v-btn>
                   <v-btn type="reset" value="Cancel" @click="resetAddDish()">Cancel</v-btn>
                </v-layout>
         </form>
                <v-btn v-else @click="isAddingDish = true">Add Dish</v-btn>
                </div>
</div>
</template>

<script>
import Firebase from 'firebase'
import { dishesRef } from '../database'

export default {
    data () {
        return {
            isAddingDish: false,
            newDishName: '',
            newDishLocation:'',
            newDishUpVotes:[],
            newDishDownVotes:[],
            newDishComments:[]
            
            
        }
    },
    methods:{
        addDish(){
            dishesRef.push({
                dishName: this.newDishName,
                location: this.newDishLocation,
                upVotes: this.newDishUpVotes,
                downVotes: this.newDishDownVotes,
                numVotes: 0,
                comments: this.newDishComments
            
            });
            this.resetAddDish();
        }, resetAddDish(){
            this.isAddingDish = false;
            this.newDishName = '';
            this.newDishLocation='';
            this.newDishVotes=[];
            this.newDishComments=[];
        }
    },
    
    firebase: {
        
    },
    
    props: [
        'title'
    ]
}
</script>

<style>

#list-title {
    color: darkgray;
}
    
</style>