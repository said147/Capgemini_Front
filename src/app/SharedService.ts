import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public data: string | undefined;
  
  constructor() { }
}