import {
    IsIn,
    IsInt,
    IsPositive,
    IsString,
    IsNumber,
    IsNumberString,
    Length,
    isNumberString,
    IsOptional,
  } from 'class-validator';


export class bodyMove {
  @IsNumberString()
  matchID: string;
  @IsNumberString()
  action: string;
  @IsString()
  username: string;
}

export class paramsProdID {
  @IsNumberString()
  prodID: number;
}

export class paramsUserID {
  @IsNumberString()
  userID: number;
}

export class bodyProduct {
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsNumberString()
  price: number;
}

export class bodyQuantity {
  @IsInt()
  @IsPositive()
  quantity: number;
}

export class bodyModifyProductQuantity {
  @IsInt()
  @IsPositive()
  existingQty: number;
  @IsIn(["increase","decrease"])
  action: string;
}

export class paramOrderID {
  @IsString()
  orderID: string;
}

export class bodyLogin {
  @IsString()
  @Length(1, 30)
  nameOrEmail: string;
  @IsString()
  @Length(0, 20)
  password: string;
}