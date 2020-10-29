  
$(document).ready(function(){
   
    $("#userContent").hide();

    const urlApi = "https://covid19-brazil-api.now.sh/api/report/v1";
    let covidResponseData = [];

    getStates();
    filterChangeListener();

    function getStates(){
        let request = new XMLHttpRequest()

        request.open('GET', urlApi) 
        request.responseType = 'json'
        request.send()

        request.onload = function(){
            covidResponseData = request.response.data
            updateTableBody(covidResponseData)
        }
    }
    
    function updateTableBody(arrData) {
        const covidTbody = $('.covid-list-table tbody');
        covidTbody.empty();
        arrData.forEach(element => {
            covidTbody.append(itemTableFormat(element))
        });

        clickRowListener(); // adicionado aqui pois o jquery cria referencia apenas em elementos que ja estao no DOM
    }

    function itemTableFormat(info) {
        return `
        <tr class="covid-table-row">
            <td class="id-covid-row">${info.uid}</td>
            <td>${info.state}</td>
            <td>${info.cases}</td>
            <td>${info.deaths}</td>
        </tr>`;
    }

    function clickRowListener() {
        $('.covid-table-row').click(function () {
            const uid = +$(this).find($('.id-covid-row')).text();
            const stateItem = covidResponseData.find(item => item.uid === uid);
            console.log(covidResponseData);
            console.log(uid);

            if(stateItem) {
                showModal(stateItem);
            }
        });
    }

    function filterChangeListener() {
        $('#filterCovidTable').keyup(event => {
            inputValue = event.target.value;
            const formatStr = (str) => str.toLowerCase().trim();
            const containsSubtr = (substr, str) => formatStr(str).includes(formatStr(substr))
            const filteredData = covidResponseData.filter(item => containsSubtr(inputValue, item.state));

            updateTableBody(filteredData);
        });

        
    }

    function showModal(info) {
        const dateFormat = (date) => {
            const dateInstance = new Date(date);
            const monthFormated = (month) => (month + 1).toString().length <= 1 ? `0${month + 1}` : month + 1;
            return `${dateInstance.getDate()}/${monthFormated(dateInstance.getMonth())}/${dateInstance.getFullYear()}`;
        }

        const bodyInfoTemplate = `
        <ul class="list-group">
            <li class="p-2 d-flex justify-content-between align-items-center">
                Confirmados
                <span class="badge badge-primary badge-pill">${info.cases}</span>
            </li>
            <li class="p-2 d-flex justify-content-between align-items-center">
                Mortes
                <span class="badge badge-primary badge-pill">${info.deaths}</span>
            </li>
            <li class="p-2 d-flex justify-content-between align-items-center">
                Recuperados
                <span class="badge badge-primary badge-pill">${info.refuses}</span>
            </li>
            <li class="p-2 d-flex justify-content-between align-items-center">
                Suspeitos
                <span class="badge badge-primary badge-pill">${info.suspects}</span>
            </li>
        </ul>

        `;

        $('#exampleModalLabel').text(info.state);
        $('.modal-footer > small').text(`Atualizado em ${dateFormat(info.datetime)}`);
        $('.modal-body').html(bodyInfoTemplate);
        $('#exampleModal').modal();
    }
});