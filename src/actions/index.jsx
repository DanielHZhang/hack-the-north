export const FILTER_BY_MALE = 'FILTER_BY_MEN';
export const FILTER_BY_FEMALE = 'FILTER_BY_FEMALE';
export const FILTER_BY_BOTH = 'FILTER_BY_BOTH';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const FILTER_BY_SINGLE = 'FILTER_BY_SINGLE';
export const FILTER_BY_MARRIED = 'FILTER_BY_MARRIED';
export const FILTER_BY_INCOME = 'FILTER_BY_INCOME';
export const FILTER_BY_AGE = 'FILTER_BY_AGE';

export const filterBy = (type, payload) => (dispatch) => {
  if (type === 'male') {
    dispatch({type: FILTER_BY_MALE});
  } else if (type === 'female') {
    dispatch({type: FILTER_BY_FEMALE});
  } else if (type === 'both' || type === 'marital-both') {
    dispatch({type: FILTER_BY_BOTH});
  } else if (type === 'name') {
    dispatch({type: FILTER_BY_NAME, payload});
  } else if (type === 'single') {
    dispatch({type: FILTER_BY_SINGLE});
  } else if (type === 'married') {
    dispatch({type: FILTER_BY_MARRIED});
  } else if (type === 'income') {
    dispatch({type: FILTER_BY_INCOME, payload});
  } else if (type === 'age') {
    dispatch({type: FILTER_BY_AGE, payload});
  }
};
