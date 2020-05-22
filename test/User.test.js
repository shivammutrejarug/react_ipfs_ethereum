const User = artifacts.require('./User.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('User', (accounts) => {
  let contract

  before(async () => {
    contract = await User.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'User')
    })

    it('has a symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'USER')
    })

  })

  describe('minting', async () => {

    it('creates a new token', async () => {
      const result = await contract.mint('shivam', 25, 'male', '#SH25M')
      const totalSupply = await contract.totalSupply()
      // SUCCESS
      assert.equal(totalSupply, 1)
      const event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correct')

      // FAILURE: cannot mint same color twice
      await contract.mint('#EC058E').should.be.rejected;
    })

  })

})
