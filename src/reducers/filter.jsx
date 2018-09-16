import {FILTER_BY_MALE, FILTER_BY_FEMALE, FILTER_BY_BOTH, FILTER_BY_NAME, FILTER_BY_SINGLE, FILTER_BY_MARRIED, FILTER_BY_INCOME, FILTER_BY_AGE} from '../actions';
import JSONData from '../CustomerData.json';
import {getAverage, getCount, getByGender, getByName, getByMaritalStatus, getByIncome, getByAge} from './utils';

function generateInitialState() {
  const clientData = JSONData.customerList;
  const heatMapFullData = [];
  const heatMapLocationData = {};
  clientData.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((trans) => {
      if (!trans.locationLatitude || !trans.locationLongitude) {
        return;
      }
      const {merchantName, locationStreet, locationLatitude, locationLongitude} = trans;
      heatMapFullData.push({
        lat: locationLatitude.toString(),
        lng: locationLongitude.toString(),
      });
      if (!heatMapLocationData[locationStreet]) {
        heatMapLocationData[locationStreet] = {
          lat: locationLatitude.toString(),
          lng: locationLongitude.toString(),
          merchantName: merchantName,
          address: locationStreet,
          ...getAverage(clientData, locationStreet),
          ...getCount(clientData, locationStreet),
        };
      }
    });
  });
  const arrayifiedLocationData = Object.values(heatMapLocationData);
  return {
    heatMapFullData,
    heatMapLocationData: arrayifiedLocationData,
  };
}

export function filterReducer(state = generateInitialState(), action) {
  switch (action.type) {
    case FILTER_BY_MALE: {
      return {
        ...state,
        heatMapFullData: getByGender(JSONData.customerList, 'male'),
      };
    }
    case FILTER_BY_FEMALE: {
      return {
        ...state,
        heatMapFullData: getByGender(JSONData.customerList, 'female'),
      };
    }
    case FILTER_BY_BOTH: {
      return {
        ...state,
        heatMapFullData: getByGender(JSONData.customerList, 'both'),
      };
    }
    case FILTER_BY_NAME: {
      return {
        ...state,
        heatMapFullData: getByName(JSONData.customerList, action.payload),
      };
    }
    case FILTER_BY_SINGLE: {
      return {
        ...state,
        heatMapFullData: getByMaritalStatus(JSONData.customerList, 'single'),
      };
    }
    case FILTER_BY_MARRIED: {
      return {
        ...state,
        heatMapFullData: getByMaritalStatus(JSONData.customerList, 'married'),
      };
    }
    case FILTER_BY_INCOME: {
      return {
        ...state,
        heatMapFullData: getByIncome(JSONData.customerList, action.payload),
      };
    }
    case FILTER_BY_AGE: {
      return {
        ...state,
        heatMapFullData: getByAge(JSONData.customerList, action.payload),
      };
    }
    default: {
      return state;
    }
  }
}

function getInitialIds() {
  const clientData = JSONData.customerList;
  console.log(clientData);
  return clientData.map((client) => `${client.givenName} ${client.surname}`);
}

export function idReducer(state = getInitialIds(), action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
