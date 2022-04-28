/* document.addEventListener('DOMContentLoaded', main);


function main(){
    const header = document.createElement('h1');
    
    header.innerText = "HELLO";
}
 */



var Tablesort = require('tablesort');

var sort = new Tablesort(document.getElementById('table'), {
    descending: true
});
sort.refresh();
