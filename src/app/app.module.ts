import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { PokemonImageComponent } from './components/pokemon-image/pokemon-image.component';
import { PokemonImagesService } from './services/pokemon-images.service';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonService } from './services/pokemon.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonImageComponent,
    PokemonDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PokemonImagesService, PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
