package com.socialApp.Request;

import com.socialApp.Modals.Users;


import lombok.Data;

@Data
public class CreateChatRequest {
	
	
	
	private Integer userId;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public CreateChatRequest(Integer userId) {
		super();
		this.userId = userId;
	}
	
	public CreateChatRequest() {
		// TODO Auto-generated constructor stub
	}
	

}
