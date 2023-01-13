import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { STATUS_CODES } from 'http';
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

  findValidate(obj: T): void {
    if (!obj)
      throw new ApolloError(`${this.objName} not found`, STATUS_CODES[400], {
        statusCode: 400,
      });
  }

  DeleteValidate(result: DeleteResult): void {
    if (result.affected < 1)
      throw new ApolloError(
        `${this.objName} delete failed`,
        STATUS_CODES[500],
        {
          statusCode: 500,
        },
      );
  }

  getNewUpdateEntity(findedObj: T, updateInput: object = {}): T {
    return Object.assign(findedObj, updateInput);
  }
}
