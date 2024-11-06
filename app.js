var cookiesDuration = 90;//day

//dfinition du score gagné par action 
//10 pt par ouverture ;
//0 pt pour aucun niveau ;  50 pt pour le niveau 1 ;100 pt pour le niveau 2...
var eventOpenedRate = 10;
var eventLevelRate=[0,50,100,200];


function getEvent(id,property){
    const filteredProducts = event.filter(event => event.id === id);
    return(filteredProducts[0][property]);
}







$(document).ready(function(){
        
    console.log(document.cookie);

    //$("#title").append('<div>ddd</div>');    

    //Affiche toutes les vignettes de la base event
    $.each(event, function (index, event) {
                    
        $('#calendar-frame').append('<div class="day-frame center real" id="'+event.id+'"></div>');
        $('#'+event.id+'').append('<h2 class="day-number">'+event.id+'</h2><div class="day-label center"><a class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">'+event.title+'</a></div>');
        
        
        /*
        <div class="day-frame center real" id='event_1'>
            <h2 class="day-number">1</h2>
            <div class="day-label center">
                <a  class="btn" data-toggle="modal" data-target="#exampleModal">La douche</a>
            </div>
        </div>
        
        */


    });  

    //vérifie si la vignette a déjà été ouverte ou pas.
    //affiche une image si déjà ouvert.
    $('.day-frame').each(function() {
        var id = $(this).attr('id');
        
        
        if(Cookies.get("event_"+id+"_opened")==="1"){
            $(this).css({"background-image": 'url('+getEvent(id,'img_url')+')'});
            }
        else {
            $(this).css({"background-image": "none"});
            }

        

    });
    


    //lors du click sur la vignette, 
    //enregistre le cookie et affiche une image de  fond 
    //puis change le contenu du modal
    $('.day-frame').each(function() {
        var id = $(this).attr('id');
        $("#"+id).click(function(){
            Cookies.set("event_"+id+"_opened", 1, { expires: cookiesDuration });
            
            
            $("#"+id).css({"background-image": 'url('+getEvent(id,'img_url')+')'});

            $('#eventModalTitle').html("Défi "+id+" : "+ getEvent(id,'title'));
            $('#eventModalDescription1').html(getEvent(id,'description1'));
            $('#eventModalDescription2').html(getEvent(id,'description2'));
            
            //recréer la list des 3 défis après les avoir efffacé
            /*
            <li class="list-group-item">
                  <input class="form-check-input me-1" name="event_1_level_flexradio" type="radio" value="1" aria-label="...">
                  Niveau 1
                  <span class="d-block opacity-70" id="eventModalLevel1">Ma douche dure le temps de ma chanson préférée</span>
                </li>
            */
            $(".list-group-item").remove();
            console.info('inputCheckedvel1'+inputChecked(id,1));
            console.info('inputCheckedvel1'+inputChecked(id,2));
            console.info('inputCheckedvel1'+inputChecked(id,3));
            $('#eventModal-list-group-item').append(
                $('<li class="list-group-item">').append(
                    $('<input class="form-check-input me-1" id="checkbox_event_'+id+'_level_1" name="event_'+id+'_level_flexradio" type="checkbox" value="1" aria-label="..." '+inputChecked(id,1)+'>Niveau 1 '+displayScorePerLevel(id,1)+'<span class="d-block opacity-70" >'+getEvent(id,"level1")+'</span>')
                ));
            
            $('#eventModal-list-group-item').append(
                $('<li class="list-group-item">').append(
                    $('<input class="form-check-input me-1" id="checkbox_event_'+id+'_level_2" name="event_'+id+'_level_flexradio" type="checkbox" value="2" aria-label="..." '+inputChecked(id,2)+' >Niveau 2 '+displayScorePerLevel(id,2)+'<span class="d-block opacity-70" >'+getEvent(id,"level2")+'</span>')
                ));
            
            $('#eventModal-list-group-item').append(
                $('<li class="list-group-item">').append(
                    $('<input class="form-check-input me-1" id="checkbox_event_'+id+'_level_3" name="event_'+id+'_level_flexradio" type="checkbox" value="3" aria-label="..." '+inputChecked(id,3)+' >Niveau 3 '+displayScorePerLevel(id,3)+'<span class="d-block opacity-70" >'+getEvent(id,"level3")+'</span>')
                ));
            
                revealScorePerLevel(id,1);
                revealScorePerLevel(id,2);
                revealScorePerLevel(id,3);
                
            
            
            //définit comment le cookie pour chaque niveau est enregistré :
            //dès qu'une valeur est modifiée parmi un des checkbox
            //enregistre le cookie et fait apparaitre ou disparaitre le score gagné
            $('#checkbox_event_'+id+'_level_1').change(function() {
                Cookies.set('event_'+id+'_level_1', this.checked, { expires: cookiesDuration });
                revealScorePerLevel(id,1);
            });
            
            $('#checkbox_event_'+id+'_level_2').change(function() {
                Cookies.set('event_'+id+'_level_2', this.checked, { expires: cookiesDuration });
                revealScorePerLevel(id,2);
            });

            $('#checkbox_event_'+id+'_level_3').change(function() {
                Cookies.set('event_'+id+'_level_3', this.checked, { expires: cookiesDuration });
                revealScorePerLevel(id,3);
            });
            

        }); 

        
            
    });

});

