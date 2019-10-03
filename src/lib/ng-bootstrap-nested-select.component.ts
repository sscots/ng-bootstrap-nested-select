import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {NgbDropdown, NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import * as similarity from 'string-similarity';

export enum KEY_CODE {
  ENTER = 13,
  UP_ARROW = 38,
  DOWN_ARROW = 40
}

export interface NgBootstrapNestedSelectAction {
  id: any;
  label: string;
}

export interface NgBootstrapNestedSelectSettings {
  filter: { fields: any[] };
  field: string;
  scroll: boolean;
  top: boolean;
  selectAll: boolean;
  label: string;
  collapsed: boolean;
  clear: boolean|string;
  strict: boolean;
  actions: string;
  required: boolean;
  indexedOptions: boolean;
  numberInput: boolean;
  matchRating: number;
  emptyText: string;
  popoverTitle: boolean|string;
}

export class NgBootstrapNestedSelectDefaultSetting implements NgBootstrapNestedSelectSettings {
  filter = { fields: ['name'] };
  field = 'options';
  scroll = true;
  top = false;
  selectAll = false;
  label = 'name';
  collapsed = false;
  clear = 'Clear';
  strict = true;
  actions = null;
  required = false;
  indexedOptions = false;
  numberInput = false;
  matchRating = .4;
  emptyText = 'No Options Available';
  popoverTitle = 'Details:';
}

@Component({
  selector: 'nested-select',
  templateUrl: './ng-bootstrap-nested-select.component.html',
  styleUrls: ['./ng-bootstrap-nested-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgBootstrapNestedSelectComponent implements OnInit {
  @HostBinding('class.disabled') disable = false;
  @HostBinding('class.required') required = false;
  @HostBinding('class.invalid') invalid = true;
  @ViewChild('filterInput', {static: false}) private filterInputRef: ElementRef;
  @ViewChild('nestedDrop', {static: false}) private nestedDropRef: NgbDropdown;

  // Local list of options
  _options: any[] = [];

  // List of options to display in the dropdown
  @Input() set options(options) {
    this.setOptions(options);
    // resetSelected needs to wait for the settings var to populate, so use setTimeout to delay execution.
    setTimeout(() => {
      this.resetSelected(this._options);
    }, 500);
  }

  // Default option to be set
  @Input() set default(defautOption) {
    if(typeof defautOption === 'object') {
      this._selected = {...defautOption};
    } else {
      this._selected = {
        name: defautOption,
        selected: true
      };
    }
    if(defautOption) this.filterOn = false;
    this.validate();
  }

  // Settings to control component
  @Input() settings: NgBootstrapNestedSelectSettings = new NgBootstrapNestedSelectDefaultSetting();
  _disabled: boolean = false;

  // Disabled the select box
  @Input() set disabled(bool) {
    if(bool) this.disable = true;
    else this.disable = false;
    this._disabled = bool;
  }

  // Array of action buttons/links to add to select box
  @Input() actions: NgBootstrapNestedSelectAction[] = [];

  // Emit selected value when selected
  @Output() selected: EventEmitter<any> = new EventEmitter();

  // Emit action value when action is selected
  @Output() actionSelected: EventEmitter<any> = new EventEmitter();

  // Array of filted options
  _optionsFiltered: any[] = [];

  // The filter string to search through options
  _searchTerm: string = '';

  // The selected option
  _selected: any = {};

  public filterOn: boolean = true;

  constructor(
    private cb: ChangeDetectorRef,
    private ngbConfig: NgbDropdownConfig
  ) {
    this.ngbConfig.autoClose = 'outside';
  }

  /**
   * Init the default settings if they aren't provided in the settings object
   */
  ngOnInit() {
    let defaultSettings = new NgBootstrapNestedSelectDefaultSetting();
    for(let key in defaultSettings) {
      if(!this.settings[key] && this.settings[key] !== false) this.settings[key] = defaultSettings[key];
    }

    // Add 'required' class
    if(this.settings.required) {
      this.required = true;
      this.validate();
    }

    this.cb.markForCheck();
  }

  /**
   * Handle a keyboard event when toggle through the options list
   * @param {KeyboardEvent} event
   */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch(event.keyCode) {
      case KEY_CODE.UP_ARROW:
      case KEY_CODE.DOWN_ARROW:
        this.arrowOption(event.keyCode);
        break;
      case KEY_CODE.ENTER:
        this.selectOption(null, this._selected);
        break;
    }
  }

  /**
   * Check if we have any options to select from
   * @returns {boolean}
   */
  hasOptions() {
    console.log(this.settings);
    return this._options.filter((op) => {
      if(op[this.settings.label] && op[this.settings.label] !== '') return true;
    }).length > 0;
  }

  /**
   * Resursively reset the "selected" flag for every option
   * @param options
   */
  resetSelected(options: any[] = []) {
    options.forEach(opt => {
      opt.selected = false;
      opt.collapsed = false;
      // Check if this options has child options
      if(this.settings && opt[this.settings.field] && opt[this.settings.field].length > 0) {
        this.resetSelected(opt[this.settings.field]);
      }
    });
  }

  /**
   * Select a value from the options and emit output
   * @param {MouseEvent|null} event
   * @param {any=null} option
   * @param {boolean=false} toggle
   */
  selectOption(event: (MouseEvent|null), option: any = null, toggle: boolean = false) {
    if(!option) {
      option = {selected: true};
      option[this.settings.label] = event;
    }

    if(toggle || (option[this.settings.field] && option[this.settings.field].length && !this.settings.selectAll)) {
      option.selected = !option.selected;
      event.stopPropagation();
    } else {
      this._selected = {...option};
      this._searchTerm = this._selected[this.settings.label];

      if(this.settings.indexedOptions) this.selected.emit(option[this.settings.label]);
      else this.selected.emit(option);

      if(!this.settings.selectAll) this.filterOn = false;
      this.nestedDropRef.close();
    }

    this.validate();

    this.cb.detectChanges();
  }

  /**
   * Check if we have a value selected
   */
  validate() {
    if(Object.keys(this._selected).length > 0) this.invalid = false;
    else this.invalid = true;
  }

  /**
   * Resursive filter the list of options based on the kyeboard input
   * @param {string} searchTerm - The text to search for
   * @param {any[]} options - The options array to search through
   * @returns {number} found - value is > 1 if match is found, < 0 if no match
   */
  filterOptions(searchTerm: string = null, options: any[] = []) {
    this.nestedDropRef.open();
    if(this._searchTerm.length === 0) return;

    if(!searchTerm) {
      this._optionsFiltered = [];
      if(!this._searchTerm) this._optionsFiltered = this._options.slice(0);
      searchTerm = this._searchTerm;
      options = this._options.slice(0);
    }

    let found = -1;
    options.forEach((opt, index) => {
      this.settings.filter.fields.forEach(field => {
        let optTerm = opt[field];
        found = optTerm.search(new RegExp(searchTerm, 'i'));
        let similar = similarity.compareTwoStrings(optTerm, searchTerm);
        if((found >= 0 || similar >= this.settings.matchRating) && this._optionsFiltered.indexOf(opt) < 0) {
          opt.match = similar;
          this._optionsFiltered.push(opt);
        }
      });

      if(opt[this.settings.field] && opt[this.settings.field].length) {
        found = this.filterOptions(searchTerm, opt[this.settings.field]);
      }
    });
    this._optionsFiltered.sort((a, b) => {
      return b.match - a.match;
    });
    return found;
  }

  /**
   * Change the selected value based on if the up/down arrow key is typed
   * @param {number} direction - The keycode of the key selected
   */
  arrowOption(direction: number) {
    this.filterOn = false;
    if(!this._selected) this._selected = this._optionsFiltered[0];
    else {
      // Do for loop so that we can break out of it.
      for(let index = 0; index < this._optionsFiltered.length; index++) {
        let opt = this._optionsFiltered[index];
        let moveSelected = 1;
        if(direction === KEY_CODE.UP_ARROW) moveSelected = -1;
        if(opt === this._selected && this._optionsFiltered[(index + moveSelected)]) {
          this._selected = this._optionsFiltered[(index + moveSelected)];
          break;
        }
      }
    }
  }

  /**
   * Emit the action selected to the parent component
   * @param action
   */
  selectAction(action: NgBootstrapNestedSelectAction) {
    this.actionSelected.emit(action);
  }

  /**
   * Display the keyboard input filter
   */
  showFilter() {
    this._optionsFiltered = this._options.slice(0);
    this.filterOn = true;
    this._searchTerm = '';
    setTimeout(() => {
      this.filterInputRef.nativeElement.focus();
      this.nestedDropRef.open();
    }, 100);
  }

  /**
   * Hide the keyboard input filter
   */
  hideFilter() {
    this.filterOn = false;
  }

  /**
   * Set the local this._options array
   * @param {array} options - Array of objects or values.
   */
  setOptions(options: Array<any>) {
    this._options = [];
    options.forEach(opt => {
      if(typeof opt === 'object') { // "options" is an array of objects
        let objCopy = {...opt};
        objCopy.selected = false;
        this._options.push(objCopy);
      } else { // "options" is an array of values
        this._options.push({
          name: opt,
          selected: false
        });
      }
      this._optionsFiltered = this._options.slice(0);
    });
  }
}
