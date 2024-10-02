package com.socialApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.socialApp.Config.JwtProvider;
import com.socialApp.Modals.Users;
import com.socialApp.Repository.UserRepository;
import com.socialApp.Request.LoginRequest;
import com.socialApp.Response.AuthResponse;
import com.socialApp.Service.CustomUserDetailsService;
import com.socialApp.Service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	CustomUserDetailsService customUserDetailsService;
	
	@PostMapping("/signup")
	public AuthResponse createUser(@RequestBody Users user) throws Exception {
		
		Users isExist = userRepository.findByEmail(user.getEmail());
		
		if(isExist!=null) {
			throw new Exception("This email is already use with another account");
		}
		
		Users newUser= new Users();
		newUser.setEmail(user.getEmail());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
		newUser.setId(user.getId());
		
		
		Users userSaved= userRepository.save(newUser);
		
		
		Authentication authentication = new UsernamePasswordAuthenticationToken(userSaved.getEmail(), userSaved.getPassword());
		String token=JwtProvider.generateToken(authentication);
		
		AuthResponse res = new AuthResponse(token, "Register Successful");
		return res;
	}
	
	
	@PostMapping("/signin")
	public AuthResponse signin(@RequestBody LoginRequest loginRequest) {
		
		
		Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());
		
		String token=JwtProvider.generateToken(authentication);
		
		AuthResponse res = new AuthResponse(token, "Login Successful");
		return res;
	}


	private Authentication authenticate(String email, String password) {
		UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
		
		if(userDetails==null) {
			throw new BadCredentialsException("invalid username");
		}
		
		if(!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("invalid password ");
		}
		return new  UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
		
	}

}
