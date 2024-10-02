package com.socialApp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.socialApp.Modals.Message;
import com.socialApp.Modals.Users;
import com.socialApp.Service.MessageService;
import com.socialApp.Service.UserService;

@RestController
public class MessageController {
	
	@Autowired
	private MessageService messageService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/api/messages/chat/{chatId}")
	public Message createMessage(@RequestBody Message req, @RequestHeader("Authorization") String jwt, @PathVariable Integer chatId) throws Exception
	{
		
		Users user = userService.findUserByJwt(jwt);
		
		Message createdMessage = messageService.createMessage(user, chatId, req);
		return createdMessage;
	}
	
	@GetMapping("/api/messages/chat/{chatId}")
	public List<Message> findChatsMessage( @RequestHeader("Authorization") String jwt, @PathVariable Integer chatId) throws Exception
	{
		
		Users user = userService.findUserByJwt(jwt);
		
		List<Message> messages = messageService.findChatsMessages(chatId);
		return messages;
	}

}
