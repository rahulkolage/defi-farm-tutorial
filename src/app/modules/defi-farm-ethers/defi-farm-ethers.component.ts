import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Web3 from 'web3';
import { ethers } from "ethers";

import DaiToken from '../../../../build/contracts/DaiToken.json';
import DappToken from '../../../../build/contracts/DappToken.json';
import TokenFarm from '../../../../build/contracts/TokenFarm.json';


@Component({
  selector: 'defi-farm-ethers',
  templateUrl: './defi-farm-ethers.component.html'
})
export class DefiFarmEthersComponent implements OnInit {
  accounts: any;
  investorAccount: string = '0x0';
  daiToken: any = {};
  dappToken: any = {};
  tokenFarm: any = {};

  daiTokenSigner: any = {};
  dappTokenSigner: any = {};
  tokenFarmSigner: any = {};

  daiTokenBalance: string = '0';
  dappTokenBalance: string = '0';
  stakingBalance: string = '0';
  loading: boolean = false;
  provider: any;
  signer: any;
  ethers: any = ethers;

  form: FormGroup;

  // NOTE: In ethers js, Contracts methods are accesible without use of contractInstance.methods.methodName
  //  e.g. await daiToken.balanceOf(this.investorAccount);

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // init form
    this.form = this.fb.group({
      tokens: ['', Validators.required]
    })
    // init web3
    this.bootstrapWeb3();
  }

  async bootstrapWeb3() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      this.accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      // this.provider = new Web3(window.ethereum);
      // provider
      this.provider = new ethers.providers.Web3Provider(window.ethereum);

      // signer
      this.signer = this.provider.getSigner();

      // let signnerAdd = await this.signer.getAddress();
      // console.log(signnerAdd);

      // in ethersjs we can get account array using following code, json rpc method eth_requestAccounts is also fine
      // this.provider.listAccounts().then((accounts) => {
      //   console.log(accounts);
      // });
    } else if (window.web3) {
      this.provider = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
  }

  async loadBlockchainData() {
    // const accounts = await this.web3.eth.getAccounts();  <----- Not working with latest metamask changes
    this.investorAccount = this.accounts[0];

    try {
      // but method below returns networkId
      const networkId = await window.ethereum.request({
        method: 'net_version',
      });

      const daiTokenData = DaiToken.networks[networkId];

      // Load DaiToken contract
      if (daiTokenData) {
        const daiToken = new ethers.Contract(daiTokenData.address, DaiToken.abi, this.provider);
        this.daiToken = daiToken;

        this.daiTokenSigner = new ethers.Contract(daiTokenData.address, DaiToken.abi, this.signer);   // this.daiToken.connect(this.signer);

        // //  Returns ether balance
        // const etherBal = await this.provider.getBalance(this.investorAccount);
        // // etherBal.toString()
        // console.log(ethers.utils.formatEther(etherBal), 'ETH');

        //  .call not required
        let daiTokenBalance = await daiToken.balanceOf(this.investorAccount);

        this.daiTokenBalance = daiTokenBalance; // daiTokenBalance.toString();
      } else {
        window.alert('DaiToken contract not deployed to detected network.');
      }

      // Load DappToken
      const dappTokenData = DappToken.networks[networkId];
      if (dappTokenData) {
        const dappToken = new ethers.Contract(dappTokenData.address, DappToken.abi, this.provider);
        this.dappToken = dappToken;
        this.dappTokenSigner = new ethers.Contract(dappTokenData.address, DappToken.abi, this.signer);  //  this.dappToken.connect(this.signer);

        let dappTokenBalance = await dappToken.balanceOf(this.investorAccount);
        this.dappTokenBalance = dappTokenBalance;
      } else {
        window.alert('DappToken contract not deployed to detected network.');
      }

      // Load TokenFarm
      const tokenFarmData = TokenFarm.networks[networkId];
      if (tokenFarmData) {
        const tokenFarm = new ethers.Contract(tokenFarmData.address, TokenFarm.abi, this.provider);
        this.tokenFarm = tokenFarm;
        this.tokenFarmSigner = new ethers.Contract(tokenFarmData.address, TokenFarm.abi, this.signer);  //  this.tokenFarm.connect(this.signer);

        let stakingBalance = await tokenFarm.stakingBalance(this.investorAccount);
        this.stakingBalance = stakingBalance;
      } else {
        window.alert('TokenFarm contract not deployed to detected network.');
      }
    } catch (error) {
      console.log(error);
    }
  }


  get formFields() {
    return this.form.controls;
  }

  stakeTokens() {
    if(this.form.valid) {
      // submit form
      this.loading = true;
      //  stakeTokens allows TokenFarm contract to transfers dai token of investors to contract
      //  for staking on behalf of Investor

      let callStakeFn = async () => {
        this.daiTokenSigner.approve(this.tokenFarm.address, this.formFields.tokens.value)
        .then((hash: any) => {
          this.tokenFarmSigner.stakeTokens(this.formFields.tokens.value)
            .then((hash: any) => {
              console.log(hash);
              this.loading = false;
            }, (err: any) => {
              console.log(err);
            });
        },  (err: any) => {
          this.loading = false;
          console.log(err);
        });

        // https://ethereum.stackexchange.com/questions/87643/how-to-listen-to-contract-events-using-ethers-js/87669
      }
      callStakeFn();
    }
  }

  unStakeTokens() {
    this.loading = true;
    this.tokenFarmSigner.unstakeTokens()
    .then((hash: any) => {
      this.loading = false;
      console.log(hash);
    }, (err: any) => {
      this.loading = false;
      console.log(err);
    });
  }
}
