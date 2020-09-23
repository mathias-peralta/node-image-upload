const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const uuid = require('uuid')

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

//settigs
app.set('port', 4001);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

//middlegare

app.use(multer({
    storage: storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb ) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const minetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if( minetype && extname) {
            return cb(null, true)
        }
        cb("Error: debe ser una imagen");   
    }
}).single('image'));

//routes

app.use(require('./routes/IndexRouter'))

//star the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})