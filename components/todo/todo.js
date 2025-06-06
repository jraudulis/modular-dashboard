
function inputLength(container){
  return container.querySelector('.input').value.trim().length > 0;
} 

//Function for creating li element with input value
function createLi(container) {

  const input = container.querySelector('.input');
  const list = container.querySelector('.list');

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(input.value));
  delDoneButtons(li);
  list.appendChild(li);
  input.value = "";
}

//Function for adding li elements after click
function addLiAfterClick(container) {
 if ( inputLength(container) ) {
   createLi(container);
 }
}

//Function for adding li element after Enter keypress
function addLiAfterKey(event, container) {
 if ( inputLength(container) && event.key === "Enter" ) {
   createLi(container);
  }
}

//Function to attach Delete and Done buttons with corresponding click events
function delDoneButtons(li){
 const del = document.createElement("button");
 del.appendChild(document.createTextNode("Delete"));

 const done = document.createElement("button");
 done.appendChild(document.createTextNode("Done"));

 del.classList.add("del-button");
 done.classList.add("done-button");

 li.appendChild(del);
 li.appendChild(done);

del.addEventListener("click", function(){
 del.parentNode.remove();
});

done.addEventListener("click", function(){
 this.parentNode.classList.toggle("finished");
});

}

export function initTodo (container) {

   container.innerHTML = `
    <div class="todo-widget">
    <h2>Daily Tasks</h2>
    <input class="input" type="text" placeholder="Enter item">
    <button aria-label="add task" class="btn">Enter</button>
    <ul class="list"></ul>
    </div>
  `;

    const input = container.querySelector('.input');
    const btn = container.querySelector('.btn');

    btn.addEventListener("click", () => {
    addLiAfterClick(container);
    });
    input.addEventListener("keydown", (event) => {
    addLiAfterKey(event, container);
    });

}
