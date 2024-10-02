package com.socialApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.socialApp.Modals.Comment;
import com.socialApp.Modals.Users;
import com.socialApp.Service.CommentService;
import com.socialApp.Service.UserService;

@RestController
public class CommentController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CommentService commentService;
	
	
	@PostMapping("/api/comments/post/{postId}")
	public Comment createComment(@RequestBody Comment comment, @RequestHeader("Authorization") String jwt, @PathVariable Integer postId) throws Exception
	{
		
		Users user = userService.findUserByJwt(jwt); 
		
		Comment createdComment = commentService.createComment(comment, postId, user.getId());
		
		 
		return createdComment;
	}
	
	@PutMapping("/api/comments/like/{commentId}")
	public Comment likeComment( @RequestHeader("Authorization") String jwt, @PathVariable Integer commentId) throws Exception
	{
		
		Users user = userService.findUserByJwt(jwt); 
		
		Comment likedComment = commentService.likeComment(commentId, user.getId());
		
		 
		return likedComment;
	}

}
