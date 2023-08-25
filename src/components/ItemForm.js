import React, { useState } from "react";

function ItemForm({addItem}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  const url = 'http://localhost:4000/items';

  function handleSubmit(e) {

    e.preventDefault();

    const obj = {
      name: name,
      category: category,
      isInCart: false
    }

    fetch(url, {
          method: "POST",
          headers: {"Content-Type": "Application/json"},
          body: JSON.stringify(obj)
        })
      .then(resp => resp.json())
      .then(data => addItem(data))

    
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
