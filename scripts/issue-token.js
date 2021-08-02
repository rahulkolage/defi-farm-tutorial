const TokenFarm = artifacts.require('TokenFarm');

module.exports = async function(callback) {
  let tokenFarm = await TokenFarm.deployed();
  await tokenFarm.issueTokens();
  // Code goes here...
  console.log('tokens issued!');
  callback();
}

// How to call
// truffle exec scripts/issue-token.js
