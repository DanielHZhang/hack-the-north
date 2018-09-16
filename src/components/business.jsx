import React, {PureComponent} from 'react';

class Business extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = {
      name: 'Tim Hortons',
      customers: [
        {
          "id": "47f732b3-bcf9-4739-af5f-b9b1442f8b2f_c18dca28-f10f-4a0a-b905-db636046bd4c",
          "type": "Personal",
          "givenName": "Teodora",
          "otherName": null,
          "surname": "Aaberg",
          "maidenName": "Capwell",
          "age": 63,
          "gender": "Female",
          "birthDate": "1954-10-19",
          "workActivity": "parttime",
          "occupationIndustry": "5221 Depository credit intermediation",
          "totalIncome": 14177.8,
          "relationshipStatus": "Married",
          "habitationStatus": "With Spouse",
          "transactions": [
            {
              "currencyAmount": 2.32,
              "locationRegion": "ON",
              "source": "POS",
              "locationCity": "North York",
              "originationDateTime": "2018-08-16T17:08:00Z",
              "locationPostalCode": "M3A 1Z4",
              "customerId": "47f732b3-bcf9-4739-af5f-b9b1442f8b2f_c18dca28-f10f-4a0a-b905-db636046bd4c",
              "merchantId": "c6459f83-54cb-42d9-aa4b-4a997fd2fe81",
              "locationLatitude": 43.760352787,
              "id": "47f732b3-bcf9-4739-af5f-b9b1442f8b2f_c18dca28-12e12055-7674-4c35-a3e0-e79f0238269f",
              "locationStreet": "1277 York Mills Rd",
              "accountId": "47f732b3-bcf9-4739-af5f-b9b1442f8b2f_deaae83b-bbb4-48e4-a2e0-8e8b8bf802f7",
              "categoryTags": [
                  "Food and Dining"
              ]
            },
          ]
        }
      ]
    }
    console.log('data', data);
    return (
      <div className='business'>
        <div className='business-inside'>
          <div className='business-name'>
            {data.name}
          </div>
          <div className='business-transactions'>
            {data.customers.map((customer, index) => {
              return customer.transactions.map((txn, tindex) => {
                if (txn.merchantId = this.props.merchantId) {
                  return (<div className='transaction' key={parseInt('' + index + tindex)}>{txn.currencyAmount} - {customer.age} - {customer.gender}</div>);
                }
                else return '';
              })
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
