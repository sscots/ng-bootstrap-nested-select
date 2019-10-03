import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgBootstrapNestedSelectComponent} from './ng-bootstrap-nested-select.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule
    ],
    declarations: [NgBootstrapNestedSelectComponent],
    exports: [NgBootstrapNestedSelectComponent]
})
export class NgBootstrapNestedSelectModule { }
