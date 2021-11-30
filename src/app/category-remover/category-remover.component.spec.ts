import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRemoverComponent } from './category-remover.component';

describe('CategoryRemoverComponent', () => {
  let component: CategoryRemoverComponent;
  let fixture: ComponentFixture<CategoryRemoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryRemoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryRemoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
