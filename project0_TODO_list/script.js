//Author: Patrick Malatesta
//Date: October 2019

const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

//initialize counts
let itemCount = 0
let uncheckedCount = 0

function newTodo() {
    
    //create new elements that will form the new todo task
    const container = document.createElement('div')
    const text = document.createElement('li')
    const checkbox = document.createElement('input')
    const del = document.createElement('button')
    
    //assign to the items the class defined in classNames
    container.className = classNames.TODO_ITEM
    checkbox.className = classNames.TODO_CHECKBOX
    text.className = classNames.TODO_TEXT
    del.className = classNames.TODO_DELETE
    
    //create a checkbox by setting the input element attribute type to checkbox
    checkbox.setAttribute('type', 'checkbox')
    
    //give a name to the remove button
    del.innerHTML = 'Delete'
    
    //ask user to enter a task
    const userInput = prompt("Enter a task")
    
    // check if user entered some text 
    if (userInput !== '' && userInput !== null){
        // if the input is not empty, pass the input text to the task item
        text.innerHTML = userInput

        itemCount++
        uncheckedCount++

        list.appendChild(container)
        container.appendChild(del)
        container.appendChild(checkbox)
        container.appendChild(text)

        itemCountSpan.innerHTML = itemCount
        uncheckedCountSpan.innerHTML = uncheckedCount
        } else {
        // if user did not enter any text display error message
        alert('Error! You entered an empty task')
    }   
    
    //checkbox actions modify the number of unchecked count 
    checkbox.onclick = function (){
                if (checkbox.checked == true){
                    uncheckedCountSpan.innerHTML = --uncheckedCount
                }
                else{
                    uncheckedCountSpan.innerHTML = ++uncheckedCount 
                }
            }
    
    //delete button actions modify the number of items, the number of
    //unchecked items and remove the task from the list
    del.onclick = function (){
                list.removeChild(container)
                itemCountSpan.innerHTML = --itemCount
                if (checkbox.checked == false)
                    uncheckedCountSpan.innerHTML = --uncheckedCount
                }
    
}
    
