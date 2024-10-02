package com.socialApp.Service;

import java.util.List;

import com.socialApp.Modals.Reels;
import com.socialApp.Modals.Story;
import com.socialApp.Modals.Users;

public interface StoryService {
	
	public Story createStory(Story story, Users user);
	
	public List<Story> findStoryByUserId(Integer userId) throws Exception;
	
	public List<Story> findAllStories();
	

}
