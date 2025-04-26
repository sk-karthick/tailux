
import { useEffect, useState } from 'react';

export function useRecentlyViewedProducts() {
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        const fetchRecentlyViewed = async () => {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (!user?.id) return;

            try {
                const res = await fetch(`/api/get-recently-viewed?userId=${user.id}`);
                const data = await res.json();
                setRecentlyViewed(data);
            } catch (error) {
                console.error('Failed to fetch recently viewed products:', error);
            }
        };

        fetchRecentlyViewed();
    }, []);

    return recentlyViewed;
}
