// middleware.js
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join(__dirname, '..', 'uploads', 'users', 'avatars');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, AVATAR_PATH);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const uploads = multer({ storage: storage });
const uploadAvatar = uploads.single('avatar');

module.exports = {
    AVATAR_PATH:AVATAR_PATH,
    uploads:uploads,
    uploadAvatar: uploadAvatar
};
