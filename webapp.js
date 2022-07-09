import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore/lite";
import app from "./connect.js";

const db = getFirestore(app);

export const getUsers = async (req, res) => {

};
