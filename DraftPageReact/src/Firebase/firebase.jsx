/** This file instantiates the firebase database for the apppication, ensuring that all of the applications files do not each create a firebase instance themselves
 *  After importing into file, use as normal
 * 
 * @Author agoethel
 * 
 * 10/25 file created - agoethel
 */
import * as firebase from 'firebase';
const devConfig = {
    apiKey: "AIzaSyDLDVDb3Jx0abcKXNXYXMOfYXOf0Kdw6zM",
    authDomain: "fifa-dream-team.firebaseapp.com",
    databaseURL: "https://fifa-dream-team.firebaseio.com",
    projectId: "fifa-dream-team",
    storageBucket: "fifa-dream-team.appspot.com",
    messagingSenderId: "121726490175",
    appId: "1:121726490175:web:a5872b9806b4f39a930a8a",
    measurementId: "G-QF1W7C66XP"
};
firebase.initializeApp(devConfig);

export default firebase;