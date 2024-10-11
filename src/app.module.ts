import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfig } from './config/env.config';
import { ConfigModule } from '@nestjs/config';
import { ReactionTestModule } from './modules/reaction-test/reaction-test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: EnvConfig.nodeFile,
    }),

    // Custom Module
    ReactionTestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
