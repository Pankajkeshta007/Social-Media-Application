
package com.socialApp.Controller;

//import java.util.ArrayList;
import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.socialApp.Exception.UserException;
import com.socialApp.Modals.Users;
import com.socialApp.Repository.UserRepository;
import com.socialApp.Service.UserService;

//import jakarta.transaction.Transactional;

@RestController
public class UserController {
	
	
	

	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserService userService;
	

	
	@GetMapping("/api/users")
	public List<Users> getUsers() {
	 List<Users> users=userRepository.findAll();
	 
	 return users;
		
		
	}
	
	@GetMapping("/api/users/{userId}")
	public Users getUserById( @PathVariable("userId") Integer id) throws UserException {
		
		Users user=userService.findUserById(id);
		
		return user;
		
		
	
		
		
		
	
	}
//	@DeleteMapping("/users/{userId}")
//	public String deleteUser(@PathVariable Integer userId) throws Exception {
//		
//		
//		Optional<Users> user=userRepository.findById(userId);
//		
//	if(user.isEmpty())
//	{
//		throw new Exception("user not exists with id "+userId);
//	}
//	
//		userRepository.delete(user.get());
//		return "User deleted successfully with id "+userId;
//	}
//	

	@PutMapping("/api/users/follow/{userId2}")
	public Users followUserHandler( @RequestHeader("Authorization") String jwt, @PathVariable Integer userId2) throws UserException {
		
		
		Users reqUser = userService.findUserByJwt(jwt);
		
		Users user = userService.followUser(reqUser.getId(), userId2);
		return user;
		
	}
	
	
	
	
	@PutMapping("/api/users")
	public Users updateUser(@RequestBody Users users, @RequestHeader("Authorization") String jwt) throws UserException {
		
		Users reqUser = userService.findUserByJwt(jwt);
		
		Users updatedUser = userService.updateUser(users, reqUser.getId());
		return updatedUser;
		
		
	}
	
	@GetMapping("/api/users/search")
	public List<Users> searchUser(@RequestParam("query") String query) {
		
		List<Users> users = userService.searchUser(query);
		
		return users;
	}
	
	
	@GetMapping("/api/users/profile")
	public Users getTokenFromUser(@RequestHeader("Authorization") String jwt) {
		
//		System.out.println("jwt----"+jwt);
		
		Users user = userService.findUserByJwt(jwt);
		
		user.setPassword(null);
		
		return user;
	}

}
