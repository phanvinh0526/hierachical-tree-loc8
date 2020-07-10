const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')


// Global variables
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  // 'small.csv'
  'sampledata.csv'
)
const cols = ['id', 'name', 'parent_id', 'value']

// Read sampledata.csv
const fetchRawDataFromCSV = (cb) => {
  let rows = []
  fs.createReadStream(p)
      .pipe(csv())
      .on('data', row => {
        rows.push(row)
      })
      .on('end', () => {
        console.log("CSV file successfully processed!")
        cb(rows)
      })
}

// Making ID-to-Array position Map
const idMappingFunc = (rawData) => (
  rawData.reduce((acc, ele, idx) => {
    acc[ele.id] = idx
    return acc
  }, {})
)

// Deep frist search tree algorithm
const deepSearch = (node) => {
  if(!node || node.children.length===0){
    return
  }
  node.value = 0 // Since we only add up the values of its child nodes, so the parent's value is set to zero
  node.children.forEach(ele => {
    deepSearch(ele)
    node.value = Math.round((node.value + ele.value) * 100) / 100
  })
  return node
}

// Data Model
module.exports = class DataModel{
  constructor(){
  }

  static fetchDataTree(cb){
    fetchRawDataFromCSV(rawData => {
      let root = null

      // Get ID mapping
      const idMapping = idMappingFunc(rawData)

      // Handle root element
      rawData.forEach(ele => {
        if(ele.parent_id === ele.id){
          root = ele
          return
        }
        // Locate the parent element in data array
        const parentElement = rawData[idMapping[ele.parent_id]]
        // Add a node to its parent.children
        ele.children = []
        ele.value = parseFloat(ele.value)
        parentElement.children = [...(parentElement.children || []), ele]
      })
      // Adding the value of the child nodes
      root = deepSearch(root)
      cb(root)
    })
  }
}
