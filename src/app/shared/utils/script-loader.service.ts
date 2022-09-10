import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScriptLoaderService {
  private readonly loadedScripts = new Set<string>();

  public load(src: string): Promise<void> {
    if (this.loadedScripts.has(src)) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;

      script.onload = () => {
        this.loadedScripts.add(src);
        resolve();
      };

      script.onerror = () => {
        reject();
      };

      document.body.appendChild(script);
    });
  }
}
