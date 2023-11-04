const {
  getData,
  searchData,
  updateData,
  createData
} = require('./storeHelpers')

const mutations = require('./graphql/mutations')
const queries = require('./graphql/queries')


module.exports = {
  getData,
  searchData,
  updateData,
  createData,
  ...mutations,
  ...queries,
}