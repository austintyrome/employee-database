const inquirer = require('inquirer');
const Employee = require('../models/employee');
const Role = require('../models/role');
const Department = require('../models/department');
const Seed = require('../db/seed');
const Table = require('cli-table3');

const seed = new Seed;

class Ask {
    async createToDatabase(tableName, answers) {
        try {
        const userData = await tableName.create(answers);
        console.log(userData);
        } catch (err) {
            console.error(err);
        }
        return this.init();
    };

    async fetchData(tableName) {
        try {
            const data = await tableName.findAll({ raw: true });

            console.log(data);
            if (data.length === 0) {
                console.log('No data found');
                return this.init();
            }
    
            const table = new Table({
                head: Object.keys(data[0]),
                colWidths: new Array(Object.keys(data[0]).length).fill(20)
            });
    
            data.forEach(row => {
                table.push(Object.values(row));
            });
    
            console.log(table.toString());
        } catch (err) {
            console.error(err);
        }
    
        return this.init();
    }

    async addEmployee() {
        try {

            const roles = await Role.findAll({ attributes: ['id', 'title'] });
            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id
}));
            const employeeList = [
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter employee first name',
                    default: 'Mayumi'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter employee last name',
                    default: 'Saegusa'
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Add role from list of roles',
                    choices: roleChoices,
                },
                {
                    type: 'input',
                    name: 'manager',
                    message: 'Enter manager',
                    default: 'Saegusa Kouichi'
                }
            ];
    
            inquirer.prompt(employeeList).then(async (answers) => {
                await this.createToDatabase(Employee, answers);
                console.log('Employee added successfully');

            });
        } catch (err) {
            console.error(err);
        }

        return;
    }

    
    async addDepartment() {
        try {
            const departmentList = [
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter new department name',
                    default: 'Food'
                }
            ];

            inquirer.prompt(departmentList).then(async (answers) => {
                await this.createToDatabase(Department, answers);
                console.log('Department added successfully');

            })

        } catch (err) {
            console.error(err);
        }

        return;
    };

    async addRole() {
        try {
        const departments = await Department.findAll();
        const departmentChoices = departments.map(dep => ({
            name: dep.name,
            value: dep.id
        }));

        const roleList = [
            {
                type: 'input',
                name: 'title',
                message: 'Enter new role name',
                default: 'Sushi slicer',
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Choose a department to put this role under',
                choices: departmentChoices,
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary for this role',
                default: 10000
            }
        ];

        const data = await inquirer.prompt(roleList);
        this.createToDatabase(Role, data);
        console.log('Role added successfully');

        } catch (err) {
            console.error(err);
        }

        return;
    };

    async updateRole() {
        try {
            const allEmployees = await Employee.findAll();
            const allRoles = await Role.findAll();
    
            const employeeChoices = allEmployees.map(emp => ({
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id
            }));
            const roleChoices = allRoles.map(role => ({
                name: role.title,
                value: role.id
            }));
    
            const chooseEmployee = [
                {
                    type: 'list',
                    name: 'employee_to_update',
                    message: 'Choose an employee from the list to update their role',
                    choices: employeeChoices,
                }
            ];
            const chooseRole = [
                {
                    type: 'list',
                    name: 'new_role',
                    message: 'Choose a role from the list to replace the current role',
                    choices: roleChoices,
                }
            ];
    

            const employeeToUpdate = await inquirer.prompt(chooseEmployee);

            const changedRole = await inquirer.prompt(chooseRole);
    

            console.log(`Employee ID: ${employeeToUpdate.employee_to_update} will change role to Role ID: ${changedRole.new_role}`);
    
            const employee = await Employee.findByPk(employeeToUpdate.employee_to_update);
            if (employee) {
                employee.role_Id = changedRole.new_role;
                await employee.save();
                console.log(`Employee ${employee.first_name} ${employee.last_name}'s role has been updated successfully.`);
            }
            this.init();
        } catch (err) {
            console.error(err);
        }
    
        return;
    }



async init() {
    try {
        const initList = [
            {
                type: 'list',
                name: 'init',
                message: 'choose one of the following to begin:',
                choices: ['View all employees', 'View all departments', 'View all roles', 'Add an employee', 'Add a department', 'Add a role', 'Update employee role', 'Auto-seed database', 'Quit'],
                default: 'View all employees'
            }
        ];

        const answers = await inquirer.prompt(initList);
        const selectedOption = answers.init;

        switch (selectedOption) {
            case 'View all employees':
                await this.fetchData(Employee);
                break;
            case 'View all departments':
                await this.fetchData(Department);
                break;
            case 'View all roles':
                await this.fetchData(Role);
                break;
            case 'Add an employee':
                await this.addEmployee();
                break;
            case 'Add a department':
                await this.addDepartment();
                break;
            case 'Add a role':
                await this.addRole();
                break;
            case 'Update employee role':
                await this.updateRole();
                break;
            case 'Auto-seed database':
                await this.autoSeed();
                break;
            case 'Quit':
                this.quit();
                break;
            default:
                console.log('Invalid option');
        }
    } catch (err) {
        console.error(err);
    } 

};

    async autoSeed() {
        seed.spawnDepartments()
        .then(seed.spawnRoles())
        .then(seed.spawnEmployees())
        .then(this.init())
        .catch((err) => {console.error(err)})
        
    };

    quit() {
        return;
    };


    
};

module.exports = Ask;