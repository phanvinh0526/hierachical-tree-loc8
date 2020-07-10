const DataModel = require('../models/DataModel')

exports.getTree = (req, res, next) => {
  DataModel.fetchDataTree(data => {
    res.send(JSON.stringify(data))
  })
}

exports.getTable = (req, res, next) =>{
  DataModel.fetchDataTable(data => {
    res.send(JSON.stringify(data))
  })
}