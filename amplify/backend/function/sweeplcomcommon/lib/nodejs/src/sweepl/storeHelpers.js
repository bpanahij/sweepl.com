const axios = require('axios').default;

/**
 *  API_SWEEPLCOM_GRAPHQLAPIENDPOINTOUTPUT
 *  API_SWEEPLCOM_GRAPHQLAPIIDOUTPUT
 *  API_SWEEPLCOM_GRAPHQLAPIKEYOUTPUT
 * @param query
 * @param queryName
 * @param variables
 * @returns {Promise<{body: string, statusCode: number}>}
 */

const packageRequest2 = async (query, queryName, variables) => {
  console.log('packageRequest2', queryName, JSON.stringify(variables, null, 2))
  const headers = {
    'x-api-key': process.env.API_SWEEPLCOM_GRAPHQLAPIKEYOUTPUT,
    'Content-Type': 'application/json',
  };
  const response = await axios({
    url: process.env.API_SWEEPLCOM_GRAPHQLAPIENDPOINTOUTPUT,
    method: 'post',
    headers: headers,
    data: {
      query,
      variables
    },
  });
  const result = response.data
  console.log('queryResult', queryName, JSON.stringify(variables), JSON.stringify(result, null, 2))
  if (result.errors) {
    console.log('GraphQL Error', queryName, JSON.stringify(variables, null, 2), JSON.stringify(result, null, 2))
    throw new Error(JSON.stringify(result.errors))
  }
  return result?.data[queryName]
}

const getData = async (query, queryName, id) => {
  return await packageRequest2(query, queryName, {id})
}

const searchData = async (query, queryName, variables) => {
  const result = await packageRequest2(query, queryName, variables)
  return result?.items
}


const createData = async (query, queryName, variables) => {
  return await packageRequest2(query, queryName, variables)
}

const updateData = async (query, queryName, variables) => {
  return await packageRequest2(query, queryName, variables)
}

module.exports = {
  getData,
  searchData,
  createData,
  updateData
}