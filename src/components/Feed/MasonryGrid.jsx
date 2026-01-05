import { useState } from 'react';
import MediaCard from './MediaCard';
import MediaModal from './MediaModal';
import './MasonryGrid.css';

const MasonryGrid = ({ items }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);

    // Find the full item object from the latest props
    // We search in the passed items array.
    // Note: If the item stops matching the filter in Home, it might disappear. 
    // Usually modal usage blocks filter usage, so this is safe.
    const selectedItem = items.find(item => item.id === selectedItemId);

    return (
        <>
            <div className="masonry-grid">
                {items.map(item => (
                    <MediaCard
                        key={item.id}
                        item={item}
                        onClick={() => setSelectedItemId(item.id)}
                    />
                ))}
            </div>

            {selectedItem && (
                <MediaModal
                    item={selectedItem}
                    onClose={() => setSelectedItemId(null)}
                />
            )}
        </>
    );
};

export default MasonryGrid;
