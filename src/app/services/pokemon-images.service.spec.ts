import { TestBed, inject } from '@angular/core/testing';

import { PokemonImagesService } from './pokemon-images.service';

describe('PokemonImagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonImagesService]
    });
  });

  it('should be created', inject([PokemonImagesService], (service: PokemonImagesService) => {
    expect(service).toBeTruthy();
  }));
});
