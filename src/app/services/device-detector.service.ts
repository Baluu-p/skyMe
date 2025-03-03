import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceDetectorService {
  private userAgent = navigator.userAgent;

  constructor() { }

  /** Detects if the device is a mobile phone */
  isMobile(): boolean {
    return /Mobi|Android/i.test(this.userAgent) && !this.isTablet();
  }

  /** Detects if the device is a tablet */
  isTablet(): boolean {
    return /iPad|Tablet|PlayBook|Nexus 7|Nexus 10|Android(?!.*Mobile)/i.test(this.userAgent);
  }

  /** Determines the device type */
  getDeviceType(): string {
    if (this.isTablet()) return 'tablet';
    if (this.isMobile()) return 'mobile';
    return 'desktop';
  }
}
