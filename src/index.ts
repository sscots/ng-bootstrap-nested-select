import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgBootstrapNestedSelectComponent } from './ng-bootstrap-nested-select.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        NgbModule
    ],
    declarations: [NgBootstrapNestedSelectComponent],
    exports: [NgBootstrapNestedSelectComponent]
})
export class NgBootstrapNestedSelectModule { }
