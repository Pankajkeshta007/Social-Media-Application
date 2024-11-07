package com.socialApp.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.socialApp.Modals.Chat;
import com.socialApp.Modals.Message;
import com.socialApp.Modals.Users;
import com.socialApp.Repository.ChatRepository;
import com.socialApp.Repository.MessageRepository;

@Service
public class MessageServiceImplementation implements MessageService {
	
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ChatService chatService;
	
	@Autowired
	private ChatRepository chatRepository;

	@Override
	public Message createMessage(Users user, Integer chatId, Message req) throws Exception {
		Message message = new Message();
		Chat chat = chatService.findChatById(chatId);
		
		message.setContents(req.getContents());
		message.setImage(req.getImage());
		message.setUser(user);
		message.setTimestamp(LocalDateTime.now());
		message.setChat(chat);
		
		Message savedMessage =  messageRepository.save(message);
		chat.getMessages().add(savedMessage);
		chatRepository.save(chat);
		
		return savedMessage;
	}

	@Override
	public List<Message> findChatsMessages(Integer chatId) throws Exception {
		Chat chat = chatService.findChatById(chatId);
		return messageRepository.findByChatId(chatId);
	}

}
