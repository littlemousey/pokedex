import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PokemonImageComponent } from './components/pokemon-image/pokemon-image.component';
import { PokemonImagesService } from './services/pokemon-images.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonImageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PokemonImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
