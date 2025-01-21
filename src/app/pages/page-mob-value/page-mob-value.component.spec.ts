import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMobValueComponent } from './page-mob-value.component';

describe('PageMobValueComponent', () => {
  let component: PageMobValueComponent;
  let fixture: ComponentFixture<PageMobValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMobValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMobValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
