import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageController } from './messages/controller/message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { MessageService } from './messages/services/message.service';
import { Message } from './messages/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Message]),
  ],
  controllers: [AppController, MessageController],
  providers: [AppService, MessageService],
})
export class AppModule {}
