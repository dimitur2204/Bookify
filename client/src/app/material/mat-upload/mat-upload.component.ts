import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mat-upload',
  templateUrl: './mat-upload.component.html',
  styleUrls: ['./mat-upload.component.scss']
})
export class MatUploadComponent implements OnInit {

  title = 'angular-material-file-upload-app';

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';

  private filesUploaded: File[];

  constructor(){
    this.uploadFileInput = new ElementRef('');
    this.filesUploaded = [];
  }

  ngOnInit(): void {
    
  }

  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {


      this.myfilename = '';
      Array.from<File>(fileInput.target.files).forEach((file: File) => {
        this.filesUploaded.push(file);
        this.myfilename += file.name + ',';
      });


      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = "";
    } else {
      this.myfilename = 'Select File';
    }
  }

}
