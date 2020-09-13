import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewComponent } from './preview.component';
import { SharedModule } from '@/app/shared/shared.module';


@NgModule({
  declarations: [PreviewComponent],
  imports: [
    CommonModule,
    PreviewRoutingModule,
    SharedModule
  ]
})
export class PreviewModule { }
