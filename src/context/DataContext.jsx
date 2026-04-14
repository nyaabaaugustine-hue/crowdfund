import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CAMPAIGNS, TRANSACTIONS, PLATFORM_STATS, AI_IMPROVED_STORIES } from '../data/seed';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [campaigns, setCampaigns] = useState(() => {
    try {
      const saved = localStorage.getItem('nkabom_campaigns');
      return saved ? JSON.parse(saved) : CAMPAIGNS;
    } catch { return CAMPAIGNS; }
  });

  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('nkabom_transactions');
      return saved ? JSON.parse(saved) : TRANSACTIONS;
    } catch { return TRANSACTIONS; }
  });

  const [notifications, setNotifications] = useState([]);

  // Persist changes
  useEffect(() => {
    localStorage.setItem('nkabom_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('nkabom_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Simulate live donations every 30s
  useEffect(() => {
    const ghanaianNames = ['Kwame A.','Abena S.','Kofi P.','Ama B.','Yaw D.','Akosua F.','Kweku G.','Efua H.','Nana J.','Anonymous'];
    const amounts = [50, 100, 150, 200, 300, 500];

    const tick = () => {
      const approved = campaigns.filter(c => c.status === 'approved');
      if (!approved.length) return;
      const camp = approved[Math.floor(Math.random() * approved.length)];
      const amt = amounts[Math.floor(Math.random() * amounts.length)];
      const donor = ghanaianNames[Math.floor(Math.random() * ghanaianNames.length)];

      setCampaigns(prev => prev.map(c =>
        c.id === camp.id
          ? { ...c, raised: c.raised + amt, donorCount: c.donorCount + 1,
              donors: [{ name: donor, amount: amt, date: new Date().toISOString().split('T')[0], message: '' }, ...c.donors] }
          : c
      ));

      setNotifications(prev => [{
        id: Date.now(),
        text: `${donor} just donated ₵${amt} to "${camp.title.substring(0,30)}..."`,
        time: 'just now',
      }, ...prev.slice(0,4)]);
    };

    const interval = setInterval(tick, 18000);
    return () => clearInterval(interval);
  }, [campaigns]);

  // Campaign CRUD operations
  const donate = useCallback((campaignId, amount, donorName, method) => {
    const txn = {
      id: `txn-${Date.now()}`,
      campaignId,
      donor: donorName || 'Anonymous',
      amount: Number(amount),
      method,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
    };

    setCampaigns(prev => prev.map(c =>
      c.id === campaignId
        ? {
            ...c,
            raised: c.raised + Number(amount),
            donorCount: c.donorCount + 1,
            donors: [{ name: donorName || 'Anonymous', amount: Number(amount), date: txn.date, message: '' }, ...c.donors],
          }
        : c
    ));

    setTransactions(prev => [txn, ...prev]);
    return txn;
  }, []);

  const approveCampaign = useCallback((id) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' } : c));
  }, []);

  const rejectCampaign = useCallback((id) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' } : c));
  }, []);

  const flagCampaign = useCallback((id) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'flagged' } : c));
  }, []);

  const createCampaign = useCallback((data) => {
    const newCamp = {
      id: `camp-${Date.now()}`,
      status: 'pending',
      raised: 0,
      donorCount: 0,
      donors: [],
      updates: [],
      daysLeft: 30,
      featured: false,
      verified: false,
      createdAt: new Date().toISOString().split('T')[0],
      ...data,
    };
    setCampaigns(prev => [newCamp, ...prev]);
    return newCamp;
  }, []);

  const updateCampaign = useCallback((id, updates) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteCampaign = useCallback((id) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  }, []);

  const addCampaign = useCallback((campaign) => {
    const newCamp = {
      id: campaign.id || `camp-${Date.now()}`,
      status: campaign.status || 'pending',
      raised: campaign.raised || 0,
      donorCount: campaign.donorCount || 0,
      donors: campaign.donors || [],
      updates: campaign.updates || [],
      daysLeft: campaign.daysLeft || 30,
      featured: campaign.featured || false,
      verified: campaign.verified || false,
      createdAt: campaign.createdAt || new Date().toISOString().split('T')[0],
      ...campaign,
    };
    setCampaigns(prev => [newCamp, ...prev]);
    return newCamp;
  }, []);

  const improveStory = useCallback((campaignId) => {
    const improved = AI_IMPROVED_STORIES[campaignId];
    if (improved) {
      setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, story: improved } : c));
      return true;
    }
    return false;
  }, []);

  const getCampaignById = useCallback((id) => campaigns.find(c => c.id === id), [campaigns]);

  // Transaction operations
  const addTransaction = useCallback((txn) => {
    setTransactions(prev => [{
      id: txn.id || `txn-${Date.now()}`,
      campaignId: txn.campaignId,
      donor: txn.donor || 'Anonymous',
      amount: Number(txn.amount),
      method: txn.method || 'Card',
      date: txn.date || new Date().toISOString().split('T')[0],
      status: txn.status || 'completed',
      ...txn,
    }, ...prev]);
  }, []);

  const getTransactionsByCampaign = useCallback((campaignId) => {
    return transactions.filter(t => t.campaignId === campaignId);
  }, [transactions]);

  const getTransactionsByDonor = useCallback((donorName) => {
    return transactions.filter(t => t.donor === donorName);
  }, [transactions]);

  // Reset all data
  const resetData = useCallback(() => {
    localStorage.removeItem('nkabom_campaigns');
    localStorage.removeItem('nkabom_transactions');
    setCampaigns(CAMPAIGNS);
    setTransactions(TRANSACTIONS);
    window.location.reload();
  }, []);

  // Stats
  const stats = {
    ...PLATFORM_STATS,
    totalRaised: campaigns.reduce((s, c) => s + c.raised, 0),
    activeCampaigns: campaigns.filter(c => c.status === 'approved').length,
    pendingCampaigns: campaigns.filter(c => c.status === 'pending').length,
    totalDonors: campaigns.reduce((s, c) => s + c.donorCount, 0),
  };

  return (
    <DataContext.Provider value={{
      campaigns, 
      transactions, 
      notifications, 
      stats,
      // Campaign operations
      donate, 
      approveCampaign, 
      rejectCampaign, 
      flagCampaign,
      createCampaign, 
      updateCampaign,
      deleteCampaign,
      addCampaign,
      improveStory, 
      getCampaignById,
      // Transaction operations
      addTransaction,
      getTransactionsByCampaign,
      getTransactionsByDonor,
      // Data operations
      resetData,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};
