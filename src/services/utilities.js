export function countdown(targetDate) {
    const optionsDate = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dateEventLocal = new Date(targetDate).toLocaleDateString('es-MX', optionsDate)

    let date = getDateToday();
    const { day, month, year, hour, minute, second } = date;

    let dateToday = `${day}/${month}/${year}, ${hour}:${minute}:${second}`;
    let differenceTime = new Date(dateEventLocal) - new Date(dateToday);
    let timeHours = Math.floor(((differenceTime / 1000) / 60) / 60)
    let timeMinutes = Math.floor(((differenceTime / 1000) / 60) - timeHours * 60);
    let timeSeconds = (differenceTime / 1000) - ((timeHours * 60 * 60) + (timeMinutes * 60));

    timeMinutes = timeMinutes < 10 ? '0' + timeMinutes : timeMinutes;
    timeSeconds = timeSeconds < 10 ? '0' + timeSeconds : timeSeconds;

    if (timeHours < 0) {
        return 'Comenzando'
    }

    return `${timeHours}:${timeMinutes}:${timeSeconds}`
}

export function statusEvent(sportEvent) {
    let STATUS_MATCH = '';
    let CLASS_STATUS = '';
    try {
        if (sportEvent['event-status'] === 'post-event') {
            STATUS_MATCH = 'Finalizado';
            CLASS_STATUS = 'finished';
        }
        if (sportEvent['event-status'] === 'pre-event') {
            STATUS_MATCH = 'Previa';
            CLASS_STATUS = 'uninitiated';
        }
        if (sportEvent['event-status'] === 'intermission') {
            STATUS_MATCH = 'Intermedio';
            CLASS_STATUS = 'inter';
        }
        if (sportEvent['event-status'] === 'mid-event') {
            STATUS_MATCH = 'En Vivo';
            CLASS_STATUS = 'live';
        }
    } catch (error) {
        return console.error(error)
    }
    return { status: STATUS_MATCH, class: CLASS_STATUS }
}

export function getDateToday() {
    let today = new Date();
    let day = today.getDate() < 9 ? '0' + (today.getDate() + 1) : today.getDate() + 1;
    let month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    let year = today.getFullYear();

    return {
        day: today.getDate() < 9 ? '0' + (today.getDate()) : today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
        hour: today.getHours(),
        minute: today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes(),
        second: today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds()
    }
}

export function getMatchWinner(calendar) {
    let resultData = null;
    try {
        const statusMatch = calendar.map(match => {
            return match['event-metadata']['event-status'];
        });
        const resultMatch = {
            homeScores: calendar.map(match => {
                return match.team[0]['team-stats'].score
            }),
            awayScores: calendar.map(match => {
                return match.team[1]['team-stats'].score
            }),
        }
        resultData = statusMatch.map((status, index) => {
            if (status === 'post-event') {
                if (parseInt(resultMatch.homeScores[index]) > parseInt(resultMatch.awayScores[index])) {
                    return 'L';
                } else if (parseInt(resultMatch.homeScores[index]) === parseInt(resultMatch.awayScores[index])) {
                    return 'E';
                } else if (parseInt(resultMatch.homeScores[index]) < parseInt(resultMatch.awayScores[index])) {
                    return 'V';
                }
            } else {
                return null;
            }
        });
    } catch (error) {
        console.error(error)
    }
    return resultData;
}