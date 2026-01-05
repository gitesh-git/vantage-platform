import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, X, Image as ImageIcon, Film } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMedia } from '../contexts/MediaContext';
import './Upload.css';

const Upload = () => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addPost } = useMedia();

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
        if (validTypes.includes(file.type)) {
            setFile(file);
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else {
            alert("Only images and MP4 videos are allowed");
        }
    };

    const clearFile = () => {
        setFile(null);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !title) return;

        setLoading(true);

        try {
            await addPost(file, title, description);
            navigate('/');
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-page">
            <div className="upload-container">
                <div className="upload-header">
                    <h1>Upload New Work</h1>
                    <p>Share your latest creation with the community</p>
                </div>

                <form onSubmit={handleSubmit} className="upload-form">
                    <div
                        className={`drop-zone ${dragActive ? 'active' : ''} ${preview ? 'has-file' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => !preview && inputRef.current.click()}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            className="file-input"
                            onChange={handleChange}
                            accept="image/*,video/mp4"
                        />

                        {preview ? (
                            <div className="preview-container">
                                {file.type.startsWith('video') ? (
                                    <video src={preview} controls className="file-preview" />
                                ) : (
                                    <img src={preview} alt="Preview" className="file-preview" />
                                )}
                                <button type="button" className="remove-btn" onClick={(e) => { e.stopPropagation(); clearFile(); }}>
                                    <X size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="upload-placeholder">
                                <div className="upload-icon-wrapper">
                                    <UploadIcon size={32} />
                                </div>
                                <h3>Drag and drop your file here</h3>
                                <p>or click to browse from your computer</p>
                                <div className="supported-types">
                                    <span><ImageIcon size={14} /> JPG, PNG</span>
                                    <span><Film size={14} /> MP4</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="form-fields">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Give your work a name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description (Optional)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Tell the story behind this shot..."
                                rows={4}
                            />
                        </div>

                        <button type="submit" className="submit-btn" disabled={!file || loading}>
                            {loading ? 'Uploading...' : 'Publish Work'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Upload;
