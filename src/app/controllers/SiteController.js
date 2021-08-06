class SiteController {
    //[GET] /news
    index(req, res) {
            res.render('home');
        }
        //[GET]/news/:slugs - slugs là biến động có thể là paramUrl bất kỳ
    search(req, res) {
        res.render('search');
    }

}
module.exports = new SiteController;