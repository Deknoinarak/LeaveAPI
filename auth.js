import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { fetchDataWhere } from "./firestore.js";
import app from "./connect.js"

const auth = getAuth(app);

const getauth = async (req, res) => {
    const user = auth.currentUser;
    if (user) {
        const userData = await fetchDataWhere("users", "Email", "==", user.email);
        return res.send({"user": user, "data": userData})
    }
    return res.send({"user": user})
}

const signin = async (req, res) => {
    await signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(() => {
        getauth(req, res)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.status(500).send({"code": errorCode, "message": errorMessage})
        console.log({"code": errorCode, "message": errorMessage})
    });
}

const signout = async (req, res) => {
    await signOut(auth)
    res.send(true)
}

const create = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        res.send(user)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.status(500).send({"code": errorCode, "message": errorMessage})
        console.log({"code": errorCode, "message": errorMessage})
    });
}

const edit = async (req, res) => {
    if (!auth.currentUser) {
        res.status(500).send({"code": "not-auth", "message": "Not login yet"})
        return;
    }

    const editData = {

    }

    if (req.body.displayName) editData["displayName"] = req.body.displayName

    updateProfile(auth.currentUser, editData)
    .then((userCredential) => {
        const user = userCredential.user;
        res.send(user)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.status(500).send({"code": errorCode, "message": errorMessage})
        console.log({"code": errorCode, "message": errorMessage})
    });
}

export { auth, signin, getauth, signout, create, edit }