import React, { useState } from 'react';

const CommunityChat: React.FC = () => {
    const [minimized, setMinimized] = useState(false);

    return (
        <div className={`community-chat ${minimized ? 'minimized' : ''}`}>
            <h2>Community Chat</h2>
            <button onClick={() => setMinimized(!minimized)}>
                {minimized ? 'Maximize' : 'Minimize'}
            </button>
            {!minimized && (
                <div>
                    { }
                    <p> Chat feed</p>
                </div>
            )}
        </div>
    );
};

            
export default CommunityChat; 