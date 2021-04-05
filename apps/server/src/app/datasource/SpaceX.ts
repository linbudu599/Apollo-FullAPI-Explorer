import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { SPACEX_API } from '../utils/constants';

export interface ICapsules {
  reuse_count: number;
  water_landings: number;
  land_landings: number;
  last_updated: string;
  launches: string[];
  serial: string;
  status: 'unknown' | 'active' | 'destroyed' | 'retired';
  type: string;
  id: string;
}

/**
 * Apollo DataSource, use `@Ctx()` to get Apollo Context in TypeGraphQL Resolver
 * @export
 * @class WorkerAPI
 * @extends {RESTDataSource}
 */
export default class WorkerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = SPACEX_API;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', 'xxx');
  }

  async getAllRockets(): Promise<ICapsules[]> {
    const res = (await this.get(`/capsules`)).data;
    return res;
  }
}
