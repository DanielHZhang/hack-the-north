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

      const response = await request(options);

      transactionList.push(response.result);
    }
    
    res.send(transactionList);

  } catch (error) {
    console.error('Error: ', error);
  } finally {
    console.log('/getTransaction has ended.');
  }
});


export default router;
