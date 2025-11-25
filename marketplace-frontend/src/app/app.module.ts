import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
  TuiRootModule,
  TuiButtonModule,
  TuiSvgModule 
} from '@taiga-ui/core';

import { 
  TuiIslandModule, 
  TuiBadgeModule 
} from '@taiga-ui/kit';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TuiRootModule,
    TuiButtonModule,    // для tuiButton, tuiIconButton
    TuiSvgModule,       // для <tui-svg src="tuiIcon...">
    TuiIslandModule,    // для <tui-island>
    TuiBadgeModule      // для <tui-badge>
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}