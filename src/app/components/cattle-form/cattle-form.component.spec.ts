import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CattleFormComponent } from './cattle-form.component';

describe('CattleFormComponent', () => {
  let component: CattleFormComponent;
  let fixture: ComponentFixture<CattleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CattleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CattleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
