package com.socialApp.Service;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.socialApp.Config.JwtProvider;
import com.socialApp.Exception.UserException;
import com.socialApp.Modals.Users;
import com.socialApp.Repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {
	
	@Autowired
	UserRepository userRepository;

	@Override
	public Users registerUser(Users user) {
		Users newUser= new Users();
		newUser.setEmail(user.getEmail());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setGender(user.getGender());
		newUser.setPassword(user.getPassword());
		newUser.setId(user.getId());
		
		
		Users userSaved= userRepository.save(newUser);
		return userSaved;
	}

	@Override
	public Users findUserById(Integer userId) throws UserException {
		
    Optional<Users> user=userRepository.findById(userId);
		
		if(user.isPresent()) {
			
			return user.get();
		}
		
		throw new UserException("User not exists with userid "+userId);
	}

	@Override
	public Users findUserByEmail(String email) {
		Users user = userRepository.findByEmail(email);
		return user;
	}

	@Override
	public Users followUser(Integer reqUserId, Integer userId2) throws UserException  {
	Users reqUser = findUserById(reqUserId);
	Users user2 = findUserById(userId2);
	
	user2.getFollowers().add(reqUser.getId());
	reqUser.getFollowings().add(user2.getId());
	userRepository.save(reqUser);
	userRepository.save(user2);
	
	
		return reqUser;
	}

	@Override
	public List<Users> searchUser(String query) {
		
		return userRepository.searchUser(query);
	}

	@Override
	public Users updateUser(Users user , Integer userId) throws UserException {
		Optional<Users> user1=userRepository.findById(userId);
		
		if(user1.isEmpty())
		{
			throw new UserException("user not exists with id "+userId);
		}
		
		Users oldUser=user1.get();
		
		if(user.getFirstName()!=null) {
			oldUser.setFirstName(user.getFirstName());
		}
		
		if(user.getLastName()!=null)
		{
			oldUser.setLastName(user.getLastName());
		}
		
		if(user.getEmail()!=null)
		{
			oldUser.setEmail(user.getEmail());
			
		}
		
		if(user.getPassword()!=null) {
			oldUser.setPassword(user.getPassword());
		}
		
		if(user.getGender()!=null) {
			oldUser.setGender(user.getGender());
		}
		Users updatedUser = userRepository.save(oldUser);
		
		return updatedUser;
	}

	@Override
	public Users findUserByJwt(String jwt) {
		String email = JwtProvider.getEmailFromJwtToken(jwt);
		
		Users user = userRepository.findByEmail(email);
		
		return user ;
	}

}
