const production = process.env.REACT_APP_NODE_ENV === 'production';

export const apiUrl = production
  ? 'https://shelby-advocate.herokuapp.com/api'
  : 'http://localhost:4200/api';

const APP_CONFIG = {
  apiUrl
};

export default APP_CONFIG;
