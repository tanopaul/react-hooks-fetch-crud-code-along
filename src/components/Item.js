import React from "react";

function Item({ item, updateCart, deleteItem }) {
  
  const url = 'http://localhost:4000/items';
  
  function handleClick() {
    
    fetch(`${url}/${item.id}`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({isInCart: !item.isInCart})
    })
    .then(resp => resp.json())
    .then(data => updateCart(data))
  }

  function handleDelete() {
    fetch(`${url}/${item.id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(() => deleteItem(item))
  }


  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleClick} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleDelete} className="remove">Delete</button>
    </li>
  );
}

export default Item;
