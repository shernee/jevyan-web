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
    phone: number;
    street: string;
    city: string;
    state: string;
    postal: string;
    currency: string;
    image?: string;
    description?: string;
}

export interface groupShape {
    id: number;
    name: string;
    choice_type: number;
}

export interface choiceShape {
    id: number;
    group: number;
    name: string;
    price: string;
}

export interface IlocalChoice {
    groupId: number;
    choiceId: number;
    choicePrice: number;
}
export interface IlocalChoices extends Array<IlocalChoice> {}

export interface IChoiceHash {
    [groupId: string] : number;
  }

export interface cartShape {
    itemId: number;
    itemChoices: IlocalChoices;
    itemFinalPrice: number;
    cartQuantity: number;
    cartPrice: number;
}
