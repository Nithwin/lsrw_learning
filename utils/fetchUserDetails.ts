import {doc, getDoc} from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

export interface UserDetails{
    batch?:string;
    role:string;
    name:string;
    phone:string;
    regNo?:string;
    email:string;
    section?:string;
    department?:string;
    dob?:string;
}

export const fetchUserDetails = async (uid:string):Promise<UserDetails | null> => {
    try{
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            return docSnap.data() as UserDetails;
        } else{
            console.warn('User document not found.');
            return null;
        }
    } catch(err){
        console.log('Error fetching user details.');
        return null;
    }
}