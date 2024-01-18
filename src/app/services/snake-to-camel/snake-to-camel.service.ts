import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnakeToCamelService {

  constructor() { }

  //NOTE - toCamelCase
  toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
  }
  
  //NOTE - transformKeysToCamelCase
  transformKeysToCamelCase(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      return obj.map((v) => this.transformKeysToCamelCase(v));
    }
  
    return Object.keys(obj).reduce((result, key) => {
      const camelCaseKey = this.toCamelCase(key);
      result[camelCaseKey] = this.transformKeysToCamelCase(obj[key]);
      return result;
    }, {} as any);
  }
  
}
