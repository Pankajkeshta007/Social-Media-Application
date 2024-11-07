package com.socialApp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.socialApp.Modals.Chat;
import com.socialApp.Modals.Users;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
	
	public List<Chat> findByUsersId(Integer userId);

	@Query("select c from Chat c where :user Member of c.users And :reqUser Member of c.users")
	public Chat findChatByUsersId(@Param("user") Users user, @Param("reqUser") Users reqUser);
}
