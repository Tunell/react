const remove = {
    deleteId: (pool, table, id) => {
        return pool.getConnection()
            .then( connection => {
                return connection.query('DELETE FROM ?? WHERE id = ?', [table, id])
                    .then( deleteInfo => deleteInfo.affectedRows.toString())
            })
            .catch( err => console.log(err));
    }
}

module.exports = remove;