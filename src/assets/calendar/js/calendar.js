
ApiUrl = 'http://localhost:8000/api/agenda';  // URL to web api


$(function() {
  loadEvents();
  showTodaysDate();
  initializeCalendar();
  getCalendars();
  initializeRightCalendar();
  initializeLeftCalendar();
  disableEnter();
});

/* --------------------------initialize calendar-------------------------- */

var initializeCalendar = function() {
  $('.calendar').fullCalendar({
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: events(), // create events
      defaultTimedEventDuration: '00:30:00',
      forceEventDuration: true,
      eventBackgroundColor: '#337ab7',
      editable: false,
      height: screen.height - 160,
      timezone: 'America/Chicago',
    });
}

/*--------------------------calendar variables--------------------------*/
var getCalendars = function() {
  $cal = $('.calendar');
  $cal1 = $('#calendar1');
  $cal2 = $('#calendar2');
}

/* -------------------manage cal2 (right pane)------------------- */
var initializeRightCalendar = function()  {
  $cal2.fullCalendar('changeView', 'agendaDay');

  $cal2.fullCalendar('option', {
    slotEventOverlap: false,
    allDaySlot: false,
    header: {
      right: 'prev,next today'
    },
    selectable: true,
    selectHelper: true,
    select: function(start, end) {
        newEvent(start, end);
    },
    eventClick: function(calEvent, jsEvent, view) {
        editEvent(calEvent);
    },
  });
}

/* -------------------manage cal1 (left pane)------------------- */
var initializeLeftCalendar = function() {
  $cal1.fullCalendar('option', {
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek'
      },
      navLinks: false,
      dayClick: function(date) {
          cal2GoTo(date);
      },
      eventClick: function(calEvent) {
          cal2GoTo(calEvent.start);
      }
  });
}

/* -------------------moves right pane to date------------------- */
var cal2GoTo = function(date) {
  $cal2.fullCalendar('gotoDate', date);
}


var loadEvents = function() {
  $.getScript("assets/calendar/js/events.js", function(){ // mode deconnecté aussi .. synchro 
  });
}


function add_one_event(){ 
  var eventData = {
      title: 'title',
      var_client: 'var_client',
      var_installateur: 'var_installateur',
      var_prevu_date: 'var_prevu_date',
      var_heur_inter: 'var_heur_inter',
      start: 'start'
  }; 
  $cal.fullCalendar('renderEvent', eventData, true);
  $('#newEvent').modal('hide');

    title = $("#title").val(); 

 //   onSubmit_add();

}



var newEvent = function(start, end) { console.log(start+' ---> '+end);

  
  console.log(start._d);
  array_date = start._i ;
  console.log(array_date);
  console.log('date_actuelle = '+date_actuelle);
  month_inter = array_date[1] + 1 ;
  console.log('date intervention = '+array_date[2]+'-'+month_inter+'-'+array_date[0]);
  
  // fomater la date yyyy-mm-dd
  month_inter = month_inter + "" ;
  if(month_inter.length == 1){
    month_inter="0"+month_inter ;
  }
  day_inter = array_date[2] + "" ;
  if(day_inter.length == 1){
    day_inter="0"+day_inter ;
  }
  $("#created_at").val(array_date[0]+'-'+month_inter+'-'+day_inter);
   var_prevu_date = array_date[0]+'-'+month_inter+'-'+day_inter ;
   // fomater l heur hh:ii
  console.log('Heur intervention = ' + array_date[3]+':'+array_date[4]);
  heur_inter = array_date[3] + "" ;
  if(heur_inter.length == 1){
    heur_inter="0"+heur_inter ;
  }
  min_inter = array_date[4] + "" ;
  if(min_inter.length == 1){
    min_inter="0"+min_inter ;
  }
  $("#heure").val(heur_inter+':'+min_inter);
  var_heur_inter = heur_inter+':'+min_inter ;


 // $('input#title').val("");
  $('#newEvent').modal('show');
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


      remarque = $("#remarque").val() ;
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
                 start : start ,
                 color:  current_event_color,
                 etat:  0 ,
                 opts_technique : current_opts_technique
             };
             console.log(eventData);



             $cal.fullCalendar('renderEvent', eventData, true);
             $('#newEvent').modal('hide');

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
}






function  refresh_events_by_addRemove_fakeOne(intern_id) { // current_session

    $.ajax({url: ApiUrl+"/refresh_addremove_fakeevent/"+intern_id, success: function(result){ // URL to web api
            console.log(result);
            console.log("------ FAKE EVENT REFRESH ADDED [ id_fakeEvent : "+result.id+" ]");
        }});

    return 1 ;
}






  last_id_event_added_2 = -111 ;

