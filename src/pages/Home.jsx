import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MasonryGrid from '../components/Feed/MasonryGrid';
import { useMedia } from '../contexts/MediaContext';
import './Home.css';



const Home = () => {
    const { posts } = useMedia();
    const [filter, setFilter] = useState('all');
    const feedRef = useRef(null);

    // Filter posts based on selection
    const filteredPosts = posts.filter(post => {
        if (filter === 'all') return true;

        // Ensure consistency with 'photo' vs 'image' vs 'video' types
        // The data uses 'photo' and 'video'. 
        // We'll map 'photography' UI choice to 'photo' data type.
        const targetType = filter === 'photography' ? 'photo' : 'video';
        return post.type === targetType;
    });

    const handleExploreClick = () => {
        setFilter('all');
        feedRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-background">
                    <img
                        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
                        alt="Photographer background"
                        className="hero-bg-image"
                    />
                    <div className="hero-overlay"></div>
                </div>

                <div className="hero-content">
                    <h1 className="hero-title">
                        Capture Content.<br />
                        Create Impact.
                    </h1>
                    <p className="hero-subtitle">
                        The premium platform for photographers and videographers to showcase their best work without distractions.
                    </p>
                    <div className="hero-actions">
                        <button onClick={handleExploreClick} className="btn btn-primary">
                            Explore Feed
                        </button>
                        <Link to="/upload" className="btn btn-secondary">
                            Start Uploading <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="feed-section" ref={feedRef}>
                <div className="feed-header">
                    <h2>Latest Perspectives</h2>
                    <div className="feed-filters">
                        <button
                            className={filter === 'all' ? 'active' : ''}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={filter === 'photography' ? 'active' : ''}
                            onClick={() => setFilter('photography')}
                        >
                            Photography
                        </button>
                        <button
                            className={filter === 'video' ? 'active' : ''}
                            onClick={() => setFilter('video')}
                        >
                            Video
                        </button>
                    </div>
                </div>

                <MasonryGrid items={filteredPosts} />
            </section>
        </div>
    );
};


export default Home;
