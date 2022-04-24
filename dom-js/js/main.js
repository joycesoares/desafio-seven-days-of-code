 
  
const getPersonLocalStorage = () => JSON.parse(localStorage.getItem('db_person')) ?? [];
const setPersonLocalStorage = (personObject) =>  localStorage.setItem('db_person', JSON.stringify(personObject)) 

const readPerson = () => getPersonLocalStorage();

 
function createPerson(person) {

    const personObject = getPersonLocalStorage();
    personObject.push(person);
    setPersonLocalStorage(personObject);

}

function savePerson(){

    const person = {
        namePerson: document.getElementById('name-person').value,
        dateBirthPerson: document.getElementById('birth-date').value
    }

    const index = document.getElementById('name-person').dataset.index

    if (index === 'new') {
        createPerson(person)
        updatePersonInTable()
    } else {
        updatePerson()
    }
 
}

function createRowPerson(index){
    const person = getPersonLocalStorage();
    person.forEach(persons => {
        const newRowPerson = document.createElement('tr');
        
        newRowPerson.innerHTML = `
            <td>${persons.namePerson}</td>
            <td>${persons.dateBirthPerson}</td>
            <td>
                <button type="button" class="btn-edit" id="edit-${index}">Editar</button>
                <button type="button" class="btn-delete" id="delete-${index}">Excluir</button>
            </td>
        `
        document.querySelector('#show-person>tbody').appendChild(newRowPerson)

    });
}

function updatePersonInTable() {
   
    const personObject = readPerson();
    personObject.forEach(createRowPerson);

}

function fillInput(){
    const person = getPersonLocalStorage();
    
    person.map((persons)  => {
        document.getElementById('name-person').value = persons.namePerson 
        document.getElementById('birth-date').value = persons.dateBirthPerson 
    })
    savePerson()

}
function editPerson(index){

    const person = readPerson()[index];
    person.index = index
    fillInput(person)

}

 
function updatePerson(event){

    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')

        if (action == 'edit'){
            editPerson(index)
        }
     
    }
    

}
 
 updatePersonInTable()

document.getElementById('btn-submit')
    .addEventListener('click', savePerson)

document.querySelector('#show-person>tbody')
    .addEventListener('click', updatePerson)