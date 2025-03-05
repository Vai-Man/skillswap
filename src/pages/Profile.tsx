import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Plus, X } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface UserSkill {
  id: string;
  skill_id: string;
  skill_type: 'offering' | 'seeking';
  proficiency_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  skill: Skill;
}

export function Profile() {
  const { user } = useAuth();
  const [teachSkills, setTeachSkills] = useState<UserSkill[]>([]);
  const [learnSkills, setLearnSkills] = useState<UserSkill[]>([]);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: '',
    type: 'offering',
    proficiency: 'intermediate'
  });

  useEffect(() => {
    if (user) {
      fetchUserSkills();
    }
  }, [user]);

  const fetchUserSkills = async () => {
    const { data: teachingData } = await supabase
      .from('user_skills')
      .select(`
        id,
        skill_id,
        skill_type,
        proficiency_level,
        skill:skills (*)
      `)
      .eq('user_id', user?.id)
      .eq('skill_type', 'offering');

    const { data: learningData } = await supabase
      .from('user_skills')
      .select(`
        id,
        skill_id,
        skill_type,
        proficiency_level,
        skill:skills (*)
      `)
      .eq('user_id', user?.id)
      .eq('skill_type', 'seeking');

    if (teachingData) setTeachSkills(teachingData as UserSkill[]);
    if (learningData) setLearnSkills(learningData as UserSkill[]);
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // First, create or get the skill
    const { data: skillData, error: skillError } = await supabase
      .from('skills')
      .select('id')
      .eq('name', newSkill.name)
      .eq('category', newSkill.category)
      .single();

    let skillId;
    if (!skillData) {
      const { data: newSkillData } = await supabase
        .from('skills')
        .insert({ name: newSkill.name, category: newSkill.category })
        .select('id')
        .single();
      skillId = newSkillData?.id;
    } else {
      skillId = skillData.id;
    }

    // Then create the user_skill connection
    if (skillId) {
      await supabase
        .from('user_skills')
        .insert({
          user_id: user?.id,
          skill_id: skillId,
          skill_type: newSkill.type,
          proficiency_level: newSkill.proficiency
        });

      setShowAddSkillModal(false);
      setNewSkill({
        name: '',
        category: '',
        type: 'offering',
        proficiency: 'intermediate'
      });
      fetchUserSkills();
    }
  };

  const handleRemoveSkill = async (skillId: string) => {
    await supabase
      .from('user_skills')
      .delete()
      .eq('id', skillId);
    
    fetchUserSkills();
  };

  return (
    <div className="space-y-6">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      </header>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-6">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-2xl text-indigo-600">
                {user?.email?.[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user?.email}</h2>
              <p className="text-gray-500">Member since {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Skills I Can Teach</h2>
            <button
              onClick={() => {
                setNewSkill(prev => ({ ...prev, type: 'offering' }));
                setShowAddSkillModal(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Skill</span>
            </button>
          </div>
          <div className="space-y-3">
            {teachSkills.length === 0 ? (
              <p className="text-gray-500">No skills added yet</p>
            ) : (
              teachSkills.map(skill => (
                <div key={skill.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{skill.skill.name}</p>
                    <p className="text-sm text-gray-500">{skill.skill.category}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Skills I Want to Learn</h2>
            <button
              onClick={() => {
                setNewSkill(prev => ({ ...prev, type: 'seeking' }));
                setShowAddSkillModal(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Skill</span>
            </button>
          </div>
          <div className="space-y-3">
            {learnSkills.length === 0 ? (
              <p className="text-gray-500">No skills added yet</p>
            ) : (
              learnSkills.map(skill => (
                <div key={skill.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{skill.skill.name}</p>
                    <p className="text-sm text-gray-500">{skill.skill.category}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Skill</h3>
              <button onClick={() => setShowAddSkillModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={newSkill.category}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Proficiency Level</label>
                <select
                  value={newSkill.proficiency}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, proficiency: e.target.value as any }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddSkillModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}