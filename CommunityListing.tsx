import React from 'react';
import { CommunityCard } from '../../components/communities/CommunityCard';
import { COMMUNITIES } from '../../constants/communities';

export const CommunityListing: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Communities</h1>
        <p className="text-gray-600 mt-2">Support initiatives from your alumni, church, or associations.</p>
        
        <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
          {['All', 'School Alumni', 'Church Groups', 'Professional Associations'].map((cat) => (
            <button key={cat} className="px-4 py-2 rounded-full border border-gray-200 text-sm whitespace-nowrap hover:bg-gray-50">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COMMUNITIES.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
};