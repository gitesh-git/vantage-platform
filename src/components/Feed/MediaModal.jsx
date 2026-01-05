import React, { useEffect, useState } from 'react';
import { X, Heart, Share2, MessageCircle, Send, Trash2 } from 'lucide-react';
import { useMedia } from '../../contexts/MediaContext';
import { useAuth } from '../../contexts/AuthContext';
import './MediaModal.css';

const MediaModal = ({ item, onClose }) => {
    const { toggleLike, addComment, deletePost } = useMedia();
    const { user } = useAuth();
    const [newComment, setNewComment] = useState('');

    const isOwner = user && (user.id === item.userId || user.email === item.userId); // userId might be email in some mock data or id in others

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        addComment(item.id, newComment);
        setNewComment('');
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
            deletePost(item.id);
            onClose();
        }
    };

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Prevent scroll on body when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!item) return null;

    return (
        <div className="media-modal-backdrop" onClick={onClose}>
            <div className="media-modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-media-container">
                    {item.type === 'video' ? (
                        <video
                            src={item.thumbnail} // In this app "thumbnail" stores the base64 or url for both video/image
                            controls
                            autoPlay
                            className="modal-media"
                        />
                    ) : (
                        <img src={item.thumbnail} alt={item.title} className="modal-media" />
                    )}
                </div>

                <div className="modal-details-container">
                    <div className="modal-header">
                        <div className="modal-user-info">
                            <img src={item.userAvatar} alt={item.userName} className="modal-user-avatar" />
                            <div className="modal-user-text">
                                <span className="modal-username">{item.userName}</span>
                                <span className="modal-date">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Just now'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="modal-body">
                        <h2 className="modal-title">{item.title}</h2>
                        {item.description && <p className="modal-description">{item.description}</p>}

                        <div className="comments-section">
                            <h3>Comments</h3>
                            <div className="comments-list">
                                {item.comments && item.comments.length > 0 ? (
                                    item.comments.map(comment => (
                                        <div key={comment.id} className="comment-item">
                                            <img src={comment.userAvatar} alt={comment.userName} className="comment-avatar" />
                                            <div className="comment-content">
                                                <span className="comment-user">{comment.userName}</span>
                                                <p className="comment-text">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-comments">No comments yet. Be the first!</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <div className="modal-actions-wrapper">
                            <div className="modal-actions">
                                <button
                                    className={`modal-action-btn ${item.isLiked ? 'liked' : ''}`}
                                    onClick={() => toggleLike(item.id)}
                                >
                                    <Heart
                                        size={20}
                                        fill={item.isLiked ? "currentColor" : "none"}
                                        className={item.isLiked ? "text-red-500" : ""}
                                    />
                                    <span>{item.likes}</span>
                                </button>
                                <button className="modal-action-btn">
                                    <Share2 size={20} />
                                    <span>Share</span>
                                </button>
                            </div>

                            {isOwner && (
                                <button
                                    className="modal-action-btn delete-btn"
                                    onClick={handleDelete}
                                    title="Delete Post"
                                >
                                    <Trash2 size={20} />
                                </button>
                            )}
                        </div>

                        <form className="comment-form" onSubmit={handleCommentSubmit}>
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="comment-input"
                            />
                            <button type="submit" className="comment-submit-btn" disabled={!newComment.trim()}>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaModal;
