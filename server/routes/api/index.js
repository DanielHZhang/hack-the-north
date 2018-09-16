import {
  Router
} from 'express';
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
      url: getAutocompleteQueryUrl(query),
      method: 'GET',
      json: true,
    };
    const response = await request(options);

  } catch (error) {

  }
});

router.post('/getTransactions', async (req, res) => {
  try {
    const {
      transaction_id_list
    } = req.body;

    const nickToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiYWIxMTIwZmEtYTE0OS0zODdlLWE1MjEtMmYzNjg5NTAwYmZkIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiI0N2Y3MzJiMy1iY2Y5LTQ3MzktYWY1Zi1iOWIxNDQyZjhiMmYifQ.0ZR-NSMfrci1CbGpLDMxfe0SgrRHdd7Uz01vzIjFld0';
    let transactionList = [];
    
    for (let i in transaction_id_list) {
      const transactionId = transaction_id_list[i];
      let options = {
        json: true,
        uri: tdBasePath + '/transactions/' + transactionId,
        method: 'GET',
        headers: { Authorization: nickToken }
      };

      const response = await request(options)
      .catch(error => {
        res.send({ success: false, message: 'transaction ID failed: ' + transactionId });
        return;
      });

      if (response && response.hasOwnProperty('result')) transactionList.push(response.result);
    }
    
    res.send({ success: true, transactionList });

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
    let customerList = [];
    
    for (let i in customer_id_list) {
      const customerId = customer_id_list[i];
      let options = {
        json: true,
        uri: tdBasePath + '/customers/' + customerId,
        method: 'GET',
        headers: { Authorization: nickToken }
      };

      const response = await request(options)
        .catch(error => {
          res.send({ success: false, message: 'customer ID failed: ' + customerId });
        });

      if (response && response.hasOwnProperty('result')) customerList.push(response.result);
    }
    
    res.send({ success: true, customerList });

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
    
    let headers = {
      'Origin': 'https://td-davinci.com',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'Authorization': nickToken,
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Referer': 'https://td-davinci.com/virtual-users',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
      'Connection': 'keep-alive',
      'DNT': '1'
    };
    
    // for (let i = 0; i < 10; i++) {
      

      let dataString = `{"continuationToken":"${continuationToken}","minAge":null,"maxAge":null,"gender":null,"workActivity":null,"schoolAttendance":null,"minIncome":null,"maxIncome":null}`;

      let options = {
          url: 'https://api.td-davinci.com/api/simulants/page',
          method: 'POST',
          headers: headers,
          body: dataString
      };

      customerList = await request(options)
        .then(result => {
          const res = JSON.parse(result).result;
          const customers = res.customers;

          for (let j = 0; j < customers.length; j++) {
            const customerId = customers[j].id;

            let transOptions = {
              json: true,
              uri: tdBasePath + '/customers/' + customerId + '/transactions',
              method: 'GET',
              headers: { Authorization: nickToken }
            }

            return request(transOptions)
              .then(transResult => {
                customers[j].transactions = transResult.result;

                contToken = res.continuationToken;
                return customerList.concat(customers);
              })
              .catch(error => {
                console.log('error: ' + error);
              });
          }
          
        })
        .catch(error => {
          console.log('error: ' + error);
        });
    // }
    
    res.send({ success: true, nextContinuationToken: contToken, customerList });

  } catch (error) {
    console.error('Error: ', error);
  } finally {
    console.log('/getCustomerPage has ended.');
  }
});


export default router;