var editEvent = function(calEvent) {

console.log(calEvent);
//    console.log('calEvent.opts_technique = '+calEvent.opts_technique);


    $('#hidden_etat').val(calEvent.etat);


    var_idUser_session = window.localStorage.getItem('user_id') ;
    var_iduser_event   = calEvent.var_installateur  ;
    var_sup  = calEvent.id_user ;

// a faire
/*
    $.ajax({url: ApiUrl+"/getusernamebyid/"+calEvent.id_user, success: function(result){ // URL to web api
            console.log(result);
            $("#val_event_created_by_upd").html(result);
        }});
*/


    console.log('->  var_idUser_session = '+ var_idUser_session );
    console.log('->  var_iduser_event = '+ var_iduser_event);

    rootVar = calEvent.id ;
    rootVar2 = calEvent.id_user ;
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



  console.log('calEvent.id = '+calEvent.id);
    console.log('-> calEvent.id_user = '+calEvent.id_user);
//    $("#val_event_created_by_upd").html(calEvent.id_user);
  console.log('calEvent.title = '+calEvent.title);
  console.log('calEvent.var_client = '+calEvent.var_client);
  console.log('calEvent.var_installateur = '+calEvent.var_installateur);
  console.log('calEvent.var_prevu_date = '+calEvent.var_prevu_date);
  console.log('calEvent.var_heur_inter = '+calEvent.var_heur_inter);
  console.log('calEvent.opts_technique = '+calEvent.opts_technique);
  if(calEvent.var_heur_inter == undefined){
      console.log('--> calEvent.heur = '+calEvent.heur);
      calEvent.var_heur_inter = calEvent.heur ;
  }


    console.log( calEvent );


  console.log('calEvent.var_type = '+calEvent.type);

  array_test_json = calEvent.opts_technique ;

  array_test  = JSON.parse(array_test_json);

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

    current_event_dateVue_encoded = calEvent.date_vue ;
    current_event_dateVue_decoded = current_event_dateVue_encoded.hexDecode() ;

  console.log('calEvent.date_vue = '+current_event_dateVue_decoded);

  if( parseInt(current_event_dateVue_encoded) != 0){
      $('#date_vue').val('[ vue le '+current_event_dateVue_decoded+' ]'); // #31962a
      $('#date_vue').css('color','#31962a');
  }else{
      $('#date_vue').val('[ événement non vue ]');
      $('#date_vue').css('color','red');
  }


  console.log('calEvent.var_lieu = '+calEvent.lieu);
  console.log('calEvent.remarque = '+calEvent.remarque);
    console.log('calEvent.start = '+calEvent.start);
    console.log('calEvent.date_vue = '+calEvent.date_vue);
  console.log(calEvent);

  var_pure_date_prevu = calEvent.var_prevu_date ;
  var_pure_date_prevu = var_pure_date_prevu.substring(0,10)
  console.log('var_pure_date_prevu = '+var_pure_date_prevu);

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

  
  $('#editEvent').modal('show');
  $('#update').unbind();

  $('#update').on('click', function() {
    var title = $('#title_upd').val();
    $('#editEvent').modal('hide');
    var eventData;
    if (title) {
      calEvent.title = title
      $cal.fullCalendar('updateEvent', calEvent);

    } else {
   // alert("Title can't be blank. Please try again.")
      $("#title_upd").css("border-color", "rgb(255, 29, 29)");
    //  $("#client_id_upd").css("border-color", "rgb(255, 29, 29)");
    //  $("#installateur_id_upd").css("border-color", "rgb(255, 29, 29)");
    }
  });


  $('#delete').on('click', function() {

      console.log('calEvent = ');
      console.log(calEvent);

    $('#delete').unbind();
    if (calEvent._id.includes("_fc")){
      $cal1.fullCalendar('removeEvents', [getCal1Id(calEvent._id)]);

        console.log("IF_OK => ");
        console.log(calEvent._id);
        console.log("IF_OK => "+getCal1Id(calEvent._id));

      $cal2.fullCalendar('removeEvents', [calEvent._id]);
    } else {
      $cal.fullCalendar('removeEvents', [calEvent._id]);

        console.log("IF_NO => "+calEvent._id);

    }
    $('#editEvent').modal('hide');




  });


}









/* --------------------------load date in navbar-------------------------- */
date_actuelle = "00/00/0000" ;
var showTodaysDate = function() {
  n =  new Date();
  y = n.getFullYear();
  m = n.getMonth() + 1;
  d = n.getDate();
  $("#todaysDate").html("Date actuelle " + d + "/" + m + "/" + y);

  date_actuelle = d + "/" + m + "/" + y ;
};

/* full calendar gives newly created given different ids in month/week view
    and day view. create/edit event in day (right) view, so correct for
    id change to update in month/week (left)
  */
var getCal1Id = function(cal2Id) {
  var num = cal2Id.replace('_fc', '') - 1;
  var id = "_fc" + num;
  return id;
}

var disableEnter = function() {
  $('body').bind("keypress", function(e) {
      if (e.keyCode == 13) {
          e.preventDefault();
          return false;
      }
  });
}









String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}


String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}


