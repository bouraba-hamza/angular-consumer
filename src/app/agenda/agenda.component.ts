import { Component, OnInit, TRANSLATIONS_FORMAT } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {Observable} from "rxjs/Observable";

//import 'fullcalendar';
//import 'fullcalendar-scheduler';
//import 'bootstrap' ;

import { Agenda } from './agenda';
import { AgendaService } from './agenda.service';


import { CostumerService } from '../costumer/costumer.service';
import { CostumerComponent } from '../costumer/costumer.component';
import { Costumer } from '../costumer/Costumer';
import {InstallerService} from "../installer/installer.service";
import {Installer} from "../installer/Installer";

import { HttpClient } from '../../../node_modules/@angular/common/http';
import { ToastyService, ToastOptions, ToastData } from '../../../node_modules/ng2-toasty';
import {ReactiveFormsModule, FormsModule, FormControl, Validators, FormBuilder} from '@angular/forms';


import {Headers, RequestOptions} from "@angular/http";
import { FormGroup } from '../../../node_modules/@angular/forms';

import {Router} from "@angular/router";
//import  '../../../node_modules/date-time-picker' ;

// import * as $ from "jquery";
declare let $: any ;

import { CalendarComponent } from 'ng-fullcalendar';

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

    position = 'bottom-right';

    // public costumerComponent : CostumerComponent ;
    // public installerService : InstallerService ;

    // public list_costumer : Costumer[] ;
    public list_costumer: any;
    public calEvent_id ;


    //private ApiUrl_customer_getAll = 'http://192.168.3.111:8000/api/costumer';  // URL to web api
    //private row:any;
    //private _options: RequestOptions = null;

    // public variableFilledWhenDone : any ;
    public costumerData: any;
    public installerData: any;

    public agendaData: any;
    public agenda: Agenda[];
    public agendaPost: Agenda;

    public current_event_color;

    public last_id_event_added = -1;


    formAdd: FormGroup;
    formUpdate: FormGroup;
    groupIntervalleFilter: FormGroup;

    id: FormControl;
    client_id: FormControl;
    installateur_id: FormControl;
    remarque: FormControl;
    lieu: FormControl;
    created_at: FormControl;
    update_at: FormControl;
    heure: FormControl;
    title: FormControl;
    type: FormControl;
    end_date: FormControl;

    miniCalendar1: FormControl;
    miniCalendar1_heur: FormControl;

    miniCalendar2: FormControl;
    miniCalendar2_heur: FormControl;


    public usersData: any;

    current_list_nbr_rows = 0;

    public current_title = 'title';
    public current_var_client = 'client_id';
    public current_var_installateur = 'installateur_id';
    public current_remarque = 'remarque';
    public current_lieu = 'lieu';
    public current_type = 'type';
    public current_start = 'created_at'; // created at
    public current_update_at = 'update_at';
    public current_heure = 'heure';

    public current_etat = 0;
    public opts_technique = '';
    public current_idUser_sup = -1;
    public current_date_vue = 0;
    public current_end = '';


    public current_token = null;
    public current_user_id = null;
    public current_role = null;


    public cal = $('.calendar');
    public cal1 = $('#calendar1');
    public cal2 = $('#calendar2');

    public current_etat_bd;

    ApiUrl = 'http://192.168.3.111:8000/api/agenda';  // URL to web api

    public current_user_rows_count = 0 ;
    public current_user_lastRowsCount = -1 ;



    date: Date = new Date();
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy',
        defaultOpen: false
    }

    settings2 = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MM-yyyy',
        defaultOpen: false
    }

    constructor(private http: HttpClient, private modalService: NgbModal, private toastyService: ToastyService, private costumerService: CostumerService, private installerService: InstallerService, private agendaService: AgendaService , private router:Router) {
           console.log("AGENDA COMPOMENT --->  "+this.router.url) ;


    }


    ngOnInit() {
        this.check_current_role();

        this.getCostumer();
        this.getInstaller();

        this.createFormControls();
        this.createForm();

        this.createFormControls_update();
        this.createForm_update();

        //this.createFormControls_interval();


        if (this.current_role == 'admin') {
            this.getAgendaEvents();
        } else {
            this.getAgendaEvents_current_iduser();
        }


        this.load_users_select();
        // $('#miniCalendar1').datetimepicker({inline:true,});


        this.loadEvents();
        this.showTodaysDate();
        this.initializeCalendar();
        this.getCalendars();
        this.initializeRightCalendar(this.agendaService);
        this.initializeLeftCalendar(this.agendaService);
        this.disableEnter();

        $('#calendar2').fullCalendar('changeView', 'agendaDay');





        this.get_count_event_non_vue_by_id_installateur(this.current_user_id);
        if(this.current_role != 'admin'){
            $('#calendar').fullCalendar('removeEvents');
            $('#calendar1').fullCalendar('removeEvents');
            $('#calendar2').fullCalendar('removeEvents');
            this.agendaData= null;
            this.getAgendaEvents_current_iduser();
            this.agendaService.get_count_event_non_vue_by_id_installateur(this.current_user_id).subscribe(agendaconsole => {
                console.log(agendaconsole);
                let rep =agendaconsole.data;
                let current_non_vue = rep[0]["count(*)"];
                $("#span_2_div_nbr_event_non_vue").html(current_non_vue);
                if(current_non_vue >0){
                    $("#div_nbr_event_non_vue").css("background","#f55f5f");
                }else{
                    $("#div_nbr_event_non_vue").css("background","#1abc9c");
                }
            });
        }
        else{
            /*  $('#calendar').fullCalendar('removeEvents');
              $('#calendar1').fullCalendar('removeEvents');
              $('#calendar2').fullCalendar('removeEvents');
              this.agendaData= null;
              this.getAgendaEvents();
              */
            this.agendaService.get_count_all_events_non_vues().subscribe(agendaconsole => {
                console.log(agendaconsole);
                let rep =agendaconsole.data;
                let current_non_vue = rep[0]["count(*)"];
                $("#span_2_div_nbr_event_non_vue").html(current_non_vue);
                if(current_non_vue >0){
                    $("#div_nbr_event_non_vue").css("background","#f55f5f");
                }else{
                    $("#div_nbr_event_non_vue").css("background","#1abc9c");
                }
            });
        }



        setInterval(() => {
            //check root
            if(this.router.url == "/planing"){
                //    console.log('setInterval  --> current_id_user = '+this.current_user_id);
                //   console.log(this.current_user_id);



                if(this.current_user_id > 0){


                    this.agendaService.getCountRowsAgenda_by_idUser(this.current_user_id).subscribe(agendaconsole => {
                        //  console.log('agendaconsole.data');
                        let $ret =  agendaconsole.data  ;
                        //    console.log($ret[0]['count(*)']);
                        this.current_user_rows_count = $ret[0]['count(*)'] ;
                        // this.agendaData = agendaconsole.data;




                        // cas initial
                        if(this.current_user_lastRowsCount == -1){
                            this.current_user_lastRowsCount = this.current_user_rows_count ;
                            //    console.log('-------  Cas Initial  --------');
                            //    console.log('current_user_lastRowsCount : '+this.current_user_lastRowsCount);
                            //     console.log('current_user_rows_count : '+this.current_user_rows_count);
                        }


                        let  var_idUser_role = window.localStorage.getItem('role') ;

                        if(this.current_user_lastRowsCount ==  this.current_user_rows_count){
                            console.log('-------  ROWS USER A JOURS : '+this.current_user_rows_count+'  --------');
                        }else{
                            console.log('-------  GO REFRESH ROWS USER !!  --------');
                            //    console.log('current_user_lastRowsCount : '+this.current_user_lastRowsCount);
                            //   console.log('current_user_rows_count : '+this.current_user_rows_count);

                            //    this.agendaData=agendaconsole.data;


                            this.current_user_lastRowsCount =  this.current_user_rows_count;
                            if(var_idUser_role != 'admin'){
                                console.log("Admin");

                                $('#calendar').fullCalendar('removeEvents');
                                $('#calendar1').fullCalendar('removeEvents');
                                $('#calendar2').fullCalendar('removeEvents');
                                this.agendaData= null;
                                this.getAgendaEvents_current_iduser();
                                this.agendaService.get_count_event_non_vue_by_id_installateur(this.current_user_id).subscribe(agendaconsole => {
                                    console.log(agendaconsole);
                                    let rep =agendaconsole.data;
                                    let current_non_vue = rep[0]["count(*)"];
                                    $("#span_2_div_nbr_event_non_vue").html(current_non_vue);
                                    if(current_non_vue >0){
                                        $("#div_nbr_event_non_vue").css("background","#f55f5f");
                                    }else{
                                        $("#div_nbr_event_non_vue").css("background","#1abc9c");
                                    }
                                });
                            }else{






                                console.log("ADMIIIIN   NOOONN   VUUUES ");
                                $('#calendar').fullCalendar('removeEvents');
                                $('#calendar1').fullCalendar('removeEvents');
                                $('#calendar2').fullCalendar('removeEvents');
                                this.agendaData= null;
                                this.getAgendaEvents();
                                this.agendaService.get_count_all_events_non_vues().subscribe(agendaconsole => {
                                    console.log(agendaconsole);
                                    let rep =agendaconsole.data;
                                    let current_non_vue = rep[0]["count(*)"];
                                    $("#span_2_div_nbr_event_non_vue").html(current_non_vue);
                                    if(current_non_vue >0){
                                        $("#div_nbr_event_non_vue").css("background","#f55f5f");
                                    }else{
                                        $("#div_nbr_event_non_vue").css("background","#1abc9c");
                                    }
                                });
                            }




                            //     this.refreshAgendaEvents();
                            // this.current_user_lastRowsCount =  this.current_user_rows_count ;

                        }


                    }); // end  this.agendaService.getCountRowsAgenda_by_idUser


                } // end if(this.current_user_id > 0)






                // check bd for current user
                // compare current events current_user AVEC currents_events_BD
                // refresh calendars or returns
            }else{
                return;
            }

        }, 3500);







    } // end on init



    onDateSelect(event ,num){
        // console.log(event+' '+num);
        if(num == 1){
            //   $("#miniCalendar2 .wc-date-popover").attr('hidden','');
            //    $("#miniCalendar1 .wc-date-popover").removeAttr('hidden');
        }else{
            //   $("#miniCalendar1 .wc-date-popover").attr('hidden','');
            //   $("#miniCalendar2 .wc-date-popover").removeAttr('hidden');
            //    $("#miniCalendar2 .wc-date-popover").find('.ok')
        }
    }


    close_forms(){
        $("#editEvent").fadeOut();

        $("#title_upd").val('');
        $("#client_id_upd").val('');
        $('#installateur_id_upd').val('')
        $("#created_at_upd").val('01/01/2018');
        $("#update_at_upd").val('01/01/2018');
        $("#heure_upd").val('00:00');
        $("#lieu_upd").val('');
        $("#val_event_created_by_upd").html('---');
        $("#type_upd").val('');
        $("#remarque_upd").val('');
        $('#date_vue').val('[ 0000/00/00 00:00]');
        $('#end_date_upd').val('0000/00/00 00:00')
        $(".oneinput_div_inputs_add_cas_technique").val(0);











        $("#newEvent").fadeOut();
    }

    check_current_role() {
        this.current_token = window.localStorage.getItem('token');
        this.current_user_id = window.localStorage.getItem('user_id');
        this.current_role = window.localStorage.getItem('role');

    }

    createFormControls() {
        // createFormControls
        this.title = new FormControl('');
        this.client_id = new FormControl('');
        this.installateur_id = new FormControl('');
        this.remarque = new FormControl('');
        this.lieu = new FormControl('');
        this.created_at = new FormControl('');
        this.update_at = new FormControl('');
        this.heure = new FormControl('');
        this.type = new FormControl('');
    }

    createForm() {
        this.formAdd = new FormGroup({
            title: this.title,
            client_id: this.client_id,
            installateur_id: this.installateur_id,
            remarque: this.remarque,
            lieu: this.lieu,
            created_at: this.created_at,
            update_at: this.update_at,
            heure: this.heure,
            type: this.type,
        });
    }


    createFormControls_update() {
        // createFormControls
        this.id = new FormControl('');
        this.title = new FormControl('');
        this.client_id = new FormControl('');
        this.installateur_id = new FormControl('');
        this.remarque = new FormControl('');
        this.lieu = new FormControl('');
        this.created_at = new FormControl('');
        this.update_at = new FormControl('');
        this.heure = new FormControl('');
        this.type = new FormControl('');

    }


    createForm_update() {
        this.formUpdate = new FormGroup({
            id: this.id,
            client_id: this.client_id,
            installateur_id: this.installateur_id,
            remarque: this.remarque,
            lieu: this.lieu,
            created_at: this.created_at,
            update_at: this.update_at,
            heure: this.heure,
            title: this.title,
            type: this.type,
        });
    }


    getCostumer(): void {
        this.costumerService.getCostumer().subscribe(costumer => {
            this.costumerData = costumer;
            //  console.log(this.costumerData);
        });
    }


    getInstaller(): void {
        this.installerService.getInstaller().subscribe(installer => {
            this.installerData = installer;
            // console.log(this.installerData);
        });
    }


    refreshAgendaEvents() {
        $("#filter_client_calendar").val(0);
        $("#filter_installateur_calendar").val(0);
        $("#filter_type_calendar").val(0);
        $("#title_filter").val('');
        $("#lieu_filter").val('');
        // $('#miniCalendar1')[0].getAttribute("ng-reflect-model") ;
        // $('#miniCalendar2')[0].getAttribute("ng-reflect-model") ;


        $("#gif_loader").fadeIn(1000);

        if (this.current_role == 'admin') {
            $('#calendar').fullCalendar('removeEvents');
            $('#calendar1').fullCalendar('removeEvents');
            $('#calendar2').fullCalendar('removeEvents');
            this.getAgendaEvents();
        } else {
            $('#calendar').fullCalendar('removeEvents');
            $('#calendar1').fullCalendar('removeEvents');
            $('#calendar2').fullCalendar('removeEvents');
            this.getAgendaEvents_current_iduser();
        }
        $("#gif_loader").fadeOut(900);
    }


    getAgendaEvents(): void {
        this.agendaService.getAgenda().subscribe(agenda => {
            this.agendaData = agenda;
            //  console.log('---------- All agendaData -----------');
            //    console.log(this.agendaData);
            let list_all_event_bd = this.agendaData;
            //    console.log(list_all_event_bd.length);
            this.current_list_nbr_rows = list_all_event_bd.length;

            var compt = 0;
            for (let i = 0; i < list_all_event_bd.length; i++) {
                this.id = list_all_event_bd[i].id;
                this.current_title = list_all_event_bd[i].title;
                this.current_var_client = list_all_event_bd[i].client_id;
                this.current_var_installateur = list_all_event_bd[i].installateur_id;
                this.current_remarque = list_all_event_bd[i].remarque;
                this.current_lieu = list_all_event_bd[i].lieu;
                this.current_type = list_all_event_bd[i].type;
                this.current_start = list_all_event_bd[i].update_at;
                this.current_update_at = list_all_event_bd[i].update_at;
                this.current_heure = list_all_event_bd[i].heure;
                this.current_etat = list_all_event_bd[i].etat;
                this.opts_technique = list_all_event_bd[i].opts_technique;
                this.current_idUser_sup = list_all_event_bd[i].id_user;
                this.current_date_vue = list_all_event_bd[i].date_vue;
                this.current_end      = list_all_event_bd[i].end;

                //  this.current_start =  this.current_start.substring(0,10);
                //   console.log(' START ==> '+this.current_update_at+' '+this.current_heure);
                //  console.log(' END   ==> '+this.current_end);
                //   console.log('---------------------------------');
                // console.log('TEST ---> '+this.current_update_at+' '+this.current_heure);

                if(list_all_event_bd[i].id_user != -999){
                    this.addOneEvent_bdToView();
                    compt = compt + 1;
                }
            }


            $("#gif_loader").fadeOut(900);
            /*
            if (compt == list_all_event_bd.length) {
                //  alert(compt);
                $("#gif_loader").fadeOut(900);
            }
            */

        });
    }


    getAgendaEvents_current_iduser() {
        let idUser = this.current_user_id;
//  alert('idUser selected : '+idUser);
        this.agendaService.getAgenda_by_idUser(idUser).subscribe(agendaconsole => {
            $('#calendar').fullCalendar('removeEvents');
            $('#calendar1').fullCalendar('removeEvents');
            $('#calendar2').fullCalendar('removeEvents');

            $("#gif_loader").fadeIn(1000);

            this.agendaData = agendaconsole.data;

            let list_all_event_bd = this.agendaData;
            this.current_list_nbr_rows = list_all_event_bd.length;

            var compt = 0;
            for (let i = 0; i < list_all_event_bd.length; i++) {
                this.id = list_all_event_bd[i].id;
                this.current_title = list_all_event_bd[i].title;
                this.current_var_client = list_all_event_bd[i].client_id;
                this.current_var_installateur = list_all_event_bd[i].installateur_id;
                this.current_remarque = list_all_event_bd[i].remarque;
                this.current_lieu = list_all_event_bd[i].lieu;
                this.current_type = list_all_event_bd[i].type;
                this.current_start = list_all_event_bd[i].update_at;
                this.current_update_at = list_all_event_bd[i].update_at;
                this.current_heure = list_all_event_bd[i].heure;

                this.current_etat = list_all_event_bd[i].etat;
                this.opts_technique = list_all_event_bd[i].opts_technique;
                this.current_idUser_sup = list_all_event_bd[i].id_user;
                this.current_date_vue = list_all_event_bd[i].date_vue;
                this.current_end      = list_all_event_bd[i].end;

                // console.log('TEST ---> '+this.current_update_at+' '+this.current_heure);
                this.addOneEvent_bdToView();
                compt = compt + 1;
            }
            if (compt == list_all_event_bd.length) {
                //  alert(compt);
                $("#gif_loader").fadeOut(900);
            }

        });
    }

    go_search_filters_like_events(event) {
        let var_id_client = '0';
        let var_id_installateur = '0';
        let var_type = '0';
        let var_title = '0';
        let var_lieu = '0';
        let var_date1 = "0";
        let var_date2 = "0";

        var_id_client = $("#filter_client_calendar").val();
        var_id_installateur = $("#filter_installateur_calendar").val();
        var_type = $("#filter_type_calendar").val();
        var_title = $("#title_filter").val();
        var_lieu = $("#lieu_filter").val();
        var_date1 = $('#miniCalendar1')[0].getAttribute("ng-reflect-model");
        var_date2 = $('#miniCalendar2')[0].getAttribute("ng-reflect-model");

        let obj_agenda = new Agenda();

        if (var_type == '0') {
            var_type = '';
        }
        if (var_id_client == '0') {
            var_id_client = '';
        }
        if (var_id_installateur == '0') {
            var_id_installateur = '';
        }
        if (var_date1 == null) {
            var_date1 = '';
        }
        if (var_date2 == null) {
            var_date2 = '';
        }
        obj_agenda.type = var_type;
        obj_agenda.title = var_title;
        obj_agenda.lieu = var_lieu;
        obj_agenda.installateur_id = var_id_installateur;
        obj_agenda.client_id = var_id_client;
        obj_agenda.created_at = var_date1;
        obj_agenda.update_at = var_date2;
        obj_agenda.id_user = this.current_user_id;
        obj_agenda.role = this.current_role;
        obj_agenda.end  = this.current_end;
        //    console.log('-------------------------------------------');
        //    console.log(obj_agenda);
        //    console.log('-------------------------------------------');

        this.agendaService.getAgenda_filter(obj_agenda).subscribe(agendaconsole => {

            $('#calendar').fullCalendar('removeEvents');
            $('#calendar1').fullCalendar('removeEvents');
            $('#calendar2').fullCalendar('removeEvents');
            $("#gif_loader").fadeIn(1000);

            this.agendaData = agendaconsole.data;
            //    console.log('---------- All agendaData Filter  -----------');
            //    console.log(this.agendaData);

            let list_all_event_bd = this.agendaData;
            //    console.log(list_all_event_bd.length);
            this.current_list_nbr_rows = list_all_event_bd.length;
            var compt = 0;
            for (let i = 0; i < list_all_event_bd.length; i++) {
                this.id = list_all_event_bd[i].id;
                this.current_title = list_all_event_bd[i].title;
                this.current_var_client = list_all_event_bd[i].client_id;
                this.current_var_installateur = list_all_event_bd[i].installateur_id;
                this.current_remarque = list_all_event_bd[i].remarque;
                this.current_lieu = list_all_event_bd[i].lieu;
                this.current_type = list_all_event_bd[i].type;
                this.current_start = list_all_event_bd[i].update_at;
                this.current_update_at = list_all_event_bd[i].update_at;
                this.current_heure = list_all_event_bd[i].heure;
                this.current_etat = list_all_event_bd[i].etat;
                this.current_idUser_sup = list_all_event_bd[i].id_user;
                this.current_date_vue = list_all_event_bd[i].date_vue;
                this.opts_technique = list_all_event_bd[i].opts_technique;
                this.current_end    =  list_all_event_bd[i].end;
                //  this.current_start =  this.current_start.substring(0,10);
                // console.log('this.current_start  this.current_heure ==> '+this.current_start+' '+this.current_heure);
                // console.log('TEST ---> '+this.current_update_at+' '+this.current_heure);
                this.addOneEvent_bdToView();
                compt = compt + 1;
            }

            if (compt == list_all_event_bd.length) {
                //  alert(compt);
                $("#gif_loader").fadeOut(900);
            }


        });


    }

    go_search_intervalle_events() {
        let date1;
        let date2;
        setTimeout(function () {
            date1 = $('#miniCalendar1')[0].getAttribute("ng-reflect-model");
            date2 = $('#miniCalendar2')[0].getAttribute("ng-reflect-model");
            //    console.log('date1 => ' + date1);
            //     console.log('date2 => ' + date2);

            if (date1 != null) {
                if (date2 != null) {
                    //  this.getAgendaEvents_inerval();
                }
            }

        }, 500);

        //   console.log('getAgendaEvents_inerval()');
        //   console.log('date1 => ' + date1);
        //   console.log('date2 => ' + date2);

        //  date1 = $('#miniCalendar1')[0].getAttribute("ng-reflect-model") ;
        //  date2 = $('#miniCalendar2')[0].getAttribute("ng-reflect-model") ;

        //  this.getAgendaEvents_inerval();
    }

    getAgendaEvents_inerval(): any {
        // let date1 = $('#miniCalendar1')[0].getAttribute("ng-reflect-model");
        // let date2 = $('#miniCalendar2')[0].getAttribute("ng-reflect-model");

        let date1 = $('#miniCalendar1').find("span").eq(0).html();
        let date2 = $('#miniCalendar2').find("span").eq(0).html();

        let obj_agenda = new Agenda();
        obj_agenda.created_at = date1;
        obj_agenda.update_at = date2;
        obj_agenda.id_user = this.current_user_id;
        obj_agenda.role = this.current_role;


        console.log(obj_agenda);

        this.agendaService.getAgenda_interval(obj_agenda).subscribe(agendaconsole => {

            $('#calendar').fullCalendar('removeEvents');
            $('#calendar1').fullCalendar('removeEvents');
            $('#calendar2').fullCalendar('removeEvents');

            $("#gif_loader").fadeIn(1000);

            this.agendaData = agendaconsole.data;

            console.log('---------- All agendaData Filter by 2 dates-----------');
            console.log(this.agendaData);
            let list_all_event_bd = this.agendaData;
            //     console.log(list_all_event_bd.length);
            this.current_list_nbr_rows = list_all_event_bd.length;

            var compt = 0;
            for (let i = 0; i < list_all_event_bd.length; i++) {
                this.id = list_all_event_bd[i].id;
                this.current_title = list_all_event_bd[i].title;
                this.current_var_client = list_all_event_bd[i].client_id;
                this.current_var_installateur = list_all_event_bd[i].installateur_id;
                this.current_remarque = list_all_event_bd[i].remarque;
                this.current_lieu = list_all_event_bd[i].lieu;
                this.current_type = list_all_event_bd[i].type;
                this.current_start = list_all_event_bd[i].update_at;
                this.current_update_at = list_all_event_bd[i].update_at;
                this.current_heure = list_all_event_bd[i].heure;

                this.current_etat = list_all_event_bd[i].etat;
                this.current_idUser_sup = list_all_event_bd[i].id_user;
                this.current_date_vue = list_all_event_bd[i].date_vue;
                this.opts_technique = list_all_event_bd[i].opts_technique;
                this.current_end    =  list_all_event_bd[i].end;

                //  this.current_start =  this.current_start.substring(0,10);
                // console.log('this.current_start  this.current_heure ==> '+this.current_start+' '+this.current_heure);


                // console.log('TEST ---> '+this.current_update_at+' '+this.current_heure);
                this.addOneEvent_bdToView();
                compt = compt + 1;
            }
            if (compt == list_all_event_bd.length) {
                //  alert(compt);
                $("#gif_loader").fadeOut(900);
            }

        });
    }

    one_event_filter_clicked(id_agenda) {
        //     console.log('Event interval filter clicked , id : ' + id_agenda);
        // scrool TOP body
        let current_date = $("#td_event_filter_update_at_" + id_agenda)[0].getAttribute("class");

        $('#calendar').fullCalendar('gotoDate', current_date);
        $('#calendar1').fullCalendar('gotoDate', current_date);
        $('#calendar2').fullCalendar('gotoDate', current_date);
        window.scrollTo(0, 375);

    }

    addOneEvent_bdToView() {
        this.current_start = this.current_start.substring(0, 10);
        this.current_start = this.current_start + '  ' + this.current_heure;
        // console.log('000 -->  : '+this.current_start);

        var curr_dt = new Date(this.current_start);
        // console.log('111 -->  : '+curr_dt);


        if (this.current_type === '1') {
            this.current_event_color = '#f27272';
        } else if (this.current_type === '2') {
            this.current_event_color = '#3e9cde';
        } else if (this.current_type === '3') {
            this.current_event_color = '#ffc107';
        } else if (this.current_type === '4') {
            this.current_event_color = '#1abc9c';
        } else if (this.current_type === '5') {
            this.current_event_color = '#59f2f2';
        } else if (this.current_type === '6') {
            this.current_event_color = '#eb7bff';
        }

        var eventData = {
            id: this.id,
            title: this.current_title,
            var_client: this.current_var_client,
            var_installateur: this.current_var_installateur,
            remarque: this.current_remarque,
            lieu: this.current_lieu,
            type: this.current_type,
            var_prevu_date: this.current_update_at,
            var_heur_inter: this.current_heure,
            start: curr_dt,
            etat:    this.current_etat ,
            opts_technique: this.opts_technique ,
            id_user: this.current_idUser_sup ,
            date_vue:  this.current_date_vue ,
            color: this.current_event_color,
            end: this.current_end


        };


        $('#calendar').fullCalendar('renderEvent', eventData, true);
        $('#calendar1').fullCalendar('renderEvent', eventData, true);
        $('#calendar2').fullCalendar('renderEvent', eventData, true);


        /*
          $('#calendar').fullCalendar( 'gotoDate', '2018-08-08 17:46:57');
          $('#calendar1').fullCalendar( 'gotoDate', '2018-08-08 17:46:57');
          $('#calendar2').fullCalendar( 'gotoDate', '2018-08-08 17:46:57');
        */





    } // add_one_event


    onSubmit() {

        //  console.log(" -- 1 -- ");
// if (this.formAdd.valid) {
        //    console.log('formAdd valid');

        this.addToast({
            title: 'Please Waiting your Agenda',
            msg: 'Turning standard Bootstrap alerts into awesome notifications',
            timeout: 1000,
            theme: 'bootstrap',
            position: 'top-right',
            type: 'wait'
        });
        this.agendaPost = new Agenda();

        this.agendaPost.client_id = $('#client_id').val();;
        this.agendaPost.installateur_id = $('#installateur_id').val();
        this.agendaPost.remarque = $("#remarque").val();
        this.agendaPost.lieu = $('#lieu').val();
        this.agendaPost.heure = $('#heure').val();
        this.agendaPost.update_at = $('#created_at').val();
        this.agendaPost.title = $("#title").val();
        this.agendaPost.type = $('#type').val();
        this.agendaPost.etat = 0;
        this.agendaPost.end = $('#end_date').val();


        let opt_1_technique_add = $('#txt_opt_1_technique_add').val();
        let opt_2_technique_add = $('#txt_opt_2_technique_add').val();
        let opt_3_technique_add = $('#txt_opt_3_technique_add').val();
        let opt_4_technique_add = $('#txt_opt_4_technique_add').val();
        let opt_5_technique_add = $('#txt_opt_5_technique_add').val();
        let opt_6_technique_add = $('#txt_opt_6_technique_add').val();


        opt_1_technique_add = parseInt(opt_1_technique_add);
        opt_2_technique_add = parseInt(opt_2_technique_add);
        opt_3_technique_add = parseInt(opt_3_technique_add);
        opt_4_technique_add = parseInt(opt_4_technique_add);
        opt_5_technique_add = parseInt(opt_5_technique_add);
        opt_6_technique_add = parseInt(opt_6_technique_add);

        let array_opts_technique = [opt_1_technique_add, opt_2_technique_add, opt_3_technique_add, opt_4_technique_add, opt_5_technique_add, opt_6_technique_add];
        this.agendaPost.opts_technique = JSON.stringify(array_opts_technique);

        var current_event_color = 'white';

        if (this.agendaPost.type === '1') {
            current_event_color = '#f27272';
        } else if (this.agendaPost.type === '2') {
            current_event_color = '#3e9cde';
        } else if (this.agendaPost.type === '3') {
            current_event_color = '#ffc107';
        } else if (this.agendaPost.type === '4') {
            current_event_color = '#1abc9c';
        } else if (this.agendaPost.type === '5') {
            current_event_color = '#59f2f2';
        } else if (this.agendaPost.type === '6') {
            current_event_color = '#eb7bff';
        }

        this.agendaPost.id_user = parseInt(window.localStorage.user_id);

        //     console.log('submit agendaPost = ');
        //     console.log(this.agendaPost);


        this.agendaService.addAgenda(this.agendaPost).subscribe(agendaPostconsole => {
            try {
                //      console.log('agendaPostconsole.title / agendaPostconsole  = ');
                //      console.log(agendaPostconsole);
                this.last_id_event_added = agendaPostconsole.id;
                this.addToast({
                    title: 'notifications Waiting your Event',
                    msg: 'Turning standard Bootstrap alerts into awesome notifications',
                    timeout: 6000,
                    theme: 'bootstrap',
                    position: 'top-right',
                    type: 'success'
                });
                //       console.log("this.last_id_event_added = " + this.last_id_event_added);

                //  this.refreshAgendaEvents() ;
                $("#refreshAgendaEvents").click();

                $("#title").val('');
                $("#client_id").val('');
                $('#installateur_id').val('')
                $("#created_at").val('01/01/2018');
                $("#update_at").val('01/01/2018');
                $("#heure").val('00:00');
                $("#lieu").val('');
                $("#val_event_created_by").html('---');
                $("#type").val('');
                $("#remarque").val('');
                $('#date_vue').val('[ 0000/00/00 00:00]');
                $('#end_date').val('0000/00/00 00:00')
                $(".oneinput_div_inputs_add_cas_technique").val(0);


            } catch (e) {

                console.log(e);
                this.addToast({
                    title: 'notifications Waiting your Event',
                    msg: 'Turning standard Bootstrap alerts into awesome notifications',
                    timeout: 6000,
                    theme: 'bootstrap',
                    position: 'top-right',
                    type: 'error'
                });
            }

        });







    } // end on submit

    onSubmit_upd(){
        //  console.log('formUpdate2 valid');


        this.addToast({title:'Please Waiting your Agenda', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});


        console.log('--------------- updateAgenda -------------------');

        let id_upd = $('#id_upd').html() ;
        let client_id_upd = $('#client_id_upd').val() ;
        let installateur_id_upd = $('#installateur_id_upd').val() ;
        let remarque_upd = $('#remarque_upd').val()  ;
        let lieu_upd = $('#lieu_upd').val() ;
        let heure_upd = $('#heure_upd').val();
        let created_at_upd = $('#created_at_upd').val() ;
        let title_upd = $('#title_upd').val() ;
        let type_upd = $('#type_upd').val() ;
        let end_date = $('#end_date_upd').val() ;
        console.log(end_date);



        var current_opts_technique = '' ;


        var opt_1_technique_upd = $('#txt_opt_1_technique_upd').val();
        var opt_2_technique_upd = $('#txt_opt_2_technique_upd').val();
        var opt_3_technique_upd = $('#txt_opt_3_technique_upd').val();
        var opt_4_technique_upd = $('#txt_opt_4_technique_upd').val();
        var opt_5_technique_upd = $('#txt_opt_5_technique_upd').val();
        var opt_6_technique_upd = $('#txt_opt_6_technique_upd').val();


        opt_1_technique_upd = parseInt(opt_1_technique_upd)  ;
        opt_2_technique_upd = parseInt(opt_2_technique_upd)  ;
        opt_3_technique_upd = parseInt(opt_3_technique_upd)  ;
        opt_4_technique_upd = parseInt(opt_4_technique_upd)  ;
        opt_5_technique_upd = parseInt(opt_5_technique_upd)  ;
        opt_6_technique_upd = parseInt(opt_6_technique_upd)  ;


        let json_opts_technique  =   JSON.stringify([opt_1_technique_upd, opt_2_technique_upd, opt_3_technique_upd, opt_4_technique_upd, opt_5_technique_upd, opt_6_technique_upd]);



        //     console.log('--------------- end input console log -------------------');
        this.agendaPost=  new Agenda();
        this.agendaPost.id = parseInt(id_upd) ;
        this.agendaPost.client_id = client_id_upd;
        this.agendaPost.installateur_id = installateur_id_upd;
        this.agendaPost.remarque = remarque_upd;
        this.agendaPost.lieu = lieu_upd;
        this.agendaPost.heure = heure_upd;
        this.agendaPost.created_at = created_at_upd;
        this.agendaPost.update_at = created_at_upd;
        this.agendaPost.title =title_upd;
        this.agendaPost.type=type_upd;
        this.agendaPost.opts_technique = json_opts_technique ;
        this.agendaPost.end =  end_date;

        this.agendaPost.id_user=  parseInt(window.localStorage.user_id) ;

        console.log('submit UPDATE agendaPost = ');
        console.log(this.agendaPost);


        this.agendaService.updateAgenda( this.agendaPost ).subscribe(agendaPostconsole=>{
            try {
                //      //   console.log('agendaPostconsole.title / agendaPostconsole  = ');
                //      //   console.log(agendaPostconsole);
                this.addToast({title:'notifications Waiting your Event', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                this.refreshAgendaEvents();

                $("#title_upd").val('');
                $("#client_id_upd").val('');
                $('#installateur_id_upd').val('')
                $("#created_at_upd").val('01/01/2018');
                $("#update_at_upd").val('01/01/2018');
                $("#heure_upd").val('00:00');
                $("#lieu_upd").val('');
                $("#val_event_created_by_upd").html('---');
                $("#type_upd").val('');
                $("#remarque_upd").val('');
                $('#date_vue').val('[ 0000/00/00 00:00]');
                $('#end_date_upd').val('0000/00/00 00:00')
                $(".oneinput_div_inputs_add_cas_technique").val(0);
            }catch (e) {

                //      //    console.log(e);
                this.addToast({title:'notifications Waiting your Event', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
            }

        });


    }

    prepa_delete(){
        let id_upd = $("#id_upd").html();
        //alert('id_upd = '+id_upd);
        let current_agenda=  new Agenda();
        current_agenda.id = id_upd;
        this.delete(current_agenda);

    }

    delete(agenda:Agenda):void{
        this.addToast({title:'notifications Waiting your Customer', msg:'waiting please delete operating system ', timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.agendaService.deleteAgenda(agenda).subscribe(agendaPostconsole=>{
        });
        this.refreshAgendaEvents();

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

    load_users_select(){
        //  alert('go_search_events_byIdUser');
        this.agendaService.getUsers().subscribe(agenda => {
            this.usersData = agenda;
            //  console.log ('usersData');
            //console.log(this.usersData);
        });
    }

    go_search_events_byIdUser(){
        let idUser =  $('#filter_idUser_calendar').val();
        //  alert('idUser selected : '+idUser);
        this.agendaService.getAgenda_by_idUser(idUser).subscribe(agendaconsole => {
            $('#calendar').fullCalendar( 'removeEvents');
            $('#calendar1').fullCalendar( 'removeEvents');
            $('#calendar2').fullCalendar( 'removeEvents');

            $("#gif_loader").fadeIn(1000);

            this.agendaData=agendaconsole.data;

            let list_all_event_bd = this.agendaData ;
            this.current_list_nbr_rows = list_all_event_bd.length ;

            var compt = 0 ;
            for(let i=0 ; i<list_all_event_bd.length ; i++){
                this.id                       = list_all_event_bd[i].id   ;
                this.current_title            = list_all_event_bd[i].title   ;
                this.current_var_client       = list_all_event_bd[i].client_id   ;
                this.current_var_installateur = list_all_event_bd[i].installateur_id   ;
                this.current_remarque  = list_all_event_bd[i].remarque   ;
                this.current_lieu      = list_all_event_bd[i].lieu   ;
                this.current_type      = list_all_event_bd[i].type   ;
                this.current_start     = list_all_event_bd[i].update_at   ;
                this.current_update_at = list_all_event_bd[i].update_at   ;
                this.current_heure     = list_all_event_bd[i].heure    ;
                this.current_end       = list_all_event_bd[i].end    ;

                // console.log('TEST ---> '+this.current_update_at+' '+this.current_heure);
                this.addOneEvent_bdToView();
                compt= compt +1 ;
            }
            if(compt == list_all_event_bd.length){
                //  alert(compt);
                $("#gif_loader").fadeOut(900);
            }

        });
    }


    get_count_event_non_vue_by_id_installateur(id_installateur){
        this.agendaService.get_count_event_non_vue_by_id_installateur(id_installateur).subscribe(agendaconsole => {
            let rep =agendaconsole.data;
            console.log('get_count_event_non_vue_by_id_instalalteur : ');
            console.log(rep[0]["count(*)"]);
            let current_non_vue = rep[0]["count(*)"];
            $("#span_2_div_nbr_event_non_vue").html(current_non_vue);
            if(current_non_vue >0){
                $("#div_nbr_event_non_vue").css("background","#f55f5f");
            }else{
                $("#div_nbr_event_non_vue").css("background","#1abc9c");
            }

        });
    }

    initializeCalendar = function() {
        $('.calendar').fullCalendar({
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: [], // create events
            defaultTimedEventDuration: '00:30:00',
            forceEventDuration: true,
            eventBackgroundColor: '#337ab7',
            //      editable: false,
            height: screen.height - 160,
            timezone: 'America/Chicago',
        });
    }

    getCalendars() {
        this.cal = $('.calendar');
        this.cal1 = $('#calendar1');
        this.cal2 = $('#calendar2');
    }

    initializeLeftCalendar(agendaservice) {
        $('#calendar1').fullCalendar('option', {
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek'
            },
            navLinks: false,
            dayClick: function(date) {
                $('#calendar2').fullCalendar('gotoDate', date);
            },
            eventClick: function(calEvent) {
                $('#calendar2').fullCalendar('gotoDate', calEvent.start);
            },

            eventDrop: function(event, delta, revertFunc) {
                console.log(event);

                //   var answer = confirm(event.title + " EST DEPLACER AU  :: " + event.start.format()+" ---> "+ event.end.format())
                //    if (answer) {

                let date_start_ =  event.start.format();
                let date_end_ =  event.end.format();

                let date_start_encode =  btoa(date_start_);
                let date_end_encode =  btoa(date_end_);

                agendaservice.upd_dates_start_end(event.id, date_start_encode, date_end_encode).subscribe(agendaconsole => {
                    this.agendaData = agendaconsole.data;
                    $("#refreshAgendaEvents").click();
                    $('#calendar2').fullCalendar('gotoDate', date_start_);

                    agendaservice.refresh_addremove_fakeevent(event.var_installateur).subscribe(agendaconsole => {
                        console.log("Accuse envoye au : "+event.var_installateur);
                        console.log(agendaconsole);
                    });


                });
                //   }
                //   else {
                //        revertFunc();
                //    }


            }



        });
    }


    cal2GoTo(date) {
        $('#calendar2').fullCalendar('gotoDate', date);
    }


    loadEvents() {
        $.getScript("assets/calendar/js/events.js", function(){ // mode deconnecté aussi .. synchro
        });
    }


    add_one_event(){
        var eventData = {
            title: 'title',
            var_client: 'var_client',
            var_installateur: 'var_installateur',
            var_prevu_date: 'var_prevu_date',
            var_heur_inter: 'var_heur_inter',
            start: 'start',
            remarque : 'remarque'
        };
        $('.calendar').fullCalendar('renderEvent', eventData, true);
        $('#newEvent').fadeOut();

        let title = $("#title").val();

        //   onSubmit_add();

    }


    newEvent(start,end) { //console.log(start);


        //   console.log(start._d);
        let array_date = start._i ;
        //   console.log(array_date);
        //    console.log('date_actuelle = '+this.date_actuelle);
        let month_inter = array_date[1] + 1 ;
        //   console.log('date intervention = '+array_date[2]+'-'+month_inter+'-'+array_date[0]);

        // fomater la date yyyy-mm-dd
        month_inter = month_inter + "" ;
        if(month_inter.length == 1){
            month_inter="0"+month_inter ;
        }
        let day_inter = array_date[2] + "" ;
        if(day_inter.length == 1){
            day_inter="0"+day_inter ;
        }
        $("#created_at").val(array_date[0]+'-'+month_inter+'-'+day_inter);
        let var_prevu_date = array_date[0]+'-'+month_inter+'-'+day_inter ;
        // fomater l heur hh:ii
        //    console.log('Heur intervention = ' + array_date[3]+':'+array_date[4]);
        let heur_inter = array_date[3] + "" ;
        if(heur_inter.length == 1){
            heur_inter="0"+heur_inter ;
        }
        let min_inter = array_date[4] + "" ;
        if(min_inter.length == 1){
            min_inter="0"+min_inter ;
        }
        $("#heure").val(heur_inter+':'+min_inter);
        let var_heur_inter = heur_inter+':'+min_inter ;


        // $('input#title').val("");
        $('#newEvent').fadeIn();
        $('#submit').unbind();

        $('#submit').on('click', function() {

            var var_client       = $('#client_id').val();   // $("#costumer_id option:selected").html();
            var title = $("#title").val();
            var var_installateur = $('#installateur_id').val();   // $("#personal_id option:selected").html();
            var var_heur  = $('#heure').val();
            var var_type  = $('#type').val();
            var var_lieu = $('#lieu').val();

            var current_event_color = 'white' ;

            if(var_type  === '1'){
                current_event_color = '#f27272' ;
            }else if(var_type  === '2'){
                current_event_color = '#3e9cde' ;
            }else if(var_type  === '3'){
                current_event_color = '#ffc107' ;
            }else if(var_type  === '4'){
                current_event_color = '#1abc9c' ;
            }else if(var_type  === '5'){
                current_event_color = '#59f2f2' ;
            }else if(var_type  === '6'){
                current_event_color = '#eb7bff' ;
            }

            var current_opts_technique = '' ;


            var opt_1_technique_add = $('#txt_opt_1_technique_add').val();
            var opt_2_technique_add = $('#txt_opt_2_technique_add').val();
            var opt_3_technique_add = $('#txt_opt_3_technique_add').val();
            var opt_4_technique_add = $('#txt_opt_4_technique_add').val();
            var opt_5_technique_add = $('#txt_opt_5_technique_add').val();
            var opt_6_technique_add = $('#txt_opt_6_technique_add').val();


            opt_1_technique_add = parseInt(opt_1_technique_add)  ;
            opt_2_technique_add = parseInt(opt_2_technique_add)  ;
            opt_3_technique_add = parseInt(opt_3_technique_add)  ;
            opt_4_technique_add = parseInt(opt_4_technique_add)  ;
            opt_5_technique_add = parseInt(opt_5_technique_add)  ;
            opt_6_technique_add = parseInt(opt_6_technique_add)  ;


            current_opts_technique  =   JSON.stringify([opt_1_technique_add, opt_2_technique_add, opt_3_technique_add, opt_4_technique_add, opt_5_technique_add, opt_6_technique_add]);


            let remarque = $("#remarque").val() ;
            if (var_client) {
                if (var_installateur) {
                    var eventData = {
                        //        id: id ,
                        title: title,
                        var_client: var_client,
                        var_installateur: var_installateur,
                        var_prevu_date: var_prevu_date, // created at
                        start: start, // upd_date
                        heur: var_heur ,
                        type : var_type ,
                        remarque : remarque ,
                        lieu : var_lieu ,
                        created_at : start ,
                        color:  current_event_color,
                        etat:  0 ,
                        opts_technique : current_opts_technique,
                        date_vue : 'null'
                    };
                    //            console.log(eventData);



                    $('.calendar').fullCalendar('renderEvent', eventData, true);
                    $('#newEvent').fadeOut();

                    title = $("#title").val();

                    //   onSubmit_add();
                }
                else
                {
                    //  alert("Installateur can't be blank. Please try again.")
                    $("#installateur_id").css("border-color", "rgb(255, 29, 29)");
                }
            }
            else
            {
                //        console.log("Client can't be blank. Please try again.")
                $("#client_id").css("border-color", "rgb(255, 29, 29)");
            }

        });
    }


    initializeRightCalendar(agendaservice)  {
        $('#calendar2').fullCalendar('changeView', 'agendaDay');

        $('#calendar2').fullCalendar('option', {
            slotEventOverlap: false,
            allDaySlot: false,
            header: {
                right: 'prev,next today'
            },
            selectable: true,
            selectHelper: true,

            eventDrop: function(event, delta, revertFunc) {



                //     var answer = confirm(event.title + " EST DEPLACER AU  : " + event.start.format()+" ---> "+ event.end.format())
                //     if (answer) {

                let date_start_ =  event.start.format();
                let date_end_ =  event.end.format();

                console.log(date_start_);
                console.log(date_end_);

                let date_start_encode =  btoa(date_start_);
                let date_end_encode =  btoa(date_end_);

                agendaservice.upd_dates_start_end(event.id, date_start_encode, date_end_encode).subscribe(agendaconsole => {
                    this.agendaData = agendaconsole.data;

                    console.log(event);

                    agendaservice.refresh_addremove_fakeevent(event.var_installateur).subscribe(agendaconsole => {
                        console.log("Accuse envoye au : "+event.var_installateur);
                        console.log(agendaconsole);
                    });
                });

                //    }
                //     else {
                //         revertFunc();
                //     }



            },

            eventResize: function(event, delta, revertFunc) {
                console.log(event);
                console.log('id_event : '+event.id);
                console.log('date_end : '+event.end.format());


                //  var answer = confirm(event.title + " SE TERMINE LE : " + event.end.format())
                //  if (answer) {
                let var_current_datetime =  event.end.format();

                let date_encode = btoa(var_current_datetime);

                agendaservice.add_date_end(event.id, date_encode).subscribe(agendaconsole => {
                    this.agendaData = agendaconsole.data;
                    agendaservice.refresh_addremove_fakeevent(event.var_installateur).subscribe(agendaconsole => {
                        console.log("Accuse envoye au : "+event.var_installateur);
                        console.log(agendaconsole);
                    });
                });
                //  }
                //   else {
                //      revertFunc();
                //  }

            },

            select: function(start, end) {
                // this.newEvent(start, end);



                let array_date = start._i ;
                //   console.log(array_date);
                //   console.log('date_actuelle = '+this.date_actuelle);
                let month_inter = array_date[1] + 1 ;
                //    console.log('date intervention = '+array_date[2]+'-'+month_inter+'-'+array_date[0]);

                // fomater la date yyyy-mm-dd
                month_inter = month_inter + "" ;
                if(month_inter.length == 1){
                    month_inter="0"+month_inter ;
                }
                let day_inter = array_date[2] + "" ;
                if(day_inter.length == 1){
                    day_inter="0"+day_inter ;
                }
                $("#created_at").val(array_date[0]+'-'+month_inter+'-'+day_inter);
                let var_prevu_date = array_date[0]+'-'+month_inter+'-'+day_inter ;
                // fomater l heur hh:ii
                //      console.log('Heur intervention = ' + array_date[3]+':'+array_date[4]);
                let heur_inter = array_date[3] + "" ;
                if(heur_inter.length == 1){
                    heur_inter="0"+heur_inter ;
                }
                let min_inter = array_date[4] + "" ;
                if(min_inter.length == 1){
                    min_inter="0"+min_inter ;
                }
                $("#heure").val(heur_inter+':'+min_inter);
                let var_heur_inter = heur_inter+':'+min_inter ;


                let date_start = var_prevu_date+' '+var_heur_inter ;
                let date_end = end.toISOString();
                $('#end_date').val(date_end);



                /*
                  month = '' + (date_end.getMonth() + 1),
                  day = '' + date_end.getDate(),
                  year = date_end.getFullYear();

              if (month.length < 2) month = '0' + month;
              if (day.length < 2) day = '0' + day;
*/
                //  return [year, month, day].join('-');

                console.log(date_start+' ---> '+ date_end);


                // $('input#title').val("");
                $('#newEvent').fadeIn(300);
                $('#submit').unbind();

                $('#submit').on('click', function() {

                    var var_client       = $('#client_id').val();   // $("#costumer_id option:selected").html();
                    var title = $("#title").val();
                    var var_installateur = $('#installateur_id').val();   // $("#personal_id option:selected").html();
                    var var_heur  = $('#heure').val();
                    var var_type  = $('#type').val();
                    var var_lieu = $('#lieu').val();

                    var current_event_color = 'white' ;

                    if(var_type  === '1'){
                        current_event_color = '#f27272' ;
                    }else if(var_type  === '2'){
                        current_event_color = '#3e9cde' ;
                    }else if(var_type  === '3'){
                        current_event_color = '#ffc107' ;
                    }else if(var_type  === '4'){
                        current_event_color = '#1abc9c' ;
                    }else if(var_type  === '5'){
                        current_event_color = '#59f2f2' ;
                    }else if(var_type  === '6'){
                        current_event_color = '#eb7bff' ;
                    }

                    var current_opts_technique = '' ;


                    var opt_1_technique_add = $('#txt_opt_1_technique_add').val();
                    var opt_2_technique_add = $('#txt_opt_2_technique_add').val();
                    var opt_3_technique_add = $('#txt_opt_3_technique_add').val();
                    var opt_4_technique_add = $('#txt_opt_4_technique_add').val();
                    var opt_5_technique_add = $('#txt_opt_5_technique_add').val();
                    var opt_6_technique_add = $('#txt_opt_6_technique_add').val();


                    opt_1_technique_add = parseInt(opt_1_technique_add)  ;
                    opt_2_technique_add = parseInt(opt_2_technique_add)  ;
                    opt_3_technique_add = parseInt(opt_3_technique_add)  ;
                    opt_4_technique_add = parseInt(opt_4_technique_add)  ;
                    opt_5_technique_add = parseInt(opt_5_technique_add)  ;
                    opt_6_technique_add = parseInt(opt_6_technique_add)  ;


                    current_opts_technique  =   JSON.stringify([opt_1_technique_add, opt_2_technique_add, opt_3_technique_add, opt_4_technique_add, opt_5_technique_add, opt_6_technique_add]);


                    let remarque = $("#remarque").val() ;
                    if (var_client) {
                        if (var_installateur) {
                            var eventData = {
                                //        id: id ,
                                title: title,
                                var_client: var_client,
                                var_installateur: var_installateur,
                                var_prevu_date: var_prevu_date, // created at
                                start: start, // upd_date
                                heur: var_heur ,
                                type : var_type ,
                                remarque : remarque ,
                                lieu : var_lieu ,
                                created_at : start ,
                                color:  current_event_color,
                                etat:  0 ,
                                opts_technique : current_opts_technique,
                                end:date_end
                            };
                            console.log(eventData);

                            $('.calendar').fullCalendar('renderEvent', eventData, true);
                            $('#newEvent').fadeOut(400);

                            title = $("#title").val();

                            //   onSubmit_add();
                        }
                        else
                        {
                            //  alert("Installateur can't be blank. Please try again.")
                            $("#installateur_id").css("border-color", "rgb(255, 29, 29)");
                        }
                    }
                    else
                    {
                        console.log("Client can't be blank. Please try again.")
                        $("#client_id").css("border-color", "rgb(255, 29, 29)");
                    }

                });
            },
            eventClick: function(calEvent, jsEvent, view) {
                //  this.editEvent(calEvent);


                //        console.log(calEvent);
                //    console.log('calEvent.opts_technique = '+calEvent.opts_technique);
                $('#hidden_etat').val(calEvent.etat);


                this.var_idUser_session = window.localStorage.getItem('user_id') ;
                this.var_iduser_event   = calEvent.var_installateur  ;
                this.var_sup  = calEvent.id_user ;


                agendaservice.getusernamebyid(this.var_sup).subscribe(agendaPostconsole=>{
                    console.log('----   ---  IIICIII ---    ---');
                    console.log(agendaPostconsole.fullname);

                    $('#val_event_created_by_upd').html(agendaPostconsole.fullname);

                    agendaservice.get_created_at_byidevent(calEvent.id).subscribe(agendaPostconsole=> {
                        let date_insertion = agendaPostconsole.created_at  ;
                        date_insertion =   date_insertion.replace("@", " ");
                        $('#span_date_created_at').html(date_insertion);

                    });

                });

                /*
  // a faire
                          this.ApiUrl = 'http://192.168.3.111:8000/api/agenda';  // URL to web api
                          $.ajax({url: this.ApiUrl+"/getusernamebyid/"+this.var_sup, success: function(result){ // URL to web api
                                  console.log(result);
                                  $("#val_event_created_by_upd").html(result);
                              }});
  */




                //       console.log('->  var_idUser_session = '+ this.var_idUser_session );
                //       console.log('->  var_iduser_event = '+ this.var_iduser_event);

                let rootVar = calEvent.id ;
                let rootVar2 = calEvent.id_user ;

                this.calEvent_id = calEvent.id;
                ///   console.log(this.calEvent_id);

                agendaservice.checketateventbyidevent(this.calEvent_id).subscribe(agendaconsole => {
                    //     console.log('******************************************');
                    //    console.log(agendaconsole[0]);
                    //     console.log('******************************************');
                    this.current_etat_bd = agendaconsole[0].etat;
                    //    $.ajax({url: this.ApiUrl+"/checketateventbyidevent/"+calEvent.id, success: function(current_etat_bd){ // URL to web api


                    //     console.log('---------------- CURRENT ETAT -------------------');
                    //    console.log(this.current_etat_bd);
                    //   console.log('---------------- END CURRENT ETAT -------------------');
                    //    $("#val_event_created_by_upd").html(result);


                    // if(calEvent.etat == 0){
                    if (this.current_etat_bd == 0) {
                        //    console.log("current_etat_bd == 0");
                        //     console.log(this.var_idUser_session + '    ' + this.var_iduser_event);

                        if (this.var_idUser_session == this.var_iduser_event) {
                            //       console.log("this.var_idUser_session == this.var_iduser_event");


                            $("#editEvent_document").css("border", "4px solid #fb4c4c");
                            $("#editEvent_document").css("border-radius", "4px");
                            //     console.log('--- Go change etat event to : 1 to event id : ' + calEvent.id + ' ---');

                            if (calEvent.id > -1) {
                                //         console.log("calEvent.id > -1");


                                this.calEvent_id = calEvent.id;
                                //       console.log(this.calEvent_id);
                                this.ApiUrl = 'http://192.168.3.111:8000/api/agenda';  // URL to web api


                                agendaservice.enabletatcalendar(this.calEvent_id).subscribe(agendaconsole => {


                                    //         console.log("agendaservice.enabletatcalendar");
                                    this.current_etat_bd = 1;
                                    //   this.agendaData = agendaconsole.data;

                                    //   $.ajax({url: this.ApiUrl+"/enabletatcalendar/"+this.calEvent_id, success: function(result){ // URL to web api
                                    //         console.log("---- END enabletatcalendar ----");
                                    //          console.log(result);

                                    setTimeout(function () {
                                        $("#editEvent_document").css("border", "5px solid rgb(100, 197, 112)");


                                        // SAVE CURRENT_DATE_TIME
                                        let d = new Date();
                                        let var_current_date = d.toLocaleDateString();   // -> "2/1/2013"
                                        let var_current_time = d.toLocaleTimeString();
                                        let var_current_datetime = var_current_date + ' ' + var_current_time;

                                        var number = "0x";
                                        var length = var_current_datetime.length;
                                        for (var i = 0; i < length; i++)
                                            number += var_current_datetime.charCodeAt(i).toString(16);


                                        let date_encode = number; // ;  // date_decode = date_encode.hexDecode();
                                        //       console.log('-------------- var_current_datetime  ---------  : ' + var_current_datetime);
                                        //       console.log('-------------- date_encode ---------  : ' + date_encode);

                                        // var_idUser_session
                                        //       console.log('--- Go change DATE_VUE event   to event id : ' + calEvent.id + ' ---  DATE_VUE = ' + var_current_datetime + ' --- HEX = ' + this.date_encode);


                                        agendaservice.add_datevue_calendar(calEvent.id, date_encode).subscribe(agendaconsole => {
                                            this.agendaData = agendaconsole.data;

                                            agendaservice.refresh_addremove_fakeevent(calEvent.id_user).subscribe(agendaconsole => {
                                                console.log("Accuse envoye au : "+calEvent.id_user);
                                                console.log(agendaconsole);
                                                agendaservice.get_count_event_non_vue_by_id_installateur(calEvent.var_installateur).subscribe(agendaconsole => {
                                                    console.log(agendaconsole);
                                                    let rep =agendaconsole.data;
                                                    let current_non_vue = rep[0]["count(*)"];
                                                    $("#span_2_div_nbr_event_non_vue").html(current_non_vue);
                                                    if(current_non_vue >0){
                                                        $("#div_nbr_event_non_vue").css("background","#f55f5f");
                                                    }else{
                                                        $("#div_nbr_event_non_vue").css("background","#1abc9c");
                                                    }


                                                });
                                            });
                                        });

                                        /*
                                        $.ajax({url: this.ApiUrl+"/add_datevue_calendar/"+this.calEvent_id+"/"+this.date_encode, success: function(result){ // URL to web api
                                                                                                                                  console.log(result);
                                                                                                                              }});
                                                                                                                         */


                                        // END SAVE CURRENT_DATE_TIME


                                        $('#date_vue').val('[ vue le ' + var_current_datetime + ' ]'); // #31962a
                                        $('#date_vue').css('color', '#31962a');







                                    }, 1500);
                                    //           }});

                                });

                                /*
                                                                            $.ajax({url: this.ApiUrl+"/refresh_addremove_fakeevent/"+this.var_sup, success: function(result){ // URL to web api
                                                                                    console.log(result);
                                                                                    console.log("------ FAKE EVENT REFRESH ADDED [ id_fakeEvent : "+result.id+" ]");
                                                                                }});
                                */


                            }

                        }

                        $("#editEvent_document").css("border", "5px solid rgb(251, 76, 76)");
                        $("#editEvent_document").css("border-radius", "4px");
                        $('#date_vue').val('[ événement non vue ]');
                        $('#date_vue').css('color','red');


                    } else if (calEvent.etat  == 1) {

                        var string = "";
                        let number = calEvent.date_vue.slice(2);
                        var length = number.length;
                        for (var i = 0; i < length;) {
                            var code = number.slice(i, i += 2);
                            string += String.fromCharCode(parseInt(code, 16));
                        }




                        $('#date_vue').val('[vue le '+string+' ]'); // #31962a
                        $('#date_vue').css('color','#31962a');

                        $("#editEvent_document").css("border", "5px solid #64c570");
                        $("#editEvent_document").css("border-radius", "4px");

                    }

                    //                       }}); // end checketateventbyidevent

                });



                /*
                                    console.log('calEvent.id = '+calEvent.id);
                                    console.log('-> calEvent.id_user = '+calEvent.id_user);
                //    $("#val_event_created_by_upd").html(calEvent.id_user);
                                    console.log('calEvent.title = '+calEvent.title);
                                    console.log('calEvent.var_client = '+calEvent.var_client);
                                    console.log('calEvent.var_installateur = '+calEvent.var_installateur);
                                    console.log('calEvent.var_prevu_date = '+calEvent.var_prevu_date);
                                    console.log('calEvent.var_heur_inter = '+calEvent.var_heur_inter);
                                    console.log('calEvent.opts_technique = '+calEvent.opts_technique);*/
                if(calEvent.var_heur_inter == undefined){
                    //   console.log('--> calEvent.heur = '+calEvent.heur);
                    calEvent.var_heur_inter = calEvent.heur ;
                }


                //   console.log( calEvent );
                //   console.log('calEvent.var_type = '+calEvent.type);

                let array_test_json = calEvent.opts_technique ;
                if(array_test_json!=undefined){
                    let array_test  = JSON.parse(array_test_json);
                    if(calEvent.type == 5){
                        $("#div_inputs_upd_cas_technique").show();

                        $('#txt_opt_1_technique_upd').val(array_test[0]);
                        $('#txt_opt_2_technique_upd').val(array_test[1]);
                        $('#txt_opt_3_technique_upd').val(array_test[2]);
                        $('#txt_opt_4_technique_upd').val(array_test[3]);
                        $('#txt_opt_5_technique_upd').val(array_test[4]);
                        $('#txt_opt_6_technique_upd').val(array_test[5]);

                    }else{
                        $("#div_inputs_upd_cas_technique").hide();
                    }
                }else{
                    $('#txt_opt_1_technique_upd').val(0);
                    $('#txt_opt_2_technique_upd').val(0);
                    $('#txt_opt_3_technique_upd').val(0);
                    $('#txt_opt_4_technique_upd').val(0);
                    $('#txt_opt_5_technique_upd').val(0);
                    $('#txt_opt_6_technique_upd').val(0);
                }



                let current_event_dateVue_encoded = calEvent.date_vue ;
                if( parseInt(current_event_dateVue_encoded) != 0){

                    //     console.log('---------------------  '+current_event_dateVue_encoded);
                    var string = "";
                    let number = current_event_dateVue_encoded.slice(2);
                    var length = number.length;
                    for (var i = 0; i < length;) {
                        var code = number.slice(i, i += 2);
                        string += String.fromCharCode(parseInt(code, 16));
                    }
                    let current_event_dateVue_decoded = string;
                    //    console.log('---------------------  '+current_event_dateVue_decoded);

                    // let current_event_dateVue_decoded = current_event_dateVue_encoded ;
                    //    console.log('calEvent.date_vue = '+current_event_dateVue_decoded);

                    $('#date_vue').val('[vue le '+current_event_dateVue_decoded+' ]'); // #31962a
                    $('#date_vue').css('color','#31962a');
                }else{
                    //   $('#date_vue').val('[ événement non vue ]');
                    //  $('#date_vue').css('color','red');
                }


                // console.log('calEvent.date_vue = '+current_event_dateVue_decoded);
                /*    console.log('calEvent.var_lieu = '+calEvent.lieu);
                    console.log('calEvent.remarque = '+calEvent.remarque);
                    console.log('calEvent.start = '+calEvent.start);
                    console.log(calEvent);
*/
                let var_pure_date_prevu = calEvent.var_prevu_date ;
                var_pure_date_prevu = var_pure_date_prevu.substring(0,10)
                //    console.log('var_pure_date_prevu = '+var_pure_date_prevu);

                $('#id_upd').html(calEvent.id);
                $('#title_upd').val(calEvent.title);
                $('#client_id_upd').val(calEvent.var_client);
                $('#installateur_id_upd').val(calEvent.var_installateur);
                $('#lieu_upd').val(calEvent.lieu);

                // $('#created_at_upd').val(calEvent.var_prevu_date); // $('#created_at_upd').val('2018-08-11')
                //this.current_start =  this.current_start.substring(0,10);
                $('#created_at_upd').val(var_pure_date_prevu);

                $('#update_at_upd').val(calEvent.var_prevu_date);
                $('#heure_upd').val(calEvent.var_heur_inter);
                $('#type_upd').val(calEvent.type);
                $('#remarque_upd').val(calEvent.remarque);


                let n =  new Date(calEvent.end) ;
                let y = n.getFullYear();
                let m = n.getMonth() + 1;
                let d = n.getDate();
                let hh = n.getHours()-1;
                let ii = n.getMinutes();

                let date_end;
                let hh_ ;
                let ii_ ;
                if(hh<10){
                    hh_  = '0'+hh ;
                }
                if(ii<10){
                    ii_  = '0'+ii ;
                }
                date_end  = y + "-" + m + "-" + d +"T"+hh+":"+ii ;


                // formater amzo
                $('#end_date_upd').val(date_end);
                console.log("end_date_upd¨===== "+date_end);




                /*
                                    if( parseInt(calEvent.date_vue) != 0){
                                        $('#date_vue').val('[ vue le '+calEvent.date_vue+' ]'); // #31962a
                                        $('#date_vue').css('color','#31962a');
                                    }else{
                                        $('#date_vue').val('[ événement non vue ]');
                                        $('#date_vue').css('color','red');
                                    }
                */

                /*
                  // $('#editTitle').val(calEvent.title);
                  $('#client_id_upd').val(calEvent.var_client);
                  $('#installateur_id_upd').val(calEvent.var_installateur);
                  $('#created_at_upd').val(calEvent.var_prevu_date+'');
                  $('#heure_upd').val(calEvent.var_heur_inter+'');
                  */


                $('#editEvent').fadeIn(400);
                $('#update').unbind();

                $('#update').on('click', function() {
                    var title = $('#title_upd').val();
                    $('#editEvent').fadeOut();
                    var eventData;
                    if (title) {
                        calEvent.title = title
                        $('.calendar').fullCalendar('updateEvent', calEvent);

                    } else {
                        // alert("Title can't be blank. Please try again.")
                        $("#title_upd").css("border-color", "rgb(255, 29, 29)");
                        //  $("#client_id_upd").css("border-color", "rgb(255, 29, 29)");
                        //  $("#installateur_id_upd").css("border-color", "rgb(255, 29, 29)");
                    }
                });


                $('#delete').on('click', function() {

                    //    console.log('calEvent = ');
                    //     console.log(calEvent);

                    $('#delete').unbind();
                    if (calEvent._id.includes("_fc")){
                        $('#calendar1').fullCalendar('removeEvents', [this.getCal1Id(calEvent._id)]);
                        /*
                                                    console.log("IF_OK => ");
                                                    console.log(calEvent._id);
                                                    console.log("IF_OK => "+this.getCal1Id(calEvent._id));
                        */
                        $('#calendar2').fullCalendar('removeEvents', [calEvent._id]);
                    } else {
                        this.cal.fullCalendar('removeEvents', [calEvent._id]);

                        //       console.log("IF_NO => "+calEvent._id);

                    }
                    $('#editEvent').fadeOut();




                });


            },
        });
    }


    last_id_event_added_2 = -111 ;
    editEvent(calEvent) {

        //    console.log(calEvent);
//    console.log('calEvent.opts_technique = '+calEvent.opts_technique);
        $('#hidden_etat').val(calEvent.etat);


        let var_idUser_session = window.localStorage.getItem('user_id') ;
        let var_iduser_event   = calEvent.var_installateur  ;
        let var_sup  = calEvent.id_user ;

// a faire
        /*
            $.ajax({url: ApiUrl+"/getusernamebyid/"+calEvent.id_user, success: function(result){ // URL to web api
                    console.log(result);
                    $("#val_event_created_by_upd").html(result);
                }});
        */


        //  console.log('->  var_idUser_session = '+ var_idUser_session );
        //  console.log('->  var_iduser_event = '+ var_iduser_event);

        let rootVar = calEvent.id ;
        let rootVar2 = calEvent.id_user ;
        /*
            $.ajax({url: ApiUrl+"/checketateventbyidevent/"+calEvent.id, success: function(current_etat_bd){ // URL to web api
                    console.log('---------------- CURRENT ETAT -------------------');
                    console.log(current_etat_bd);
                    console.log('---------------- END CURRENT ETAT -------------------');
                //    $("#val_event_created_by_upd").html(result);





                   // if(calEvent.etat == 0){
                      if(current_etat_bd == 0){

                        if(var_idUser_session == var_iduser_event){

                            $("#editEvent_document").css("border", "4px solid #fb4c4c");
                            $("#editEvent_document").css("border-radius", "4px");
                            console.log('--- Go change etat event to : 1 to event id : '+calEvent.id+' ---');

                            if(calEvent.id > -1){


                                $.ajax({url: ApiUrl+"/enabletatcalendar/"+calEvent.id, success: function(result){ // URL to web api
                                        console.log(result);


                                        refresh_events_by_addRemove_fakeOne(var_sup);
                                        setTimeout(function(){
                                            $("#editEvent_document").css("border", "5px solid rgb(100, 197, 112)");




                                            // SAVE CURRENT_DATE_TIME
                                            d = new Date();
                                            var_current_date = d.toLocaleDateString();   // -> "2/1/2013"
                                            var_current_time = d.toLocaleTimeString();
                                            var_current_datetime = var_current_date+' '+var_current_time ;

                                            date_encode = var_current_datetime.hexEncode() ;  // date_decode = date_encode.hexDecode();
                                            // var_idUser_session
                                            console.log('--- Go change DATE_VUE event   to event id : '+calEvent.id+' ---  DATE_VUE = '+var_current_datetime+' --- HEX = '+date_encode);
                                            $.ajax({url: ApiUrl+"/add_datevue_calendar/"+calEvent.id+"/"+date_encode, success: function(result){ // URL to web api
                                                    console.log(result);
                                                }});
                                            // END SAVE CURRENT_DATE_TIME



                                            $('#date_vue').val('[ vue le '+var_current_datetime+' ]'); // #31962a
                                            $('#date_vue').css('color','#31962a');





                                        }, 1500);
                                    }});




                            }

                        }

                        $("#editEvent_document").css("border", "5px solid rgb(251, 76, 76)");
                        $("#editEvent_document").css("border-radius", "4px");


                    }else if(calEvent.etat == 1){

                        $("#editEvent_document").css("border", "5px solid #64c570");
                        $("#editEvent_document").css("border-radius", "4px");

                    }

                }}); // end checketateventbyidevent
        */


        /*
             //   console.log('calEvent.id = '+calEvent.id);
            //    console.log('-> calEvent.id_user = '+calEvent.id_user);
        //    $("#val_event_created_by_upd").html(calEvent.id_user);
                console.log('calEvent.title = '+calEvent.title);
                console.log('calEvent.var_client = '+calEvent.var_client);
                console.log('calEvent.var_installateur = '+calEvent.var_installateur);
                console.log('calEvent.var_prevu_date = '+calEvent.var_prevu_date);
                console.log('calEvent.var_heur_inter = '+calEvent.var_heur_inter);
                console.log('calEvent.opts_technique = '+calEvent.opts_technique);*/
        if(calEvent.var_heur_inter == undefined){
            //     console.log('--> calEvent.heur = '+calEvent.heur);
            calEvent.var_heur_inter = calEvent.heur ;
        }


        //   console.log( calEvent );


        //    console.log('calEvent.var_type = '+calEvent.type);

        let array_test_json = calEvent.opts_technique ;

        let array_test  = JSON.parse(array_test_json);

        if(calEvent.type == 5){
            $("#div_inputs_upd_cas_technique").show();

            $('#txt_opt_1_technique_upd').val(array_test[0]);
            $('#txt_opt_2_technique_upd').val(array_test[1]);
            $('#txt_opt_3_technique_upd').val(array_test[2]);
            $('#txt_opt_4_technique_upd').val(array_test[3]);
            $('#txt_opt_5_technique_upd').val(array_test[4]);
            $('#txt_opt_6_technique_upd').val(array_test[5]);

        }else{
            $("#div_inputs_upd_cas_technique").hide();
        }

        let current_event_dateVue_encoded = calEvent.date_vue ;
        var number = "0x";
        var length = current_event_dateVue_encoded.length;
        for (var i = 0; i < length; i++){
            number += current_event_dateVue_encoded.charCodeAt(i).toString(16);
        }
        let current_event_dateVue_decoded = number ;

        //    console.log('calEvent.date_vue = '+current_event_dateVue_decoded);

        if( parseInt(current_event_dateVue_encoded) != 0){
            $('#date_vue').val('[ vue le '+current_event_dateVue_decoded+' ]'); // #31962a
            $('#date_vue').css('color','#31962a');
        }else{
            $('#date_vue').val('[ événement non vue ]');
            $('#date_vue').css('color','red');
        }

        /*
                console.log('calEvent.var_lieu = '+calEvent.lieu);
                console.log('calEvent.remarque = '+calEvent.remarque);
                console.log('calEvent.start = '+calEvent.start);
                console.log('calEvent.date_vue = '+calEvent.date_vue);*/
        console.log(calEvent);

        let var_pure_date_prevu = calEvent.var_prevu_date ;
        var_pure_date_prevu = var_pure_date_prevu.substring(0,10)
        //  console.log('var_pure_date_prevu = '+var_pure_date_prevu);

        $('#id_upd').html(calEvent.id);
        $('#title_upd').val(calEvent.title);
        $('#client_id_upd').val(calEvent.var_client);
        $('#installateur_id_upd').val(calEvent.var_installateur);
        $('#lieu_upd').val(calEvent.lieu);

        // $('#created_at_upd').val(calEvent.var_prevu_date); // $('#created_at_upd').val('2018-08-11')
        //this.current_start =  this.current_start.substring(0,10);
        $('#created_at_upd').val(var_pure_date_prevu);

        $('#update_at_upd').val(calEvent.var_prevu_date);
        $('#heure_upd').val(calEvent.var_heur_inter);
        $('#type_upd').val(calEvent.type);
        $('#remarque_upd').val(calEvent.remarque);





        if( parseInt(calEvent.date_vue) != 0){
            $('#date_vue').val('[ vue le '+current_event_dateVue_decoded+' ]'); // #31962a
            $('#date_vue').css('color','#31962a');
        }else{
            $('#date_vue').val('[ événement non vue ]');
            $('#date_vue').css('color','red');
        }


        /*
          // $('#editTitle').val(calEvent.title);
          $('#client_id_upd').val(calEvent.var_client);
          $('#installateur_id_upd').val(calEvent.var_installateur);
          $('#created_at_upd').val(calEvent.var_prevu_date+'');
          $('#heure_upd').val(calEvent.var_heur_inter+'');
          */


        $('#editEvent').fadeIn(400);
        $('#update').unbind();

        $('#update').on('click', function() {
            var title = $('#title_upd').val();
            $('#editEvent').fadeOut();
            var eventData;
            if (title) {
                calEvent.title = title
                this.cal.fullCalendar('updateEvent', calEvent);

            } else {
                // alert("Title can't be blank. Please try again.")
                $("#title_upd").css("border-color", "rgb(255, 29, 29)");
                //  $("#client_id_upd").css("border-color", "rgb(255, 29, 29)");
                //  $("#installateur_id_upd").css("border-color", "rgb(255, 29, 29)");
            }
        });


        $('#delete').on('click', function() {

            //    console.log('calEvent = ');
            //    console.log(calEvent);

            $('#delete').unbind();
            if (calEvent._id.includes("_fc")){
                $('#calendar1').fullCalendar('removeEvents', [this.getCal1Id(calEvent._id)]);

                //      console.log("IF_OK => ");
                //      console.log(calEvent._id);
                //      console.log("IF_OK => "+this.getCal1Id(calEvent._id));

                $('#calendar2').fullCalendar('removeEvents', [calEvent._id]);
            } else {
                this.cal.fullCalendar('removeEvents', [calEvent._id]);

                //  console.log("IF_NO => "+calEvent._id);

            }
            $('#editEvent').fadeOut();




        });


    }






    check_selected_val_type_add($event){
        //  console.log("check_selected_val_type_add");
        //    console.log($event);
        let type = $("#type").val();

        if(type == 5){
            //   console.log('Show inputs cas technique ...');
            $("#div_inputs_add_cas_technique").fadeIn(600);
        }else{
            //  console.log('Hide inputs cas technique ...');
            $("#div_inputs_add_cas_technique").fadeOut(300);
        }
    }


    check_selected_val_type_upd($event){
        //  console.log("check_selected_val_type_upd");
        //    console.log($event);
        let type = $("#type_upd").val();


        if(type == 5){
            //  console.log('Show inputs cas technique upd ...');
            $("#div_inputs_upd_cas_technique").fadeIn(600);
        }else{
            //  console.log('Hide inputs cas technique upd ...');
            $("#div_inputs_upd_cas_technique").fadeOut(300);
            $("#txt_opt_1_technique_upd").val('');
            $("#txt_opt_2_technique_upd").val('');
            $("#txt_opt_3_technique_upd").val('');
            $("#txt_opt_4_technique_upd").val('');
            $("#txt_opt_5_technique_upd").val('');
            $("#txt_opt_6_technique_upd").val('');

        }

    }










    go_search_events_byIdUser_sup(){
        this.agendaData= null ;

        let idUser =  $('#filter_idUser_calendar').val();
        //  alert('idUser selected : '+idUser);
        this.agendaService.getAgenda_by_idUser_sup(idUser).subscribe(agendaconsole => {
            $('#calendar').fullCalendar( 'removeEvents');
            $('#calendar1').fullCalendar( 'removeEvents');
            $('#calendar2').fullCalendar( 'removeEvents');

            $("#gif_loader").fadeIn(700);

            this.agendaData=agendaconsole.data;

            let list_all_event_bd = this.agendaData ;
            this.current_list_nbr_rows = list_all_event_bd.length ;

            var compt = 0 ;
            for(let i=0 ; i<list_all_event_bd.length ; i++){
                this.id                       = list_all_event_bd[i].id   ;
                this.current_title            = list_all_event_bd[i].title   ;
                this.current_var_client       = list_all_event_bd[i].client_id   ;
                this.current_var_installateur = list_all_event_bd[i].installateur_id   ;
                this.current_remarque  = list_all_event_bd[i].remarque   ;
                this.current_lieu      = list_all_event_bd[i].lieu   ;
                this.current_type      = list_all_event_bd[i].type   ;
                this.current_start     = list_all_event_bd[i].update_at   ;
                this.current_update_at = list_all_event_bd[i].update_at   ;
                this.current_heure     = list_all_event_bd[i].heure    ;
                this.opts_technique    = list_all_event_bd[i].opts_technique    ;
                this.current_end       = list_all_event_bd[i].end    ;

                //     console.log('TEST  TEST  TEST  ---> '+this.opts_technique+' ' );
                this.addOneEvent_bdToView();
                compt= compt +1 ;
            }
            if(compt == list_all_event_bd.length){
                //  alert(compt);
                $("#gif_loader").fadeOut(400);
            }

        });
    }



    /* --------------------------load date in navbar-------------------------- */
    date_actuelle = "00/00/0000" ;
    showTodaysDate = function() {
        let n =  new Date();
        let y = n.getFullYear();
        let m = n.getMonth() + 1;
        let d = n.getDate();
        $("#todaysDate").html("Date actuelle " + d + "/" + m + "/" + y);

        let  date_actuelle = d + "/" + m + "/" + y ;
    };

    /* full calendar gives newly created given different ids in month/week view
        and day view. create/edit event in day (right) view, so correct for
        id change to update in month/week (left)
      */


    getCal1Id = function(cal2Id) {
        var num = cal2Id.replace('_fc', '') - 1;
        var id = "_fc" + num;
        return id;
    }

    disableEnter = function() {
        $('body').bind("keypress", function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                return false;
            }
        });
    }











}






