import { FSM } from '@barakplasma/finite-state-machine';
;
const VendingMachineProductFSMFactory = ({ label, price }) => {
    const VendingMachineProductFSM = new FSM();
    let VendingMachineStates;
    (function (VendingMachineStates) {
        VendingMachineStates["locked"] = "locked";
        VendingMachineStates["dispensing"] = "dispensing";
    })(VendingMachineStates || (VendingMachineStates = {}));
    const alwaysLocked = new Map([
        [VendingMachineStates.locked, VendingMachineStates.locked],
        [VendingMachineStates.dispensing, VendingMachineStates.locked],
    ]);
    const dispensingTransition = new Map([
        [VendingMachineStates.locked, VendingMachineStates.dispensing],
        [VendingMachineStates.dispensing, VendingMachineStates.locked],
    ]);
    VendingMachineProductFSM.addState(VendingMachineStates.locked);
    VendingMachineProductFSM.addState(VendingMachineStates.dispensing);
    VendingMachineProductFSM.on({ inputName: 'productSelected' }, (payload = { price: 0, wallet: 10 }) => {
        if (price <= payload.wallet) {
            console.log('dispensing: ', label)
            return dispensingTransition;
        }
        console.log('locked:', label)
        return alwaysLocked;
    });
    VendingMachineProductFSM.on({ inputName: 'dispensed' }, () => {
        return alwaysLocked;
    });
    return VendingMachineProductFSM;
};
const makeProductFSM = (inventory, label) => {
    return VendingMachineProductFSMFactory({ label, price: inventory[label].price });
};
const makeProductOnDispense = (productFSM) => {
    return (wallet) => productFSM.dispatch({ inputName: 'productSelected', payload: { wallet } });
};
const makeProduct = (inventory, product) => {
    const fsm = makeProductFSM(inventory, product)
    return {dispense: makeProductOnDispense(fsm), fsm, details: inventory[product]};
};

/**
 * 
 * @param {FSM} productFSM 
 */
const ifDispensing = (productFSM) => {
    return productFSM.getCurrentState() === 'dispensing';
}

const vendingMachineLogic = {
    makeProduct,
    ifDispensing,
}

export default vendingMachineLogic;