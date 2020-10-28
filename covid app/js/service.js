  
$(document).ready(function(){
   
    $("#userContent").hide();

    const urlApi = "https://covid19-brazil-api.now.sh/api/report/v1";

    getStates();

    function getStates(){
        let request = new XMLHttpRequest()

        request.open('GET', urlApi) 
        request.responseType = 'json'
        request.send()

        request.onload = function(){
            let responseData = request.response
            console.log('responseData:', responseData)
        }
    }

});