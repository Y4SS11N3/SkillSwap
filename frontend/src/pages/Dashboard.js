import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from '../redux/actions/dashboardActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userSkills, recentExchanges, skillStats, loading, error } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  if (loading) return <div className="text-center mt-8 text-sky-600">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-rose-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* User Skills */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-sky-700">Your Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userSkills.map(userSkill => (
            <div key={`${userSkill.userId}-${userSkill.skillId}`} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-lg text-sky-600 mb-2">{userSkill.Skill.name}</h3>
              <p className="text-sm text-gray-600">Proficiency: {userSkill.proficiency}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Exchanges */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-sky-700">Recent Exchanges</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full">
            <thead>
              <tr className="bg-sky-50 text-sky-700 uppercase text-xs leading-normal">
                <th className="py-3 px-6 text-left">Requester</th>
                <th className="py-3 px-6 text-left">Provider</th>
                <th className="py-3 px-6 text-left">Requester Skill</th>
                <th className="py-3 px-6 text-left">Provider Skill</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {recentExchanges.map(exchange => (
                <tr key={exchange.id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-300">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{exchange.requester.name}</td>
                  <td className="py-3 px-6 text-left">{exchange.provider.name}</td>
                  <td className="py-3 px-6 text-left">{exchange.requesterSkill.name}</td>
                  <td className="py-3 px-6 text-left">{exchange.providerSkill.name}</td>
                  <td className="py-3 px-6 text-left">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      exchange.status === 'completed' 
                        ? 'bg-teal-100 text-teal-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
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
        <h2 className="text-2xl font-semibold mb-6 text-sky-700">Skill Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillStats.map(stat => (
            <div key={`${stat.category}-${stat.count}`} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-lg text-sky-600 mb-2">{stat.category}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;