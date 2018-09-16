export function getAllStreets(fullJson) {
  const streets = {};
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((t) => {
      if (streets[t.locationStreet]) {
        return;
      }
      streets[t.locationStreet] = t.locationStreet;
    });
  });
  return Object.values(streets);
}

export function getAverage(fullJson, street) {
  const income = [];
  const age = [];
  const spent = [];
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((t) => {
      if (t.locationStreet === street) {
        age.push(client.age);
        income.push(client.totalIncome);
        spent.push(t.currencyAmount);
      }
    });
  });
  const finalAge = age.reduce((acc, val) => acc + val, 0) / age.length;
  const finalIncome = income.reduce((acc, val) => acc + val, 0) / income.length;
  const finalSpent = spent.reduce((acc, val) => acc + val, 0) / spent.length;
  return {
    averageAge: finalAge,
    averageIncome: finalIncome,
    averageAmountSpent: finalSpent,
  };
}

export function getCount(fullJson, street) {
  const o = {female: 0, male: 0, single: 0, married: 0, numOfTransactions: 0, totalAmountSpent: 0};
  fullJson.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((t) => {
      if (t.locationStreet === street) {
        o.numOfTransactions++;
        o.totalAmountSpent += t.currencyAmount;
        if (client.gender === 'Female') {
          o.female += 1;
        } else {
          o.male += 1;
        }
        if (client.relationshipStatus === 'Married') {
          o.married += 1;
        } else {
          o.single += 1;
        }
      }
    });
  });
  return o;
}

export function getByGender(fullJson, gender) {
  const heatMapFullData = [];
  const filtered = fullJson.filter((client) => {
    if (client.gender.toLowerCase() === gender) {
      return true;
    }
    if (gender === 'both') {
      return true;
    }
    return false;
  });
  filtered.forEach((client) => {
    if (!client.transactions) {
      return;
    }
    client.transactions.forEach((transaction) => {
      if (transaction.locationLatitude && transaction.locationLongitude) {
        heatMapFullData.push({
          lat: transaction.locationLatitude.toString(),
          lng: transaction.locationLongitude.toString(),
        });
      }
    });
  });
  return heatMapFullData;
}
