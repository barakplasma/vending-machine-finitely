import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types'

const Product = ({label, icon, price = 0}) => (<div><span role="img" aria-label={label}>{icon}</span>
<br/>
{label}
<br/>
<span>price: {price}</span>
</div>
)

const Keypad = () => {
  const [addAmount, setAmount] = useState(1);
  const [wallet, setWallet] = useState(1);
  return (<div className="keypad">
  <span className="wallet">{wallet}</span>
  <br/>
  <br/>
  <input type="number" min="0.00" max="100.00" step="1" onChange={e=>setAmount(parseInt(e.currentTarget.value, 10))}/>
  <button onClick={() => {
    setWallet(wallet + addAmount);
  }}>Add {addAmount}</button>
  </div>)
}

function VendingMachine() {
  const [inventory, setInventory] = useState({    
    banana: {price: 0, qty: 0},
    apple:  {price: 0, qty: 0},
    beer:   {price: 0, qty: 0},
    "toy-car":    {price: 0, qty: 0},
    shoe:   {price: 0, qty: 0}
  });
  useEffect(() => {
    async function getVendingMachineInventory() {
      const res = await fetch('/api/vendingMachineInventory');
      const newInventory = await res.json();
      setInventory(newInventory);
    }
    getVendingMachineInventory();
  }, []);
  return (
      <div className="vending-machine">
        <div className="product-rack banana"><Product label='banana' icon='🍌' price={inventory.banana.price}/></div>
        <div className="product-rack apple"><Product label='apple' icon='🍎' price={inventory.apple.price}/></div>
        <div className="product-rack toy-car"><Product label='toy-car' icon='🚙' price={inventory['toy-car'].price}/></div>
        <div className="logo">MS</div>
        <div className="product-rack beer"><Product label='beer' icon='🍺' price={inventory.beer.price}/></div>
        <div className="product-rack shoe"><Product label='shoe' icon='👠' price={inventory.shoe.price}/></div>
        <div className="product-rack empty-rack"><Product label='empty-rack' icon='❓'/></div>
        <Keypad/>
        <div className="dispenser">→ Push Here ←</div>
      </div>
  );
}

VendingMachine.propTypes = {

}

export default VendingMachine


