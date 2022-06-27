import { async } from "@firebase/util";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import app from "./connect.js"

const auth = getAuth(app);

const stateChanged = (req, res) => {
    onAuthStateChanged(auth, (user) => {
        return res.send(user)
    })
}

const signin = (req, res) => {
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(() => {
        onAuthStateChanged(auth, (user) => {
            return res.send(user)
        })
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
}

export { auth, signin, stateChanged, signout }