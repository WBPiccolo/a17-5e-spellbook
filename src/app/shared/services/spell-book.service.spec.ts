import { TestBed } from '@angular/core/testing';

import { SpellBookService } from './spell-book.service';

describe('SpellBookService', () => {
  let service: SpellBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpellBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
