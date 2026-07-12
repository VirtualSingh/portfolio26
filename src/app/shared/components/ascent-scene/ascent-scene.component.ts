import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO } from '../../../core/content/portfolio.config';

/** "The Ascent": the Angular migration staircase, one block still being placed. */
@Component({
  selector: 'app-ascent-scene',
  templateUrl: './ascent-scene.component.html',
  styleUrl: './ascent-scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AscentSceneComponent {
  readonly ascent = PORTFOLIO.identity.ascent;
}
