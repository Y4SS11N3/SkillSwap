'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('12345678', 10);
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Yassine',
        email: 'yassine@skillswap.com',
        password: hashedPassword,
        bio: 'Founder of SkillSwap and passionate about connecting people through skills',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aya',
        email: 'aya@skillswap.com',
        password: hashedPassword,
        bio: 'Digital marketing specialist with a keen eye for design',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mehdi',
        email: 'mehdi@skillswap.com',
        password: hashedPassword,
        bio: 'Full-stack developer and AI enthusiast',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Anas',
        email: 'anas@skillswap.com',
        password: hashedPassword,
        bio: 'UX/UI designer with a background in psychology',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ahmed',
        email: 'ahmed@skillswap.com',
        password: hashedPassword,
        bio: 'Data scientist specializing in machine learning and analytics',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};