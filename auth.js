import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { fetchDataWhere } from "./firestore.js";
import app from "./connect.js"

const auth = getAuth(app);

const getauth = async (req, res) => {
    const user = auth.currentUser;
    const userData = await fetchDataWhere("users", "Email", "==", user.email);
    return res.send({"user": user, "data": userData})
}

const signin = async (req, res) => {
    await signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(() => {
        getauth(req, res)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.send({"code": errorCode, "message": errorMessage})
        console.log({"code": errorCode, "message": errorMessage})
    });
}

const signout = async (req, res) => {
    await signOut(auth)
    res.send(true)
}

export { auth, signin, getauth, signout }