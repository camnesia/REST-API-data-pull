// Global variable with an empty value
var horoscope = '';
 // create a Global variable that references p with id= Pirate
var pir = $("#Pirate");
        $(function (){
            //button click initiates a new function
            $('button').on('click', function () {
                
            // remove resultset if it has already been run 
            pir.empty();
                    
            // add spinner to indicate something is happening
            $('<i class="fa fa-refresh fa-spin"/>').appendTo('p');

            // get selected zodiac sign from selectbox
            var zodiac = $('select option:selected').text();
            
            //creating a variable to proxy the request through Yahoo's servers using YQL
            var yql_url = 'https://query.yahooapis.com/v1/public/yql';
            var url = 'http://theastrologer-api.herokuapp.com/api/horoscope/' + zodiac + '/today';

        //make AJAX call
        $.ajax({
            url: yql_url, 
            data : {
                q :'SELECT * FROM json WHERE url="'+url+'"',
    format: 'json',
    jsonCompat: 'new',
  },
   dataType: 'jsonp',
   success: renderZodiac
      
 });
 });
});
    
    function renderZodiac(Zodiac)
    {
        for(var z in Zodiac)
           {
               var data = Zodiac[z];
               //select correct information from object and add value to Global variable
               horoscope = data.results.json.horoscope;
               console.log(horoscope);
      
            }
    
    $.ajax({
            //add global variable value as text to be translated by api and format the response into json
            url: "http://isithackday.com/arrpi.php?text=" + horoscope + "&format=json", 
            dataType: "jsonp",
            type: "GET",
            success: renderPirate
        });
    function renderPirate(Pirate)
    {
        for(var p in Pirate)
            {
                var piratetalk = Pirate[p];
                var pirate = piratetalk.pirate;
                console.log(pirate);
                
                // remove spinner
                $('.fa-spin').remove();
                
                // add retrieved data to <li>
                pir.append(pirate);
                
            }
          }
    }