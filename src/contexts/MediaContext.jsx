import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const MediaContext = createContext(null);

const INITIAL_POSTS = [
    {
        id: 1,
        title: "Mountain Haze",
        userName: "Alex Lens",
        userAvatar: "https://i.pravatar.cc/150?u=1",
        thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=800&fit=crop",
        likes: 124,
        type: 'photo'
    },
    {
        id: 2,
        title: "Urban Vibrance",
        userName: "Sarah Shots",
        userAvatar: "https://i.pravatar.cc/150?u=2",
        thumbnail: "https://images.unsplash.com/photo-1449824913929-2b3a3e36d4df?w=600&h=400&fit=crop",
        likes: 89,
        type: 'photo'
    },
    {
        id: 3,
        title: "Ocean Cinematic",
        userName: "Dave Motion",
        userAvatar: "https://i.pravatar.cc/150?u=3",
        thumbnail: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&h=900&fit=crop",
        likes: 256,
        type: 'video'
    },
    {
        id: 4,
        title: "Neon Nights",
        userName: "Cyber Shooter",
        userAvatar: "https://i.pravatar.cc/150?u=4",
        thumbnail: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=600&h=600&fit=crop",
        likes: 432,
        type: 'photo'
    },
    {
        id: 5,
        title: "Portrait Mood",
        userName: "Elena V",
        userAvatar: "https://i.pravatar.cc/150?u=5",
        thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop",
        likes: 187,
        type: 'photo'
    },
    {
        id: 6,
        title: "Forest Walk",
        userName: "Nature Guy",
        userAvatar: "https://i.pravatar.cc/150?u=6",
        thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
        likes: 92,
        type: 'photo',
        comments: []
    }
];

export const MediaProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        // Load posts from localStorage or use initial mock data
        const storedPosts = localStorage.getItem('ag_posts');
        if (storedPosts) {
            try {
                setPosts(JSON.parse(storedPosts));
            } catch (e) {
                console.error("Failed to parse posts from local storage", e);
                setPosts(INITIAL_POSTS);
            }
        } else {
            setPosts(INITIAL_POSTS);
        }
    }, []);

    const addPost = async (file, title, description) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64Image = reader.result;

                const newPost = {
                    id: Date.now(),
                    title,
                    description,
                    userName: user?.name || "Anonymous",
                    userAvatar: user?.avatar || "https://i.pravatar.cc/150", // Fallback avatar
                    thumbnail: base64Image,
                    likes: 0,
                    type: file.type.startsWith('video') ? 'video' : 'photo',
                    createdAt: new Date().toISOString(),
                    userId: user?.id || 'guest' // Store user ID for profile filtering
                };

                setPosts(prevPosts => {
                    const updatedPosts = [newPost, ...prevPosts];
                    // Save to local storage
                    // Limit to last 20 posts to avoid exceeding storage limits with base64 images
                    savePosts(updatedPosts);
                    return updatedPosts;
                });
                resolve(newPost);
            };
            reader.onerror = error => reject(error);
        });
    };

    const toggleLike = (postId) => {
        setPosts(prevPosts => {
            const updatedPosts = prevPosts.map(post => {
                if (post.id === postId) {
                    // Check if already liked by current session (simplified)
                    // For this simple app, we'll just toggle a boolean 'isLiked' property on the post locally
                    // and increment/decrement the count.
                    const isLiked = !!post.isLiked;
                    return {
                        ...post,
                        isLiked: !isLiked,
                        likes: isLiked ? post.likes - 1 : post.likes + 1
                    };
                }
                return post;
            });
            savePosts(updatedPosts);
            return updatedPosts;
        });
    };

    const addComment = (postId, text) => {
        setPosts(prevPosts => {
            const updatedPosts = prevPosts.map(post => {
                if (post.id === postId) {
                    const newComment = {
                        id: Date.now(),
                        text,
                        userName: user?.name || "Guest User",
                        userAvatar: user?.avatar || "https://i.pravatar.cc/150",
                        createdAt: new Date().toISOString()
                    };
                    return {
                        ...post,
                        comments: [...(post.comments || []), newComment]
                    };
                }
                return post;
            });
            savePosts(updatedPosts);
            return updatedPosts;
        });
    };

    const deletePost = (postId) => {
        setPosts(prevPosts => {
            const updatedPosts = prevPosts.filter(post => post.id !== postId);
            savePosts(updatedPosts);
            return updatedPosts;
        });
    };

    const savePosts = (postsToSave) => {
        const limitedPosts = postsToSave.slice(0, 20);
        try {
            localStorage.setItem('ag_posts', JSON.stringify(limitedPosts));
        } catch (e) {
            console.error("Storage limit reached");
        }
    };

    return (
        <MediaContext.Provider value={{ posts, addPost, toggleLike, addComment, deletePost }}>
            {children}
        </MediaContext.Provider>
    );
};

export const useMedia = () => useContext(MediaContext);
