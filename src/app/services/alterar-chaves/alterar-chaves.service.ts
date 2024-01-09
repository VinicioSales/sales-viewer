import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlterarChavesService {

  constructor() { }

  mapKeys(obj: any, keyMap: { [key: string]: string }): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      return obj.map((v) => this.mapKeys(v, keyMap));
    }
  
    return Object.keys(obj).reduce((result, key) => {
      const newKey = keyMap[key] || key;
      result[newKey] = this.mapKeys(obj[key], keyMap);
      return result;
    }, {} as any);
  }
  
}
