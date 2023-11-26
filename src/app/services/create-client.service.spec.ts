import { TestBed } from '@angular/core/testing';

import { CreateClientService } from './create-client.service';

describe('CreateClientService', () => {
  let service: CreateClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
