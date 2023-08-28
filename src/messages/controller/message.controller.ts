import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Res,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { MessageDTO } from '../dto/message-dto/message-dto';
import { MessageService } from '../services/message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post()
  create(@Body() messageDTO: MessageDTO, @Res() response): void {
    this.messageService
      .create(messageDTO)
      .then((messageCreated) =>
        response.status(HttpStatus.CREATED).json(messageCreated),
      )
      .catch((error) => {
        console.error('Error creating the message, details: ', error);
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error creating the message, see log for details' });
      });
  }
  @Get()
  getAll(@Res() response): void {
    this.messageService
      .findAll()
      .then((messageList) => response.json(messageList))
      .catch((error) => {
        console.error('Error retrieving the message list, details: ', error);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error retrieving the message list, see log for details',
        });
      });
  }

  @Put(':id')
  update(
    @Body() messageDTO: MessageDTO,
    @Param('id') idMessage,
    @Res() response,
  ): void {
    this.messageService
      .update(idMessage, messageDTO)
      .then((messageUpdated) =>
        response.status(HttpStatus.OK).json(messageUpdated),
      )
      .catch((error) => {
        console.error('Error updating the message, details: ', error);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error updating the message, see log for details',
        });
      });
  }

  @Delete(':id')
  delete(@Param('id') idMessage, @Res() response): void {
    this.messageService
      .delete(idMessage)
      .then((flag) => {
        flag
          ? response.status(HttpStatus.NO_CONTENT).send()
          : response.status(HttpStatus.NOT_FOUND).send();
      })
      .catch((error) => {
        console.error('Error deleting the message, details: ', error);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error deleting the message, see log for details',
        });
      });
  }
}
