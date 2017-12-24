import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PokemonImageComponent } from './components/pokemon-image/pokemon-image.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonImageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
