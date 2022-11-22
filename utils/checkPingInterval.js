const checkPingInterval = () => {
    const pingInterval = +process.env.PING_INTERVAL_IN_MIN;
    if (pingInterval < 60) {
        return `Bot heartbeat, ones per: ${pingInterval} minutes`;
    } else {
        const intHours = parseInt(pingInterval / 60);
        const minutes = pingInterval - +intHours * 60;

        return `Bot heartbeat, ones per: ${intHours} hour(s) ${minutes} minutes`;
    }
};

module.exports = checkPingInterval;
