import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const initialFormState = {
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    image: '',
    category: 'veg',
    isVeg: true,
    rating: '4.5',
    tags: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await fetch(`${API_URL}/menu`);
      const data = await res.json();
      setMenuItems(data);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      ...item,
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags,
      originalPrice: item.originalPrice || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const res = await fetch(`${API_URL}/menu/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          console.log('Item deleted successfully');
          fetchMenu();
        } else {
          const errorData = await res.json();
          console.error('Delete failed:', errorData);
          alert('Failed to delete item: ' + (errorData.error || 'Unknown error'));
        }
      } catch (err) {
        console.error('Error deleting item:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dishData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(t => t !== '') : formData.tags,
        isVeg: formData.isVeg
      };

      const url = editingItem ? `${API_URL}/menu/${editingItem.id}` : `${API_URL}/menu`;
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dishData)
      });
      
      if (res.ok) {
        closeModal();
        fetchMenu();
      }
    } catch (err) {
      console.error('Error saving item:', err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(initialFormState);
  };

  const filteredMenu = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-brand-dark mb-2">Menu Management</h2>
          <p className="text-gray-500">Add, edit, or remove food items from your catalog.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          Add New Item
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary/50"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="p-4 font-semibold">Item</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenu.map(item => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-brand-dark">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.isVeg ? 'Vegetarian' : 'Non-Veg'}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 capitalize">{item.category}</td>
                  <td className="p-4 font-bold text-brand-primary">₹{item.price}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-2 text-gray-400 hover:text-brand-primary bg-white rounded-lg border border-gray-100 hover:border-brand-primary/30 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 bg-white rounded-lg border border-gray-100 hover:border-red-500/30 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMenu.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">No items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Modal (Add/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-brand-dark">
                {editingItem ? 'Edit Dish' : 'Add New Dish'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Dish Name</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-primary/50 focus:outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-primary/50 focus:outline-none">
                    <option value="veg">Veg Menu</option>
                    <option value="non-veg">Non-Veg Menu</option>
                    <option value="sweets">Sweets</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea required name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-primary/50 focus:outline-none"></textarea>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                  <input required name="price" value={formData.price} onChange={handleInputChange} type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-primary/50 focus:outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Original Price (optional)</label>
                  <input name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-primary/50 focus:outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                  <input required name="image" value={formData.image} onChange={handleInputChange} type="url" placeholder="https://..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-primary/50 focus:outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tags (comma separated)</label>
                  <input name="tags" value={formData.tags} onChange={handleInputChange} type="text" placeholder="Bestseller, Spicy" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-primary/50 focus:outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1 flex items-center mt-8 gap-3">
                  <input type="checkbox" name="isVeg" id="isVeg" checked={formData.isVeg} onChange={handleInputChange} className="w-5 h-5 accent-brand-primary rounded" />
                  <label htmlFor="isVeg" className="font-bold text-gray-700">Is Vegetarian?</label>
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button type="button" onClick={closeModal} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl">Cancel</button>
                <button type="submit" className="px-6 py-3 font-bold text-white bg-brand-primary hover:bg-orange-600 rounded-xl">
                  {editingItem ? 'Update Item' : 'Save Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
