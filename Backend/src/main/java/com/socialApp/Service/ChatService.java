package com.socialApp.Service;

import java.util.List;

import com.socialApp.Modals.Chat;
import com.socialApp.Modals.Users;

public interface ChatService {
	
	public Chat createChat(Users reqUser , Users user2);
	
	public Chat findChatById(Integer chatId) throws Exception;
	
	public List<Chat> findUsersChat(Integer userId);
	

}
