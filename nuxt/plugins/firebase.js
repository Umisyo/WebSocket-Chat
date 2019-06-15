import firebase from 'firebase'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyAy5aHxgbHjWdL5rgh19eqHug72rkdu070",
        authDomain: "websocket-chat-b6e30.firebaseapp.com",
        databaseURL: "https://websocket-chat-b6e30.firebaseio.com",
        projectId: "websocket-chat-b6e30",
        storageBucket: "websocket-chat-b6e30.appspot.com",
        messagingSenderId: "988861155983",
        appId: "1:988861155983:web:1b6d3b61f84aa439"
    })
}

export default firebase