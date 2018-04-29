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
                <h3 style="color: darkgray;">Wanna (re)upload a picture?</h3>
            </v-layout>
            <v-layout row justify-center align-center>
                <input type="file" id="avatar" name="files[]" multiple />
                <v-btn flat @click="uploadAvatar">Upload</v-btn>
            </v-layout>
        </v-container>
    </v-card>
    <v-btn flat color="orange" @click="exitProfile">Exit</v-btn>
</div>
</template>

<script>
import Firebase from 'firebase'
import { dishesRef, storageRef, usersRef } from '../database'   
    export default {
        data () {
            return {
                
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
            
            uploadAvatar () {
                var images = document.getElementById('avatar')
                if (images.files.length > 0) {
                    var file = images.files[0]
                    storageRef.child('images/' + file.name).put(file).then(function(snapshot) {
                        usersRef.update({
                            name: this.user.id,
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
    
</style>