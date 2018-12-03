import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import {ToastData, ToastOptions, ToastyService} from "ng2-toasty";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import * as $ from 'jquery';
import {JournalisationService} from "./journalisation.service";
import {PaginationComponent} from "../pagination/pagination.component";

@Component({
  selector: 'app-journalisation',
  templateUrl: './journalisation.component.html',
  styleUrls: ['./journalisation.component.scss']
})
export class JournalisationComponent implements OnInit {

    @ViewChild(PaginationComponent)
    private paginationComponent: PaginationComponent;


  pageSize = 5;
  pageNumber = 1;

  title = 'app';
  position = 'bottom-right';
  msg: string;
  showClose = true;
  res :any;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  journalisationData:any;
  //journalisations: Journalisation[];


  closeResult: string;
  myform: FormGroup;
  myformUpdate: FormGroup;

  id: FormControl;
  action:FormControl;
  created_at:FormControl;
  utilisateur:FormControl;


  constructor(private journalisationService: JournalisationService, private http: HttpClient, private modalService: NgbModal, private toastyService: ToastyService) { }



  createFormUpdate() {
    this.myformUpdate = new FormGroup({
      id:this.id,
      action:this.action,
      created_at:this.created_at,
      utilisateur:this.utilisateur
    });
  }

  createFormControlsUpdate() {
    this.id = new FormControl('');
    this.action = new FormControl('');
    this.created_at = new FormControl('');
    this.utilisateur = new FormControl('');
  }

  ngOnInit() {

    this.createFormControls();
    this.createForm();
    this.createFormControlsUpdate();
    this.createFormUpdate();

    this.getJournalisation();




  }

  pageChanged(pN: number): void {

    this.pageNumber = pN;
  }


  createFormControls() {
    this.id = new FormControl('');
    this.action = new FormControl('');
    this.created_at = new FormControl('');
    this.utilisateur = new FormControl('');

  }

  createForm() {
    this.myform = new FormGroup({
      id:this.id,
      action:this.action,
      created_at:this.created_at,
      utilisateur:this.utilisateur
    });
  }


  addToast(options) {
    if (options.closeOther) {
      this.toastyService.clearAll();
    }
    this.position = options.position ? options.position : this.position;
    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: options.timeout,
      theme: options.theme,


      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added removed!');
      }
    };

    switch (options.type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }







  getJournalisation():void{
    this.journalisationService.getJournalisation().subscribe(journalisations =>
    {
      console.log(journalisations);
      this.journalisationData=journalisations
    }
    );


  }


  open(content) {
    this.modalService.open(content, {size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }


  resizepage(){

    // this.pageSize= this.vehiculeData.length;

  }


  opensm(content) {
    this.modalService.open(content, { }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


  exportAsXLSX():void {
    this.journalisationService.exportAsExcelFile(this.journalisationData, 'journalisation.xlsx');
  }




}
