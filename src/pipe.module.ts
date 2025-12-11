import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslationPipe } from "./pipes/translation.pipe";

/**
 * Translation Pipe Module, that bundles the translation pipe
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
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
