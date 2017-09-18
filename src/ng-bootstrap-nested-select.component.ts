import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nested-select',
    templateUrl: './ng-bootstrap-nested-select.component.html',
    styleUrls: ['./ng-bootstrap-nested-select.component.scss']
})
export class NgBootstrapNestedSelectComponent {
    @Input() items: any = [];
    @Input() default: any = {};
    @Output() selected: EventEmitter<any> = new EventEmitter();
    level: number = 1;
    _selected: string = '';

    constructor() { }

    ngOnInit() {
        this._selected = this.default;
    }

    selectOption(event, option) {
        if(option.products.length) event.stopPropagation()
        else {
            this._selected = option;
            this.selected.emit(this._selected);
        }
    }
}
