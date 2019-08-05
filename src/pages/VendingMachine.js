import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import vendingMachineLogic from '../logic/vendingMachineLogic';

const {makeProduct, ifDispensing} = vendingMachineLogic;

const Product = ({ label, icon, price = 0, onClick, ...props}) => (<div {...props} onClick={onClick}>
  <span role="img" aria-label={label}>{icon}</span>
  <br />
  {label}
  <br />
  <span>price: {Number(price).toFixed(2)}</span>
</div>
)
Product.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

const Keypad = ({wallet, setWallet}) => {
  const [addAmount, setAmount] = useState(1);
  return (<div className="keypad">
    <span className="wallet">{Number(wallet).toFixed(2)}</span>
    <br />
    <br />
    <input type="number" min="0.00" max="100.00" step="1" onChange={e => setAmount(parseInt(e.currentTarget.value, 10))} />
    <button onClick={() => {
      setWallet(wallet + addAmount);
    }}>Add ${addAmount}</button>
  </div>)
}

function VendingMachine() {
  const [inventory, setInventory] = useState({
    banana: { price: 0, qty: 0 },
    apple: { price: 0, qty: 0 },
    beer: { price: 0, qty: 0 },
    "toy-car": { price: 0, qty: 0 },
    shoe: { price: 0, qty: 0 }
  });

  const [wallet, setWallet] = useState(1);

  useEffect(() => {
    async function getVendingMachineInventory() {
      const res = await fetch('/api/vendingMachineInventory');
      const newInventory = await res.json();
      setInventory(newInventory);
    }
    getVendingMachineInventory();
  }, []);

  const banana = makeProduct(inventory, 'banana')
  const apple = makeProduct(inventory, 'apple')
  const beer = makeProduct(inventory, 'apple')
  const toyCar = makeProduct(inventory, "toy-car")
  const shoe = makeProduct(inventory, 'shoe')

  const subtractFromWallet = (price) => {
    setWallet(wallet - price);
  }

  const vending = (product) => {
    return () => {
      product.dispense(wallet)
      if (ifDispensing(product.fsm)) {
        subtractFromWallet(product.details.price);
      }
      product.fsm.dispatch({ inputName: 'dispensed' })
    }
  }

  return (
    <div className="vending-machine">
      <div className="product-rack banana">
        <Product label='banana' icon='🍌' price={inventory.banana.price} onClick={() => {banana.dispense(wallet); subtractFromWallet(inventory.banana.price)}} />
      </div>
      <div className="product-rack apple">
        <Product label='apple' icon='🍎' price={inventory.apple.price} onClick={vending(apple)} /></div>
      <div className="product-rack toy-car">
        <Product label='toy-car' icon='🚙' price={inventory['toy-car'].price} onClick={vending(toyCar)}/>
      </div>
      <div className="logo">MS</div>
      <div className="product-rack beer">
        <Product label='beer' icon='🍺' price={inventory.beer.price} onClick={vending(beer)}/>
      </div>
      <div className="product-rack shoe">
        <Product label='shoe' icon='👠' price={inventory.shoe.price} onClick={vending(shoe)}/>
      </div>
      <div className="product-rack empty-rack">
        <Product label='empty-rack' icon='❓' price={0} onClick={() => 1}/>
      </div>
      <Keypad wallet={wallet} setWallet={setWallet} />
      <div className="dispenser">→ Push Here ←</div>
    </div>
  );
}

export default VendingMachine
