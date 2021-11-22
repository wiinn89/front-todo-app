const getData = () =>{
    fetch('https://todo-app-049382.herokuapp.com/api/tutorials')
    .then(
        (req)=>{
            return req.json();
        }
    )
    .then(
        (data) => {
            //console.log(data);
            let ulUsers = document.querySelector('ul');
            ulUsers.innerHTML = '';
            data.forEach((item)=>{
                ulUsers.innerHTML += `
                <li data-id="${item.id}">${item.title} <strong>and</strong> ${item.description} <a class="waves-effect waves-light btn delete-btn">Delete</a><!--<a class="waves-effect waves-light btn edit-btn">Edit</a>--></li>
                `
            })
        }
    )
    .catch( 
        err =>{
            console.log(err);
        }
        
        )
}

getData();


const postData = () => {
    const inputName = document.querySelector('#title').value;
    const descrName = document.querySelector('#descr').value;

    fetch('https://todo-app-049382.herokuapp.com/api/tutorials',
    {
        method: 'POST',
        body: JSON.stringify(
            {
                "title": inputName,
                "description": descrName 
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    }).then(
        (response) => {
            return response.json();
        }
    ).then(
        (data)=>{
            console.log(data);
        }
    )
}

document.querySelector('form').addEventListener('submit', (e) => {
    postData();
    setTimeout(getData, 100);
    e.preventDefault();
})






//


let btnOpen = document.querySelector('#open-modal');
let modal = document.querySelector('#modal1');
let ul = document.querySelector('#list');
ul.addEventListener('click', function(e){
    if(e.target.classList.contains('edit-btn')){
        modal.classList.add('modal_open');
    }
    
})
document.addEventListener('click', function(e){
    var elem = e.target;
    //console.log(elem);
    if(elem.closest('#modal1') !== modal && !elem.classList.contains('edit-btn')){
        modal.classList.remove('modal_open');
    }
}) 






const putData = (id) => {
    const inputName = document.querySelector('#title-edit').value;
    const descrName = document.querySelector('#descr-edit').value;

    fetch(`https://todo-app-049382.herokuapp.com/api/tutorials/${id}`,
    {
        method: 'PUT',
        body: JSON.stringify(
            {
                "title": inputName,
                "description": descrName 
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    }).then(
        (response) => {
            return response.json();
        }
    ).then(
        (data)=>{
            console.log(data);
        }
    )
}






const deleteData = (id) => {
    fetch(`https://todo-app-049382.herokuapp.com/api/tutorials/${id}`,
    {
        method: 'DELETE'
    })
}


const putModal = (e, taskId) => {
    //e.target.parentElement.dataset.id;
    putData(taskId);
            
    modal.classList.remove('modal_open');
    setTimeout(getData, 100);
    document.querySelector('#title-edit').value = '';
    document.querySelector('#descr-edit').value = '';

    modal.querySelector('#edit-form').removeEventListener('submit', (e) => {
        putModal(e, taskId)
    })
    e.preventDefault();
}

document.querySelector('#list').addEventListener('click', (e) => {
    const taskId = e.target.parentElement.dataset.id;
    if(e.target.classList.contains('delete-btn')){
        deleteData(taskId);
        setTimeout(getData, 100);
    }
    modal.querySelector('#edit-form').addEventListener('submit', (e) => {
        putModal(e, taskId)
    })
    
})


