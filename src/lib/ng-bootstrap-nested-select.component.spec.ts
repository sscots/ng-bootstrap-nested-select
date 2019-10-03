import {CommonModule} from '@angular/common';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {NgbDropdownModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {NgBootstrapNestedSelectComponent} from './ng-bootstrap-nested-select.component';

describe('NgBootstrapNestedSelectComponent', () => {
  let component: NgBootstrapNestedSelectComponent;
  let fixture: ComponentFixture<NgBootstrapNestedSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        NgbDropdownModule,
        NgbPopoverModule
      ],
      declarations: [ NgBootstrapNestedSelectComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapNestedSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays options on click', () => {
    spyOn(component, 'resetSelected');

    const select = fixture.debugElement.nativeElement.querySelector('.dropdown-toggle');
    select.click();

    fixture.whenStable().then(() => {
      expect(component.resetSelected).toHaveBeenCalled();
    });
  });
});
