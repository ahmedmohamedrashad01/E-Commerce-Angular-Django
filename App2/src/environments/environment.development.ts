export const environment = {
  production: true,

  apiProduct: 'http://127.0.0.1:8000/api/products/?page=',
  apiProductByID: 'http://127.0.0.1:8000/api/products/?id=',

  apiProductByName: 'http://127.0.0.1:8000/api/products/?search=',
  
  productsByCatId: 'http://127.0.0.1:8000/api/products/?category=',
  apiCategory: 'http://127.0.0.1:8000/api/categories/',

  apiSubCategory: 'http://127.0.0.1:8000/api/sub_categories/?category=',

  createUserApi: 'http://127.0.0.1:8000/auth/users/',
  userActivation: 'http://127.0.0.1:8000/auth/users/activation/',
  loginCreate: 'http://127.0.0.1:8000/auth/jwt/create/',
  loginRefresh: 'http://127.0.0.1:8000/auth/jwt/refresh/',

  resetPassword :'http://127.0.0.1:8000/auth/users/reset_password/',
  confirmPassword:'http://127.0.0.1:8000/auth/users/reset_password_confirm/',

  apiUser :'http://127.0.0.1:8000/api/us/?email=',
  apiCart :'http://127.0.0.1:8000/api/cart/',
  apiCartTotal:'http://127.0.0.1:8000/api/cart/?customer__email=',
};
