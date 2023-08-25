import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  const url = 'http://localhost:4000/items';
  
  useEffect(() => {
    fetch(url)
    .then(resp => resp.json())
    .then(data => setItems(data))
  }, [])

  function addItem(obj) {
    setItems([...items, obj]) 
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function updateCart(obj) {
    const updatedItem = items.map(item => {
      if (item.id === obj.id) {
       return obj;
      } else {
        return item;
      }
    })
    setItems(updatedItem)
  }

  function deleteItem(itemToDelete) {
    const updatedItems = items.filter(item => item.id !== itemToDelete.id)
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm addItem={addItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item deleteItem={deleteItem} updateCart={updateCart} key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
