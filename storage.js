import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const storage = getStorage();

export const getFiles = (req, res) => {
  const fileRef = ref(storage, req.params.file);

  getDownloadURL(fileRef)
  .then((url) => {
    res.send(url)
  })
  .catch((error) => {
    res.status(500).send(error)
  });
}