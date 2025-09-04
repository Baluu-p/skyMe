import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from './services/device-detector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {

  @ViewChild('resumeContainer', { static: false }) resumeContainer!: ElementRef;

  title = 'skyMe';
  preview = false;
  window = window;

  resumeDetails: any = [];

  set formattedJson(data) {
    this.resumeDetails = JSON.parse(data);
  }
  get formattedJson() {
    return JSON.stringify(this.resumeDetails, null, 5);
  }

  constructor(
    private http: HttpClient,
    private deviceService: DeviceDetectorService
  ) {
    this.loadResume();
  }

  onChange(evt: any) {
    this.formattedJson = evt.target ? evt.target.value : evt;
  }

  loadResume() {
    this.http.get('assets/data.json').subscribe((res: any) => {
      this.formattedJson = JSON.stringify(res);
    });
  }

  downloadPDF() {
    // html2canvas(this.resumeContainer.nativeElement).then(canvas => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF('p', 'mm', 'a4');
    //   const imgWidth = 210;
    //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //   pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    //   pdf.save('Resume.pdf');
    // });
        this.window.print();
  }

  getDeviceType() {
    return this.deviceService.getDeviceType();
  }
}
