document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const monsterContainer = document.getElementById("monster-container");
    const forwardButton = document.getElementById("forward");
    const backwardButton = document.getElementById("back");
  
    createMonster();
   loadMonsters(currentPage);
  
    function loadMonsters(page) {
      fetch(`http://localhost:3000/monsters/?_page=${page}&_limit=50`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .then((json) => {
          showMonsters(json);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    
  
    function showMonsters(monsterList) {
      monsterContainer.innerHTML = '';
  
      monsterList.forEach((monster) => {
        const monsterElement = document.createElement("div");
        monsterElement.innerHTML = `
          <h2>${monster.name}</h2>
          <p>Age: ${monster.age}</p>
          <p>Description: ${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterElement);
      });
    }
}
    function handleButtonClick(event) {
      if (event.target.id === "forward") {
        currentPage++;
      } else if (event.target.id === "back") {
        if (currentPage > 1) {
          currentPage--;
        }
      };
    }


    forwardButton.addEventListener("click", handleButtonClick);
    backwardButton.addEventListener("click", handleButtonClick);

  });
  
  function createMonster() {
    const form = document.getElementById("create-monster");
    form.innerHTML = `
    
      <input type="text" id="name" placeholder="Enter name">
    
      <input type="number" id="age" placeholder="Enter age">
  
      <label for="description">Description:</label>
      <input type="text" id="description" placeholder="Enter description">
    `;
  
    const createMonsterBtn = document.getElementById("create-monster-btn");
    createMonsterBtn.addEventListener('click', (event) => {
        event.preventDefault();

      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const description = document.getElementById("description").value;
  
      const newMonster = {
        name: name,
        age: age,
        description: description
      };
 
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMonster),
      })
      console.log(newMonster);
  })}