import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbDropdownModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {NgBootstrapNestedSelectComponent} from './ng-bootstrap-nested-select.component';

@NgModule({
  declarations: [NgBootstrapNestedSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbPopoverModule
  ],
  exports: [NgBootstrapNestedSelectComponent]
})
export class NgBootstrapNestedSelectModule { }
