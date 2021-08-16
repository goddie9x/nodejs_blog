const Course = require('../models/Course');
const { multipleMongooseToObjects } = require('../../util/mongoose');

class UserController {
    //[GET] /User
    index(req, res, next) {
        res.render('user');
    }

    news(req, res, next) {
        res.render('user/news');
    }

    courses(req, res, next) {
        let courseList = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseList = courseList.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([Course.countDocumentsDeleted(), courseList])
            .then(([deletedCount, courses]) => {
                res.render('user/courses', { deletedCount, courses: multipleMongooseToObjects(courses) })
            })
            .catch(next);
    }

    stored(req, res, next) {
        res.render(' user/stored');
    }
    trash(req, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                res.render('user/trash', { courses: multipleMongooseToObjects(courses) })
            })
            .catch(next);
    }
    update(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoYtId}/sddefault.jpg`;

        Course.updateOne({ _id: req.params.id }, formData)
            .then(() => {
                res.redirect(`/me/stored/courses`);
            })
            .catch(next);
    }

    restore(req, res, next) {

        Course.restore({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

    forceDelete(req, res, next) {
        Course.remove({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    handleFormActions(req, res, next) {

        switch (req.body.action) {
            case 'DELETE':
                {
                    Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next)
                    break;
                }
            case 'FORCEDELETE':
                {
                    Course.remove({ _id: { $in: req.body.courseIds } })
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next)
                    break;
                }
            case 'RESTORE':
                {
                    Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next)
                    break;
                }
            default:
                res.send('action invalid');
        }

    }
}
module.exports = new UserController();