/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_SWEEPLCOM_GRAPHQLAPIIDOUTPUT
	API_SWEEPLCOM_GRAPHQLAPIENDPOINTOUTPUT
	API_SWEEPLCOM_GRAPHQLAPIKEYOUTPUT
	AUTH_SWEEPLCOMF192DF88_USERPOOLID
	GEO_SWEEPLCOM_NAME
	GEO_SWEEPLCOMINDEX_NAME
	OPENAI_API_KEY
Amplify Params - DO NOT EDIT */

const {sendSMS} = require('./sendMessage')
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const response = await sendSMS('+14153104985', 'Hello from Lambda!')
  console.log(JSON.stringify(response, null, ' '))
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    },
    body: JSON.stringify('Hello from Lambda!'),
  };
};
