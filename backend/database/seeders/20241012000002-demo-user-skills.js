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

      // Fetch users
      const users = await queryInterface.sequelize.query(
        `SELECT id, name from "Users";`,
        { type: Sequelize.QueryTypes.SELECT }
      );
      
      if (users.length === 0) {
        console.error('No users found in the Users table. Please ensure user seeder has run successfully.');
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

      // Fetch skills
      const skills = await queryInterface.sequelize.query(
        `SELECT id, name from "Skills";`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      if (skills.length === 0) {
        console.error('No skills found in the Skills table. Please ensure skill seeder has run successfully.');
        return;
      }

      console.log('Users:', users);
      console.log('Skills:', skills);

      // Helper function to find skill ID by name
      const findSkillId = (name) => {
        const skill = skills.find(s => s.name === name);
        return skill ? skill.id : null;
      };

      const userSkills = [
        // Yassine's skills
        {
          userId: users[0].id,
          skillId: findSkillId('JavaScript'),
          proficiency: 'expert',
          isKnownSkill: true,
          isInterestedSkill: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[0].id,
          skillId: findSkillId('Project Management'),
          proficiency: 'proficient',
          isKnownSkill: true,
          isInterestedSkill: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Aya's skills
        {
          userId: users[1].id,
          skillId: findSkillId('Digital Marketing'),
          proficiency: 'expert',
          isKnownSkill: true,
          isInterestedSkill: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[1].id,
          skillId: findSkillId('Graphic Design'),
          proficiency: 'proficient',
          isKnownSkill: true,
          isInterestedSkill: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Mehdi's skills
        {
          userId: users[2].id,
          skillId: findSkillId('JavaScript'),
          proficiency: 'expert',
          isKnownSkill: true,
          isInterestedSkill: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[2].id,
          skillId: findSkillId('Python'),
          proficiency: 'proficient',
          isKnownSkill: true,
          isInterestedSkill: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Anas's skills
        {
          userId: users[3].id,
          skillId: findSkillId('UI/UX Design'),
          proficiency: 'expert',
          isKnownSkill: true,
          isInterestedSkill: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[3].id,
          skillId: findSkillId('Motion Graphics'),
          proficiency: 'competent',
          isKnownSkill: true,
          isInterestedSkill: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Ahmed's skills
        {
          userId: users[4].id,
          skillId: findSkillId('Python'),
          proficiency: 'expert',
          isKnownSkill: true,
          isInterestedSkill: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[4].id,
          skillId: findSkillId('Financial Analysis'),
          proficiency: 'proficient',
          isKnownSkill: true,
          isInterestedSkill: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      // Filter out any null skillIds
      const validUserSkills = userSkills.filter(skill => skill.skillId !== null);

      if (validUserSkills.length === 0) {
        console.error('No valid user skills to insert. Please check skill names.');
        return;
      }

      return queryInterface.bulkInsert('UserSkills', validUserSkills, {});

    } catch (error) {
      console.error('Error in UserSkills seeder:', error);
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserSkills', null, {});
  }
};