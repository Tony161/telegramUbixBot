const checkPoolInterval = () => {
    if (+process.env.POLLING_TIME < 60) {
        return `Bot heartbeat, ones per: ${process.env.POLLING_TIME} minutes`;
    } else {
        const intHours = parseInt(+process.env.POLLING_TIME / 60);
        const minutes = +process.env.POLLING_TIME - +intHours * 60;

        return `Bot heartbeat, ones per: ${intHours} hour(s) ${minutes} minutes`;
    }
};

module.exports = checkPoolInterval;
