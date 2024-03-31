const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'manageFaculties', 'manageCourses', 'manageDepartments', 'manageStudents'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
