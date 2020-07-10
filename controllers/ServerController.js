const DataModel = require('../models/DataModel')

exports.getIndex = (req, res, next) => {
  DataModel.fetchDataTree(root => {
    // Response client
    res.send(JSON.stringify(root))
  })

}