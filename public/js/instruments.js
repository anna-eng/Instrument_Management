const { username } = Qs.parse(location.search, { ignoreQueryPrefix: true });
const URL =  'http://localhost:3000'+ '/users';

let userUrl;

const instrumentTemplate = document.querySelector('#instrument-template').innerHTML;
const $instruments = document.querySelector('#instruments');

const $newInstrumentName = document.querySelector('#newName');
const $newInstrumentSymbol = document.querySelector('#newSymbol');
const $newInstrumentType =document.querySelector('#newType');

const $error = document.querySelector('#error');

const $search = document.querySelector('#search');

let instrumentList = [];

$(document).ready(function() {
    $.ajax({
        url: URL + '/search/' + username, 
        type: 'GET',
        success: function(result) {
            userUrl = URL + '/' + result.id + '/instruments';
            refreshList();
        }, 
        error: function(error) {
            error.innerHTML = "Caught an error retreiving the user data, " + error.statusCode
        }
    })
})

refreshList = () => {
    $.ajax({
        url: userUrl, 
        type: 'GET',
        success: function(result) {
            instrumentList = result;
            populateTable();    
        }, 
        error: function(error) {
            error.innerHTML = "Caught an error retreiving instrument data, " + error.statusCode
        }
    })   
}
deleteInstrument = (id) => {
    $.ajax({
        url: userUrl + '/' + id, 
        type: 'DELETE',
        success: function() {
            instrumentList = instrumentList.filter((instrument) => instrument.instrumentId!= id);
            populateTable();       
        }, 
        error: function(error) {
            error.innerHTML = "Caught an error deleting the instrument, " + error.statusCode
        }
    })
}
createInstrument = () => {
    let newInstrument = {
        name: $newInstrumentName.value,
        symbol: $newInstrumentSymbol.value,
        instrumentType: $newInstrumentType.value 
    };
    if(!newInstrument.name || !newInstrument.symbol || !newInstrument.instrumentType) // invalid input
    {
        error.innerHTML = "Invalid input, Please fill all the instrument parameters";
        return;
    }
    $.ajax({
        url: userUrl, 
        type: 'POST',
        data: newInstrument,
        success: function(result) {
            instrumentList.push(result);
            populateTable();   

            $newInstrumentName.value = '';
            $newInstrumentSymbol.value = '';
            $newInstrumentType.value = '';    
        }, 
        error: function(error) {
            error.innerHTML = "Caught an error creating the instrument, " + error.statusCode
        }
    })
}
populateTable  = () => {
    let html = `<tr>
    <th>Name</th>
    <th>Symbol</th>
    <th>Type</th>
    </tr>`
    for(let instrument of instrumentList) {
        if(!$search.value  ||fuzzy_match(instrument.name, $search.value) ) 
        html += Mustache.render(instrumentTemplate, instrument);    
    }
    $instruments.innerHTML = html;
}

clearSearch = () => {
    $search.value = '';
    populateTable();
}
function fuzzy_match(str,pattern){
    str = str.toLowerCase();
    pattern = pattern.toLowerCase();
    pattern = pattern.split("").reduce(function(a,b){ return a+".*"+b; });
    return (new RegExp(pattern)).test(str);
};

