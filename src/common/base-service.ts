import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { IError } from '../common/response-class';
// import { IResObj } from '../common/response-class';
// import { IResObjList } from '../common/response-class';
import { BaseEntity } from 'typeorm';

export class BaseService<T> {
  objName: string;
  constructor(objName: string) {
    this.objName = objName;
  }
  // resObj(data: T): IResObj<T> {
  //   return new IResObj(200, false, 'success', data);
  // }

  // resBoolean(data: boolean): IResObj<boolean> {
  //   return new IResObj(200, false, 'success', data);
  // }

  // resNumber(data: number): IResObj<number> {
  //   return new IResObj(200, false, 'success', data);
  // }

  // resList(data: any): IResObjList<T> {
  //   return new IResObjList(200, false, 'success', data);
  // }

  // resError(message: string): IError {
  //   return new IError(HttpStatus.BAD_REQUEST, message);
  // }
  // 모든 서비스에서 찾은 엔티티의 정보가 존재하는지 여부 검색
  isExsist(obj: T): void {
    if (!obj) throw new Error('findedObj not found');
  }
}
