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

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<nested-select [items]="list" (selected)="onSelect($event)" ></nested-select>
```

## License

MIT © [Scot Schroeder](mailto:scotschroeder@gmail.com)
