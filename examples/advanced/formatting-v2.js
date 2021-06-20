const { Formatter, logger } = require('../../src/index');
const { colors } = Formatter;

const myformatter = Formatter.create(
    '[{time}] - {level} - {message} {data}',
    {
        props: {
            time: {
                transformers: [
                    'toLocaleDate',
                    colors.blue
                ],
            },
            level: {
                transformers: [
                    colors.fromLevel,
                ],
            },
            message: {},
            data: {
                transformers: ['stringify', 'cl_gray'],
            }
        }
    }
);

// Default ones
// formatter('message');
// formatter('json');
// formatter('detailed');
// formatter('minimal');
const myLogger = logger({ formatter: myformatter });
myLogger.debug('jaosdoj');