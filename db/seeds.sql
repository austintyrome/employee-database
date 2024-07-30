INSERT INTO department(department_name)
VALUES   ( 'transportation'),
        ( 'food'),
        ( 'exploration'),
        ( 'management');

INSERT INTO role(role_name, role_salary, department_id)
VALUES   ( 'train driver',   85000,   1),
        ( 'wine sommelier',   180000,   2),
        ( 'lock smith',   65000,   3),
        ( 'ceo',   200000,   3),
        ( 'truck driver',   88000,   4),
        ( 'cashier',   44000,   2),
        ( 'produce finder',   4000000,   3),
        ( 'manager',   70000,   4);

INSERT INTO employee(employee_first, employee_last, role_id, manager_id)
VALUES  ( 'Aza',  'Bull',  1,  NULL),
        ( 'Tony',  'Tiger',  2,  1),
        ( 'Sharon',  'Names',  3,  2),
        ( 'Lazy',  'Susan',  4,  NULL),
        ( 'Trixie',  'Mattel',  5,  4),
        ( 'Ameron',  'Martin',  6,  5),
        ( 'Tiffany',  'Polard',  7,  6),
        ( 'Jeremiah',  'Bullforg',  8,  7);