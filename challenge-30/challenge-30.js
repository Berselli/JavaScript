(function($){
    'use strict';
    
    let registerCount = 0;

    let app = (function(){

        return {
            init: function(){
                this.comapnyInfo();
                this.initEvents();
            },
            
            initEvents: function(){
                $('[data-js="form-register"]').on('submit', this.handleSubmit);
            },

            handleSubmit:function(){
                event.preventDefault();
                let $tableCar = $('[data-js="table-car"]').get();
                $tableCar.appendChild(app.createNewCar());
            },

            createNewCar: function(){

                registerCount++;
                let $fragment = document.createDocumentFragment();
                let $tr = document.createElement('tr');
                let $thID = document.createElement('th');       
                let $tdImage = document.createElement('td');
                let $image = document.createElement('img');
                let $tdBrand = document.createElement('td');
                let $tdYear = document.createElement('td');
                let $tdPlate = document.createElement('td');
                let $tdColor = document.createElement('td');
                
                $tr.classList.add('table-dark');                
                $image.src = $('[data-js="image"]').get().value;
                $image.style.height = '100px';
                $tdImage.appendChild($image);
        
                $thID.setAttribute("scope", "row");
                $thID.textContent = registerCount;
                $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
                $tdYear.textContent = $('[data-js="year"]').get().value;
                $tdPlate.textContent = $('[data-js="plate"]').get().value;
                $tdColor.textContent = $('[data-js="color"]').get().value;

                $('[data-js="image"]').get().value = "";
                $('[data-js="brand-model"]').get().value = "";
                $('[data-js="year"]').get().value = "";
                $('[data-js="plate"]').get().value ="";
                $('[data-js="color"]').get().value ="";
                
                $tr.appendChild($thID);
                $tr.appendChild($tdImage);
                $tr.appendChild($tdBrand);
                $tr.appendChild($tdYear);
                $tr.appendChild($tdPlate);
                $tr.appendChild($tdColor);
        
                return $fragment.appendChild($tr);
            },


            comapnyInfo: function(){
                let ajax = new XMLHttpRequest();
                ajax.open('GET', '/company.json', true);
                ajax.send();
                ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
            },

            getCompanyInfo: function(){
                if(!app.isReady.call(this)){
                    return;
                  }
                  let data = JSON.parse(this.responseText);
                  let $companyName = $('[data-js="company-name"]').get();
                  let $companyPhone = $('[data-js="company-phone"]').get();
                  $companyName.textContent = data.name;
                  $companyPhone.textContent = data.phone;
            },

            isReady: function(){
                return this.readyState === 4 && this.status === 200;
            }
        }

    })();

    app.init();

})(window.DOM);