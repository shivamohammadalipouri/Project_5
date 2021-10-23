let tbody = document.getElementById("tbody");
let form = document.getElementById("form");
let id = null;
let data = [];

if (JSON.parse(localStorage.getItem("root"))){
    data = JSON.parse(localStorage.getItem("root"));
    render(); 

}


form.addEventListener("submit", (e) =>{
    e.preventDefault();

    if (id == null){

        let nameValue   = document.getElementById("name").value;
        let familyValue = document.getElementById("family").value;
        let emailValue  = document.getElementById("email").value;
        let phoneValue  = document.getElementById("phone").value;

        let newObj = {
            name: nameValue,
            family: familyValue,
            email: emailValue,
            phone: phoneValue,
        }
    
        data.push(newObj);
        render();
    }

    else{
        let nameValue   = document.getElementById("name").value;
        let familyValue = document.getElementById("family").value;
        let emailValue  = document.getElementById("email").value;
        let phoneValue  = document.getElementById("phone").value;

        let newObj = {
            name: nameValue,
            family: familyValue,
            email: emailValue,
            phone: phoneValue,
        }

        data = data.map((item, index) => id !== index ? item : newObj);

        id = null;

        render();
    }

    localStorage.clear();
    localStorage.setItem("root", JSON.stringify(data));

})

function remove(event, index){

    data.splice(index, 1);
    render();

    
    localStorage.clear();
    localStorage.setItem("root", JSON.stringify(data));
}

function edit(index){

    document.getElementById("name").value  = data[index].name;
    document.getElementById("family").value= data[index].family;
    document.getElementById("email").value = data[index].email;
    document.getElementById("phone").value = data[index].phone;

    id = index;
}

function render(){

    tbody.innerHTML = "";

    data.forEach((item, index) => {

        let newUser = `
        <tr>
            <td scope="col" class="text-center"><i class="fa fa-close" onclick="remove(event, ${index})"></i></td>
            <td scope="col" class="text-center "><i class="fa fa-edit" onclick="edit(${index})"></i></td>
            <td scope="col" class="text-center name">${item.name}</td>
            <td scope="col" class="text-center family">${item.family}</td>
            <td scope="col" class="text-center email">${item.email}</td>
            <td scope="col" class="text-center phone">${item.phone}</td>
        </tr>
        `

        tbody.insertAdjacentHTML("beforeend", newUser);
    })
}

render();