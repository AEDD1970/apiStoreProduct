import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  get(): string {
    return 'Wellcome api store products , puder ver la documetacion en http://localhost:3002/docs';
  }
}
