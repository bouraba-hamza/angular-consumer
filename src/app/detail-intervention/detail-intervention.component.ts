import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from "jquery";
import {ToastData, ToastOptions, ToastyService} from "ng2-toasty";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IntervenantService} from "../intervenant/intervenant.service";
import {HttpClient} from "@angular/common/http";
import {DetailInterventionService} from "./detail-intervention.service";
import {ActivatedRoute} from "@angular/router";
import {Intervenant} from "../intervenant/intervenant";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {PaginationComponent} from "../pagination/pagination.component";

@Component({
  selector: 'app-detail-intervention',
  templateUrl: './detail-intervention.component.html',
  styleUrls: ['./detail-intervention.component.scss']
})
export class DetailInterventionComponent implements OnInit {

    @ViewChild(PaginationComponent)
    private paginationComponent: PaginationComponent;

    pageSize = 10;
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
    closeResult: string;
    intervention: string;


    Boitiers: any;
    cartesSim: any;
    detail:any;
    vehicule:any;
    imei:string;
    movementBoitier:any;
    movementSim:any;
    planBoitier:any;
    planSim:any;
    emeiNumber:any = [];
    emeiChar:any = [];
    boxCbOld:any;
    boxCbNew:any;
    SimCsOld:any;
    SimCsNew:any;

    SimCsOldUpdate:any;
    SimCsNewUpdate:any;
    BoxCbOldUpdate:any;
    BoxCbNewUpdate:any;

    myform: FormGroup;
    myformUpdate:FormGroup;
    interventionPost : Intervenant;


    id_instalateur:FormControl;
    categorie:FormControl;
    id_intervention:FormControl;

    type_post:FormControl;


    type_update:FormControl;
    car_update:FormControl;
    imei1_update:FormControl;
    imei2_update:FormControl;
    imei3_update:FormControl;
    marque_update:FormControl;
    model_update:FormControl;
    imei_boitier:FormControl;
    imei_carte:FormControl;
    box_costumer:FormControl;
    sim_costumer:FormControl;
    kilometrage:FormControl;
    remarque:FormControl;
    duration:FormControl;



    type_add:FormControl;
    // ifRotour_add:FormControl;
    vehicule_add:FormControl;
    imei1_add:FormControl;
    imei2_add:FormControl;
    imei3_add:FormControl;
    marque_add:FormControl;
    model_add:FormControl;
    boitier_opentech_add:FormControl;
    carte_opentech_add:FormControl;
    boitier_client_add:FormControl;
    carte_client_add:FormControl;
    kilometrage_add:FormControl;
    remarque_add:FormControl;
    startHour:FormControl;
    endHour:FormControl;
    detail_starthour:FormControl;
    detail_endhour:FormControl;


    oldcb_box:FormControl;
    newcb_box:FormControl;
    oldcs_sim:FormControl;
    newcs_sim:FormControl;

    oldBoxCb_update:FormControl;
    newBoxCb_update:FormControl;
    oldSimCs_update:FormControl;
    newSimCs_update:FormControl;

    ssid:FormControl;
    model_boitier:FormControl;
    model_sim:FormControl;
    numero:FormControl;
    imei_product:FormControl;
    etat:FormControl;




    constructor(private detailInterventionService: DetailInterventionService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService,private route: ActivatedRoute) { }

    ngOnInit() {

        this.createFormControls();
        this.createForm();
        this.createFormControlsUpdate();
        this.createFormUpdate();
        this.remplirEmeiNumber();
        this.remplirEmeiChar();
        this.getBoxOnInit(0,0);
        this.getBoxOnInit(1,0);
        this.getSimOnInit(0,0);
        this.getSimOnInit(1,0);




        this.intervention = this.route.snapshot.paramMap.get('id');
        this.getDetail(this.intervention);
        this.getVehiculs(this.intervention);
        this.getRefMovement(1);
        this.getRefMovement(2);

        this.getPlan(1);
        this.getPlan(2);



        $('.table-filters input').on('input', function () {
            filterTable($(this).parents('table'));
        });
        $('#client_select').on('change', function () {
            filterTable_select($(this).parents('table'));
        });
        function filterTable($table) {
            var $filters = $table.find('.table-filters th');
            var $rows = $table.find('.table-data');
            $rows.each(function (rowIndex) {
                var valid = true;
                $(this).find('td').each(function (colIndex) {
                    if ($filters.eq(colIndex).find('input').val()) {
                        if ($(this).html().toLowerCase().indexOf(
                            $filters.eq(colIndex).find('input').val().toLowerCase()) == -1) {
                            valid = valid && false;
                        }
                    }
                });
                if (valid === true) {
                    $(this).css('display', '');
                } else {
                    $(this).css('display', 'none');
                }
            });
        }
        function filterTable_select($table) {
            var $filters = $table.find('.table-filters th');
            var $rows = $table.find('.table-data');
            $rows.each(function (rowIndex) {
                var valid = true;
                $(this).find('td').each(function (colIndex) {
                    if ($filters.eq(colIndex).find('select').val()) {
                        if ($(this).html().toLowerCase().indexOf(
                            $filters.eq(colIndex).find('select').val().toLowerCase()) == -1) {
                            valid = valid && false;
                        }
                    }
                });
                if (valid === true) {
                    $(this).css('display', '');
                } else {
                    $(this).css('display', 'none');
                }
            });
        }
    }

