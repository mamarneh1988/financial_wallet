import React, { Component } from "react";
import WalletContract from "./contracts/wallet.json";
import getWeb3 from "./getWeb3";
import bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import parse from 'html-react-parser';

import "./App.css";

class App extends Component {
  state = { txnlist:'',txnresult: '', storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = WalletContract.networks[networkId];
      const instance = new web3.eth.Contract(
        WalletContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  inputChnageHandler = async (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    console.log("name" + nam);
    console.log("val" + val);
    this.setState({
      [nam]: val
    });

  }

  onSubmitHandler = async (event) => {
    event.preventDefault();
    const { accounts, contract } = this.state;
    await contract.methods.createTxn(this.state.transactionID,
      this.state.transactionDesc,
      this.state.municipalities,
      this.state.department,
      this.state.amount,
      this.state.sender,
      this.state.receivers,
      this.state.transactionDate).send({ from: accounts[0] });
  }
  retreivetxn = async (event) => {
    event.preventDefault();
    const { accounts, contract } = this.state;
    const res = await contract.methods.getTxnByID(this.state.transactionID).call();

    const htmlBody = '<ul><li>' + res[0] + '</li><li>' + res[1] + '</li><li>' + res[2] + '</li><li>' + res[3] + '</li><li>' + res[4] + '</li><li>' + res[5] + '</li><li>' + res[6] + '</li><li>' + res[7] + '</li></ul>';
    this.setState({ transactionID: res[0] });
    this.setState({ transactionDesc: res[1] });
    this.setState({ municipalities: res[2] });
    this.setState({ department: res[3] });
    this.setState({ amount: res[4] });
    this.setState({ receivers: res[5] });
    this.setState({ sender: res[6] });
    this.setState({ transactionDate: res[7] });


    console.log(res);
  }
  listtransactions = async (event) => {
    event.preventDefault();
    const { accounts, contract } = this.state;
    const txnCount = await contract.methods.txnCount().call();
    console.log("transaction count = " + txnCount);
    let tableBody= '';
    for(let i=1;i<=txnCount;i++){
      const res = await contract.methods.transactionsMapping(i).call();
     if(res!=null){
      tableBody =tableBody+'<tr><td>'+res[0]+'</td><td>'+res[1]+'</td><td>'+res[2]+'</td><td>'+res[3]+'</td><td>'+res[4]+'</td><td>'+res[5]+'</td><td>'+res[6]+'</td><td>'+res[7]+'</td></tr>';
     }
    }

    this.setState({txnlist:tableBody});
    



  }
  runExample = async () => {
    const { accounts, contract } = this.state;
    console.log(contract);
    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Wallet dApp with Ethereum</h1>
        <div className="container">

          <div className="row">
            <div className="col-lg-12">
              <div className="retreive">

                <form onSubmit={this.retreivetxn}>
                  <input className="form-control" onChange={this.inputChnageHandler} name="transactionID" placeholder="Transaction ID"  ></input>
                  <input type="submit" className="btn btn-primary" value="View Txn" ></input>
                  <p>{this.state.txnresult}</p>
                </form>

              </div>

              <form onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                  <label htmlFor="transactionID">Transaction ID</label>
                  <input className="form-control" onChange={this.inputChnageHandler} name="transactionID" placeholder="transactionID" value={this.state.transactionID} ></input>
                  <label htmlFor="transactionDesc">Transaction Description</label>
                  <input className="form-control" onChange={this.inputChnageHandler} name="transactionDesc" placeholder="Description" value={this.state.transactionDesc} ></input>
                  <label htmlFor="municipalities">SelectMunicipality</label>
                  <select className="form-control" onChange={this.inputChnageHandler} name="municipalities" value={this.state.municipalities}>
                    <option value="1">Khan Younes</option>
                    <option value="2">Deir Al Balah</option>
                    <option value="3">Gaza</option>
                    <option value="4">Rafah</option>
                    <option value="5">Jenin</option>
                    <option value="6">Nablus</option>
                    <option value="7">Jerusalem</option>
                    <option value="8">Haifa</option>
                    <option value="9">Acre</option>
                  </select>

                  <label htmlFor="department">Select Department</label>

                  <select className="form-control" onChange={this.inputChnageHandler} name="department" value={this.state.department}>
                    <option value="1">Financial Department</option>
                    <option value="2">HR</option>
                    <option value="3">Lands</option>
                    <option value="4">Asets</option>
                    <option value="5">Leasing Department</option>
                  </select>
                  <label htmlFor="amount">Amount</label>
                  <input className="form-control" onChange={this.inputChnageHandler} name="amount" placeholder="amount" value={this.state.amount} ></input>

                  <label htmlFor="receivers">Receiver</label>
                  <input className="form-control" onChange={this.inputChnageHandler} name="receivers" placeholder="receiver" value={this.state.receivers}  ></input>
                  <label htmlFor="Sender">Sender</label>
                  <input className="form-control" onChange={this.inputChnageHandler} name="sender" placeholder="Sender" value={this.state.sender}></input>
                  <label htmlFor="transactionDate">Transaction Date</label>
                  <input className="form-control" onChange={this.inputChnageHandler} name="transactionDate" placeholder="Transaction Date" value={this.state.transactionDate} ></input>
                  <input type="submit" className="btn btn-primary" value="Create Txn" ></input>
                </div>
              </form>

            </div>
            <div className="row">
              <div className="col-lg-12">

                <button  className="btn btn-primary" onClick={this.listtransactions} >List Transactions</button>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <table className="table">
                  <thead> <tr><th>Transaction ID</th>
                    <th>Description</th>
                    <th>Municplaity</th>
                    <th>Department</th>
                    <th>Amount</th>
                    <th>Receiver</th>
                    <th>Sender</th>
                    <th>Transaction ID</th>
                  </tr>
                  </thead>
                  <tbody>
                  {parse(this.state.txnlist)}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div >
      </div >
    );
  }
}

export default App;
