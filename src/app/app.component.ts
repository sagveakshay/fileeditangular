import { JsonPipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Rootobject } from 'model';
import { ngxCsv } from 'ngx-csv';
import * as XLSX from 'xlsx';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private papa: Papa) {

  }
  title = 'prac';
  @ViewChild('UploadFileInput', { static: false })
  uploadFileInput!: ElementRef;
  fileInputLabel: any;
  file!: File;
  arrayBuffer: any;
  filelist: any[] = [];
  filelist1: Array<any> = [];
  data: any;
  myfile = '^[A-z]{4}[0-9]{7}$';
  error: any[] = [];

  //formsubmit!: boolean;
  // studentValue : FormGroup
  submitted = false;

  studentList: any = [];
  btnSaveShow: boolean = true;
  btnUpdateShow: boolean = false;
  success: any;
  List: any;
  eventname: any;
  putoject: any[] = [];
  useridentity: any[] = [];
  useragent1: any;
  requestparameters: any[] = [];
  requestparameters1: any = [];
  year: any;
  month: any;
  day: any;
  useridentity1: any[] = [];
  root: any = [];
  arraydata: any[] = [];
  iamuserlist: any[] = [];
  test: any[] = [];

  // downloadCSV(){

  // }

  onFileSelect(event: any) {

    var files = event.target.files; // FileList object
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      var csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {
          for (let i = 0; i < results.data.length; i++) {
            let orderDetails = {
              order_id: results.data[i].Address,
              age: results.data[i].Age
            };
            this.test.push(orderDetails);
          }
          // console.log(this.test);
          this.filelist = results.data;
          console.log('Parsed: k', this.filelist);
        }
      });
    }





    // this.file = event.target.files[0];
    // let fileReader = new FileReader();
    // fileReader.readAsArrayBuffer(this.file);
    // fileReader.onload = (e) => {
    //   this.arrayBuffer = fileReader.result;
    //   var data = new Uint8Array(this.arrayBuffer);
    //   var arr = new Array();
    //   for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    //   var bstr = arr.join("");
    //   var workbook = XLSX.read(bstr, { type: "binary" });
    //   var first_sheet_name = workbook.SheetNames[0];
    //   var worksheet = workbook.Sheets[first_sheet_name];
    //   var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    //   this.filelist = arraylist;
    //   console.log(this.filelist);
    // }

  }




  onFormSubmit() {
    debugger
    this.iamuserlist = this.filelist.filter(x => x.useragent == "[FileZilla/3.60.2]")

    this.iamuserlist.forEach(element => {
      this.useridentity = element.useridentity.split(",");
      let useridentity1 = this.useridentity[6].replace(" username=", "")
      // console.log(useridentity1);

      let eventname = element.eventname.substring(0, 3)
      if (eventname === "Lis" || eventname == undefined || eventname == null) {
        this.eventname = "";

      }
      if (eventname === "Put" || eventname === "Get") {

        this.eventname = eventname

      }


      console.log(this.eventname)

      let useragent = element.useragent
      // console.log(useragent)

      let requestparameters = JSON.parse(element.requestparameters)
      let requestparameters1 = requestparameters.bucketName
      // console.log(requestparameters1);


      let resources = element.resources
      var slicedata = resources.search("/")
      var slicedat = resources.search(",")
      var slicedata1 = resources.slice(slicedata, slicedat)
      // console.log(slicedata1)

      this.year = element.year
      this.month = element.month
      this.day = element.day

      this.arraydata.push({
        "AWS IAM User": useridentity1,
        "Event Name": this.eventname,
        "User Agent": useragent,
        "S3 Bucket-names": requestparameters1,
        "Folder": slicedata1,
        "Year": this.year,
        "Month": this.month,
        "Day": this.day
      })

      // console.log(this.arraydata)

    });



    // for (let i = 0; i < this.filelist.length; i++) {
    //   let useridentity2=this.filelist.filter(x=>x.useridentity)
    //   // let useridentity3= useridentity2.replace("=",":")
    //   console.log(useridentity2)

    //   let useridentity = this.filelist[i].useridentity.search("=")
    //   let useridentity1 = this.filelist[i].useridentity.search(",")
    //   var slicedata3 = this.filelist[i].useridentity.slice(useridentity, useridentity1).replace("=", "")
    //   let slicedata4 = this.filelist[i].useridentity.search(slicedata3)
    //   console.log(slicedata4)

    //   if (slicedata3 === "IAMUser") {
    //     this.useridentity = slicedata3;

    //   }

    //   var object = this.filelist[i].eventname.substring(0, 3)
    //   if (object === "Put" || object === "Get") {

    //     this.eventname = object

    //   }


    //   let useragent = this.filelist[i].useragent
    //   if (useragent === "[FileZilla/3.60.2]") {
    //     this.useragent1 = useragent
    //   }


    //   this.requestparameters.push(JSON.parse(this.filelist[i].requestparameters))
    //   //  this.requestparameters1.push(this.requestparameters.find(x=>x.bucketName));

    //   let resources = this.filelist[i].resources
    //   var slicedata = resources.search("/")
    //   var slicedat = resources.search(",")
    //   var slicedata1 = resources.slice(slicedata, slicedat)
    //   this.List = slicedata1


    //   this.year = this.filelist[i].year
    //   this.month = this.filelist[i].month
    //   this.day = this.filelist[i].day




    //   this.arraydata.push({
    //     "User Identity": this.useridentity,
    //     "Event Name": this.eventname,
    //     "User Agent": this.useragent1,
    //     "Resources": this.List,
    //     "Year": this.year,
    //     "Month": this.month,
    //     "Day": this.day
    //   })



    // }
    // this.requestparameters.forEach(element => {
    //   this.requestparameters1.push(element.bucketName)

    // });

    // console.log(this.arraydata)






    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      showTitle: false,
      title: 'sampleAWS',
      useBom: false,
      noDownload: false,
      headers: ["AWS IAM User", "Event Name", "User Agent", "S3 Bucket-names", "Folder", "Year", "Month", "Day"]
    };

    new ngxCsv(this.arraydata, "sampleAWS", options)





  }

}
