const Course = require('../models/Course');
const { multipleMongooseToObjects, mongooseToObject } = require('../../util/mongoose');

class CourseController {
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('courses/courses', { courses: multipleMongooseToObjects(courses) })
            })
            .catch(next);
    }

    detail(req, res, next) {
        let detail = req.params.detail;
        Course.findOne({ slug: detail })
            .then(course => {
                res.render('courses/detail', { course: mongooseToObject(course) })
            })
            .catch(next);
    }

    create(req, res, next) {
        res.render('courses/create');
    }

    store(req, res, next) {
        const formData = {...req.body };

        formData.image = `https://img.youtube.com/vi/${req.body.videoYtId}/sddefault.jpg`;
        const course = new Course(formData);

        course.save()
            .then(() => {
                Course.findOne({ name: `${formData.name}` })
                    .then((course) => {
                        res.redirect(`/courses/${course.slug}`)
                    })
                    .catch(next)
            })
            .catch(next);
    }
    edit(req, res, next) {
        Course.findOne({ _id: req.params.id })
            .then(course => {
                res.render('courses/edit', { course: mongooseToObject(course) })
            })
            .catch(next);
    }
}

module.exports = new CourseController();