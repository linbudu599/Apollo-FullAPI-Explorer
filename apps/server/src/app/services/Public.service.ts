import { Service, Inject } from 'typedi';

export interface IPublicService {
  ContainerRegisterTime(): Promise<Date>;
}

@Service()
export default class PublicService implements IPublicService {
  constructor(@Inject('INIT_INJECT_DATA') private readonly dateInfo: Date) {}

  async ContainerRegisterTime(): Promise<Date> {
    return this.dateInfo;
  }
}
