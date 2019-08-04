import { NowRequest, NowResponse } from '@now/node';
import jsf from 'json-schema-faker';

const vendingMachineInventorySchema = {
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$ref": "#/definitions/VendingMachineInventoryJSON",
    "definitions": {
        "VendingMachineInventoryJSON": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "banana": {
                    "$ref": "#/definitions/product"
                },
                "apple": {
                    "$ref": "#/definitions/product"
                },
                "beer": {
                    "$ref": "#/definitions/product"
                },
                "toy-car": {
                    "$ref": "#/definitions/product"
                },
                "shoe": {
                    "$ref": "#/definitions/product"
                }
            },
            "required": [
                "apple",
                "banana",
                "beer",
                "toy-car",
                "shoe"
            ],
            "title": "VendingMachineInventoryJSON"
        },
        "product": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "qty": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 10
                },
                "price": {
                    "type": "number",
                    "minimum": 1,
                    "maximum": 100,
                    "multipleOf" : 0.01
                }
            },
            "required": [
                "price",
                "qty"
            ],
            "title": "vending-machine-product"
        }
    }
};

export interface VendingMachineInventoryJSON {
    banana: vendingMachineProduct;
    apple:  vendingMachineProduct;
    beer:   vendingMachineProduct;
    car:    vendingMachineProduct;
    shoe:   vendingMachineProduct;
}

export interface vendingMachineProduct {
    qty:   number;
    price: number;
}


export default (_req: NowRequest, res: NowResponse) => {
    jsf.resolve(vendingMachineInventorySchema)
    .then((sample: VendingMachineInventoryJSON) => {
        res.status(200).send(sample);
    })
};