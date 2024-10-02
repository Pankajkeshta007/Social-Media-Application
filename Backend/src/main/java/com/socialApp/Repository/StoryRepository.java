package com.socialApp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.socialApp.Modals.Story;

public interface StoryRepository extends JpaRepository<Story, Integer> {
	
	List<Story> findByUserId(Integer userId);
	

}
