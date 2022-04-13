import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export function getFirstNameFromGoogle() {
  const user = firebase.auth().currentUser;
  const names = user.displayName.split(' ');
  return names[0];
}
