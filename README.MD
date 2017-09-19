# ng-bootstrap-nested-select

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
| options     | array |  An array of object where each must have a "name" and "options" fields
| default      | object  | The default object to show, from the "options" list
### Outputs
| Option        | Type           | Description
| ------------- |:-------------:| ---------|
| selected     | object |  Passes back selected object
### Settings [settings] options
| Option        | Type           | Default  | Description
| ------------- |:-------------:| :-----:| ---------|
| field      | string | 'options' | The name of the field that you want to iterate over
| top      | boolean      |   false | Display select options above input field
| scroll | boolean      |    true | Use min-height and overflow-y scroll css to limit height of select box

```html
<!--
list = [
    { name: 'Parent Item', options: [
        { name: 'Child Item', options [
            ...
        ]}
    ]}
];
-->
<nested-select [items]="list" [default]="list[0][0]" [settings]="{field: 'options', top: false, scroll: true}" (selected)="onSelect($event)" ></nested-select>
```

## License

MIT © [Scot Schroeder](mailto:scot@joebotweb.com)
