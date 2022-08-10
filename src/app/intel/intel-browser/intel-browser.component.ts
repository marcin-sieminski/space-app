import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface IntelBrowserOption {
  name: string;
  url: string;
}

@Component({
  selector: 'app-intel-browser',
  templateUrl: './intel-browser.component.html',
  styleUrls: ['./intel-browser.component.css']
})
export class IntelBrowserComponent implements OnInit {

  sourceControl = new FormControl('');

  options = [
    { name: 'ESA', url: 'http://www.esa.int/ESA' },
    { name: 'POLSA', url: 'https://polsa.gov.pl' }
  ];

  sourceUrl: Observable<SafeResourceUrl> = this.sourceControl.valueChanges
    .pipe(
      map(url => url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : '')
    );
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
