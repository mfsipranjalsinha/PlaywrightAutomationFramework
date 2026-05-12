export const ENV = {

  amazon: {

    email:
      process.env.EMAIL || '',

    password:
      process.env.PASSWORD || ''

  },

  reqres: {

    apiKey:
      process.env.REQRES_API_KEY || ''

  },

  mockapi: {

    baseURL:
      process.env.MOCKAPI_BASE_URL || ''

  }

};