# ng-bootstrap-nested-select

[VIEW DEMO](https://codesandbox.io/s/angular-fslxt)

## Installation

To install this library, run:

```bash
$ npm install ng-bootstrap-nested-select --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ng-bootstrap-nested-select
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { NgBootstrapNestedSelectModule } from 'ng-bootstrap-nested-select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgBootstrapNestedSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Inputs
| Option        | Type           | Description
| ------------- |:-------------:| ---------|
| options     | Array |  An array of object where each must have a "name" and "options" fields
| settings  |   NgBootstrapNestedSelectSettings | An object of settings to control the select box
| default      | Object  | The default object to show, from the "options" list
| actions   |   NgBootstrapNestedSelectActions   |   An array of action (links or buttons) that will be displayed within the select box
| disabled  | Boolean   | Disable the select box
### Outputs
| Option        | Type           | Description
| ------------- |:-------------:| ---------|
| selected     | object |  Passes back selected object
| actionSelect  | object    | Passes back the action object when one is selected
### NgBootstrapNestedSelectActions [actions] Input
| Option        | Type           | Description
| ------------- |:-------------:| ---------|
| id     | Number |  Unique ID for this action
| label  | String    | Label that is displayed to the user
### NgBootstrapNestedSelectSettings [settings] Input
| Option        | Type           | Description  | Default
| ------------- |:-------------:| :-----:| ---------|
| field      | String | The name of the field that you want to iterate over, which contains the array of options | 'options'
| top      | Boolean      |   Display select options above input field | false
| scroll | Boolean      |    Use min-height and overflow-y scroll css to limit height of select box | true
| selectAll | Boolean   | Allows user to select multi options   | false
| collapsed | Boolean   | Collapse all child options and only display top most parent   |   false
| label | String    |   Name of the field in the option object to display as label in drop down.    | 'name'
| clear | String or Boolean   |   Set text of clear button. Setting to false will hide clear button.   | 'Clear'
| strict    | Boolean   |   Disabled search. Only list options. |   false
| filter    | {fields: [...array of fields as strings]}   | Fields in each option to search for when filtering.
| actions   | String    |   The style of the action options. 'link' = plain text, 'buttons' = bootstrap button |   'link'
| required  | Boolean   |   Field is required. Adds "required" class.   | false
| indexedOptions    | Boolean
| numberInput   | Boolean   | <input> type is "number"  | false
| matchRating   | Float |   Using the "string-similarity" package, a rating number between 0-1. See https://www.npmjs.com/package/string-similarity | 0.4
| emptyText |   String  | Text to display when no options are available
| popoverTitle  | String or Boolean | When disabled, select box will have a popover of option selected. This is title to that popover. false = hide popover

```html
<!--
myOptions = [
    { 
        name: 'Parent Item', 
        options: [
            { 
                name: 'Child Item', 
                options [
                    ...
                ]
            }
        ]
    }
];
-->
<nested-select 
    [options]="myOptions" 
    [default]="myOptions[0].options[0]" 
    [settings]="{collapsed: true, strict: false}" 
    [actions]="{id: 1, label: 'Add Option'}"
    (selected)="triggerSelected($event)" 
    (actionSelected)="triggerAction($event)">

</nested-select>
```

## License

MIT © [Scot Schroeder](mailto:scot@joebotweb.com)
