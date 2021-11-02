import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletConnectComponent } from './connect.component';

@NgModule({
  declarations: [
    WalletConnectComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    WalletConnectComponent
  ]
})
export class WalletConnectModule {}
