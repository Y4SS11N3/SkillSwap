'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Check if Users table exists
      const usersCheck = await queryInterface.sequelize.query(
        "SELECT to_regclass('public.\"Users\"') as exists",
        { type: Sequelize.QueryTypes.SELECT }
      );
      
      if (!usersCheck[0].exists) {
        console.error('Users table does not exist. Please ensure migrations have run successfully.');
        return;
      }

      // Check if Skills table exists
      const skillsCheck = await queryInterface.sequelize.query(
        "SELECT to_regclass('public.\"Skills\"') as exists",
        { type: Sequelize.QueryTypes.SELECT }
      );
      
      if (!skillsCheck[0].exists) {
        console.error('Skills table does not exist. Please ensure migrations have run successfully.');
        return;
      }

      const users = await queryInterface.sequelize.query(
        `SELECT id, name from "Users";`,
        { type: Sequelize.QueryTypes.SELECT }
      );
      const skills = await queryInterface.sequelize.query(
        `SELECT id, name from "Skills";`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      if (users.length === 0 || skills.length === 0) {
        console.error('No users or skills found. Please ensure user and skill seeders have run successfully.');
        return;
      }

      console.log('Users:', users);
      console.log('Skills:', skills);

      // Helper functions to find IDs
      const findUserId = (name) => {
        const user = users.find(u => u.name === name);
        return user ? user.id : null;
      };

      const findSkillId = (name) => {
        const skill = skills.find(s => s.name === name);
        return skill ? skill.id : null;
      };

      const exchanges = [
        // Exchange 1: Yassine teaching JavaScript to Aya
        {
          requesterId: findUserId('Aya'),
          providerId: findUserId('Yassine'),
          requesterSkillId: findSkillId('JavaScript'),
          providerSkillId: findSkillId('Digital Marketing'),
          status: 'accepted',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Exchange 2: Mehdi teaching Python to Ahmed
        {
          requesterId: findUserId('Ahmed'),
          providerId: findUserId('Mehdi'),
          requesterSkillId: findSkillId('JavaScript'),
          providerSkillId: findSkillId('Python'),
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Exchange 3: Anas teaching UI/UX Design to Yassine
        {
          requesterId: findUserId('Yassine'),
          providerId: findUserId('Anas'),
          requesterSkillId: findSkillId('UI/UX Design'),
          providerSkillId: findSkillId('Project Management'),
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Exchange 4: Ahmed teaching Financial Analysis to Mehdi
        {
          requesterId: findUserId('Mehdi'),
          providerId: findUserId('Ahmed'),
          requesterSkillId: findSkillId('Financial Analysis'),
          providerSkillId: findSkillId('JavaScript'),
          status: 'accepted',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Exchange 5: Aya teaching Digital Marketing to Anas
        {
          requesterId: findUserId('Anas'),
          providerId: findUserId('Aya'),
          requesterSkillId: findSkillId('Digital Marketing'),
          providerSkillId: findSkillId('Motion Graphics'),
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      // Filter out any exchanges with null IDs
      const validExchanges = exchanges.filter(exchange => 
        exchange.requesterId && exchange.providerId && exchange.requesterSkillId && exchange.providerSkillId
      );

      if (validExchanges.length === 0) {
        console.error('No valid exchanges to insert. Please check user and skill names.');
        return;
      }

      return queryInterface.bulkInsert('Exchanges', validExchanges, {});

    } catch (error) {
      console.error('Error in Exchanges seeder:', error);
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Exchanges', null, {});
  }
};