
let apiRoot = ''

if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'localhost:8017'
}
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'https://trello-api-x7ww.onrender.com'
}
export const API_ROOT = apiRoot