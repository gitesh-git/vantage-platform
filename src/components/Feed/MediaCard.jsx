import React, { useState } from 'react';
import { Heart, Play } from 'lucide-react';
import { useMedia } from '../../contexts/MediaContext';
import './MediaCard.css';

const MediaCard = ({ item, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { toggleLike } = useMedia();

    const handleLike = (e) => {
        e.stopPropagation();
        toggleLike(item.id);
    };

    return (
        <div
            className="media-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="media-thumbnail-wrapper">
                <img src={item.thumbnail} alt={item.title} className="media-thumbnail" />

                {item.type === 'video' && (
                    <div className="video-indicator">
                        <Play fill="currentColor" size={16} />
                    </div>
                )}

                <div className={`media-overlay ${isHovered ? 'visible' : ''}`}>
                    <div className="overlay-top">
                        <div className="media-user">
                            <img src={item.userAvatar} alt={item.userName} className="user-avatar-sm" />
                            <span>{item.userName}</span>
                        </div>
                    </div>

                    <div className="overlay-bottom">
                        <h3 className="media-title">{item.title}</h3>
                        <div className="media-stats">
                            <button
                                className={`stat-btn ${item.isLiked ? 'liked' : ''}`}
                                onClick={handleLike}
                                title={item.isLiked ? "Unlike" : "Like"}
                            >
                                <Heart
                                    size={16}
                                    fill={item.isLiked ? "currentColor" : "none"}
                                    className={item.isLiked ? "text-red-500" : ""}
                                />
                                {item.likes}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaCard;
