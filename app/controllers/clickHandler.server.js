'use strict';

function clickHandler(db) {
    let clicks = db.collection('clicks');

    //functionality will be contained within a getClicks() method of the clickHandler function object.
    this.getClicks = (err, res) => {

        var clickProjection = { '_id': false };

        //arguments:
        //no need for a query, we only got one document so let's get that
        //projection lets us filter out the _id field
        clicks.findOne({}, clickProjection, (err, result) => {
            if (err) throw err
            if (result) res.json(result);
            //if database is empty we need to insert a record and query again
            else {
                clicks.insert({ 'clicks': 0 }, (err) => {
                    if (err) throw err;
                    else {
                        clicks.findOne({}, clickProjection, (err, doc) => {
                            if (err) throw err;
                            res.json(doc);
                        })
                    }
                })
            }
        });
    }
}

//exporting a function object named clickHandler to be used elsewhere in Node.
module.exports = clickHandler;