import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export function getFirstNameFromGoogle() {
    var user = firebase.auth().currentUser;
    var names = user.displayName.split(' ')
    return names[0]
}
