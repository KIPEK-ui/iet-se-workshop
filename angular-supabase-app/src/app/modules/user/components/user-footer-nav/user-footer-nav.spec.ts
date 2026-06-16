import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFooterNav } from './user-footer-nav';

describe('UserFooterNav', () => {
  let component: UserFooterNav;
  let fixture: ComponentFixture<UserFooterNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFooterNav],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFooterNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
