import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-mat-upload',
  templateUrl: './mat-upload.component.html',
  styleUrls: ['./mat-upload.component.scss']
})
export class MatUploadComponent implements OnInit {

  title = 'angular-material-file-upload-app';

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';

  @Output('uploadedFiles') uploadEvent: EventEmitter;

  private filesUploaded: File[];

  constructor(){
    this.uploadFileInput = new ElementRef('');
    this.filesUploaded = [];
    this.uploadEvent = new EventEmitter();
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
