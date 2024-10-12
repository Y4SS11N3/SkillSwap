import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from '../redux/actions/dashboardActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userSkills, recentExchanges, skillStats, loading, error } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* User Skills */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userSkills.map(userSkill => (
            <div key={userSkill.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{userSkill.Skill.name}</h3>
              <p className="text-sm text-gray-600">{userSkill.proficiency}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Exchanges */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Exchanges</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Requester</th>
                <th className="py-3 px-6 text-left">Provider</th>
                <th className="py-3 px-6 text-left">Requester Skill</th>
                <th className="py-3 px-6 text-left">Provider Skill</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {recentExchanges.map(exchange => (
                <tr key={exchange.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{exchange.requester.name}</td>
                  <td className="py-3 px-6 text-left">{exchange.provider.name}</td>
                  <td className="py-3 px-6 text-left">{exchange.requesterSkill.name}</td>
                  <td className="py-3 px-6 text-left">{exchange.providerSkill.name}</td>
                  <td className="py-3 px-6 text-left">
                    <span className={`bg-${exchange.status === 'completed' ? 'green' : 'yellow'}-200 text-${exchange.status === 'completed' ? 'green' : 'yellow'}-600 py-1 px-3 rounded-full text-xs`}>
                      {exchange.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skill Statistics */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Skill Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillStats.map(stat => (
            <div key={stat.category} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{stat.category}</h3>
              <p className="text-2xl font-bold">{stat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;