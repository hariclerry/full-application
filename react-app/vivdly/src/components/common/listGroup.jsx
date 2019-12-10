import React from 'react';

const ListGroup = ({ items, onItemSelelct, valueProperty, textProperty, selectedItem }) => {
  
  return (
    <ul className="list-group">
    {/* <li className="list-group-item active">All Genres</li> */}
      {items.map(item => (
       
        <li key={item[valueProperty]} className={ selectedItem === item? "list-group-item active" : "list-group-item "} onClick={() => onItemSelelct(item)}>{item[textProperty]}</li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"

}
export default ListGroup;
