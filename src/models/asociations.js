import User from './user.model.js';
import Task from './task.model.js';

// Establish associations
User.hasMany(Task, {
    foreignKey: 'userId',
    as: 'tasks',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Task.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export { User, Task };
