// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
 //Write a function to exicute \d (name of the tabel for departments and deparment ids)

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    //Write a similar function but with the roles information

// WHEN I choose to view all employees
    //Same as above
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to


// WHEN I choose to update an employee role
    //This is written as a different funcation and can be called in the function above.
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
    //This is written at the end of the function above