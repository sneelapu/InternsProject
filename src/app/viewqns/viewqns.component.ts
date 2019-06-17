import { Component, OnInit } from '@angular/core';

import { UploadService } from '../service/upload.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { QretriveService } from '../service/qretrive.service';
@Component({
  selector: 'app-viewqns',
  templateUrl: './viewqns.component.html',
  styleUrls: ['./viewqns.component.css']
})
export class ViewqnsComponent implements OnInit {
  closeResult: string;
  qtn: Object;
  question:any=[];
 
  query: any;
  addqtn: Object;
  constructor(private qrtr:QretriveService,private modalService: NgbModal,private upload:UploadService,private router:Router) { }
  
  user=JSON.parse(localStorage.getItem('isLoggedIn'));

  Username=this.user.username;
  showScore(content){
    this.modalService.open(content, {backdrop:false,centered:true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  showQuestion(content,query){
    this.query=query
    this.modalService.open(content, {backdrop:false,centered:true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  Update(){
    console.log(this.query)
    console.log(this.query.question)
    var uploadqtn={
       
        "adminname":this.Username,
       "question":this.query.question,
       "language":this.query.language
      
    }
    this.upload.addQuestion(uploadqtn).subscribe(res=>{
      this.addqtn=res;
      console.log('addqtn');
      
    })
    this.router.navigateByUrl('/admin/viewqns')
  }
  
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
 
  ngOnInit() {
    var rqtn={
      "adminname":this.Username,
    }

    this.qrtr.qretrive(rqtn).subscribe(res=>{
     // this.qtn=res;
      console.log(res);
      this.question=res
        })
  }

}
