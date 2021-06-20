
function plugin({ Formatter, formatterRegistry }) {
    Formatter.colors.fromLevel = (severity) => {
        let severityString = severity.name;
        switch (severityString) {
            case 'INFO':
                return Formatter.colors.blue(severityString);
            case 'DEBUG':
                return Formatter.colors.brightBlue(severityString);
            case 'NOTICE':
                return Formatter.colors.cyan(severityString);
            case 'WARNING':
                return Formatter.colors.brightYellow(severityString);
            case 'ALERT':
            case 'CRITICAL':
                return Formatter.colors.yellow(severityString);
            case 'ERROR':
                return Formatter.colors.red(severityString);
            default:
                return severityString;
        }
    }

    formatterRegistry.add('JSON', {
        formatLog: (log) => JSON.stringify(log),
        color: (log) => log,
    });

    formatterRegistry
        .register(
            'MESSAGE',
            '{message}',
        )
        .register(
            'SHORT',
            '[{time}] - {level} - {message}', {
            props: {
                time: {
                    transformers: ['toLocaleDate'],
                },
                level: {
                    transformers: ['toString']
                },
                message: {

                }
            }
        }
        )
        .register(
            'MEDIUM',
            '[{time}] - {level} - {message} {data}',
            {
                props: {
                    time: {
                        transformers: ['toLocaleDate']
                    },
                    level: {
                        transformers: ['toString']
                    },
                    message: {},
                    data: {
                        transformers: ['stringify', 'cl_gray']
                    }
                }
            }
        )
        .register(
            'DEFAULT',
            '[{time}] - {level} - {message} {data}',
            {
                props: {
                    time: {
                        transformers: ['toLocaleDate']
                    },
                    level: {
                        transformers: ['toString']
                    },
                    message: {},
                    data: {
                        transformers: ['stringify', 'cl_gray']
                    }
                }
            }
        )
        .register(
            'LONG',
            '[{time} {user}] - {level} - {message} {data}',
            {
                props: {
                    time: {
                        transformers: ['toLocaleDate', 'cl_blue']
                    },
                    user: {
                        transformers: ['cl_gray']
                    },
                    level: {
                        transformers: ['toString']
                    },
                    message: {},
                    data: {
                        transformers: ['stringifyNoFormat', 'cl_gray']
                    }
                }
            }
        )
        .register(
            'DETAILED',
            '{time} {user} {channel} - {level} - {message} {data}', {
            props: {
                time: {
                    transformers: ['toLocaleDate', 'lbl_cyan']
                },
                user: {
                    transformers: ['cl_gray']
                },
                level: {
                    transformers: ['toString']
                },
                data: {
                    transformers: ['stringify', 'cl_gray']
                },
                channel: {},
                message: {},
            }
        }
        )
        .register(
            'MINIMAL',
            '{channel} - {message}', {
            props: {
                message: {},
                channel: {},
            }
        }
        );
}

module.exports = plugin;