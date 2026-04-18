import { useState, useEffect } from 'react';
import { dishes as staticDishes } from '../data/menu';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useMenu = () => {
  const [dishes, setDishes] = useState(staticDishes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/menu`);
        if (!response.ok) throw new Error('Failed to fetch menu');
        const data = await response.json();
        
        // Merge API data with static data, prioritizing API data for same IDs
        // or just use API data if it's substantial. 
        // For "frontend only" request, we'll keep static as base and add API items.
        const merged = [...staticDishes];
        data.forEach(item => {
          if (!merged.find(d => d.id === item.id)) {
            merged.push(item);
          }
        });
        setDishes(merged);
      } catch (err) {
        console.warn('Backend menu fetch failed, using frontend data only.');
        // Don't set error since we have static fallback
      } finally {
        setLoading(false);
      }
    };

    // fetchMenu(); // Uncomment to enable backend syncing
  }, []);

  return { dishes, loading, error };
};
