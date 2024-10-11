import { Module } from '@nestjs/common';
import { ReactionTestGateway } from './reaction-test.gateway';
import { ReactionTestService } from './reaction-test.service';

@Module({
  providers: [ReactionTestGateway, ReactionTestService],
})
export class ReactionTestModule {}
