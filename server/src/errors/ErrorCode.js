
exports.errorObj = {
  //user
  INVALID_EMAIL: 'Invalid email domain',
  MISSING_AUTH_TOKEN:  {message: 'Missing authentication token', status: 401}, 
  INVALID_AUTH_TOKEN:  {message: 'Invalid authentication token', status: 401}, 
  REFRESH_TOKEN_INVALID: 'Invalid refresh token',
  AUTH_TOKEN_EXPIRED: {message: 'Authentication token expired', status: 401}, 
  USER_DNE: {message: "User doesn't exist", status: 404},
  USER_INVALID_EMAIL: 'User email invalid',
  USER_INVALID_ID: 'User ID invalid',
  USER_INVALID_PW: 'User password invalid',
  USER_SUSPENDED: 'User suspended',
  USER_NO_PERMISSION: {message: 'No permission', status: 403},
  SIGN_UP_EMAIL_EXISTS: 'Email already exists',

  //products
  PRODUCT_DNE: {message: "Product doesn't exist", status: 404},

  //order
  ORDER_DNE: {message: "Order doesn't exist", status: 404},

  DATABASE_ERROR: 'Database error',
  INVALID_DATA: 'Invalid data',
  TOO_MANY_REQUEST: {message: "Too many requests", status: 429},
  
  SERVER_INTERNAL_ERROR: {message: "Server internal error", status: 500}, 
};
