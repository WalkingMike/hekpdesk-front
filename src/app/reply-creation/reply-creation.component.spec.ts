import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyCreationComponent } from './reply-creation.component';

describe('ReplyCreationComponent', () => {
  let component: ReplyCreationComponent;
  let fixture: ComponentFixture<ReplyCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
