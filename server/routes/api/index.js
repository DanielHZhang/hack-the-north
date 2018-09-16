import {Router} from 'express';
import request from 'request-promise';
import keys from '../../keys';

const router = Router();

const tdBasePath = 'https://api.td-davinci.com/api';

/**
 * Get the latitude and longitude given a street address
 */
router.get('/coordinates', async (req, res) => {
  try {
    const {
      address,
    } = req.params;
    // eslint-disable-next-line
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${keys.google.apiKey}`;
    const options = {
      url: '',
      method: 'GET',
      json: true,
    };
    // const response = await request(options);

  } catch (error) {

  }
});

router.post('/getTransactions', async (req, res) => {
  try {
    const {
      transaction_id_list
    } = req.body;

    const nickToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiYWIxMTIwZmEtYTE0OS0zODdlLWE1MjEtMmYzNjg5NTAwYmZkIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiI0N2Y3MzJiMy1iY2Y5LTQ3MzktYWY1Zi1iOWIxNDQyZjhiMmYifQ.0ZR-NSMfrci1CbGpLDMxfe0SgrRHdd7Uz01vzIjFld0';
    const transactionList = [];

    for (let i in transaction_id_list) {
      const transactionId = transaction_id_list[i];
      const options = {
        json: true,
        uri: tdBasePath + '/transactions/' + transactionId,
        method: 'GET',
        headers: {
          Authorization: nickToken
        }
      };

      const response = await request(options)
        .catch((error) => {
          res.send({
            success: false,
            message: 'transaction ID failed: ' + transactionId
          });
          return;
        });

      if (response && response.hasOwnProperty('result')) {
        transactionList.push(response.result);
      }
    }

    res.send({
      success: true,
      transactionList
    });

  } catch (error) {
    console.error('Error: ', error);
  } finally {
    console.log('/getTransactions has ended.');
  }
});

router.post('/getCustomers', async (req, res) => {
  try {
    const {
      customer_id_list
    } = req.body;

    const nickToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiYWIxMTIwZmEtYTE0OS0zODdlLWE1MjEtMmYzNjg5NTAwYmZkIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiI0N2Y3MzJiMy1iY2Y5LTQ3MzktYWY1Zi1iOWIxNDQyZjhiMmYifQ.0ZR-NSMfrci1CbGpLDMxfe0SgrRHdd7Uz01vzIjFld0';
    const customerList = [];

    for (let i in customer_id_list) {
      const customerId = customer_id_list[i];
      const options = {
        json: true,
        uri: tdBasePath + '/customers/' + customerId,
        method: 'GET',
        headers: {
          Authorization: nickToken
        }
      };

      const response = await request(options)
        .catch((error) => {
          res.send({
            success: false,
            message: 'customer ID failed: ' + customerId
          });
        });

      if (response && response.hasOwnProperty('result')) {
        customerList.push(response.result);
      }
    }

    res.send({
      success: true,
      customerList
    });

  } catch (error) {
    console.error('Error: ', error);
  } finally {
    console.log('/getCustomers has ended.');
  }
});

router.post('/getCustomerPage', async (req, res) => {
  try {
    const {
      continuationToken
    } = req.body;

    const nickToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiYWIxMTIwZmEtYTE0OS0zODdlLWE1MjEtMmYzNjg5NTAwYmZkIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiI0N2Y3MzJiMy1iY2Y5LTQ3MzktYWY1Zi1iOWIxNDQyZjhiMmYifQ.0ZR-NSMfrci1CbGpLDMxfe0SgrRHdd7Uz01vzIjFld0';
    let customerList = [];
    let contToken = '';

    const headers = {
      'Origin': 'https://td-davinci.com',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'Authorization': nickToken,
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Referer': 'https://td-davinci.com/virtual-users',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
      'Connection': 'keep-alive',
      'DNT': '1',
    };

    const dataString = `{"continuationToken":"${continuationToken}","minAge":null,"maxAge":null,"gender":null,"workActivity":null,"schoolAttendance":null,"minIncome":null,"maxIncome":null}`;

    const options = {
      url: 'https://api.td-davinci.com/api/simulants/page',
      method: 'POST',
      headers: headers,
      body: dataString,
    };

    customerList = await request(options)
      .then((result) => {
        const res = JSON.parse(result).result;
        const customers = res.customers;

        for (let j = 0; j < customers.length; j++) {
          const customerId = customers[j].id;

          const transOptions = {
            json: true,
            uri: tdBasePath + '/customers/' + customerId + '/transactions',
            method: 'GET',
            headers: {
              Authorization: nickToken,
            },
          };

          return request(transOptions)
            .then((transResult) => {
              customers[j].transactions = transResult.result;

              contToken = res.continuationToken;
              return customerList.concat(customers);
            })
            .catch((error) => {
              console.log('error: ' + error);
            });
        }

      })
      .catch((error) => {
        console.log('error: ' + error);
      });
    // }

    res.send({
      success: true,
      nextContinuationToken: contToken,
      customerList
    });

  } catch (error) {
    console.error('Error: ', error);
  } finally {
    console.log('/getCustomerPage has ended.');
  }
});

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
const wml_credentials = new Map();

// NOTE: you must manually construct wml_credentials hash map below using information retrieved
// from your IBM Cloud Watson Machine Learning Service instance

wml_credentials.set("url", 'https://dataplatform.cloud.ibm.com/ml/deployments/5c11dcc1-816e-4df4-8b8a-7f67986d04c4/test?projectid=9485bb1c-33fc-4cdf-b97c-90cdd92ad353&mlInstanceGuid=10a4648b-7e20-4080-aabe-381842f01da1&context=analytics&flush=true');
wml_credentials.set("username", 'claudiolener98@gmail.com');
wml_credentials.set("password", 'Hackthenorth_2018');

function apiGet(url, username, password, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	const tokenHeader = "Basic " + btoa((username + ":" + password));
	const tokenUrl = url + "/v3/identity/token";

	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("GET", tokenUrl);
	oReq.setRequestHeader("Authorization", tokenHeader);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send();
}

function apiPost(scoring_url, token, payload, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("POST", scoring_url);
	oReq.setRequestHeader("Accept", "application/json");
	oReq.setRequestHeader("Authorization", token);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send(payload);
}

router.get('/getWatsonData', async (req, res) => {
  apiGet(wml_credentials.get("url"),
    wml_credentials.get("username"),
    wml_credentials.get("password"),
    function (res) {
          let parsedGetResponse;
          try {
              parsedGetResponse = JSON.parse(this.responseText);
          } catch(ex) {
              // TODO: handle parsing exception
          }
          if (parsedGetResponse && parsedGetResponse.token) {
              const token = parsedGetResponse.token
              const wmlToken = "Bearer " + token;

              // NOTE: manually define and pass the array(s) of values to be scored in the next line
            const payload = '{"fields": ["age", "name", "gender", "relationshipStatus", "transactions__currencyAmount", "transactions__merchantName"], "values": [array_of_values_to_be_scored, another_array_of_values_to_be_scored]}';
            const scoring_url = "https://us-south.ml.cloud.ibm.com/v3/wml_instances/10a4648b-7e20-4080-aabe-381842f01da1/deployments/5c11dcc1-816e-4df4-8b8a-7f67986d04c4/online";

              apiPost(scoring_url, wmlToken, payload, function (resp) {
                  let parsedPostResponse;
                  try {
                      parsedPostResponse = JSON.parse(this.responseText);
                  } catch (ex) {
                      // TODO: handle parsing exception
                  }
                  console.log("Scoring response");
                  console.log(parsedPostResponse);
              }, function (error) {
                  console.log(error);
              });
          } else {
              console.log("Failed to retrieve Bearer token");
          }
    }, function (err) {
      console.log(err);
    });
});

export default router;
