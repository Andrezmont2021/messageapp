import { MessageDTO } from '../dto/message-dto/message-dto';
import { Message } from '../entities/message.entity';

export const convertFromMessageToDTO = (message: Message): MessageDTO => {
  const messageDTO: MessageDTO = {
    id: message.id,
    author: message.author,
    description: message.description,
  };
  return messageDTO;
};

export const convertFromDTOToMessage = (messageDTO: MessageDTO): Message => {
  const message: Message = {
    id: messageDTO?.id,
    author: messageDTO.author,
    description: messageDTO.description,
  };
  return message;
};
