import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import app from "./connect.js"

const db = getFirestore(app);

async function fetchData(e) {
    const collectionCol = collection(db, e);
    const collectionSnapshot = await getDocs(collectionCol);
    const collectionList = collectionSnapshot.docs.map(doc => doc.data());
    return collectionList;
}

export { db, fetchData }