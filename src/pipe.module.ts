import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslationPipe } from "./pipes/translation.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TranslationPipe
  ],
  exports: [
    TranslationPipe
  ]
})
/* eslint-disable-next-line @tseslint/no-extraneous-class */
export class TranslationPipeModule {}
