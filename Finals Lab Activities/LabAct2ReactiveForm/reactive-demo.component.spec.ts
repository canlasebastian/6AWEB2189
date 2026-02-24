import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveDemo } from './reactive-demo.component';

describe('ReactiveDemo', () => {
  let component: ReactiveDemo;
  let fixture: ComponentFixture<ReactiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
