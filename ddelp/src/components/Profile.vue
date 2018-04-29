<template>
<div>
    <v-card width="400px">
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
            <h3 style="color:darkgray;">Dietary Preferences</h3>
        </v-layout>
            <v-checkbox label="Vegetarian" v-model="newLabels" value="Vegetarian"></v-checkbox>
            <v-checkbox label="Vegan" v-model="newLabels" value="Vegan"></v-checkbox>
            <v-checkbox label="Gluten-Free" v-model="newLabels" value="Gluten-Free"></v-checkbox>
            <v-checkbox label="Pescetarian" v-model="newLabels" value="Pescetarian"></v-checkbox>
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
                newLabels: []
            }
        },
        
        props: [
            'user',
            'onClick'
        ],
        
        methods: {
            exitProfile () {
                this.onClick()
            },
            save(user){
                this.uploadAvatar();
                usersRef.child(user.uid).child('prefs').set(
                    this.newLabels
                );
                this.exitProfile();
            }
            
            ,uploadAvatar () {
                var images = document.getElementById('avatar')
                if (images.files.length > 0) {
                    var file = images.files[0]
                    storageRef.child('images/' + file.name).put(file).then(function(snapshot) {
                        usersRef.update({
                            name: this.user.name,
                            URL: snapshot.downloadURL
                        });
                    });
                        document.getElementById('avatar').value = ''
                }
            }
        }
    }
</script>

<style>
    .margin{
        margin: 10px
    }
</style>