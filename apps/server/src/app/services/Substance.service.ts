import { Service } from 'typedi';
import { Repository, SelectQueryBuilder, Connection } from 'typeorm';
import { InjectRepository, InjectConnection } from 'typeorm-typedi-extensions';

import Substance from '../entities/Substance';

import { PaginationOptions } from '../graphql/Common';
import {
  SubstanceRelation,
  SubstanceQueryInput,
  SubstanceCreateInput,
  SubstanceUpdateInput,
} from '../graphql/Substance';

import { TypeORMCacheIds } from '../utils/constants';

export interface ISubstanceService {
  getAllSubstances(
    pagination: Required<PaginationOptions>,
    relations: SubstanceRelation[]
  ): Promise<Substance[]>;

  getOneSubstanceById(
    substanceId: number,
    relations: SubstanceRelation[]
  ): Promise<Substance | undefined>;

  getOneSubstanceByConditions(
    conditions: SubstanceQueryInput,
    relations: SubstanceRelation[]
  ): Promise<Substance | undefined>;

  getSubstancesByConditions(
    conditions: SubstanceQueryInput,
    pagination: Required<PaginationOptions>,
    relations: SubstanceRelation[]
  ): Promise<Substance[]>;

  createSubstance(
    substance: SubstanceCreateInput | Substance
  ): Promise<Substance>;
  updateSubstance(
    indicator: number,
    infoUpdate: SubstanceUpdateInput
  ): Promise<Substance>;
  deleteSubstance(sId: number): Promise<void>;
}

@Service()
export default class SubstanceService implements ISubstanceService {
  constructor(
    @InjectRepository(Substance)
    private readonly substanceRepository: Repository<Substance>,

    @InjectConnection()
    private readonly connection: Connection
  ) {}

  private generateSelectBuilder(relations: SubstanceRelation[]) {
    let selectQueryBuilder = this.substanceRepository.createQueryBuilder(
      'substance'
    );

    if (relations.includes('relatedRecord')) {
      selectQueryBuilder = selectQueryBuilder
        .leftJoinAndSelect('substance.relatedRecord', 'records')
        .leftJoinAndSelect('records.recordExecutor', 'recordExecutor')
        .leftJoinAndSelect('records.recordTask', 'recordTask')
        .leftJoinAndSelect('records.recordAccount', 'recordAccount');
    }

    if (relations.includes('relatedTask')) {
      selectQueryBuilder = selectQueryBuilder.leftJoinAndSelect(
        'substance.relatedTask',
        'task'
      );
    }

    // 任务 >>> 指派者
    if (relations.includes('assignee')) {
      selectQueryBuilder = selectQueryBuilder.leftJoinAndSelect(
        'task.assignee',
        'assignee'
      );
    }

    return selectQueryBuilder;
  }

  private SubstanceConditionQuery(
    conditions: SubstanceQueryInput,
    relations: SubstanceRelation[] = []
  ) {
    let initialSelectBuilder = this.generateSelectBuilder(relations);

    Object.keys(conditions).forEach((key) => {
      initialSelectBuilder = initialSelectBuilder.andWhere(
        `substance.${key}= :${key}`,
        {
          [key]: conditions[key],
        }
      );
    });

    return initialSelectBuilder;
  }

  async getAllSubstances(
    pagination: Required<PaginationOptions>,
    relations: SubstanceRelation[] = []
  ): Promise<Substance[]> {
    const { offset, take } = pagination;

    const res = await this.generateSelectBuilder(relations)
      .skip(offset)
      .take(take)
      .cache(TypeORMCacheIds.substance, 1000 * 5)
      .getMany();

    return res;
  }

  async getOneSubstanceById(
    sId: number,
    relations: SubstanceRelation[] = []
  ): Promise<Substance | undefined> {
    const res = await this.generateSelectBuilder(relations)
      .where('substance.substanceId = :sId', { sId })
      .getOne();

    return res;
  }

  async getOneSubstanceByConditions(
    conditions: SubstanceQueryInput,
    relations: SubstanceRelation[] = []
  ): Promise<Substance | undefined> {
    const res = await this.SubstanceConditionQuery(
      conditions,
      relations
    ).getOne();

    return res;
  }

  async getSubstancesByConditions(
    conditions: SubstanceQueryInput,
    pagination: Required<PaginationOptions>,
    relations: SubstanceRelation[] = []
  ): Promise<Substance[]> {
    const { offset, take } = pagination;

    const res = await this.SubstanceConditionQuery(conditions, relations)
      .skip(offset)
      .take(take)
      .getMany();

    return res;
  }

  async createSubstance(
    substance: SubstanceCreateInput | Substance
  ): Promise<Substance> {
    const res = await this.substanceRepository.save(substance);
    await this.connection.queryResultCache?.remove([TypeORMCacheIds.substance]);
    return res;
  }

  async updateSubstance(
    indicator: number,
    infoUpdate: SubstanceUpdateInput
  ): Promise<Substance> {
    await this.substanceRepository.update(indicator, infoUpdate);

    const updatedItem = (await this.getOneSubstanceById(indicator))!;

    return updatedItem;
  }

  async deleteSubstance(sId: number): Promise<void> {
    await this.substanceRepository
      .createQueryBuilder()
      .delete()
      .from(Substance)
      .where('substanceId = :sId')
      .setParameter('sId', sId)
      .execute();

    await this.connection.queryResultCache?.remove([TypeORMCacheIds.substance]);
  }

  async getFullSubstanceByRecordId(recordId: number): Promise<Substance[]> {
    const res = await this.generateSelectBuilder([
      'relatedRecord',
      'assignee',
      'relatedTask',
    ])
      .where('records.recordId = :recordId', { recordId })
      .getMany();

    return res;
  }
}
