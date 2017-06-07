'use strict';
const ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js')

module.exports = function(app, db) {

    // instantiating a new instance of the ClickHandler function object, and passing in the MongoDB object as an argument. 
    // This is going to allow us to reference the methods we created in the clickHandler.server.js 
    // in addition to passing in the database information for use in those methods.
    let clickhandler = new ClickHandler(db)

    //serving static html to the front page
    app.route('/')
        .get((req, res) => {
            res.sendFile(process.cwd() + '/public/index.html')
        })

    //defining a new route for our API
    app.route('/api/clicks')
        //depending on the HTTP method, the corresponding clickhandler method is run.
        //for example getClicks when HTTP GET request on the /api/clicks URL
        .get(clickhandler.getClicks)
        .post(clickhandler.addClick)
        .delete(clickhandler.resetClicks)

}