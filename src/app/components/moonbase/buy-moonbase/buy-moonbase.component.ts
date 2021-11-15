import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/services/wallet-connect.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpApiService } from 'src/app/services/http-api.service';

import { ModalForTransactionComponent } from '../modal-for-transaction/modal-for-transaction.component';
import { environment } from './../../../../environments/environment';

import { ToastrService } from 'ngx-toastr';
import { WalletConnectComponent } from '../../base/wallet/connect/connect.component';

@Component({
  selector: 'app-buy-moonbase',
  templateUrl: './buy-moonbase.component.html',
  styleUrls: ['./buy-moonbase.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class BuyMoonbaseComponent implements OnInit {

  current = 0;
  inputnumber = [...Array(5).fill(0)];
  public lootboxfloating = ['wood', 'silver', 'gold', 'diamond']
  isConnected: boolean = false;
  isWrongNetwork: boolean = false;
  invisible: boolean = false;
  popupClosed: boolean = false;
  static readonly routeName: string = 'buy_moonbase';
  public isTooltipActive: boolean[] = [false, false, false, false];
  public lootBoxDetails: any = [];

  data: any;
  supplyDetails: any;
  balance: any;
  moonBoxLimitDetails: any;
  maxSupply = [];
  fadeOut: boolean = false;
  priceForMoonBox = 0;

  constructor(
    public walletConnectService: WalletConnectService, 
    private toastrService:ToastrService,
    public dialog: MatDialog,
    public httpApi: HttpApiService
  ) { this.lootBoxDetails = httpApi.lootBoxDetails; }

  ngOnInit(): void {
    this.walletConnectService.init();

    (async () => {
      this.walletConnectService.getData().subscribe((data) => {
        if (data !== undefined && data.address != undefined && data != this.data) {
          this.data = data;
          this.isConnected = this.walletConnectService.isWalletConnected();
          
          if (this.data.networkId.chainId != environment.chainId) {
            this.isWrongNetwork = true;
            this.toastrService.error("You are on the wrong network");
          }
          else {
            this.getMoonShootBalance();
          }
        } 
      });

      this.getMaxSupply();
    })();
  }

  async getBoxPrices() {
    try {
      this.moonBoxLimitDetails = await this.walletConnectService.getDetailsMoonboxlimit();

      let priceForMoonBoxTemp: any = await this.walletConnectService.getDetailsMoonboxPrice();
      this.priceForMoonBox = priceForMoonBoxTemp / 1e18;
    } catch (e) {
      console.error(e)
    }
  }

  async getMoonShootBalance() {
    this.balance = await this.walletConnectService.getUserBalance( this.data.address );
    this.getBoxPrices();
  }

  next() {
    this.current = this.current < this.lootBoxDetails.length - 1 ? this.current + 1 : 0;
  }

  prev() {
    this.current = this.current > 0 ? this.current - 1 : this.lootBoxDetails.length - 1;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(WalletConnectComponent, { width: 'auto' });

    dialogRef.afterClosed().subscribe((result) => {
      this.walletConnectService.getData().subscribe((data) => {
        this.data = data;
        this.isConnected = (data.address !== undefined)
      });
    });
  }

  getMaxSupply() {
    this.httpApi.getMaxSupply(this.data?.address).subscribe( ( response: any ) => {
      if( response.isSuccess ) {
        this.supplyDetails  = response.data.data;

        for (let i = 0; i < this.inputnumber.length ; i++) {
          if( this.supplyDetails[ this.lootBoxDetails[i].name ] > 0 )
            this.inputnumber[i+1] = 1;

          this.maxSupply[i] = this.supplyDetails[this.lootBoxDetails[i].name];
        }
      }
    } )
  }

  buyMoonBase(index: number) {
    if (this.data === undefined || this.data.address === undefined)
      this.openDialog();
    else
      this.submitBetToContract(index);
  }

  async submitBetToContract(index: number) {
    var maxSupply = this.supplyDetails[this.lootBoxDetails[index - 1].name];
    if (maxSupply == 0) {
      return false;
    }
    var moonShootLimit = this.moonBoxLimitDetails[index - 1];
    if (Number(this.balance) < Number(moonShootLimit)) {
      this.httpApi.showToastr("You are not eligible for this Tier", false)
      return false;
    }
    if (maxSupply < this.inputnumber[index] || this.inputnumber[index] == 0) {
      alert("Invalid bet");
      return false;
    }

    this.invisible = true;
    this.fadeOut = true;

    let dialogRef = this.dialog.open(ModalForTransactionComponent, {
      width: 'auto',
      disableClose: true,
      data: {
        inputNumber: this.inputnumber,
        lootBoxName: this.lootBoxDetails[index - 1].name,
        data: this.data,
        index: index,
        balance: this.balance,
        isArtistLootBox: false
      },
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.invisible = false;
      this.getMaxSupply();
      this.fadeOut = false;
      this.popupClosed = true;
    });

    return true;
  }
}