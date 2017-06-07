'use strict';

(function() {
    const addBtn = document.querySelector('.btn-add');
    const deleteBtn = document.querySelector('.btn-delete');
    const clickNbr = document.getElementById('click-nbr');
    //LOCALHOST SETUP
    // const apiUrl = 'http://localhost:3000/api/clicks';

    //CLOUDNODE SETUP
    const apiUrl = 'http://pudding.cloudno.de/api/clicks';

    //making our own jquery $ready sort of...
    function ready(fn) {
        if (typeof fn !== 'function') return;

        // if document complete when we get here, fire of ajax req
        if (document.readyState === 'complete') return fn();

        //Else listen for DOM ready, then fire of ajax req
        //since this has closure, event listener will remember what 'fn' meant
        document.addEventListener('DOMContentLoaded', fn, false);
    }

    function ajaxRequest(method, url, callback) {
        const xmlreq = new XMLHttpRequest();
        xmlreq.onreadystatechange = function() {
            if (xmlreq.readyState === 4 && xmlreq.status === 200) {
                //i.e updateclickcontent
                callback(xmlreq.response);
            }
        }
        xmlreq.open(method, url, true);
        xmlreq.send();
    }

    function updateClickCount(data) {
        let clicksObj = JSON.parse(data);
        clickNbr.innerHTML = clicksObj.clicks;
    }

    ready(ajaxRequest('GET', apiUrl, updateClickCount));

    addBtn.addEventListener('click', () => {
        ajaxRequest('POST', apiUrl, () => {
            //when we click the callback to ajaxreq should be another GET to update value 
            ajaxRequest('GET', apiUrl, updateClickCount)
        })
    }, false)

    deleteBtn.addEventListener('click', () => {
        ajaxRequest('DELETE', apiUrl, () => {
            ajaxRequest('GET', apiUrl, updateClickCount)
        })
    }, false)

})();