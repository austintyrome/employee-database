const express = require('express');
const { Pool } = require('pg');

const pool = new Pool(
    {
        user: 'postgres',
        password: '#Lillymon13',
        host: 'localhost',
        database: 'staff_db',
        port: 5432,
    },
    console.log('Connected to staff_db.')
);

pool.connect();

class DatabaseQuery {
    constructor(pool) {
        this.pool = pool
    }

    async connectToDatabase() {
      try {
          this.pool = new Pool({
              user: 'postgres',
              password: '#Lillymon13',
              host: 'localhost',
              database: 'staff_db',
              port: 5432,
          });
          
          await this.pool.connect();
          console.log('Connected to staff_db.');
      } catch (error) {
          console.error('Error connecting to database:', error);
      }
  }

    async getData(sql) {
      try {
          const result = await this.pool.query(sql);
        //   res.json({
        //       message: 'success',
        //       data: result.rows
        //   });
        return result;
      } catch (err) {
          res.status(400).json({ error: err.message });
      }
  }

async postData(sql, params) {
    try {
        const result = await pool.query(sql, params);
        // return {
        //     message: 'success',
        //     data: result.rows
        // };
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

    async putData(req, res) {
      try {
        const sql = this.putRequestFilter(req);
        const result = await pool.query(sql, params); 
        res.json({
            message: 'success',
            data: result.rows
        });
      } catch (err) {
          res.status(400).json({ error: err.message });
      }
}
    
    putRequestFilter(req) {
        let id = req.body.id;
        const parameters = [req.body.first_name, req.body.last_name, req.body.department, req.body.role, req.body.salary];
        let change = [];
        let table;

        parameters.forEach(parameter => {
            if (parameter) {
                for (const [key, value] of Object.entries(parameter)) {
                    change.push(key, value);
                }
            } else {
                console.log('It would seem theres and error, but what could it be??');
            }
        });

        if (parameter == 'department' || 'role' || 'salary') {
            table = 'employee_details';
        } else {
            table = 'employees'
        }
        const sql = `UPDATE ${value} SET ${change[0]} = ${change[1]} WHERE id = ${id}`
        return JSON.stringify(sql);
    };

    async deleteData(req, res) {
      const sql = `DELETE FROM employees WHERE id = $1`;
      const params = [req.params.id];
  
      try {
          const result = await pool.query(sql, params);
  
          if (!result.rowCount) {
              res.json({
                  message: 'Employee not found'
              });
          } else {
              res.json({
                  message: 'Deleted',
                  changes: result.rowCount,
                  id: req.params.id
              });
          }
      } catch (err) {
          res.status(400).json({ error: err.message });
      }
  }

}

module.exports = new DatabaseQuery();