import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  static store: any;

  constructor() {
    StoreService.store = localStorage;
  }

  save(model: string, element: any) {
    if (!StoreService.store) {
      console.error('Store not available');
      return;
    }

    let existingElements = !!StoreService.store.getItem(model) && JSON.parse(StoreService.store.getItem(model));

    if (!existingElements) {
      existingElements = [];
    }

    if (existingElements && existingElements.length >= 0) {
      if (element.length > 0) {
        existingElements = element;
      } else {
        existingElements.push(element);
      }
    }

    StoreService.store.setItem(model, JSON.stringify(existingElements));
  }

  read(model: string, filter?: { itemId: any, propertyId: string }) {
    if (StoreService.store.getItem(model)) {
      if (!!filter && !!filter.itemId && !!filter.propertyId) {
        const modelData = JSON.parse(StoreService.store.getItem(model));

        return modelData.filter((single) => <any>single[filter.propertyId] === filter.itemId)[0] || null;
      }

      return JSON.parse(StoreService.store.getItem(model));
    } else {
      return null;
    }
  }
}
