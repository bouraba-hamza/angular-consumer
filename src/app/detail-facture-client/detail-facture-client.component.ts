///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {ReglementProvider} from "./ReglementClient";
import {HttpClient} from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DetailFactureClientService} from "./detail-facture-client.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import {by, element} from "protractor";
import {FactureProviderService} from "../facture-provider/facture-provider.service";
import {Factures} from "../facture-provider/Factures";
import {LigneFacture} from "../facture-provider/LigneFacture";
import {ReglementClient} from "../bordereau-reglement/ReglementClient";
declare const $: any;

@Component({
  selector: 'app-detail-facture-provider',
  templateUrl: './detail-facture-client.component.html',
  styleUrls: ['./detail-facture-client.component.scss']
})
export class DetailFactureClientComponent {

    factureData:any;
    facture:any;
    ligneFactureData:any;
    ReglementFatureData:any;
    closeResult: string;
    allBanques:any;

    myform: FormGroup;
    myformUpdate: FormGroup;
    id:FormControl;
    Montant:FormControl;
    DateReglement:FormControl;
    NumCheque:FormControl;
    Banque:FormControl;
    ModePaiement:FormControl;
    DateEcheance:FormControl;
    FactureID:FormControl;
    BanqueID:FormControl;
    reglementPost : ReglementProvider;

    title = 'app';
    position = 'bottom-right';

    constructor(private detailFactureProviderService: DetailFactureClientService, private route: ActivatedRoute, private http: HttpClient, private modalService: NgbModal, private toastyService: ToastyService) {

    }

  ngOnInit() {
      this.createFormControls();
      this.createForm();
      this.getFactureClient();
      this.getallBanque();

  }

    showDiv(event: any) : void{


       if(event.target.value == 0)
           document.getElementById('cheque').style.display = "block";
           document.getElementById('cheque1').style.display = "block";
        if(event.target.value == 1)
            document.getElementById('cheque').style.display = "none";
            document.getElementById('cheque1').style.display = "none";
        if(event.target.value == 2)
            document.getElementById('cheque').style.display = "none";
            document.getElementById('cheque1').style.display = "none";
       if(event.target.value == 3)
           document.getElementById('cheque').style.display = "block";
           document.getElementById('cheque1').style.display = "block";

    }

    getFactureClient():void{

        const id = +this.route.snapshot.paramMap.get('id');
        this.detailFactureProviderService.getFactureInfo(id).subscribe(facture =>{
            this.factureData=facture;
            console.log(this.factureData);
        } );
       this.getLigneFacture(id);
       this.getReglementFacture(id);
    }

    getLigneFacture(id:number):void{

        this.detailFactureProviderService.getLignesFacture(id).subscribe(lignefacture => this.ligneFactureData=lignefacture);
    }

    getReglementFacture(id:number):void{

        this.detailFactureProviderService.getReglementFacture(id).subscribe(reglementFacture => this.ReglementFatureData=reglementFacture);
    }

    getallBanque():void{
        this.detailFactureProviderService.getAllBanque().subscribe(banques => this.allBanques=banques);
    }




    open(content) {
        this.modalService.open(content, {size: 'lg' }).result.then((result) => {
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



    createFormControls() {
        this.Montant = new FormControl('');
        this.DateReglement = new FormControl('');
        this.NumCheque = new FormControl('');
        this.ModePaiement = new FormControl('');
        this.DateEcheance = new FormControl('');
        this.FactureID = new FormControl('');
        this.BanqueID = new FormControl('');
        this.Banque = new FormControl('');

    }

    createForm() {
        this.myform = new FormGroup({
            Montant:this.Montant,
            DateReglement:this.DateReglement,
            NumCheque:this.NumCheque,
            Banque:this.Banque,
            ModePaiement:this.ModePaiement,
            DateEcheance:this.DateEcheance,
            FactureID:this.FactureID,
            BanqueID:this.BanqueID,
        });
    }

    onSubmit() {

        const id = +this.route.snapshot.paramMap.get('id');
        if (this.myform.valid) {

            this.reglementPost=  new ReglementProvider();
            this.reglementPost.FactureID = id;
            this.reglementPost.Montant = this.myform.value['Montant'];
            this.reglementPost.BanqueID = this.myform.value['BanqueID'];
            this.reglementPost.DateReglement = this.myform.value['DateReglement'];
            this.reglementPost.NumCheque = this.myform.value['NumCheque'];
            this.reglementPost.Banque =this.myform.value['Banque'];
            this.reglementPost.ModePaiement =this.myform.value['ModePaiement'];
            this.reglementPost.DateEcheance =this.myform.value['DateEcheance'];

            this.detailFactureProviderService.addReglement( this.reglementPost ).subscribe(reglementPostconsole=>{

                    try {
                        if(typeof reglementPostconsole.Montant!='undefined'){
                            this.detailFactureProviderService.calculereglement(id).subscribe(fact=>{});
                            this.addToast({title:'', msg:'Réglement ajouté à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                            this.myform.reset();
                            setTimeout(() => {this.ngOnInit();}, 1000);
                        }
                    }catch (e) {
                        this.addToast({title:'', msg:'Réglement n\'a pas pu être supprimer à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                    }

                }
            );
        }
    }

    deleteReglement(reglement:ReglementClient):void {

        this.addToast({
            title: 'Votre Ligne Facture est en cours',
            msg: ' ',
            timeout: 2000,
            theme: 'bootstrap',
            position: 'top-right',
            type: 'wait'
        });

        this.detailFactureProviderService.deleteReg(reglement).subscribe(produitPostconsole => {

            try {
                if (typeof produitPostconsole.id == 'undefined') {

                    this.addToast({
                        title: 'Votre Ligne Facture est supprimé ',
                        msg: '',
                        timeout: 2000,
                        theme: 'bootstrap',
                        position: 'top-right',
                        type: 'success'
                    });

                    setTimeout(() => {
                        this.ngOnInit();
                    }, 1000);

                }
            } catch (e) {
                console.log(e);
                this.addToast({
                    title: 'Ligne facture n\'à âs pu être supprimer à votre système',
                    msg: '',
                    timeout: 2000,
                    theme: 'bootstrap',
                    position: 'top-right',
                    type: 'error'
                });
            }
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



}
