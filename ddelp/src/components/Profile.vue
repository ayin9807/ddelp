<template>
<div>
    <v-card width="600px">
        <v-container fluid>
            <v-card-media></v-card-media>
            <v-layout row justify-center align-center>
                <v-card-title>
                    <h1 style="color: darkgray;">{{ user.name }}</h1>
                </v-card-title>
                <v-card-title><span>Email: {{ user.email }}</span></v-card-title>
            </v-layout>
            <v-layout row justify-center>
                <h3 style="color: darkgray;">Want to (re)upload a picture?</h3>
            </v-layout>
            <v-layout row justify-center align-center>
                <input type="file" id="avatar" name="files[]" multiple />
<!--                <v-btn small @click="uploadAvatar">Upload</v-btn>-->
            </v-layout>
            <div class="margin">
            <v-layout row>
            <h3 style="color:darkgray;">Your Dietary Preferences</h3> 
            </v-layout>
                <div v-show="!editPrefs">
                <v-layout row >
                <div v-for="l in user.labels">
                    <p class="space">{{l}}</p>
                </div>
                    
                    </v-layout>
                <v-layout @click="editPreferences()" row><v-btn small>Edit</v-btn></v-layout>
                    </div>
                <div v-show="editPrefs">
            <v-layout row justify-center >
                <v-checkbox label="Vegetarian" v-model="newLabels" value="Vegetarian"></v-checkbox>
                <v-checkbox label="Vegan" v-model="newLabels" value="Vegan"></v-checkbox>
                <v-checkbox label="Gluten-Free" v-model="newLabels" value="Gluten-Free"></v-checkbox>
                <v-checkbox label="Pescetarian" v-model="newLabels" value="Pescetarian"></v-checkbox>
                
            </v-layout>
                <v-layout @click="cancelPreferences()" row><v-btn small>Cancel</v-btn></v-layout>
            </div>
            </div>
        </v-container>
    </v-card>
    <v-btn @click="save(user)">Save</v-btn>
    <v-btn @click="exitProfile">Exit</v-btn>
</div>
</template>


<script>
import Firebase from 'firebase'
import { dishesRef, storageRef, usersRef } from '../database'   
    export default {
        data () {
            return {
                newLabels: [],
                editPrefs: false
            }
        },
        
        props: [
            'user',
            'onClick',
            'setUser'
        ],
        
        firebase: {
            users: usersRef  
        },
        
        methods: {
            exitProfile () {
                this.onClick()
            },
            editPreferences(){
                this.editPrefs = true;
            }
            ,cancelPreferences(){
                this.editPrefs=false;
            }
            
            ,save(user){
                this.uploadAvatar();
                usersRef.child(user.uid).child('prefs').set(
                    this.newLabels
                );
                
                var url = null;
                for (var i=0; i < this.users.length; i++) {
                    if (user.uid == this.users[i]['.key']) {
                        if (this.users[i].avatar) url = this.users[i].avatar
                    }
                }
                
                this.setUser({
                    name: this.user.name,
                    email: this.user.email,
                    uid: this.user.uid,
                    isAnonymous: this.user.isAnonymous,
                    labels: this.newLabels
                })
                
                this.exitProfile();
            },
            
            uploadAvatar () {
                var images = document.getElementById('avatar')
                if (images.files.length > 0) {
                    var file = images.files[0]
                    var userID = this.user.uid
                    storageRef.child('images/' + file.name).put(file).then(function(snapshot) {
                        usersRef.child(userID).update({
                            avatar: snapshot.downloadURL
                        });
                    });
                    document.getElementById('avatar').value = ''
                }
            }
        }
    }
</script>

<style>
    .space{
        margin-left:10px
    }
    .margin{
        margin: 10px
    }
</style>