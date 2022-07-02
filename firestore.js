import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore/lite';
import app from "./connect.js"

const db = getFirestore(app);

async function fetchData(e) {
    const collectionCol = collection(db, e);
    const collectionSnapshot = await getDocs(collectionCol);
    const collectionList = collectionSnapshot.docs.map(doc => doc.data());
    return collectionList;
}

async function fetchDataWhere(e, x, z, y) {
    const collectionCol = query(collection(db, e), where(x, z, y));
    const collectionSnapshot = await getDocs(collectionCol);
    const collectionList = collectionSnapshot.docs.map(doc => doc.data());
    return collectionList;
}

async function fetchDataDoc(e, d) {
    const collectionCol = doc(db, e, d);
    const collectionSnapshot = await getDoc(collectionCol);
    const collectionList = collectionSnapshot.data();
    return collectionList;
}

export { db, fetchData, fetchDataWhere, fetchDataDoc }