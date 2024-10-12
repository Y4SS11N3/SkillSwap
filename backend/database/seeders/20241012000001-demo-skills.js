'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Skills', [
      // Programming Skills
      {
        name: 'JavaScript',
        description: 'Programming language for web development',
        category: 'Programming',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Python',
        description: 'Versatile programming language for various applications',
        category: 'Programming',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Java',
        description: 'Object-oriented programming language for enterprise applications',
        category: 'Programming',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Design Skills
      {
        name: 'Graphic Design',
        description: 'Creating visual content using design software',
        category: 'Design',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'UI/UX Design',
        description: 'Designing user interfaces and experiences for digital products',
        category: 'Design',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Motion Graphics',
        description: 'Creating animated visual elements for video and web',
        category: 'Design',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Business Skills
      {
        name: 'Project Management',
        description: 'Planning, executing, and closing projects effectively',
        category: 'Business',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Financial Analysis',
        description: 'Analyzing financial data to support business decisions',
        category: 'Business',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Business Strategy',
        description: 'Developing and implementing business growth strategies',
        category: 'Business',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Marketing Skills
      {
        name: 'Digital Marketing',
        description: 'Promoting products or services using digital technologies',
        category: 'Marketing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Content Marketing',
        description: 'Creating and distributing valuable content to attract customers',
        category: 'Marketing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SEO',
        description: 'Optimizing websites to increase visibility in search engines',
        category: 'Marketing',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Skills', null, {});
  }
};