import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Community } from '../../types/community';
import { Users, Megaphone, Landmark, MapPin } from 'lucide-react';

interface CommunityCardProps {
  community: Community;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/communities/${community.id}`)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider">
          {community.category}
        </span>
        <div className="flex items-center text-gray-400 group-hover:text-blue-600 transition-colors">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{community.region}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-6 line-clamp-2 h-14">
        {community.name}
      </h3>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center">
          <div className="flex justify-center text-blue-600 mb-1"><Users size={18} /></div>
          <p className="text-sm font-bold text-gray-900">{community.memberCount}</p>
          <p className="text-[10px] text-gray-500 uppercase">Members</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center text-blue-600 mb-1"><Megaphone size={18} /></div>
          <p className="text-sm font-bold text-gray-900">{community.campaignCount}</p>
          <p className="text-[10px] text-gray-500 uppercase">Campaigns</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center text-blue-600 mb-1"><Landmark size={18} /></div>
          <p className="text-sm font-bold text-gray-900 truncate">{community.raisedAmount.split(' ')[1]}</p>
          <p className="text-[10px] text-gray-500 uppercase">Raised</p>
        </div>
      </div>

      <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold group-hover:bg-blue-700 transition-colors">
        View Campaigns
      </button>
    </div>
  );
};