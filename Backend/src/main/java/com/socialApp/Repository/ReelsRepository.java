package com.socialApp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.socialApp.Modals.Reels;

public interface ReelsRepository extends JpaRepository<Reels, Integer> {
	
	public List<Reels> findByUserId(Integer userId);

}
