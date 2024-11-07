package com.socialApp.Modals;

import java.time.LocalDateTime;


import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Post {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String caption;
	
	private String image;
	
	private String video;
	
	
	@ManyToOne
	private Users user;
	
	private LocalDateTime createdAt;
	
	@ManyToMany
	List<Users> liked=new ArrayList<>();
	
	@OneToMany
	private List<Comment> comments = new ArrayList<>();
	
	public Post() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	
	public Post(Integer id, String caption, String image, String video, Users user, LocalDateTime createdAt,
			List<Users> liked, List<Comment> comments) {
		super();
		this.id = id;
		this.caption = caption;
		this.image = image;
		this.video = video;
		this.user = user;
		this.createdAt = createdAt;
		this.liked = liked;
		this.comments = comments;
	}




	public List<Comment> getComments() {
		return comments;
	}




	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}




	public List<Users> getLiked() {
		return liked;
	}

	public void setLiked(List<Users> liked) {
		this.liked = liked;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCaption() {
		return caption;
	}
	public void setCaption(String caption) {
		this.caption = caption;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getVideo() {
		return video;
	}
	public void setVideo(String video) {
		this.video = video;
	}
	public Users getUser() {
		return user;
	}
	public void setUser(Users user) {
		this.user = user;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	

}
