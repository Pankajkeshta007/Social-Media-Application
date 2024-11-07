package com.socialApp.Service;

import java.util.List;

import com.socialApp.Exception.UserException;
import com.socialApp.Modals.Users;

public interface UserService {
	
	public Users registerUser(Users user);
	
	public Users findUserById(Integer userId) throws UserException;
	
	public Users findUserByEmail(String email);
	
	public Users followUser(Integer userId1, Integer userId2) throws UserException ;
	
	public List<Users> searchUser(String query);
	
	public Users updateUser(Users user ,Integer userId) throws UserException;
	
	public Users findUserByJwt(String jwt);
	
	
	
	
	

}
