import { SafeURLPipe } from './safe-url.pipe';
import { TestBed, inject } from '@angular/core/testing';
import {DomSanitizer} from '@angular/platform-browser'
import {SecurityContext} from '@angular/core';


describe('SafeURLPipe', () => {
  it('should create an instance', inject([ DomSanitizer ], (dom: DomSanitizer) => {
    const pipe = new SafeURLPipe(dom);
    expect(pipe).toBeTruthy();
  }));
});
