var list = [
    {"desc":"rice", "amount":"1", "value":"5.40"},
    {"desc":"beer", "amount":"13", "value":"15.00"},
    {"desc":"meat", "amount":"4", "value":"3.40"}
];

function getTotal(list){
    var total = 0
    for(var key in list){
        total += list[key].value * list[key].amount
    }
    
    document.getElementById("totalValue").innerHTML = formatValue(total);
}

function setList(list){
    var table = '<thead><tr><th>Description</th><th>Amount</th><th>Value</th><th>Action</th></tr></thead><tbody>';

    for(var key in list){
        table += '<tr><th scope="row">'+ formatDesc(list[key].desc) + '</th><td>'+ formatAmount(list[key].amount) + '</td><td>'+ formatValue(list[key].value) + '</td><td><button class="btn btn-primary mb-2" onclick="setUpdate('+key+')">Edit</button> | <button class="btn btn-primary mb-2" onclick="deleteData('+key+')">Delete</button></td></tr>'
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatValue(value){
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(",", ".");
    str = "$" + str;
    return str;
}

function formatAmount(amount){
    return parseInt(amount);
}

function addData(){
    if(!validation()){
        return
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc":desc, "amount":amount, "value": value,})
    setList(list);
}

function setUpdate(id){
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIdUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="'+id+'">';
}

function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIdUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

function updateData(){
    if(!validation()){
        return
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc":desc, "amount":amount, "value":value};
    resetForm();
    setList(list);
}

function deleteData(id){
    if(confirm("Delete this item?")){
        if(id === list.length - 1){
            list.pop();
        }else if(id == 0)
        {
            list.shift();
        }else{
            var arrAuxIni = list.slice(0,id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        };
        setList(list);
    }
}

function validation(){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";
    document.getElementById("errors").style.display = "none";

    if(desc === ""){
        errors += '<p>Fill out a description</p>';
    }
    if(amount ===""){
        errors += '<p>Fill out a quantity</p>';
    }else if(amount != parseInt(amount)){
        errors += '<p>Fill out a valid amount';
    }
    if(value ===""){
        errors += '<p>Fill out a value</p><br>';
    }else if(value != parseFloat(value)){
        errors += '<p>Fill out a valid value</p>';
    }

    if(errors != ""){
        document.getElementById("errors").style.display = "block";

        document.getElementById("errors").style.backgroundColor = "rgba(85,85,85,0.3)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";

        document.getElementById("errors").innerHTML = "<h3> Error: </h3><br>" + errors
        return 0;
    }else{
        return 1;
    }
}

function deleteList(){
    if(confirm("Delete this list?")){
        list = [];
        setList(list);
    }
}

function saveListStorage(list){
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list",jsonStr);
}

function initListStorage(){
    var testList = localStorage.getItem("list");
    if(testList){
        list = JSON.parse(testList);
    }
    setList(list);
}

initListStorage();