    getSimOnInit(stock,flag){
        let id = this.route.snapshot.paramMap.get('id');
        this.interventionPost=  new Intervenant();
        this.interventionPost.stock = stock;
        this.interventionPost.intervention = id;

        this.detailInterventionService.getSimOnInit( this.interventionPost ).subscribe(
            detailPostconsole=>{
                    if (flag == 0) {
                        if (stock == 0)
                            this.SimCsOld = detailPostconsole;
                        else
                            this.SimCsNew = detailPostconsole;
                    }
                    else {
                        if (stock == 0)
                            this.SimCsOldUpdate = detailPostconsole;
                        else
                            this.SimCsNewUpdate = detailPostconsole;
                    }
            }

        );
    }

    getBoxOnInit(stock,flag){
        let id = this.route.snapshot.paramMap.get('id');
        this.interventionPost=  new Intervenant();
        this.interventionPost.intervention = id;
        this.interventionPost.stock = stock;

        this.detailInterventionService.getBoxOnInit( this.interventionPost ).subscribe(
            detailPostconsole=>{
                if (flag == 0) {
                    if (stock == 0)
                        this.boxCbOld= detailPostconsole;
                    else
                        this.boxCbNew = detailPostconsole;
                }
                else{
                    if (stock == 0)
                        this.BoxCbOldUpdate= detailPostconsole;
                    else
                        this.BoxCbNewUpdate = detailPostconsole;
                }
            }
        );
    }


    createFormControls() {
        this.id_intervention = new FormControl('');
        this.type_add = new FormControl('');
        // this.ifRotour_add = new FormControl('');
        this.vehicule_add = new FormControl('');
        this.imei1_add = new FormControl('');
        this.imei2_add = new FormControl('');
        this.imei3_add = new FormControl('');
        this.marque_add = new FormControl('');
        this.model_add = new FormControl('');
        this.boitier_opentech_add = new FormControl('');
        this.carte_opentech_add = new FormControl('');
        this.boitier_client_add = new FormControl('');
        this.carte_client_add = new FormControl('');
        this.kilometrage_add = new FormControl('');
        this.remarque_add = new FormControl('');
        this.startHour = new FormControl('');
        this.endHour = new FormControl('');
        this.ssid = new FormControl('');
        this.model_boitier = new FormControl('');
        this.model_sim = new FormControl('');
        this.numero = new FormControl('');
        this.imei_product = new FormControl('');
        this.etat = new FormControl('');
        this.oldcb_box = new FormControl('');
        this.oldcs_sim = new FormControl('');
        this.newcb_box = new FormControl('');
        this.newcs_sim = new FormControl('');
    }

    createForm() {
        this.myform = new FormGroup({
            id_intervention:this.id_intervention,
            type_add:this.type_add,
            vehicule_add:this.vehicule_add,
            imei1_add:this.imei1_add,
            imei2_add:this.imei2_add,
            imei3_add:this.imei3_add,
            marque_add:this.marque_add,
            model_add:this.model_add,
            boitier_opentech_add:this.boitier_opentech_add,
            carte_opentech_add:this.carte_opentech_add,
            boitier_client_add:this.boitier_client_add,
            carte_client_add:this.carte_client_add,
            kilometrage_add:this.kilometrage_add,
            remarque_add:this.remarque_add,
            startHour:this.startHour,
            endHour:this.endHour,
            ssid:this.ssid,
            model_boitier:this.model_boitier,
            model_sim:this.model_sim,
            numero:this.numero,
            imei_product:this.imei_product,
            etat:this.etat,
            oldcb_box:this.oldcb_box,
            oldcs_sim:this.oldcs_sim,
            newcb_box:this.newcb_box,
            newcs_sim:this.newcs_sim,
        });
    }

    createFormUpdate() {
        this.myformUpdate = new FormGroup({
            id_intervention:this.id_intervention,
            type_update:this.type_update,
            car_update:this.car_update,
            imei1_update:this.imei1_update,
            imei2_update:this.imei2_update,
            imei3_update:this.imei3_update,
            marque_update:this.marque_update,
            model_update:this.model_update,
            imei_boitier:this.imei_boitier,
            imei_carte:this.imei_carte,
            box_costumer:this.box_costumer,
            sim_costumer:this.sim_costumer,
            kilometrage:this.kilometrage,
            remarque:this.remarque,
            detail_starthour:this.detail_starthour,
            detail_endhour:this.detail_endhour,
            oldBoxCb_update:this.oldBoxCb_update,
            newBoxCb_update:this.newBoxCb_update,
            oldSimCs_update:this.oldSimCs_update,
            newSimCs_update:this.newSimCs_update,
        });
    }

