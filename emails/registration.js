const keys = require('../keys')

module.exports = function(to){
  return {
    to: to,
    from: keys.APP_EMAIL_FROM,
    subject: 'Account was create successfull',
    html: `
    <h1>Wellcome in my app</h1>
    <p>You seccessfull created account in my app for study</p>
    <hr>
    <h3>You account data:</h3>
    <p>Email: ${to}</p>
    <hr>
    <p>My app: </p>
    <a href="${keys.BASE_URL}">app-for-node.js-studying</a>
    `
  }
}