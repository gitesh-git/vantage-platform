import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMedia } from '../contexts/MediaContext';
import MasonryGrid from '../components/Feed/MasonryGrid';
import { Settings, MapPin, Link as LinkIcon, Grid, Bookmark } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('posts');
    const [userPosts, setUserPosts] = useState([]);

    const { posts } = useMedia();

    // Filter posts for the current user
    // For the demo, since initial posts don't have IDs, we can optionally associate them with the user if we want,
    // or just show the ones that *do* match.
    // If we want to show everything for the demo user if they are the "owner" of the site:
    // But logically, profile should show YOUR posts.
    // Newly added posts have `userId`.
    useEffect(() => {
        if (user) {
            const myPosts = posts.filter(post => post.userId === user.id);
            setUserPosts(myPosts);
        }
    }, [user, posts]);

    if (!user) return <div className="profile-loading">Please login to view profile</div>;

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-cover"></div>
                <div className="profile-info-container">
                    <div className="profile-avatar-wrapper">
                        <img src={user.avatar} alt={user.name} className="profile-avatar" />
                    </div>

                    <div className="profile-details">
                        <div className="profile-top">
                            <h1 className="profile-name">{user.name}</h1>
                            <button className="edit-profile-btn">
                                <Settings size={18} /> Edit Profile
                            </button>
                        </div>

                        <div className="profile-stats">
                            <span><strong>24</strong> Posts</span>
                            <span><strong>1.2k</strong> Followers</span>
                            <span><strong>480</strong> Following</span>
                        </div>

                        <div className="profile-bio">
                            <p>Visual Storyteller. Capturing moments that matter.</p>
                            <div className="profile-links">
                                <span><MapPin size={14} /> Los Angeles, CA</span>
                                <span><LinkIcon size={14} /> portfolio.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-content">
                <div className="profile-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('posts')}
                    >
                        <Grid size={18} /> Posts
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
                        onClick={() => setActiveTab('saved')}
                    >
                        <Bookmark size={18} /> Saved
                    </button>
                </div>

                <div className="profile-grid-wrapper">
                    <MasonryGrid items={userPosts} />
                </div>
            </div>
        </div>
    );
};

export default Profile;
