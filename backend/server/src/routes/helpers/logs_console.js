


const logs_console = (verb, objBody = {}) => {

    if (process.env.NODE_ENV === 'development') {
        if (verb == 'post') {
            console.log(
                "\nActivity route:",
                "\n  Table:", objBody.table,
                "\n  Type:", objBody.content.activity_type,
                "\n  Description: ", objBody.content.activity_description
            )
        }
    }
}

module.exports = {
    logs_console
}