import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlTemplateDisplayComponent } from './sql-template-display.component';

describe('SqlTemplateDisplayComponent', () => {
  let component: SqlTemplateDisplayComponent;
  let fixture: ComponentFixture<SqlTemplateDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqlTemplateDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SqlTemplateDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
