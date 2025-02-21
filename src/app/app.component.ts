import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {

  @ViewChild('resumeContainer', { static: false }) resumeContainer!: ElementRef;

  title = 'skyMe';

  resumeDetails: any = [];

  set formattedJson(data) {
    this.resumeDetails = JSON.parse(data);
  }
  get formattedJson() {
    return JSON.stringify(this.resumeDetails, null, 5);
  }

  constructor(private http: HttpClient) {
    this.loadResume();
  }

  onChange(evt: any) {
    this.formattedJson = evt.target ? evt.target.value : evt;
  }

  loadResume() {
    this.http.get('../assets/data.json').subscribe((res: any) => {
      this.formattedJson = JSON.stringify(res);
    });
  }

  downloadPDF() {
    html2canvas(this.resumeContainer.nativeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Resume.pdf');
    });




    // const printContent = this.resumeContainer.nativeElement.innerHTML;
    // const originalContent = document.body.innerHTML;

    // document.body.innerHTML = printContent;
    // window.print();
    // document.body.innerHTML = originalContent;
    // location.reload(); // Reload to restore original content




    //   const printContent = this.resumeContainer.nativeElement.innerHTML;
    //   const styles = document.head.innerHTML; // Get all styles from the document head

    //   const printWindow = window.open('', '', 'width=800,height=900');
    //   printWindow!.document.write(`
    //   <html>
    //     <head>
    //       <title>Resume</title>
    //       ${styles} <!-- Copy all styles -->
    //     </head>
    //     <body>
    //       ${printContent}
    //     </body>
    //   </html>
    // `);

    //   printWindow!.document.close();
    //   setTimeout(() => {
    //     printWindow!.print();
    //     printWindow!.close();
    //   }, 500); // Ensure styles are applied before printing
  }
}