    createFormControlsUpdate() {
        this.id_intervention = new FormControl('');
        this.type_update = new FormControl('');
        this.car_update = new FormControl('');
        this.imei1_update = new FormControl('');
        this.imei2_update = new FormControl('');
        this.imei3_update = new FormControl('');
        this.marque_update = new FormControl('');
        this.model_update = new FormControl('');
        this.imei_boitier = new FormControl('');
        this.imei_carte = new FormControl('');
        this.box_costumer = new FormControl('');
        this.sim_costumer = new FormControl('');
        this.kilometrage = new FormControl('');
        this.remarque = new FormControl('');
        this.detail_starthour = new FormControl('');
        this.detail_endhour = new FormControl('');

        this.oldBoxCb_update = new FormControl('');
        this.newBoxCb_update = new FormControl('');
        this.oldSimCs_update = new FormControl('');
        this.newSimCs_update = new FormControl('');
    }

    add_detail_intervention(){

        this.addToast({title:'', msg:'Attender l\'opération', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});

        this.intervention = this.route.snapshot.paramMap.get('id');
        this.imei = this.myform.value['imei1_add']+' '+this.myform.value['imei2_add']+' '+this.myform.value['imei3_add'];


        if (this.myform.value['type_add'] == '') {
            this.addToast({title:'', msg:'Vérifier le type !!!', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            return;
        }


        if (this.myform.value['vehicule_add'] == '' && this.imei == '  '){
            this.addToast({title:'', msg:'Vérifier le véhicule !!!', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            return;
        }

        if ($('#'+'boitier_client_new').val()+'' == '' && $('#'+'boitier_open_new').val()+'' == '' && $('#'+'old_box_cb').val()+'' =='' && $('#'+'new_box_cb').val()+'' == '' && (this.myform.value['imei_product'] == '' || this.myform.value['model_boitier'] == '' )){
            this.addToast({title:'', msg:'Vérifier le boitier !!!', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            return;
        }

        if ($('#'+'sim_client_new').val()+'' == '' && $('#'+'sim_open_new').val()+'' == '' && $('#'+'old_sim_cs').val()+'' =='' && $('#'+'new_sim_cs').val()+'' == '' && (this.myform.value['ssid'] == '' || this.myform.value['numero'] == '' )){
            this.addToast({title:'', msg:'Vérifier la carte Sim !!!', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            return;
        }

        if (this.myform.valid) {
            this.interventionPost=  new Intervenant();
            this.interventionPost.intervention =this.intervention;
            this.interventionPost.type = this.myform.value['type_add'];

            this.interventionPost.vehicule = $('#'+'imei_car').val()+'';

            this.interventionPost.imei = $('#'+'imei_1_new').val()+' '+$('#'+'imei_2_new').val()+' '+$('#'+'imei_3_new').val()+'';
            this.interventionPost.marque = $('#'+'marque_new').val()+'';
            this.interventionPost.model = $('#'+'model_new').val()+'';


            this.interventionPost.box_costumer = $('#'+'boitier_client_new').val()+'';
            this.interventionPost.sim_costumer = $('#'+'sim_client_new').val()+'';


            this.interventionPost.imei_box = $('#'+'boitier_open_new').val()+'';
            this.interventionPost.imei_sim = $('#'+'sim_open_new').val()+'';


            this.interventionPost.oldcb_box = $('#'+'old_box_cb').val()+'';
            this.interventionPost.newcb_box = $('#'+'new_box_cb').val()+'';
            this.interventionPost.oldcs_sim = $('#'+'old_sim_cs').val()+'';
            this.interventionPost.newcs_sim = $('#'+'new_sim_cs').val()+'';


            this.interventionPost.imei_product = this.myform.value['imei_product'];
            this.interventionPost.model_boitier = this.myform.value['model_boitier'];


            this.interventionPost.ssid = this.myform.value['ssid'];
            this.interventionPost.numero = this.myform.value['numero'];
            this.interventionPost.model_sim = this.myform.value['model_sim'];
            this.interventionPost.etat = this.myform.value['etat'];


            this.interventionPost.kilometrage = this.myform.value['kilometrage_add'];
            this.interventionPost.remarque = this.myform.value['remarque_add'];
            this.interventionPost.status = '0';

            this.interventionPost.starthour = this.myform.value['startHour'];
            this.interventionPost.endhour = this.myform.value['endHour'];

            console.log(this.interventionPost);
            this.detailInterventionService.addLine( this.interventionPost ).subscribe(
                vehiclePostconsole=>{
                    try {

                        this.addToast({title:'', msg:'Ligne ajoutéé avec succès!!!', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                        //this.myform.reset();
                        setTimeout(() => {this.ngOnInit();}, 1000);

                    }catch (e) {

                        this.addToast({title:'', msg:'Erreur dans l\'ajout de la ligne d\'intervention !!!', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                }
            );
        }
        else {
            this.addToast({title:'', msg:'Erreur dans un champ dans la formulaire !!!', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
        }
    }

    updateStatus(detail_id,type,box,sim){
        this.interventionPost = new Intervenant();
        this.interventionPost.type = type;
        this.interventionPost.imei_boitier = box;
        this.interventionPost.imei_carte = sim;
        this.detailInterventionService.updateStatus(this.interventionPost).subscribe(detailPostconsole=>{});
    }

    updateLine(id,type,kilometrage,remarque,starthour,endhour){
        this.addToast({title:'Notification :', msg:'Attender l\'opération', timeout:2000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.intervention = this.route.snapshot.paramMap.get('id');
            if (this.myformUpdate.valid) {
            this.interventionPost=  new Intervenant();
            this.interventionPost.detail_id =id;
            this.interventionPost.intervention =this.intervention;
            this.interventionPost.type = type;

            this.interventionPost.vehicule = $('#'+'select_car').val()+'';
            console.log($('#'+'select_car').val()+'');

            this.interventionPost.imei =$('#'+'imei_1').val()+' '+$('#'+'imei_2').val()+' '+$('#'+'imei_3').val()+'';
            this.interventionPost.marque = $('#'+'marque').val()+'';
            this.interventionPost.model = $('#'+'model').val()+'';


            this.interventionPost.box_costumer = $('#'+'boitiers_client').val()+'';
            this.interventionPost.sim_costumer = $('#'+'sim_client').val()+'';



            this.interventionPost.oldBoxCb_update = $('#'+'old_box_update').val()+'';
            this.interventionPost.newBoxCb_update = $('#'+'new_box_update').val()+'';
            this.interventionPost.oldSimCs_update = $('#'+'old_sim_update').val()+'';
            this.interventionPost.newSimCs_update = $('#'+'new_sim_update').val()+'';






            this.interventionPost.imei_box = $('#'+'boitiers_opentech').val()+'';
            this.interventionPost.imei_sim = $('#'+'sim_opentech').val()+'';


            this.interventionPost.kilometrage = this.myformUpdate.value['kilometrage'] == ''? kilometrage:this.myformUpdate.value['kilometrage'];
            this.interventionPost.remarque = this.myformUpdate.value['remarque'] == ''? remarque:this.myformUpdate.value['remarque'];
            this.interventionPost.starthour = this.myformUpdate.value['detail_starthour'] == ''? starthour:this.myformUpdate.value['detail_starthour'];
            this.interventionPost.endhour = this.myformUpdate.value['detail_endhour'] == ''? endhour:this.myformUpdate.value['detail_endhour'];

            console.log(this.interventionPost);
            this.detailInterventionService.updateLine( this.interventionPost ).subscribe(
                vehiclePostconsole=>{
                    try {

                        this.addToast({title:'', msg:'Ligne modifiée avec succès !!!', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                        //this.myform.reset();
                        setTimeout(() => {this.ngOnInit();}, 1000);

                    }catch (e) {

                        this.addToast({title:'', msg:'Erreur dans la modification du ligne !!!', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                }
            );
        }
    }

    delete(intervention:Intervenant):void{

        this.addToast({title:'', msg:'Attender la suppression de l\'opération'+ intervention.intervention_id, timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.detailInterventionService.deleteDetail(intervention).subscribe(detailPostconsole=>{
            try {
                this.addToast({title:'', msg:'Intervention supprimée avec succès', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                setTimeout(() => {this.ngOnInit();}, 1000);
            }catch (e) {
                console.log(e);
                this.addToast({title:'', msg:'Erreur dans la suppression du l\'intervention', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            }
        });
        setTimeout(() => {this.ngOnInit();}, 1000);
    }

    pageChanged(pN: number): void {
        this.pageNumber = pN;
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

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    open(content) {
        this.modalService.open(content, {size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    opensm(content) {
        this.modalService.open(content, { }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `D2ismissed ${this.getDismissReason(reason)}`;
        });
    }

    resizepage(){ }

    vider_details(){
        this.Boitiers = [];
        this.cartesSim = [];
    }

    getBoitiers(val,forTarget,ValBox){
        let type = forTarget == 'update' ? val:$('#'+val).val();
        this.intervention = this.route.snapshot.paramMap.get('id');
        this.interventionPost=  new Intervenant();
        this.interventionPost.categorie =1;
        this.interventionPost.intervention =this.intervention;
        this.interventionPost.type = type+'';

        this.detailInterventionService.getProducts( this.interventionPost ).subscribe(
            vehiclePostconsole=>{
                try {
                    this.Boitiers = vehiclePostconsole;
                }catch (e) {
                    console.log(e);
                }
            }
        );
        if(forTarget == 'update'){
            setTimeout(() => {this.after_reload_box(ValBox);}, 1200);
        }
    }

    after_reload_sim(Val){
        $('#'+'sim_opentech').val(Val);
    }

    after_reload_box(Val){
        $('#'+'boitiers_opentech').val(Val);
    }


    getCartesSim(val,forTarget,ValSim){
        let type = forTarget == 'update' ? val:$('#'+val).val();
        this.intervention = this.route.snapshot.paramMap.get('id');
        this.interventionPost=  new Intervenant();
        this.interventionPost.categorie =2;
        this.interventionPost.intervention =this.intervention;
        this.interventionPost.type = type+'';

        this.detailInterventionService.getProducts( this.interventionPost ).subscribe(
            vehiclePostconsole=>{
                try {
                    this.cartesSim = vehiclePostconsole;
                }catch (e) {
                    console.log(e);
                }
            }
        );
        if(forTarget == 'update') {
            setTimeout(() => {
                this.after_reload_sim(ValSim);
            }, 1200);
        }
    }

    getDetail(id){
        if (this.myform.valid) {
            this.interventionPost=  new Intervenant();
            this.interventionPost.id_intervention =id;

            this.detailInterventionService.getDetail( this.interventionPost ).subscribe(
                detailPostconsole=>{
                    try {
                        this.detail = detailPostconsole;
                        console.log(detailPostconsole);
                    }catch (e) {
                        console.log(e);
                    }
                }
            );
        }
    }

    getVehiculs(intervention){
            this.interventionPost=  new Intervenant();
            this.interventionPost.id_intervention =intervention;

            this.detailInterventionService.getVehiculs( this.interventionPost ).subscribe(
                detailPostconsole=>{
                    try {
                        this.vehicule = detailPostconsole;
                    }catch (e) {
                        console.log(e);
                    }
                }
            );
    }


    getRefMovement(categorie){
        this.detailInterventionService.getRefMovement(categorie).subscribe(
            detailPostconsole=>{
                try {
                    if (categorie == 1)
                        this.movementBoitier = detailPostconsole;
                    else
                        this.movementSim = detailPostconsole;
                }catch (e) {
                    console.log(e);
                }
            }
        );
    }

    getPlan(categorie){
        this.detailInterventionService.getPlan(categorie).subscribe(
            detailPostconsole=>{
                try {
                    if (categorie == 1)
                        this.planBoitier = detailPostconsole;
                    else
                        this.planSim = detailPostconsole;
                }catch (e) {
                    console.log(e);
                }
            }
        );
    }


    count_boitiers: number = 0;
    display_boitiers(){
        if(this.count_boitiers % 2 == 0){
            $('#'+'boitiers_client').css('display','inline-block');
            $('#'+'boitiers_opentech').css('display','none');
            $('#'+'boitiers_opentech').val('');
           // $('#'+'').val();
            $('#'+'boitiers_add').removeClass();
            $('#'+'boitiers_add').addClass('fas fa-times');
            $('#'+'label_update_box').html('Boitier client :');
        }
        else{
            $('#'+'boitiers_client').css('display','none');
            $('#'+'boitiers_opentech').css('display','inline-block');
            $('#'+'boitiers_add').removeClass();
            $('#'+'boitiers_client').val('');
           // $('#'+'boitiers_opentech').val();
            $('#'+'boitiers_add').addClass('fas fa-plus');
            $('#'+'boitiers_client').val('');
            $('#'+'label_update_box').html('Boitiers :');
        }
        this.count_boitiers++;
    }


    count_sim: number = 0;
    display_Sim(){
        if(this.count_sim % 2 == 0){
            $('#'+'sim_client').css('display','inline-block');
            $('#sim_opentech').css('display','none');
            console.log('disabled');
            $('#'+'sim_opentech').val('');
            $('#'+'sim_add').removeClass();
            $('#'+'sim_add').addClass('fas fa-times');
            $('#'+'label_update_sim').html('Carte Sim client :');
        }
        else{
            $('#'+'sim_client').css('display','none');
            $('#'+'sim_opentech').css('display','inline-block');
            $('#'+'sim_client').val('');
            $('#'+'sim_add').removeClass();
            $('#'+'sim_add').addClass('fas fa-plus');
            $('#label_update_sim').html('Carte Sim  :');
        }
        this.count_sim++;
    }


    count_car: number = 0;
    display_Car(){

        if(this.count_car % 2 == 0){
            $('#'+'imei_1').css('display','inline-block');
            $('#'+'imei_2').css('display','inline-block');
            $('#'+'imei_3').css('display','inline-block');
            $('#'+'marque').css('display','inline-block');
            $('#'+'model').css('display','inline-block');
            $('#'+'select_car').css('display','none');
            $('#'+'select_car').val('');
            $('#'+'add_car').removeClass();
            $('#'+'add_car').addClass('fas fa-times');
            $('#label_update_car').html('New Véhicule :');
            this.count_car++;
        }
        else{
            $('#'+'imei_1').css('display' ,'none');
            $('#'+'imei_2').css('display','none');
            $('#'+'imei_3').css('display','none');
            $('#'+'marque').css('display','none');
            $('#'+'model').css('display','none');
            $('#'+'imei_1').val('');
            $('#'+'imei_2').val('');
            $('#'+'imei_3').val('');
            $('#'+'marque').val('');
            $('#'+'model').val('');
            $('#'+'select_car').css('display','inline-block');
            $('#'+'add_car').removeClass();
            $('#'+'add_car').addClass('fas fa-plus');
            $('#label_update_car').html('Véhicule :');
            this.count_car++;
        }
    }


    count_car_new: number = 0;
    display_Car_add(){

        if(this.count_car_new % 2 == 0){
            $('#'+'imei_1_new').css('display','inline-block');
            $('#'+'imei_2_new').css('display','inline-block');
            $('#'+'imei_3_new').css('display','inline-block');
            $('#'+'marque_new').css('display','inline-block');
            $('#'+'model_new').css('display','inline-block');
            $('#label_add_car').html('New Vehicule :');
            $('#'+'imei_car').css('display','none');
            $('#'+'imei_car').val('');
            $('#'+'add_new_car').removeClass();
            $('#'+'add_new_car').addClass('fas fa-times');
        }
        else{
            $('#'+'imei_1_new').css('display','none');
            $('#'+'imei_2_new').css('display','none');
            $('#'+'imei_3_new').css('display','none');
            $('#'+'marque_new').css('display','none');
            $('#'+'model_new').css('display','none');
            $('#'+'imei_car').css('display','inline-block');
            $('#label_add_car').html('Vehicule :');
            $('#'+'imei_1_new').val('');
            $('#'+'imei_2_new').val('');
            $('#'+'imei_3_new').val('');
            $('#'+'marque_new').val('');
            $('#'+'model_new').val('');
            $('#'+'add_new_car').removeClass();
            $('#'+'add_new_car').addClass('fas fa-plus');
        }
        this.count_car_new++;
    }


    count_sim_new: number = 0;
    display_Sim_add(){
        this.new_sim = 0;
        $('#'+'div_new_sim').css('display','none');
        $('#'+'ssid').css('display','none');
        if(this.count_sim_new % 2 == 0){
            $('#'+'sim_client_new').css('display','inline-block');
            $('#'+'sim_open_new').css('display','none');
            $('#'+'sim_open_new').val('');
            $('#'+'add_sim_new').removeClass();
            $('#'+'add_sim_new').addClass('fas fa-times');
            $('#label_add_sim').html('Carte Sim client :');
            $('#'+'ssid').val('');
            $('#'+'div_new_sim input').val('');
            $('#'+'div_new_sim select').val('');
        }
        else{
            $('#'+'sim_client_new').css('display','none');
            $('#'+'sim_open_new').css('display','inline-block');
            $('#'+'sim_client_new').val('');
            $('#'+'add_sim_new').removeClass();
            $('#'+'add_sim_new').addClass('fas fa-plus');
            $('#label_add_sim').html('Carte Sim :');
        }
        this.count_sim_new++;
    }


    count_box_new: number = 0;
    display_box_add(){
        $('#'+'div_new_box').css('display','none');
        $('#'+'imei_box_product').css('display','none');
        $('#'+'imei_box_product').val('');
        $('#'+'div_new_box input').val('');
        $('#'+'div_new_box select').val('');
        if(this.count_box_new % 2 == 0){
            $('#'+'boitier_client_new').css('display', 'inline-block');
            $('#'+'boitier_open_new').css('display','none');
            $('#'+'boitier_open_new').val('');
            $('#'+'add_boitier_new').removeClass();
            $('#'+'add_boitier_new').addClass('fas fa-times');
            $('#label_add_box').html('Boitiers CLient:');
        }
        else{
            $('#'+'boitier_client_new').css('display','none');
            $('#'+'boitier_open_new').css('display','inline-block');
            $('#'+'boitier_client_new').val('');
            $('#'+'add_boitier_new').removeClass();
            $('#'+'add_boitier_new').addClass('fas fa-plus');
            $('#label_add_box').html('Boitiers :');
        }
        this.new_box = 0;
        this.count_box_new++;

    }

    displayBoitierOnLoad(post_imeiBox){
        this.count_car = 0;
        this.count_boitiers = 0;
        if(post_imeiBox == "0" || post_imeiBox == null) {
            this.display_boitiers();
        }
    }

    displaySimOnLoad(post_imeiCarte){
        this.count_sim = 0;
        console.log(post_imeiCarte);
        if(post_imeiCarte == "0" || post_imeiCarte == null) {
            console.log(post_imeiCarte);
            this.display_Sim();
        }
    }

    show_button_for_add_product(id){
        this.count_sim_new = 0;
        this.count_box_new = 0;
        let type = $('#'+id).val();
        this.vider();
        if(type == 'd' || type == 'v') {
            $('#'+'boitier_open_new').css('display','inline-block');
            $('#'+'sim_open_new').css('display','inline-block');
            $('#'+'boitier_open_new').css('width','90%');
            $('#'+'sim_open_new').css('width','90%');
            $('#'+'boitier_client_new').css('width','90%');
            $('#'+'sim_client_new').css('width','90%');

            $('#'+'add_boitier_product').css('display','inline-block');
            $('#'+'add_sim_product').css('display','inline-block');

        }
        if(type == 'r'){
            $('#'+'sim_open_new').css('width','95%');
            $('#'+'sim_client_new').css('width','95%');
            $('#'+'boitier_open_new').css('width','95%');
            $('#'+'boitier_client_new').css('width','95%');
            $('#'+'add_sim_product').css('display','none');
            $('#'+'boitier_open_new').css('display','inline-block');
            $('#'+'sim_open_new').css('display','inline-block');
        }
        if(type == 'i' || type == '') {
            $('#'+'boitier_open_new').css('display','inline-block');
            $('#'+'sim_open_new').css('display','inline-block');
            $('#'+'sim_open_new').css('width','95%');
            $('#'+'boitier_open_new').css('width','95%');
            $('#'+'boitier_client_new').css('width','95%');
            $('#'+'sim_client_new').css('width','95%');
        }
        if (type == 'cb') {
            $('#'+'old_box_cb').css('display','inline-block');
            $('#'+'new_box_cb').css('display','inline-block');

            $('#'+'add_box_if_client').css('display','none');
            $('#'+'changeToOldBox').css('display','inline-block');
            $('#'+'sim_open_new').css('display','inline-block');
            $('#'+'sim_open_new').css('width','90%');
            $('#'+'sim_client_new').css('width','90%');
            $('#'+'add_sim_product').css('display','inline-block');
        }

        if (type == 'cs') {
            $('#'+'old_sim_cs').css('display','inline-block');
            $('#'+'new_sim_cs').css('display','inline-block');

            $('#'+'add_sim_if_client').css('display','none');
            $('#'+'changeToOldSim').css('display','inline-block');
            $('#'+'boitier_open_new').css('display','inline-block');
            $('#'+'boitier_open_new').css('width','90%');
            $('#'+'boitier_client_new').css('width','90%');
            $('#'+'add_boitier_product').css('display','inline-block');
        }
    }

    vider() {
        $('#'+'boitier_open_new').css('display','none');
        $('#'+'boitier_client_new').css('display','none');
        $('#'+'sim_client_new').css('display','none');
        $('#'+'sim_open_new').css('display','none');
        $('#'+'div_new_box').css('display','none');
        $('#'+'div_new_sim').css('display','none');

        $('#'+'add_boitier_product').css('display','none');
        $('#'+'add_sim_product').css('display','none');

        $('#'+'changeToOldBox').css('display','none');
        $('#'+'changeToOldSim').css('display','none');

        $('#'+'ssid').css('display','none');
        $('#'+'imei_box_product').css('display','none');

        $('#'+'add_sim_if_client').css('display','inline-block');
        $('#'+'add_box_if_client').css('display','inline-block');

        $('#'+'add_sim_new').removeClass();
        $('#'+'add_boitier_new').removeClass();
        $('#'+'add_sim_new').addClass('fas fa-plus');
        $('#'+'add_boitier_new').addClass('fas fa-plus');

        $('#'+'old_box_cb').css('display','none');
        $('#'+'new_box_cb').css('display','none');
        $('#'+'old_box_cb').val('');
        $('#'+'new_box_cb').val('');

        $('#'+'old_sim_cs').css('display','none');
        $('#'+'new_sim_cs').css('display','none');
        $('#'+'old_sim_cs').val('');
        $('#'+'new_sim_cs').val('');

        this.new_box = 0;
        this.new_sim = 0;

    }

    new_box: number = 0;
    add_new_box(){
        this.count_box_new = 0;
        if (this.new_box %2 == 0){
            $('#'+'boitier_open_new').css('display','none');
            $('#'+'boitier_client_new').css('display','none');
            $('#'+'div_new_box').css('display','inline-block');
            $('#'+'imei_box_product').css('display','inline-block');
            $('#'+'boitier_open_new').val('');
            $('#'+'boitier_client_new').val('');
            $('#label_add_box').html('Nouveau Boitier :');
        }
        else{
            $('#'+'boitier_open_new').css('display','inline-block');
            $('#'+'boitier_client_new').css('display','none');
            $('#'+'div_new_box').css('display','none');
            $('#'+'imei_box_product').css('display','none');
            $('#'+'boitier_client_new').val('');
            $('#'+'div_new_box input').val('');
            $('#'+'div_new_box select').val('');
            $('#'+'imei_box_product').val('');
            $('#label_add_box').html('Boitiers :');

        }
        this.new_box++;
    }

    new_sim: number = 0;
    add_new_sim(){
        this.count_sim_new = 0;
        if (this.new_sim %2 == 0){
            $('#'+'sim_open_new').css('display','none');
            $('#'+'sim_client_new').css('display','none');
            $('#'+'div_new_sim').css('display','inline-block');
            $('#'+'ssid').css('display','inline-block');
            $('#'+'sim_open_new').val('');
            $('#'+'sim_client_new').val('');
            $('#label_add_sim').html('Nouvelle Carte Sim :');
        }
        else{
            $('#'+'sim_open_new').css('display','inline-block');
            $('#'+'sim_client_new').css('display','none');
            $('#'+'div_new_sim').css('display','none');
            $('#'+'ssid').css('display','none');
            $('#'+'sim_client_new').val('');
            $('#'+'div_new_sim input').val('');
            $('#'+'div_new_sim select').val('');
            $('#'+'ssid').val('');
            $('#label_add_sim').html('Cartes Sim :');

        }
        this.new_sim++;

    }


    remplirEmeiNumber(){
        for(var i = 1 ; i <= 99 ; i++){
            this.emeiNumber.push(i);
        }
    }
    remplirEmeiChar(){
        for(var i = 65 ; i <= 90 ; i++ ){
            this.emeiChar.push(String.fromCharCode(i));
        }
    }

    changement(type) {

        this.getBoxOnInit(0,1);
        this.getBoxOnInit(1,1);
        this.getSimOnInit(0,1);
        this.getSimOnInit(1,1);
        if(type == 'cb') {
            $('#'+'boitiers_opentech').css('display','none');
            $('#'+'add_column_update_box').css('display','none');
            $('#'+'boitiers_client').css('display','none');

            $('#'+'old_box_update').css('display','inline-block');
            $('#'+'new_box_update').css('display','inline-block');
        }else{
            $('#'+'boitiers_opentech').css('display','inline-block');
            $('#'+'add_column_update_box').css('display','inline-block');

            $('#'+'old_box_update').css('display','none');
            $('#'+'new_box_update').css('display','none');
        }


        if (type == 'cs') {
            $('#'+'sim_opentech').css('display','none');
            $('#'+'add_column_update_sim').css('display','none');
            $('#'+'sim_client').css('display','none');

            $('#'+'old_sim_update').css('display','inline-block');
            $('#'+'new_sim_update').css('display','inline-block');
        }else{
            $('#'+'sim_opentech').css('display','inline-block');
            $('#'+'add_column_update_sim').css('display','inline-block');

            $('#'+'old_sim_update').css('display','none');
            $('#'+'new_sim_update').css('display','none');
        }
    }

    verifyWww(id,targetid){
        let val = $('#'+id).val();
        if (val == 'WWW')  {
            $('#'+targetid).prop('disabled', true);
        }else {
            $('#'+targetid).prop('disabled', false);
        }
    }

    countChangeOldBox: number = 0;
    changeToOldBox(){
        if (this.countChangeOldBox %2 == 0){
            $('#'+'old_box_cb').css('display','none');
            $('#'+'imei_box_product').css('display','inline-block');
            $('#'+'div_new_box').css('display','inline-block');

            $('#'+'imei_box_product').css('width','95%');
            $('#'+'model_product_box').css('width','95%');

            $('#'+'old_box_cb').val('');
            $('#label_add_box').html('Nouveau Boitier :');
        }
        else{
            $('#'+'old_box_cb').css('display','inline-block');
            $('#'+'imei_box_product').css('display','none');
            $('#'+'div_new_box').css('display','none');

            $('#'+'imei_box_product').css('width','90%');
            $('#'+'model_product_box').css('width','90%');

            $('#'+'imei_box_product').val('');
            $('#'+'div_new_box').val('');
            $('#label_add_box').html('Boitiers :');
        }
        this.countChangeOldBox++;
    }


    countChangeOldSim: number = 0;
    changeToOldSim(){
        if (this.countChangeOldSim %2 == 0){
            $('#'+'old_sim_cs').css('display','none');
            $('#'+'ssid').css('display','inline-block');
            $('#'+'div_new_sim').css('display','inline-block');

            $('#'+'ssid').css('width','95%');
            $('#'+'numero').css('width','95%');
            $('#'+'plan').css('width','95%');
            $('#'+'etat').css('width','95%');

            $('#'+'div_new_sim').val('');
            $('#'+'label_add_sim').html('Nouveau Boitier :');
        }
        else{
            $('#'+'old_sim_cs').css('display','inline-block');
            $('#'+'ssid').css('display','none');
            $('#'+'div_new_sim').css('display','none');

            $('#'+'ssid').css('width','90%');
            $('#'+'numero').css('width','90%');
            $('#'+'plan').css('width','90%');
            $('#'+'etat').css('width','90%');

            $('#'+'ssid').val('');
            $('#'+'div_new_sim').val('');
            $('#'+'label_add_sim').html('Boitiers :');
        }
        this.countChangeOldSim++;
    }

}
