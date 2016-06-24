import React from 'react';
import Button from '../Forms/Buttons/Button';


function Table({data, browserHistory}){
  function goTo(id) {
    console.log('id',id, browserHistory);
    browserHistory.push(`/character/${id}`);
  }
  const rows = data.map((item,i) => {
    return (
      <tr key={i}>
        <td onClick={goTo.bind(this,item._id)}>{item.full_name}</td>
        <td><Button onClick={goTo.bind(this,item._id)} type="button">Editar</Button></td>
      </tr>
    )
  });
  return(
    <table className="highlight">
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Editar</th>
              </tr>
            </thead>

            <tbody>
              {rows}
            </tbody>
          </table>
  )
}

export default Table
