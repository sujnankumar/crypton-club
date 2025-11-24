import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, Member, Achievement, BlogPost } from '../types';
import { EVENTS as INITIAL_EVENTS } from '../data/events';
import { MEMBERS as INITIAL_MEMBERS } from '../data/members';
import { ACHIEVEMENTS as INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { BLOG_POSTS as INITIAL_BLOG_POSTS } from '../data/blog';

interface DataContextType {
  events: Event[];
  members: Member[];
  achievements: Achievement[];
  blogPosts: BlogPost[];
  
  addEvent: (item: Event) => void;
  updateEvent: (item: Event) => void;
  deleteEvent: (id: string) => void;
  
  addMember: (item: Member) => void;
  updateMember: (item: Member) => void;
  deleteMember: (id: string) => void;
  
  addAchievement: (item: Achievement) => void;
  updateAchievement: (item: Achievement) => void;
  deleteAchievement: (id: string) => void;

  addBlogPost: (item: BlogPost) => void;
  updateBlogPost: (item: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or fall back to static data
  const [events, setEvents] = useState<Event[]>(() => {
    try {
      const saved = localStorage.getItem('crypton_events');
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch (e) { return INITIAL_EVENTS; }
  });

  const [members, setMembers] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem('crypton_members');
      return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
    } catch (e) { return INITIAL_MEMBERS; }
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem('crypton_achievements');
      return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
    } catch (e) { return INITIAL_ACHIEVEMENTS; }
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('crypton_blog');
      return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
    } catch (e) { return INITIAL_BLOG_POSTS; }
  });

  // Persist changes to LocalStorage
  useEffect(() => { localStorage.setItem('crypton_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('crypton_members', JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem('crypton_achievements', JSON.stringify(achievements)); }, [achievements]);
  useEffect(() => { localStorage.setItem('crypton_blog', JSON.stringify(blogPosts)); }, [blogPosts]);

  // Event Actions
  const addEvent = (item: Event) => setEvents(prev => [...prev, item]);
  const updateEvent = (item: Event) => setEvents(prev => prev.map(i => i.id === item.id ? item : i));
  const deleteEvent = (id: string) => {
    console.log('Deleting Event:', id);
    setEvents(prev => prev.filter(i => String(i.id) !== String(id)));
  };

  // Member Actions
  const addMember = (item: Member) => setMembers(prev => [...prev, item]);
  const updateMember = (item: Member) => setMembers(prev => prev.map(i => i.id === item.id ? item : i));
  const deleteMember = (id: string) => {
    console.log('Deleting Member:', id);
    setMembers(prev => prev.filter(i => String(i.id) !== String(id)));
  };

  // Achievement Actions
  const addAchievement = (item: Achievement) => setAchievements(prev => [...prev, item]);
  const updateAchievement = (item: Achievement) => setAchievements(prev => prev.map(i => i.id === item.id ? item : i));
  const deleteAchievement = (id: string) => {
    console.log('Deleting Achievement:', id);
    setAchievements(prev => prev.filter(i => String(i.id) !== String(id)));
  };

  // Blog Actions
  const addBlogPost = (item: BlogPost) => setBlogPosts(prev => [item, ...prev]); 
  const updateBlogPost = (item: BlogPost) => setBlogPosts(prev => prev.map(i => i.id === item.id ? item : i));
  const deleteBlogPost = (id: string) => {
    console.log('Deleting Blog:', id);
    setBlogPosts(prev => prev.filter(i => String(i.id) !== String(id)));
  };

  return (
    <DataContext.Provider value={{
      events, addEvent, updateEvent, deleteEvent,
      members, addMember, updateMember, deleteMember,
      achievements, addAchievement, updateAchievement, deleteAchievement,
      blogPosts, addBlogPost, updateBlogPost, deleteBlogPost
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};