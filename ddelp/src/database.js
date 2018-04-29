// use Firebase as our database
import Firebase from 'firebase'
    // configure and connect to database
    // Initialize Firebase
var config = {
    apiKey: "AIzaSyCnFqiv163m4sIyr8YpLOGdEjAnzPxYhR4"
    , authDomain: "ddelp-79d8e.firebaseapp.com"
    , databaseURL: "https://ddelp-79d8e.firebaseio.com"
    , projectId: "ddelp-79d8e"
    , storageBucket: "ddelp-79d8e.appspot.com"
    , messagingSenderId: "1082747031601"
};
var fbApp = Firebase.initializeApp(config)
    // global reference to remote database app
export const db = fbApp.database()
    // create useful endpoints within the database
export const dishesRef = db.ref('dishes')
export const dishesAddedRef = db.ref('dishes').orderByKey().limitToLast(5)
export const usersRef = db.ref('users')
export const storageRef = fbApp.storage().ref()