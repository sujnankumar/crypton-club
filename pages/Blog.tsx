import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import TerminalCard from '../components/TerminalCard';
import Modal from '../components/Modal';
import { Hash, ChevronRight, Plus, Edit, Trash2 } from 'lucide-react';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useData();
  const { isAuthenticated } = useAuth();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({});
  const [tagsInput, setTagsInput] = useState('');

  const handleOpenModal = (e?: React.MouseEvent, post?: BlogPost) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (post) {
      setEditingPost(post);
      setFormData(post);
      setTagsInput(post.tags.join(', '));
    } else {
      setEditingPost(null);
      setFormData({
        date: new Date().toISOString().split('T')[0]
      });
      setTagsInput('');
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    if (editingPost) {
      updateBlogPost({ ...editingPost, ...formData, tags: tagsArray } as BlogPost);
    } else {
      addBlogPost({ 
        ...formData, 
        id: Date.now().toString(),
        tags: tagsArray 
      } as BlogPost);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    // Use setTimeout to ensure window.confirm doesn't block the event loop prematurely
    setTimeout(() => {
        if (window.confirm('Are you sure you want to delete this intel report?')) {
            console.log("Confirmed delete for blog:", id);
            deleteBlogPost(id);
        }
    }, 10);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
              <span className="text-cyber-neon">./</span>intel
          </h1>
          <p className="text-gray-400">Write-ups, tutorials, and club news.</p>
        </div>
        
        {isAuthenticated && (
            <button 
                type="button"
                onClick={(e) => handleOpenModal(e)}
                className="bg-cyber-neon text-black px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-white transition-colors"
            >
                <Plus size={18} /> New Entry
            </button>
        )}
      </div>

      <div className="space-y-8">
        {blogPosts.length === 0 && (
            <div className="text-center py-20 text-gray-500 border border-dashed border-gray-800 rounded">
                No intel found. Database empty.
            </div>
        )}

        {blogPosts.map((post) => (
          <TerminalCard 
            key={post.id} 
            title={`${post.date}_log.txt`} 
            className="group"
            actions={isAuthenticated && (
                <div className="flex gap-2">
                    <button 
                        type="button"
                        onClick={(e) => handleOpenModal(e, post)} 
                        className="p-1 text-blue-400 hover:text-white transition-colors"
                    >
                        <Edit size={14} className="pointer-events-none" />
                    </button>
                    <button 
                        type="button"
                        onClick={(e) => handleDelete(e, post.id)} 
                        className="p-1 text-red-400 hover:text-white transition-colors"
                    >
                        <Trash2 size={14} className="pointer-events-none" />
                    </button>
                </div>
            )}
          >
            <article>
              <Link to={`/blog/${post.id}`}>
                <h2 className="text-2xl font-bold text-white group-hover:text-cyber-neon cursor-pointer transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>
              
              <div className="flex gap-4 text-xs text-gray-500 mb-4 font-mono">
                 <span>AUTHOR: {post.author?.toUpperCase()}</span>
                 <span>DATE: {post.date}</span>
              </div>

              <div className="flex gap-2 mb-4">
                {post.tags.map(tag => (
                    <span key={tag} className="flex items-center text-xs bg-cyber-dim/30 text-cyber-neon px-2 py-1 rounded">
                        <Hash size={10} className="mr-1"/> {tag}
                    </span>
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <Link 
                to={`/blog/${post.id}`}
                className="inline-flex items-center text-cyber-neon text-sm hover:underline hover:text-white transition-colors"
              >
                Read full entry <ChevronRight size={14} className="ml-1" />
              </Link>
            </article>
          </TerminalCard>
        ))}
      </div>

      {/* Admin Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingPost ? "EDIT_INTEL.EXE" : "NEW_INTEL.EXE"}
      >
          <form onSubmit={handleSave} className="space-y-4">
              <div>
                  <label className="text-xs font-mono text-gray-500">TITLE</label>
                  <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                    value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="text-xs font-mono text-gray-500">AUTHOR</label>
                      <input required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                        value={formData.author || ''} onChange={e => setFormData({...formData, author: e.target.value})} />
                  </div>
                  <div>
                      <label className="text-xs font-mono text-gray-500">DATE</label>
                      <input type="date" required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                        value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">TAGS (Comma separated)</label>
                  <input className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none" 
                    placeholder="CTF, Web Security, Tutorial"
                    value={tagsInput} onChange={e => setTagsInput(e.target.value)} />
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">EXCERPT (Short summary)</label>
                  <textarea required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none h-20" 
                    value={formData.excerpt || ''} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
              </div>
              <div>
                  <label className="text-xs font-mono text-gray-500">CONTENT (Markdown Supported)</label>
                  <textarea required className="w-full bg-black border border-gray-700 p-2 text-white rounded focus:border-cyber-neon outline-none h-64 font-mono text-sm" 
                    value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} />
              </div>
              
              <button type="submit" className="w-full bg-cyber-neon text-black font-bold py-3 rounded mt-4 hover:bg-white transition-colors">
                  SAVE_INTEL
              </button>
          </form>
      </Modal>
    </div>
  );
};

export default Blog;