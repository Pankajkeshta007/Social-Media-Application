import React from "react";
import Modal from "@mui/material/Modal";
import './story.css';

const StoryCard = ({ story, onClose }) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="Story-Card-Styling" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400 }}>
        <img src={story.image} alt={story.captions} style={{ width: "100%" }} />
        <p>{story.captions}</p>
      </div>
    </Modal>
  );
};

export default StoryCard;
