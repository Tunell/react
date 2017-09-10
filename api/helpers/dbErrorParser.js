const errorParser = {
    createErrorResponse: function (err) {
        let msg, field, statusCode
        ({msg, field, statusCode} = this.decodeError(err.errno, err.message))
        const errorResponse = {
            msg,
            field,
            code: err.errno,
            exceptionMsg: err.message,
            statusCode
        }
        return errorResponse
    },
    decodeError: (errno,  message) => {
        let field, msg, statusCode
        switch(errno) {
            // Trying to remove a referenced foreign key
            case 1451:
                field = field = message.split('FOREIGN KEY')[1].split('REFERENCES')[0].split('`')[1]
                msg = `Ej tillåtet att ta bort objektet  med fält: ${field}. Andra objekt refererar är relaterade till objektet.`
                statusCode = 403
                break

            // The provided foreign key ID is not found
            case 1452:
                field = message.split('FOREIGN KEY')[1].split('REFERENCES')[0].split('`')[1]
                msg = `Det id på ${field} som skickats finns ej.`
                statusCode = 403
                break

            default:
                field = "Did not find any field."
                msg = `Kunde inte hitta vad som gick fel.`
                statusCode = 403
        }
        return {field, msg, statusCode}
    }
}


module.exports = errorParser;
