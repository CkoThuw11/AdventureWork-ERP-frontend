/**
 * Icon Registry Service
 * 
 * This service manages SVG icon registration.
 * Icons are registered here and can be used throughout the app.
 */

import { Injectable } from '@angular/core';

export interface IconDefinition {
  name: string;
  svg: string;
}

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {
  private icons = new Map<string, string>();

  constructor() {
    this.registerDefaultIcons();
  }

  /**
   * Register a new icon
   */
  register(name: string, svg: string): void {
    this.icons.set(name, svg);
  }

  /**
   * Get an icon by name
   */
  get(name: string): string | undefined {
    return this.icons.get(name);
  }

  /**
   * Check if an icon exists
   */
  has(name: string): boolean {
    return this.icons.has(name);
  }

  /**
   * Register default icons
   */
  private registerDefaultIcons(): void {
    // User icon
    this.register('user', `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    `);

    // Home icon
    this.register('home', `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    `);

    // Settings icon
    this.register('settings', `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6m5.5-11.5l-4.2 4.2m-2.6 2.6l-4.2 4.2m11.5-5.5l-4.2-4.2m-2.6-2.6l-4.2-4.2"></path>
      </svg>
    `);

    // Plus icon
    this.register('plus', `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    `);

    // Edit icon
    this.register('edit', `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    `);

    // Delete icon
    this.register('delete', `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    `);
  }
}
