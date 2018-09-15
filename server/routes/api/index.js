import {
  Router
} from 'express';
import request from 'request-promise';
import keys from '../../keys';

const router = Router();

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


export default router;
