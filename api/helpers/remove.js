const remove = {
    // Delete a entry in db
    deleteId: (pool, table, id) => {
        return pool.getConnection()
            .then( connection => {
                return connection.query('DELETE FROM ?? WHERE id = ?', [table, id])
                    .then( deleteInfo => {
                        connection.release();
                        return deleteInfo.affectedRows.toString()
                    })
            })
    }
}

module.exports = remove;