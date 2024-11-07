package com.socialApp.Service;

import java.util.List;

import com.socialApp.Modals.Chat;
import com.socialApp.Modals.Message;
import com.socialApp.Modals.Users;

public interface MessageService  {
	
	public Message createMessage(Users user , Integer chatId, Message req) throws Exception;
	
	public  List<Message> findChatsMessages(Integer chatId) throws Exception;

}
