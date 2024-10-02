package com.socialApp.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.socialApp.Modals.Story;
import com.socialApp.Modals.Users;
import com.socialApp.Repository.StoryRepository;

@Service
public class StoryServiceImplementation  implements StoryService{
	
	@Autowired
	private StoryRepository storyRepository;
	
	@Autowired
	private UserService userService;
	

	@Override
	public Story createStory(Story story, Users user) {
		Story createdStory= new Story();
		
		createdStory.setImage(story.getImage());
		createdStory.setCaptions(story.getCaptions());
		createdStory.setUser(user);
		createdStory.setTimestamp(LocalDateTime.now());
		
		return storyRepository.save(createdStory);
	}

	@Override
	public List<Story> findStoryByUserId(Integer userId) throws Exception {
	Users user = userService.findUserById(userId);
	
		return storyRepository.findByUserId(userId);
	}

	@Override
	public List<Story> findAllStories() {
		
		return   storyRepository.findAll();
	}

}
