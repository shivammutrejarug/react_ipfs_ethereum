import React, { Component } from "react";
import User from "./contracts/User.json";
import { sha256 } from 'js-sha256';
// import ComposableUser from "./contracts/ComposableTopDown.json";
import getWeb3 from "./getWeb3";
import ipfs from "./ipfs";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const secp256k1 = require('secp256k1');

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null,
    buffer: null, ipfsHash: '', name: '', age: 0, sex: '' };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = User.networks[networkId];
      const instance = new web3.eth.Contract(
        User.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.captureFile = this.captureFile.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleAddressChange = this.handleAddressChange.bind(this);
      this.onTransferSubmit = this.onTransferSubmit.bind(this);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

    const totalUsers = await this.state.contract.methods.usersNFT(this.state.accounts[0]).call();
    this.setState({ipfsHash: totalUsers['genome']});
    console.log(this.state.ipfsHash);
  }

  // Fetch the file from browser and set it to the buffer state
  captureFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result)})
      console.log("buffer", this.state.buffer);
    }
  }

  handleChange() {
    console.log(this.refs.name.value);
    console.log(this.refs.age.valueAsNumber);
    this.setState({
      "name": this.refs.name.value,
      "age": this.refs.age.value,
      "sex": this.refs.sex.value
    })
  }

  handleAddressChange() {
    this.setState({
      "form": this.refs.from.value,
      "to": this.refs.to.value
    })
  }

  // Called when the user wants to create a NFT.
  onSubmit(event) {
    event.preventDefault();
    ipfs.files.add(this.state.buffer, (err, result) => {
      if (err) {
        console.error(err);
        return
      }
      this.setState({"ipfsHash": result[0].hash})
      console.log("ipfsHash", this.state.ipfsHash);

      const {contract, name, age, sex, ipfsHash, accounts} = this.state;
      console.log(contract);
      contract.methods.mint(name, age, sex, ipfsHash).send({from: accounts[0], gas: 3000000 }).then((r) => {
          return this.setState({ ipfsHash: result[0].hash })
        })
      console.log('ifpsHash', this.state.ipfsHash)
    })
  }

  // Called when User wants to transfer the NFT.
  onTransferSubmit(event) {
    event.preventDefault();

    const {contract, to, accounts} = this.state;
    console.log(accounts[0]);
    console.log(to);
    contract.methods.transferFrom(accounts[0], to, 1).send({from: accounts[0] }).then((r) => {
      console.log('transfered to', contract.methods.balanceOf(to).call())
    })
  }



  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Container className="App">
        <h1>Your image</h1>
        <p>The image is stored on IPFS.</p>
        <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt="" />
        <h2>Upload Image</h2>

        <Form onSubmit={this.onTransferSubmit}>
          <Form.Group controlId="fromAddress">
            <Form.Control type="text" placeholder="Address of account to transfer from" onChange={this.handleAddressChange} ref="from" />
          </Form.Group>
          <Form.Group controlId="toAddress">
            <Form.Control type="text" placeholder="Address of account to transfer to" onChange={this.handleAddressChange} ref="to" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>


        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="userName">
            <Form.Control type="text" placeholder="Full Name" onChange={this.handleChange} ref="name" />
          </Form.Group>
          <Form.Group controlId="userAge">
            <Form.Control type="number" placeholder="Age" onChange={this.handleChange} ref="age" />
          </Form.Group>
          <Form.Group controlId="userSex">
            <Form.Control type="text" placeholder="Sex" onChange={this.handleChange} ref="sex" />
          </Form.Group>
          <Form.Group controlId="userFile">
          <Form.File id="custom-file" label="File Input" onChange={this.captureFile} custom />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

      </Container>
    );
  }
}


export default App;
