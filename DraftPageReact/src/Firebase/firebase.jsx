/** This file instantiates the firebase database for the apppication, ensuring that all of the applications files do not each create a firebase instance themselves
 *  After importing into file, use as normal
 * 
 * @Author agoethel
 * 
 * 10/25 file created - agoethel
 */
import * as firebase from 'firebase';
const devConfig = {
};

firebase.initializeApp(devConfig);

export default firebase;