const createHeartBeatMessage = () => {
    const heartbeat = +process.env.PING_INTERVAL_IN_MIN;
    if (heartbeat < 60) {
        return `Bot heartbeat, ones per: ${heartbeat} minutes`;
    } else {
        const intHours = parseInt(heartbeat / 60);
        const minutes = heartbeat - +intHours * 60;

        return `Bot heartbeat, ones per: ${intHours} hour(s) ${minutes} minutes`;
    }
};

module.exports = createHeartBeatMessage;
