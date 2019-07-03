import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  }

firebase.initializeApp(firebaseConfig);

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }

// // child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// // child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// // child_added
// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses')
//   .on('value', (snapshot) => {
//     const expenses = []
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })
//     console.log(expenses)
//   })

// database.ref('expenses').push({
//     description: 'Visa new game',
//     note: 'forddd switch',
//     amount: 5900,
//     createdAt: 98509348503945
// })


// database.ref('notes/-LhuhfXNUxGACMNBupRy').remove()

// database.ref('notes').push({
//     title: 'Course topics',
//     body: 'React Native, Angular, Nginx'
// })

// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val())
// }, (e) => {
//     console.log('Error with data fetching', e)
// })

// setTimeout(() => {
//     database.ref('age').set(28)
// }, 3500)

// setTimeout(() => {
//     database.ref().off(onValueChange)
// }, 7000)

// setTimeout(() => {
//     database.ref('age').set(30)
// }, 10500)

// database.ref()
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val()
//         console.log(val)
//     })
//     .catch((e) => {
//         console.log('Error fetching data', e)
//     })

// database.ref().set({
//     name: 'Arthur Grohe',
//     age: 26,
//     stressLevel: 6,
//     job: {
//         title: 'Software Developer',
//         company: 'greenique'
//     },
//     location: {
//         city: 'Trier',
//         country: 'Germany'
//     },
//     likes: ['Running', 'Video Games', 'Gym', 'Math', 'Software development', 'Game development', ],
// }).then(() => {
//     console.log('Data is saved')
// }).catch((e) => {
//     console.log('This failed.', e)
// })

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle',
// })

// database.ref('isSingle')
//     .remove()
//     .then(() => {
//         console.log('removed')
//     })
//     .catch((e) => {
//         console.log('could not remove data.', e)
//     })
