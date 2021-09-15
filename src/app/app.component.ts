import { Component, OnInit } from '@angular/core';
// import Web3 from 'web3';
// import DaiToken from '../../build/contracts/DaiToken.json';
// import DappToken from '../../build/contracts/DappToken.json';
// import TokenFarm from '../../build/contracts/TokenFarm.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // accounts: any;
  // investorAccount: string = '0x0';
  // daiToken: any = {};
  // dappToken: any = {};
  // tokenFarm: any = {};
  // daiTokenBalance: string = '0';
  // dappTokenBalance: string = '0';
  // stakingBalance: string = '0';
  // loading: boolean = true;
  // web3: any;

  constructor() {}

  ngOnInit() {
    // this.bootstrapWeb3();
  }

  // async bootstrapWeb3() {
  //   await this.loadWeb3();
  //   await this.loadBlockchainData();
  // }

  // async loadWeb3() {
  //   if (window.ethereum) {
  //     this.accounts = await window.ethereum.request({
  //       method: 'eth_requestAccounts',
  //     });
  //     this.web3 = new Web3(window.ethereum);
  //     // await window.ethereum.enable();  // no longer required
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //   } else {
  //     window.alert(
  //       'Non-Ethereum browser detected. You should consider trying MetaMask!'
  //     );
  //   }
  // }

  // async loadBlockchainData() {
  //   // const accounts = await this.web3.eth.getAccounts();  <----- Not working with latest metamask changes
  //   this.investorAccount = this.accounts[0];

  //   try {

  //     // await this.web3.eth.getBalance(this.investorAccount).then(console.log);  // <--  not working

  //     // await this.web3.eth.net.getId().then(console.log);                       // <--  not working
  //     // const networkId1 = await this.web3.eth.net.getId().then(console.log);
  //     // console.log(networkId1);
  //     // web3.eth.net.getId() // method Not working, nothing happens, no error

  //     // but method below returns networkId
  //     const networkId = await window.ethereum.request({
  //       method: 'net_version',
  //     });

  //     const daiTokenData = DaiToken.networks[networkId];

  //     // Load DaiToken contract
  //     if (daiTokenData) {
  //       const daiToken = new this.web3.eth.Contract(
  //         DaiToken.abi,
  //         daiTokenData.address
  //       );

  //       this.daiToken = daiToken;

  //       //  balanceOf not working, no error
  //       let daiTokenBalance = await daiToken.methods.balanceOf(this.investorAccount).call()
  //       // .then(console.log)
  //       // .catch(console.error);

  //       this.daiTokenBalance = daiTokenBalance.toString();
  //       console.log(this.daiTokenBalance);
  //     } else {
  //       window.alert('DaiToken contract not deployed to detected network.');
  //     }

  //     // Load DappToken
  //     const dappTokenData = DappToken.networks[networkId];
  //     if (dappTokenData) {
  //       const dappToken = new this.web3.eth.Contract(
  //         DappToken.abi,
  //         dappTokenData.address
  //       );
  //       this.dappToken = dappToken;
  //       let dappTokenBalance = await dappToken.methods
  //         .balanceOf(this.investorAccount)
  //         .call();
  //       this.dappTokenBalance = dappTokenBalance.toString();
  //     } else {
  //       window.alert('DappToken contract not deployed to detected network.');
  //     }

  //     // Load TokenFarm
  //     const tokenFarmData = TokenFarm.networks[networkId];
  //     if (tokenFarmData) {

  //       const tokenFarm = new this.web3.eth.Contract(
  //         TokenFarm.abi,
  //         tokenFarmData.address
  //       );

  //       this.tokenFarm = tokenFarm;

  //       let stakingBalance = await tokenFarm.methods
  //         .stakingBalance(this.investorAccount)
  //         .call();
  //       this.stakingBalance = stakingBalance.toString();
  //     } else {
  //       window.alert('TokenFarm contract not deployed to detected network.');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