$(document).ready(function(){
    //affiche l'a propos si besoin
    if(Cookies.get('aboutModalRead')!="true"){
        $("#aboutModal").modal('show');
        $("#aboutModalCheckBoxContainer").append('<input id="aboutModalCheckbox" name="aboutModalCheckbox" type="checkbox" value="yes" aria-label="..." >  <span class=" opacity-50" >Ne plus afficher ce message</span></input> ');

        //désactive l'affichage auto
        $('#aboutModalCheckbox').change(function() {
            Cookies.set('aboutModalRead', this.checked, { expires: cookiesDuration });
            
        });

    }
    
    


    //conserve l'ouverture de l'évènement
    $("#event_1").click(function(){
        Cookies.set('event_1_opened', 1, { expires: cookiesDuration });
        //alert("Cookie created");

        $("#event_1").css({"background-image": "url('https://plus.unsplash.com/premium_photo-1661380417335-3af4aa7ebe66?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRvdWNoZXxlbnwwfHwwfHx8MA%3D%3D'"});
        //alert(Cookies.get('event_1_opened'));
        }); 
    
    
        /*//conserve le niveau de l'évenement
    $(document).ready(function() {
        $('input[type=radio][name="event_1_level_flexradio"]').change(function() {
            
            Cookies.set('event_1_level', $(this).val());
            //alert("hey"+Cookies.get('event_1_level')); // ou, utilisez `this.value`
        });
    });
    */
    
    $("#showProgress").click(function(){
        getuserScore();
        //$("#userProfileModal").show();
        

    }); 

    



    $("#resetConfirmButton").click(function(){
        resetUserScore();
        

    }); 
    
                      
         
  
});
//retourne checked si le cookie event_id_leved
function inputChecked(id,level){
    var texteResponse="";
    if(Cookies.get('event_'+id+'_level_'+level)=='true') {
        texteResponse=" checked ";
        console.info('hi');
    }
    console.info(Cookies.get('event_'+id+'_level_'+level));
    return texteResponse;

}




function getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

function displayScorePerLevel(eventId,level){
    responseText=responseText='<span id="scoreInfo_level'+level+'" class="badge text-bg-secondary">+ '+eventLevelRate[level]+' points</span>';
    
    return responseText;
    
}

function revealScorePerLevel(eventId,level){
   
    if(Cookies.get("event_"+eventId+"_level_"+level) != undefined && Cookies.get("event_"+eventId+"_level_"+level) =='true'){
        $('#scoreInfo_level'+level).removeClass("text-bg-light");
        $('#scoreInfo_level'+level).addClass("text-bg-success");
    }
    else {
        $('#scoreInfo_level'+level).removeClass("text-bg-success");
        $('#scoreInfo_level'+level).addClass("text-bg-light");
    }
    

}


