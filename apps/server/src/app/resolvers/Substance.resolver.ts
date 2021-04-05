import { Resolver, Query, Arg, Mutation, Int } from 'type-graphql';

import Substance from '../entities/Substance';

import {
  PaginationOptions,
  StatusHandler,
  SubstanceStatus,
} from '../graphql/Common';

import {
  SubstanceQueryInput,
  SubstanceCreateInput,
  SubstanceUpdateInput,
  SubstanceRelation,
  getSubstanceRelations,
  SubstanceRelationsInput,
} from '../graphql/Substance';

import { RESPONSE_INDICATOR } from '../utils/constants';

import { generatePagination } from '../utils/helper';

import SubstanceService from '../services/Substance.service';
import TaskService from '../services/Task.service';

@Resolver((of) => Substance)
export default class SubstanceResolver {
  constructor(
    private readonly substancesService: SubstanceService,
    private readonly taskService: TaskService
  ) {}

  @Query(() => SubstanceStatus, {
    nullable: false,
    description: '查找所有实体信息',
  })
  async QueryAllSubstances(
    @Arg('pagination', { nullable: true })
    pagination: PaginationOptions,

    @Arg('relations', (type) => SubstanceRelationsInput, { nullable: true })
    relationOptions: Partial<SubstanceRelationsInput> = {}
  ): Promise<SubstanceStatus> {
    try {
      const queryPagination = generatePagination(pagination);
      const relations: SubstanceRelation[] = getSubstanceRelations(
        relationOptions
      );

      const res = await this.substancesService.getAllSubstances(
        queryPagination,
        relations
      );

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, res);
    } catch (error) {
      console.log(error);
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => SubstanceStatus, {
    nullable: false,
    description: '基于ID查找实体',
  })
  async QuerySubstanceById(
    @Arg('substanceId', (type) => Int) substanceId: number,

    @Arg('relations', (type) => SubstanceRelationsInput, { nullable: true })
    relationOptions: Partial<SubstanceRelationsInput> = {}
  ): Promise<SubstanceStatus> {
    try {
      const relations: SubstanceRelation[] = getSubstanceRelations(
        relationOptions
      );

      const res = await this.substancesService.getOneSubstanceById(
        substanceId,
        relations
      );

      if (!res) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => SubstanceStatus, {
    nullable: false,
    description: '基于条件查找单个实体',
  })
  async QueryOneSubstanceByConditions(
    @Arg('substanceQueryParam') param: SubstanceQueryInput,

    @Arg('relations', (type) => SubstanceRelationsInput, { nullable: true })
    relationOptions: Partial<SubstanceRelationsInput> = {}
  ): Promise<SubstanceStatus> {
    try {
      const relations: SubstanceRelation[] = getSubstanceRelations(
        relationOptions
      );

      const res = await this.substancesService.getOneSubstanceByConditions(
        param,
        relations
      );

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => SubstanceStatus, {
    nullable: false,
    description: '基于条件查找多个实体',
  })
  async QuerySubstancesByConditions(
    @Arg('substanceQueryParam') param: SubstanceQueryInput,

    @Arg('pagination', { nullable: true })
    pagination: PaginationOptions,

    @Arg('relations', (type) => SubstanceRelationsInput, { nullable: true })
    relationOptions: Partial<SubstanceRelationsInput> = {}
  ): Promise<SubstanceStatus> {
    try {
      const queryPagination = generatePagination(pagination);
      const relations: SubstanceRelation[] = getSubstanceRelations(
        relationOptions
      );

      const res = await this.substancesService.getSubstancesByConditions(
        param,
        queryPagination,
        relations
      );

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, res);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: '新增实体',
  })
  async CreateSubstance(
    @Arg('substanceCreateParam') param: SubstanceCreateInput
  ): Promise<SubstanceStatus> {
    try {
      const { substanceName } = param;

      const isExistingSubstance = await this.substancesService.getOneSubstanceByConditions(
        { substanceName }
      );

      if (isExistingSubstance) {
        return new StatusHandler(false, RESPONSE_INDICATOR.EXISTED, '');
      }

      const res = await this.substancesService.createSubstance(param);

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: '变更实体信息',
  })
  async UpdateSubstanceInfo(
    @Arg('substanceUpdateParam') param: SubstanceUpdateInput
  ): Promise<SubstanceStatus> {
    try {
      const { substanceId } = param;

      const isExistingSubstance = await this.substancesService.getOneSubstanceById(
        substanceId
      );

      if (!isExistingSubstance) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, '');
      }

      const updated = await this.substancesService.updateSubstance(
        substanceId,
        param
      );

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [updated]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: '删除实体',
  })
  async DeleteSubstance(
    @Arg('substanceId', (type) => Int) sId: number
  ): Promise<SubstanceStatus> {
    try {
      const res = await this.substancesService.getOneSubstanceById(sId);

      if (!res) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      await this.substancesService.deleteSubstance(sId);
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, []);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => SubstanceStatus, {
    nullable: false,
    description: '将实体关联到任务',
  })
  async CombineSubstanceAndTask(
    @Arg('substanceId', (type) => Int) substanceId: number,

    @Arg('taskId', (type) => Int) taskId: number
  ): Promise<SubstanceStatus> {
    try {
      const substance = await this.substancesService.getOneSubstanceById(
        substanceId,
        ['relatedTask']
      );
      const task = await this.taskService.getOneTaskById(taskId);

      if (!substance || !task) {
        return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
      }

      if (substance.relatedTask) {
        return new StatusHandler(false, RESPONSE_INDICATOR.EXISTED, [
          substance,
        ]);
      }

      // FIXME: 同时确保此任务尚未被实体关联

      substance.relatedTask = task;

      const res = await this.substancesService.createSubstance(substance);

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      console.log(error);
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }
}
