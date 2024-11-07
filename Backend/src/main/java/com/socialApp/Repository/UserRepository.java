package com.socialApp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.socialApp.Modals.Users;

public interface UserRepository extends JpaRepository<Users, Integer>{

	
	public Users findByEmail(String email);
	
	@Query("select u from Users u where u.firstName LIKE %:query% OR u.lastName LIKE %:query% OR u.email LIKE %:query%")
	public List<Users> searchUser(@Param("query") String query);
}