function getuserScore(){
    //$("#mystats").fadeOut(100);


    //récupération du nombre max de défi
    var maxPpg = getMax(event, "id");
    console.log(maxPpg.id + " - " + maxPpg.title);
    nbMaxEvent=maxPpg.id;
    console.log(nbMaxEvent);

    scoreMaxByOpening = nbMaxEvent * eventOpenedRate;
    scoreMaxByLevelCheckbox = nbMaxEvent*(eventLevelRate[1]+eventLevelRate[2]+eventLevelRate[3])
    
    scoreMax=scoreMaxByOpening + scoreMaxByLevelCheckbox ;
    console.log(scoreMax);
    
    var userScoreByOpening=0;
    var userScoreByLevelCheckbox=0;
    var userScore = 0;
    //calcul du score accumulé par l'utilisateur
    //userScore=Number(Cookies.get("event_1_opened"))+Number(Cookies.get("event_2_opened"))+Number(Cookies.get("event_3_opened"));//+Cookies.get("event_4_opened")+Cookies.get("event_5_opened")+Cookies.get("event_6_opened");
    console.log(userScore);
    
    for (var j=1 ; j<=nbMaxEvent ; j++) {
        //console.log(Cookies.get("event_"+j+"_opened"));
        if(Cookies.get("event_"+j+"_opened") != undefined){
            userScoreByOpening+= parseFloat(Cookies.get("event_"+j+"_opened")) * eventOpenedRate;
        }
        if(Cookies.get("event_"+j+"_level_1") != undefined && Cookies.get("event_"+j+"_level_1") == "true" ){
            userScoreByLevelCheckbox+= eventLevelRate[1];
        }
        if(Cookies.get("event_"+j+"_level_2") != undefined && Cookies.get("event_"+j+"_level_2") == "true" ){
            userScoreByLevelCheckbox+= eventLevelRate[2];
        }
        if(Cookies.get("event_"+j+"_level_3") != undefined && Cookies.get("event_"+j+"_level_3") == "true" ){
            userScoreByLevelCheckbox+=  eventLevelRate[3];
        }
        
    }

    userScore = userScoreByOpening + userScoreByLevelCheckbox ;
    console.log('userScore'+userScore);
    console.log('scoreMax'+scoreMax);
    userScorePourcent=userScore*100/scoreMax;
    userScorePourcent = Math.round(userScorePourcent);
    console.log(userScorePourcent);

    //actualise le contenu des stats
    var mystatsText='<h3 style="text-align:right;">Tu as accumulé <span class="badge text-bg-success">+ '+userScore+' points</span></h3> ';
    if(userScorePourcent >= 80){
        mystatsText+=" <p>Ouahh, tu as dépassé 80% des défis.</p>";
    }
    else if(userScorePourcent >= 50){
        mystatsText+="<p>Bien joué, avec tes actions, tu as déjà dépassé 50% des objectifs.</p>";
    }
    else if(userScorePourcent >= 1){
        mystatsText+="<p>C'est en réalisant des actions concrètes  que tu gagneras beaucoup de points.  </p>";  
    }
    else {
        mystatsText+="<p>Pour gagner des points de défi, tu peux déjà commencer par consulter les fiches. </p>";  
    }


    
    
    $('#mystats').html(mystatsText);

    //affiche le contenu
    makeProgress(userScorePourcent,"#myprogress-bar");

    console.info('heey');
    

}

//actualise la barre de progrès  

function makeProgress(num, id){
    
    //$("#mystats").fadeOut(500);
    /* num --> percentage of width
        * id --> id of progress bar
        */
    /*
    var progressBar = $(id);
    for (var i = 0; i < num; i++) {
        progressBar.css("width", i + "%");
    }
    */
    
    
    $(id).animate({
        width: num + "%"
    }, 500);

    $("#progress-bar-value").text(num+"%");
    

    /*//$("#mystats").show();
    setTimeout(function() {
        $("#mystats").show();
    }, 1000);
    */
    
    

}
    


function resetUserScore(){
    //récupération du nombre max de défi
    var maxPpg = getMax(event, "id");
    nbMaxEvent=maxPpg.id;
    //console.log(nbMaxEvent);
    
    //j'efface chauqe cookie existant
    for (var j=1 ; j<=nbMaxEvent ; j++) {
        //console.log(Cookies.get("event_"+j+"_opened"));
        if(Cookies.get("event_"+j+"_opened") != undefined){
            Cookies.remove("event_"+j+"_opened") ;
        }
        if(Cookies.get("event_"+j+"_level_1") != undefined){
            Cookies.remove("event_"+j+"_level_1");
        }
        if(Cookies.get("event_"+j+"_level_2") != undefined){
            Cookies.remove("event_"+j+"_level_2");
        }
        if(Cookies.get("event_"+j+"_level_3") != undefined){
            Cookies.remove("event_"+j+"_level_3");
        }
       
    }

    Cookies.remove("aboutModalRead");
    

    //réinitilise l'affichage des vignettes
    //vérifie si la vignette a déjà été ouverte ou pas.
    //affiche une image si déjà ouvert.
    $('.day-frame').each(function() {
        var id = $(this).attr('id');
        //console.log(id);
        //console.log(Cookies.get(id+"_opened"));
        
        if(Cookies.get("event_"+id+"_opened")==="1"){
            $(this).css({"background-image": 'url('+getEvent(id,'img_url')+')'});
            }
        else {
            $(this).css({"background-image": "none"});
            }

        

    });


    
    //recalcule le score
    getuserScore();
    
    //relaod the  page, the second modal (confirmation) is freezing the site 
    window.location.reload();
}