import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'code-sink rocks!';

  get cookies() {
    return document.cookie;
  }

  setCookie() {
    document.cookie = 'user=Wojtek; max-age=3600';
  }
}
