


const pool = require("./create_pool");


const get_activities = async (filters) => {

    try {
        // Construcción dinámica de la consulta en base a los filtros (opcional)
        let query = `SELECT * FROM ${filters.table} WHERE 1=1`;
        const queryParams = [];

        let param = 0

        if (filters?.activity_type) {
            query += ' AND activity_type = $1';
            queryParams.push(filters.activity_type);
            param = param + 1;
        };

        if (filters?.user_id) {
            param = param + 1;
            query += ` AND user_id = $${param}`;
            queryParams.push(filters.user_id);
        }

        if (filters?.user_name) {
            param = param + 1;
            query += ` AND user_name = $${param}`;
            queryParams.push(filters.user_name);
        }

        if (filters?.dateStart && filters?.dateEnd) {
            const param = queryParams.length
            query += ` AND timestamp BETWEEN $${param + 1} AND $${param + 2}`;
            queryParams.push(filters.dateStart);
            queryParams.push(filters.dateEnd);
        }

        const result = await pool.query(query, queryParams);

        return result.rows;

    } catch (error) {
        console.error('Error fetching activities:', error);
    }
};

module.exports = { get_activities };
