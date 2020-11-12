/* eslint-disable camelcase */

export interface categoryShape {
    id: number;
    name: string;
}

export interface itemShape {
    id: number;
    name: string;
    description: string;
    price: string;
    unit: string;
    image: string | null;
    category: number;
}

export interface bannerShape {
    name: string;
    phone: number | any;
    street: string;
    city: string;
    state: string;
    postal: string;
    currency: string;
    image?: string;
    description?: string;
}

export interface tableShape {
    tableNo: string;
}

export interface groupShape {
    id: number;
    name: string;
    choice_type: number;
    min_allowed: number;
    max_allowed: number;
}

export interface choiceShape {
    id: number;
    group: number;
    name: string;
    price: string;
}

export interface IlocalChoice {
    groupId: number;
    groupName: string;
    choiceId: Array<number>;
    choiceName: Array<string>;
    choicePrice: number;
    min: number;
    max: number;
    valid: boolean;
}
export interface IlocalChoices extends Array<IlocalChoice> { }

export interface IChoiceHash {
    [groupId: string]: number;
}

export interface cartShape {
    itemId: number;
    itemName: string;
    itemChoices: IlocalChoices;
    itemFinalPrice: number;
    cartQuantity: number;
    cartPrice: number;
}

export interface formShape {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    landmark?: string;
    neighborhood: string;
    city: string;
    postal: string;
    tableNo: string;
}

export interface orderItemShape {
    item_id: number;
    choices?: Array<number>;
    quantity: number;
}

export interface orderShape {
    instructions?: string;
    items: Array<orderItemShape>;
    due: string;
    is_pickup: boolean;
}

export interface customerShape {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    landmark?: string;
    neighborhood: string;
    city: string;
    postal: string;
    tableNo?: string;
}

export interface summaryItemShape {
    item: string;
    choices: Array<string>;
    price: number;
    quantity: number;
}

export interface orderSummaryShape {
    due: string;
    id: string;
    instructions: string;
    is_pickup: boolean;
    items: Array<summaryItemShape>;
    store: string;
}

