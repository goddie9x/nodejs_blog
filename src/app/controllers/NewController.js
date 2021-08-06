class NewsController {
    //[GET] /news
    index(req, res) {
            res.render('news');
        }
        //[GET]/news/:slugs - slugs là biến động có thể là paramUrl bất kỳ
    detail(req, res) {
        res.send('news detail');
    }
}
module.exports = new NewsController;