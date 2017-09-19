import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nested-select',
    templateUrl: './ng-bootstrap-nested-select.component.html',
    styleUrls: ['./ng-bootstrap-nested-select.component.scss']
})
export class NgBootstrapNestedSelectComponent {
    @Input() options: any = [];
    @Input() default: any = {};
    @Input() settings: {
        field: string,
        scroll: boolean,
        top: boolean
    };
    @Output() selected: EventEmitter<any> = new EventEmitter();
    level: number = 1;
    _selected: string = '';

    constructor() { }

    ngOnInit() {
        if(!this.settings.field) this.settings.field = 'options';
        if(!this.settings['scroll']) this.settings.scroll = true;
        if(!this.settings['top']) this.settings.top = false;
        this._selected = this.default;
    }

    selectOption(event, option) {
        if(option[this.settings.field].length) event.stopPropagation()
        else {
            this._selected = option;
            this.selected.emit(this._selected);
        }
    }
}
