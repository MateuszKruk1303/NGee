import multer from 'multer'

const profilePictureStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/images/ClientUploads/ProfilePictures/')
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1]
    callback(null, `${file.originalname}.${ext}`)
  },
})

const postPictureStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/images/ClientUploads/PostPictures/')
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1]
    callback(null, `${file.originalname}.${ext}`)
  },
})

export const profileMulter = multer({
  storage: profilePictureStorage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith('image')) callback(null, true)
  },
})

export const postMulter = multer({
  storage: postPictureStorage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith('image')) callback(null, true)
  },
})
