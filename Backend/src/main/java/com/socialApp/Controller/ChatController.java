package com.socialApp.Controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.socialApp.Modals.Chat;
import com.socialApp.Modals.Users;
import com.socialApp.Request.CreateChatRequest;
import com.socialApp.Service.ChatService;
import com.socialApp.Service.UserService;

@RestController
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/api/chats")
	public Chat createChat(@RequestHeader("Authorization") String jwt ,@RequestBody CreateChatRequest req) throws Exception {
		
		Users reqUser = userService.findUserByJwt(jwt);
		
		Users user2 = userService.findUserById(req.getUserId());
		Chat chat = chatService.createChat(reqUser, user2);
		
		return chat;
	}
	
	@GetMapping("/api/chats")
	public List<Chat> findUserChat(@RequestHeader("Authorization") String jwt) {
		
		Users user = userService.findUserByJwt(jwt);
		
		List<Chat> chat = chatService.findUsersChat(user.getId());
		
		return chat;
	}

}
