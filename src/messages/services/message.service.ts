import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDTO } from '../dto/message-dto/message-dto';
import {
  convertFromDTOToMessage,
  convertFromMessageToDTO,
} from '../utils/messageConverter.utils';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private repository: Repository<Message>,
  ) {}

  async findAll(): Promise<MessageDTO[]> {
    const messages = await this.repository.find();
    return messages.map((message) => convertFromMessageToDTO(message));
  }

  async create(messageDTO: MessageDTO): Promise<MessageDTO> {
    const message = convertFromDTOToMessage(messageDTO);
    return convertFromMessageToDTO(await this.repository.save(message));
  }

  async update(id: number, messageDTO: MessageDTO): Promise<MessageDTO> {
    const messageSearched = await this.repository.findOne({
      where: { id },
    });

    if (!messageSearched) {
      return null;
    }

    messageSearched.author = messageDTO.author;
    messageSearched.description = messageDTO.description;

    return convertFromMessageToDTO(await this.repository.save(messageSearched));
  }

  async delete(id: number): Promise<boolean> {
    const messageSearched = await this.repository.findOne({
      where: { id },
    });

    if (!messageSearched) {
      return false;
    }

    return !!(await this.repository.delete(id));
  }
}
