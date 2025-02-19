import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageXpGraphComponent } from './page-xp-graph.component';

describe('PageXpGraphComponent', () => {
  let component: PageXpGraphComponent;
  let fixture: ComponentFixture<PageXpGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageXpGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageXpGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
