<template>
<div>
    <div class="add-item">
        <form @submit.prevent="addDish()">
            <v-layout row>
                <label for="cardTitle">Dish Name: </label>
                <input class="input-margin" type="text" id="cardTitle" v-model="newDishName" /> 
            </v-layout>
            <v-layout row>
                <label for="cardTitle">Dish Location: </label>
                <input class="input-margin" type="text" id="cardTitle" v-model="newDishLocation" /> 
            </v-layout>
            <v-layout row>
                   <v-btn type="submit" value="Add Card" @click="addDish">Add Dish</v-btn>
                   <v-btn type="reset" value="Cancel" @click="resetAddDish">Cancel</v-btn>
            </v-layout>
        </form>
    </div>
</div>
</template>

<script>
import Firebase from 'firebase'
import { dishesRef } from '../database'

export default {
    data () {
        return {
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
        }, 
        
        resetAddDish(){
            this.isAddingDish = false;
            this.newDishName = '';
            this.newDishLocation='';
            this.newDishVotes=[];
            this.newDishComments=[];
            this.onClick(false);
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

#list-title {
    color: darkgray;
}
    
</style>