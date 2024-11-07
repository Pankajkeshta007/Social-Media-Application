package com.socialApp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.socialApp.Modals.Comment;

public interface CommentRepository  extends JpaRepository<Comment, Integer>{
	

}
