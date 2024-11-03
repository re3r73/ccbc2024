var cookiesDuration = 90;//day

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
        $('#'+event.id+'').append('<h2 class="day-number">'+event.id+'</h2><div class="day-label center"><a class="btn" data-toggle="modal" data-target="#exampleModal">'+event.title+'</a></div>');
        
        
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

            $('#eventModalTitle').html(getEvent(id,'title'));
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
                    $('<input class="form-check-input me-1" name="event_'+id+'_level_flexradio" type="radio" value="1" aria-label="..." '+inputChecked(id,1)+'>Niveau 1<span class="d-block opacity-70" >'+getEvent(id,"level1")+'</span>')
                ));
            
            $('#eventModal-list-group-item').append(
                $('<li class="list-group-item">').append(
                    $('<input class="form-check-input me-1" name="event_'+id+'_level_flexradio" type="radio" value="2" aria-label="..." '+inputChecked(id,2)+' >Niveau 2<span class="d-block opacity-70" >'+getEvent(id,"level2")+'</span>')
                ));
            
            $('#eventModal-list-group-item').append(
                $('<li class="list-group-item">').append(
                    $('<input class="form-check-input me-1" name="event_'+id+'_level_flexradio" type="radio" value="3" aria-label="..." '+inputChecked(id,3)+' >Niveau 3<span class="d-block opacity-70" >'+getEvent(id,"level3")+'</span>')
                ));
            
                
            
            
            //définit l'enregistreent du cookie pour le bouton radio
            $('input[type=radio][name="event_'+id+'_level_flexradio"]').change(function() {
            
                Cookies.set('event_'+id+'_level', $(this).val(), { expires: cookiesDuration });
                //alert("hey"+Cookies.get('event_1_level')); // ou, utilisez `this.value`
            });
            
           

            

        }); 

        
            
    });

});

$(document).ready(function(){
    //affiche l'a propos
    $("#aboutModal").modal('show');

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
    if(Cookies.get('event_'+id+'_level')==level) {texteResponse=" checked "}
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

function getuserScore(){
    $("#mystats").fadeOut(100);


    //récupération du nombre max de défi
    var maxPpg = getMax(event, "id");
    console.log(maxPpg.id + " - " + maxPpg.title);
    nbMaxEvent=maxPpg.id;
    console.log(nbMaxEvent);

    //calcul du max à atteindre
    //10 pt par ouverture ; 50 pt par niveau
    var eventOpenedRate = 10;
    var eventLevelRate = 50;
    
    scoreMax=nbMaxEvent*(10+3*50);
    console.log(scoreMax);
    
    var userScore = 0;
    //calcul du score accumulé par l'utilisateur
    //userScore=Number(Cookies.get("event_1_opened"))+Number(Cookies.get("event_2_opened"))+Number(Cookies.get("event_3_opened"));//+Cookies.get("event_4_opened")+Cookies.get("event_5_opened")+Cookies.get("event_6_opened");
    console.log(userScore);
    
    for (var j=1 ; j<=nbMaxEvent ; j++) {
        //console.log(Cookies.get("event_"+j+"_opened"));
        if(Cookies.get("event_"+j+"_opened") != undefined){
            userScore+= parseFloat(Cookies.get("event_"+j+"_opened")) * eventOpenedRate;
        }
        if(Cookies.get("event_"+j+"_level") != undefined){
            userScore+= parseFloat(Cookies.get("event_"+j+"_level")) * eventLevelRate;
        }
        console.log(j+":"+userScore);
    }

    userScorePourcent=userScore*100/scoreMax;
    console.log(userScorePourcent);

    //actualise le contenu des stats
    var mystatsText=" "+Math.round(userScorePourcent)+" %";
    if(userScorePourcent >= 80){
        mystatsText+=" <p>Ouahh, tu as dépassé 80% des défis.</p>";
    }
    else if(userScorePourcent >= 50){
        mystatsText+="<p>Bien joué, avec tes actions, tu as déjà dépassé 50% des objectifs.</p>";
    }
    else {
        mystatsText+="<p>Essaye de faire mieux. </p>";  
    }

    
    $('#mystats').html(mystatsText);

    //affiche le contenu
    makeProgress(userScorePourcent,"#myprogress-bar");

    

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
    }, 2000);

    //$("#mystats").show();
    setTimeout(function() {
        $("#mystats").show();
    }, 1000);
    

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
            Cookies.remove("event_"+j+"_opened") 
        }
        if(Cookies.get("event_"+j+"_level") != undefined){
            Cookies.remove("event_"+j+"_level")
        }
       
    }

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
}