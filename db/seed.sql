const { Employee, Role, Department } = require('./models');
const Employee = require('../models/employee');
const Role = require('../models/role');
const Department = require('../models/department');
const sequelize = require('../config/connection');

class Seed {

    employeeData = [
        {first_name: 'Aza', last_name: 'Bull', roleId: 1, manager: 'Yuno'},
        {first_name: 'Tony', last_name: 'Tiger', roleId: 2, manager: 'Kellog'},
        {first_name: 'Sharon', last_name: 'Names', roleId: 3, manager: 'Ru'},
        {first_name: 'Lazy', last_name: 'Susan', roleId: 4, manager: 'Jane'},
        {first_name: 'Trixie', last_name: 'Mattel', roleId: 5, manager: 'Barbie'},
        {first_name: 'Ameron', last_name: 'Martin', roleId: 6, manager: 'Jessic'},
        {first_name: 'Tiffany', last_name: 'Polard', roleId: 7, manager: 'New York'},
        {first_name: 'Jeremiah', last_name: 'Bullforg', roleId: 8, manager: 'Friend'},
    ];
    
    roleData = [
        {title: 'train driver', salary: 85000, departmentId: 1},
        {title: 'wine sommelier', salary: 180000, departmentId: 2},
        {title: 'lock smith', salary: 65000, departmentId: 3},
        {title: 'ceo', salary: 200000, departmentId: 3},
        {title: 'truck driver', salary: 88000, departmentId: 4},
        {title: 'cashier', salary: 44000, departmentId: 2},
        {title: 'produce finder', salary: 4000000, departmentId: 3},
        {title: 'manager', salary: 70000, departmentId: 4},
    ];
    
    departmentData = [
        {name: 'transportation'},
        {name: 'food'},
        {name: 'exploration'},
        {name: 'management'},
    
    ];
    
    async spawnDepartments() {
        try {
            for (const department of this.departmentData) {
                await Department.findOrCreate({
                    where: { name: department.name },
                    defaults: department
                });
            }
            console.log('Departments created successfully');
        } catch (error) {
            console.error('Error creating departments:', error);
        }
    };

    async spawnRoles() {
        try {
            for (const role of this.roleData) {
                await Role.findOrCreate({
                    where: { title: role.title },
                    defaults: role
                });
            }
            console.log('Roles created successfully');
        } catch (error) {
            console.error('Error creating roles:', error);
        }
    };

    async spawnEmployees() {
        try {
            await Employee.bulkCreate(this.employeeData, { ignoreDuplicates: true });
            console.log('Employees created successfully');
        } catch (error) {
            console.error('Error creating employees:', error);
        }
    };
};