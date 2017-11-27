document.addEventListener('DOMContentLoaded', function () {
    let btnSend = document.querySelector('#btnSend');
    let btnBack = document.querySelector('#btnBack');
    btnSend.addEventListener('click', generateNumbers, false);
    btnSend.addEventListener('click', changeToTab2, false);
    btnBack.addEventListener('click', changeToTab1, false);
});
//make request, generate and display numbers
function generateNumbers(ev) {
    ev.preventDefault();
    let flag = false;
    console.log('click generate numbers');
//    let req = new Request('https://griffis.edumedia.ca/mad9014/lotto/nums.php');
    let req = new Request('https://liu00414.github.io/ajax-lotto/nums.php');
    let myData = new FormData();
    let digits = document.getElementById('digits').value;
    let max = document.getElementById('max').value;

    myData.append('max', max);
    myData.append('digits', digits);
    let opts = {
//        method: 'POST',
//        mode: 'cors',
//        body: myData,

    };
    fetch(req, opts)
        .then(function (response) {
            console.log('response from server', response.status);
            return response.json();

        })
        .then(function (data) {
            console.log(data, data.numbers.length)

            //check
            let copy = [];
            for (let item of data.numbers) {
                if (!copy.includes(item)) {
                    copy.push(item);
                } else {
                    generateNumbers(ev);
                    flag = true;
                    break;
                }
            }
            //            data.numbers.forEach(function(item){
            //             if (!copy.includes(item)){
            //                 copy.push(item);
            //                 
            //                 }else{generateNumbers(ev);}   
            //            });
            //end check
            if (flag) {
                return;
            }
            let num_list = document.querySelector(".num_list");
            let message = document.createTextNode(data.message);
            //        num_list.appendChild(messgae);
            let generateMessage = document.querySelector('#message');
            generateMessage.appendChild(message);


            if (data.numbers.length > 0) {
                for (i = 0; i < data.numbers.length; i++) {

                    let num = document.createTextNode(data.numbers[i]);
                    console.log(num)

                    let li = document.createElement('li');

                    num_list.appendChild(li);
                    li.appendChild(num);
                };

                console.log(num_list);
            };

        })
        .catch(function (err) {
            console.log("ERROR: ", err.message);
            let num_list = document.querySelector(".num_list");

            let messgae = document.createTextNode(err.message);
            num_list.appendChild(messgae);

        });
};

function changeToTab2(ev) {
    let tab1 = document.getElementById("home");
    tab1.classList.add('displaynone');
    let tab2 = document.getElementById("list");
    tab2.classList.remove('displaynone');
};

function changeToTab1(ev) {
    let tab2 = document.getElementById("list");
    tab2.classList.add('displaynone');
    let tab1 = document.getElementById("home");
    tab1.classList.remove('displaynone');
    document.querySelector('.num_list').innerHTML = '';
    document.querySelector('#message').innerHTML = '';
}









