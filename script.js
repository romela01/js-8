"use strict";

let main = document.querySelector('.main')
let overlay = document.querySelector('.overlay')
let close = document.querySelector('.close')
let user = document.querySelector('.user')
let lies= document.querySelector('.lies')
let update =document.querySelector('.update')
let add = document.querySelector('.add-person')
let overlayAdd = document.querySelector('.overlay-add')
let form= document.querySelector('.form')
let save =document.querySelector('.save')
let name1 = document.getElementById('name')
let username = document.getElementById('username')

function ajax(url, callback){
    fetch(url,{
    method: 'GET'
    })
    .then(function(response){
        if(response.status !==200){
            throw 'error'
        }
        return response.json()
    })
    .then(function(response){
        callback(response)
        console.log(response[0])
    })
    .catch(function(error){
        console.log('this is error')
    })

}

ajax('https://jsonplaceholder.typicode.com/users',function(response){
    printUsers(response)
})

function printUsers(response){
    response.forEach(item=>{
        createUsers(item)
    })
}

function createUsers(item){
    
        let div = document.createElement('div');
        div.classList.add('users')
        div.setAttribute('data-id', item.id)


        let li1 = document.createElement('li');
        li1.textContent = item.name


        let li2 = document.createElement('li');
        li2.textContent = item.username

        let deleteBtn = document.createElement('button')
        deleteBtn.textContent='Delete Person'
        deleteBtn.classList.add('deleteBtn')
        deleteBtn.setAttribute('data-id', item.id)

        div.appendChild(li1)
        div.appendChild(li2)
        div.appendChild(deleteBtn)

        div.addEventListener('click', function(event){
            let id = event.target.getAttribute('data-id');
            openOverlay(id)
        })

        deleteBtn.addEventListener('click', function(event){
            event.stopPropagation()
            let id = event.target.getAttribute('data-id');
            deleteUser(id)
        })

    main.appendChild(div)
    
}

// open  user
function openOverlay(id){
    overlay.classList.add('efect')
    main.style.display= 'none';
    overlay.style.display= 'block';
    add.style.display= 'none';
    let url = `https://jsonplaceholder.typicode.com/users/${id}`;
    ajax(url, function(response){
        openUser(response)
    })
}

// 
function openUser(item){
    let ul=document.createElement('ul')

    let li1 = document.createElement('li')
    li1.textContent=item.name+'-'+ item.username
    ul.appendChild(li1)

    let li2 = document.createElement('li')
    li2.textContent='Company Name : ' + item.company.name
    ul.appendChild(li2)

    let li3 = document.createElement('li')
    li3.textContent='phone : ' + item.phone
    ul.appendChild(li3)

    let li4 = document.createElement('li')
    li4.textContent='Email : ' + item.email
    ul.appendChild(li4)

    let li5 = document.createElement('li')
    li5.textContent='Address : ' + item.address.suite+', '+item.address.street+', '+item.address.city
    ul.appendChild(li5)

    let li6 = document.createElement('li')
    li6.textContent='Website : ' + item.website
    ul.appendChild(li6)

    lies.appendChild(ul)
}

//delete user 
function deleteUser(id){
    let divs = document.querySelectorAll('.users')
    divs[id-1].style.opacity='0'

    let url = `https://jsonplaceholder.typicode.com/users/${id}`;
    fetch(url,{
        method: 'DELETE'
    })
    .then(response=>response.json())
    .then(response=>{
        console.log(response)
    })
}

// update
update.addEventListener('click',()=>{
    window.location.reload()
})

// close user
close.addEventListener('click', ()=>{
    lies.innerHTML='';
    overlay.classList.remove('efect');
    main.style.display= 'flex';
    overlay.style.display= 'none';
    add.style.display= 'flex';
    lies.classList.remove('form')
})

// add person
add.addEventListener('click',()=>{
    overlay.classList.add('efect');
    main.style.display= 'none';
    overlay.style.display= 'block';
    add.style.display= 'none';
    lies.appendChild(form)
    lies.classList.add('form')
})

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    let data={
        name:event.target[0].value,
        username:event.target[1].value,
    }

    fetch('https://jsonplaceholder.typicode.com/users', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
        console.log(json)

        lies.innerHTML='';
        overlay.classList.remove('efect');
        main.style.display= 'flex';
        overlay.style.display= 'none';
        add.style.display= 'flex';
        lies.classList.remove('form');
        name1.value='';
        username.value='';
        }
    )

})