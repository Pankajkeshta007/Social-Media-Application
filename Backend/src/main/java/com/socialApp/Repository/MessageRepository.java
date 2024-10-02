package com.socialApp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.socialApp.Modals.Message;

public interface MessageRepository  extends JpaRepository<Message, Integer>{
	
	public List<Message> findByChatId(Integer chatId);

}
