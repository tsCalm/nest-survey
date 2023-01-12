import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { IError } from '../common/response-class';
// import { IResObj } from '../common/response-class';
// import { IResObjList } from '../common/response-class';
import { BaseEntity, FindOptionsWhere } from 'typeorm';
import { DeleteResult, Repository } from 'typeorm';

export abstract class BaseService<T> {
  objName: string;

  constructor(objName: string) {
    this.objName = objName;
  }
  abstract findAll(): Promise<T[]>;
  abstract findOne(id: number): Promise<T>;
  abstract update(id: number, obj: object): Promise<T>;
  abstract delete(id: number): Promise<T>;
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
  findValidate(obj: T): void {
    if (!obj)
      throw new HttpException(
        `${this.objName} not found`,
        HttpStatus.BAD_REQUEST,
      );
  }

  DeleteValidate(result: DeleteResult): void {
    if (result.affected < 1)
      throw new HttpException(
        `${this.objName} delete failed`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  getNewUpdateEntity(findedObj: T, updateInput: object = {}): T {
    return Object.assign(findedObj, updateInput);
  }
}
