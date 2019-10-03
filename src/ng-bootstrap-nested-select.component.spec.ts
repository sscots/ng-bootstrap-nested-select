import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapNestedSelectComponent } from './ng-bootstrap-nested-select.component';

describe('NgBootstrapNestedSelectComponent', () => {
  let component: NgBootstrapNestedSelectComponent;
  let fixture: ComponentFixture<NgBootstrapNestedSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapNestedSelectComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
});
