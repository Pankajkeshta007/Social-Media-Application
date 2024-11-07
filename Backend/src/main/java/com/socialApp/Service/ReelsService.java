package com.socialApp.Service;

import java.util.List;




import com.socialApp.Modals.Reels;
import com.socialApp.Modals.Users;


public interface ReelsService {
	
	public Reels createReel(Reels reel, Users user);
	
	public List<Reels> findAllReels();
	
	public List<Reels> findUserReel(Integer userId) throws Exception;

}
