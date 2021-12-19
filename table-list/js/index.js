const form = document.querySelector('form#add')
const submitBtn = document.querySelector('form#add button')
const filterForm = document.querySelector('form#filter')
const filterInput = document.querySelector('form#filter input')
const tableBody = document.querySelector('tbody')
const editUserId = document.querySelector('#editUserId')
const name = document.querySelector('#name')
const surname = document.querySelector('#surname')
const age = document.querySelector('#age')
const salary = document.querySelector('#salary')
const image = document.querySelector('#file')

let users = [];
let count = 0
let isEdit = false

/*  Get image source  */

function getImgSrc() {
    if (!image.files[0].type.match('image')) return;
    const file = image.files[0];

    return URL.createObjectURL(file)
}

/*  Add or Edit user  */

form.addEventListener('submit', function (e) {
    e.preventDefault()
    if (isEdit) {
        editUser()
        return
    }
    addUser()
})

/*  Clear Form  */

function clearForm() {
    name.value = ''
    surname.value = ''
    age.value = ''
    salary.value = ''
    editUserId.value = ''
}

/*  Add new user  */

function addUser() {
    const user = {
        id: ++count,
        name: name.value,
        surname: surname.value,
        age: age.value,
        salary: salary.value,
        image: getImgSrc(),
    }
    users.push(user)
    renderUsers(users)
    clearForm()
}

/*  Render Table  */

function renderUsers(items) {
    let elements = '';
    items.forEach((user, index) => {
        elements += `
            <tr>
                <td>${++index}</td>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.age}</td>
                <td>${user.salary}</td>
                <td><img src="${user.image}" /></td>
                <td><button onclick="getUserData(${index})">Edit user</button><button onclick="removeUser(${user.id})">Remove</button></td>
            </tr>        
        `
    })
    tableBody.innerHTML = ''
    tableBody.innerHTML = elements
}

/*  Remove User  */

function removeUser(id) {
    users = users.filter((user) => user.id !== id)
    renderUsers(users)
}

/*  Get user data  */

function getUserData(index) {
    isEdit = true
    submitBtn.textContent = 'Edit'
    const user = users[index-1]
    name.value = user.name
    surname.value = user.surname
    age.value = user.age
    salary.value = user.salary
    editUserId.value = index-1
}

/*  Edit current user  */

function editUser() {
    const index = editUserId.value
    users[index].name = name.value
    users[index].surname = surname.value
    users[index].age = age.value
    users[index].salary = salary.value
    isEdit = false
    submitBtn.textContent = 'Add to table'
    renderUsers(users)
    clearForm()
}

/*  Filter function  */

function filter(filterText) {
    if (!filterText) {
        renderUsers(users)
        return
    }
    let filtered = users.filter(user=>{
        return user.name.includes(filterText) || user.surname.includes(filterText) || user.age.includes(filterText) || user.salary.includes(filterText);
    })
    renderUsers(filtered)
}

filterForm.addEventListener('submit', function (e) {
    e.preventDefault()
    filter(filterInput.value)
})