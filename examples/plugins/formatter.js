/**
 * @param {loggin} loggin 
 */
function plugin(loggin) {
    const { Formatter } = loggin;
    Formatter.registry.register(
        'CUSTOM',
        '[{time} {user}] - {level} - {message} {data}',
        {
            props: {
                time: {
                    transformers: ['date', 'cl_blue']
                },
                user: {
                    transformers: ['cl_cyan']
                },
                level: {
                    transformers: ['string']
                },
                message: {
                    transformers: ['json_u', 'cl_gray']
                },
                data: {
                    transformers: ['json_u', 'cl_gray']
                }
            }
        }
    );
}

module.exports = plugin;