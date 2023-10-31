import {
    IsIn,
    IsString,
    IsNumberString,
    IsNumber,
  } from 'class-validator';


export class bodyMove {
  @IsIn([1, 2, 3])
  action: number;

  @IsString()
  username: string;
}

export class bodyMatchwMove extends bodyMove {
  @IsNumber()
  deadline: number;
}
