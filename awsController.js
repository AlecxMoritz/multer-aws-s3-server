const router = require('express').Router();
const Image = require('./db').import('./models/image');

var multer = require('multer'),
    multerS3 = require('multer-s3'),
    fs = require('fs'),
    AWS = require('aws-sdk');


AWS.config.loadFromPath('./s3_config.json');
var s3 = new AWS.S3();


var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'am-image-db',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
})

router.post('/', upload.single('image'), (req, res) => {
    console.log('inside post')

    Image.create({
        location : req.file.location,
        caption : req.body.caption,
        key : req.file.key
    })
    .then(image => {
        res.status(200).json(image);
    })
    .catch(err => res.status(500).json(err.message))
});

router.put('/update/:id', upload.single('image'), (req, res) => {
    Image.put({
        location : req.file.location,
        caption : req.body.caption,
        key : req.file.key
    },
        { 
            where : {
                id : req.params.id
            }
        })
        .then(recordsChanged => res.status(200).json(`${recordsChanged} records changed.`))
        .catch(err => res.status(500).json(err.message));
});

router.get('/', (req, res) => {
    Image.findAll() 
        .then(images => res.status(200).json(images))
        .catch(err => res.status(500).json(err.message));
})

router.get('/:id', (req, res) => {
    Image.findOne({
        where : {
            id : req.params.id
        }
    })
    .then(image => {
        res.status(200).json(image)
    })
    .catch(err => res.status(500).json(err.message))
});

module.exports = router;