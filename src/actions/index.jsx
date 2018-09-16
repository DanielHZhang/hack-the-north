export const FILTER_BY_MALE = 'FILTER_BY_MEN';
export const FILTER_BY_FEMALE = 'FILTER_BY_FEMALE';
export const FILTER_BY_BOTH = 'FILTER_BY_BOTH';

export const filterBy = (type) => (dispatch) => {
  if (type === 'male') {
    dispatch({type: FILTER_BY_MALE});
  } else if (type === 'female') {
    dispatch({type: FILTER_BY_FEMALE});
  } else if (type === 'both') {
    dispatch({type: FILTER_BY_BOTH});
  }
};
