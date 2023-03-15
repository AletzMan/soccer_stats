import { COMMENTARIES, IMAGES } from "./constants";


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
    let CLASS_STATUS = '';
    try {
        if (sportEvent.status.name === 'Finalizado') {
            CLASS_STATUS = 'finished';
        }
        if (sportEvent.status.name === 'Sin comenzar') {
            CLASS_STATUS = 'uninitiated';
        }
        if (sportEvent.status.name === 'intermission') {
            CLASS_STATUS = 'inter';
        }
        if (sportEvent.status.name === 'En juego') {
            CLASS_STATUS = 'live';
        }
    } catch (error) {
        return console.error(error)
    }
    return { class: CLASS_STATUS }
}

export function getDateToday() {
    let today = new Date();

    return {
        day: today.getDate() < 9 ? '0' + (today.getDate()) : today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
        hour: today.getHours(),
        minute: today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes(),
        second: today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds()
    }
}

export function getDateTodayString() {
    const { year, month, day } = getDateToday();
    let dayFull = day < 10 ? '0' + day : day;
    let monthFull = month < 10 ? '0' + month : month;
    return `${year}-${monthFull}-${dayFull}`;
}

export function getNextWeekEnd() {
    let today = new Date(); // fecha actual
    let dayOfWeek = today.getDay(); // día de la semana (0-6)
    let daysUntilThursday = 4 - dayOfWeek; // días hasta el jueves
    console.log(daysUntilThursday)
    console.log(dayOfWeek)
    if (daysUntilThursday < 0) {
        daysUntilThursday += 7;
    }
    if (dayOfWeek === 0) {
        daysUntilThursday -= 7;
    }
    let thursday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilThursday); // fecha del próximo jueves
    let friday = new Date(thursday.getFullYear(), thursday.getMonth(), thursday.getDate() + 1); // fecha del próximo viernes
    let saturday = new Date(thursday.getFullYear(), thursday.getMonth(), thursday.getDate() + 2); // fecha del próximo sábado
    let sunday = new Date(thursday.getFullYear(), thursday.getMonth(), thursday.getDate() + 3); // fecha del próximo domingo
    let monday = new Date(thursday.getFullYear(), thursday.getMonth(), thursday.getDate() + 4); // fecha del próximo lunes
    return {
        thursday: thursday.toISOString().slice(0, 10), // formato 'yyyy-mm-dd'
        friday: friday.toISOString().slice(0, 10),
        saturday: saturday.toISOString().slice(0, 10),
        sunday: sunday.toISOString().slice(0, 10),
        monday: monday.toISOString().slice(0, 10),
    };
}

export function getPrevOrNextDay(day, type) {
    const nextDay = (new Date(day));
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (type === 'prev') {
        nextDay.setDate(nextDay.getDate() - 1);
    }
    if (type === 'next') {
        nextDay.setDate(nextDay.getDate() + 1);
    }
    const localDay = nextDay.toLocaleDateString('es-MX', optionsDate);
    let date = localDay.charAt(0).toUpperCase() + localDay.slice(1);

    const actualDate = new Date(nextDay)
    const dayActual = actualDate.getDate() < 10 ? '0' + actualDate.getDate() : actualDate.getDate();
    const monthActual = actualDate.getMonth() < 10 ? '0' + (actualDate.getMonth() + 1) : (actualDate.getMonth() + 1);
    const yearActual = actualDate.getFullYear();
    const fullDate = `${yearActual}-${monthActual}-${dayActual}`

    return {
        day: nextDay,
        dayString: date,
        dayFetch: fullDate
    }
}

export function getMatchWinner(calendar) {
    let resultData = null;
    try {
        if (calendar) {
            const statusMatch = calendar?.map(match => {
                return match.sportEvent.status.name;
            });
            const resultMatch = {
                homeScores: calendar?.map(match => {
                    return match.score.awayTeam.totalScore
                }),
                awayScores: calendar?.map(match => {
                    return match.score.homeTeam.totalScore
                }),
            }
            resultData = statusMatch?.map((status, index) => {
                if (status === 'Finalizado') {
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
        }
    } catch (error) {
        console.error(error)
    }
    return resultData.reverse();
}

export function getEventStats(matchData) {

    try {
        if (matchData) {
            let eventStats = {
                homeTeam: {
                    name: matchData.eventStats.stats.homeTeam.teamInfo.commonName,
                    color: matchData.eventStats.stats.homeTeam.teamKit.colour1,
                    colorTwo: matchData.eventStats.stats.homeTeam.teamKit.colour2,
                    statsTeam: matchData.eventStats.stats.homeTeam.statsTeam,
                    statsPlayers: matchData.eventStats.stats.homeTeam.statsPlayers,
                    lineUp: matchData.lineup.lineups.homeTeam.actualLineup,
                    formation: matchData.lineup.lineups.homeTeam.formationTeam,
                    manager: matchData.lineup.lineups.homeTeam.manager,
                    substitutes: matchData.lineup.lineups.homeTeam.substitutesActualLineup,
                    discipline: matchData.event.statsDetails.discipline.homeTeam,
                    substitutions: matchData.event.statsDetails.substitutions.homeTeam,
                },
                awayTeam: {
                    name: matchData.eventStats.stats.awayTeam.teamInfo.commonName,
                    color: matchData.eventStats.stats.awayTeam.teamKit.colour1,
                    colorTwo: matchData.eventStats.stats.awayTeam.teamKit.colour2,
                    statsTeam: matchData.eventStats.stats.awayTeam.statsTeam,
                    statsPlayers: matchData.eventStats.stats.awayTeam.statsPlayers,
                    lineUp: matchData.lineup.lineups.awayTeam.actualLineup,
                    formation: matchData.lineup.lineups.awayTeam.formationTeam,
                    manager: matchData.lineup.lineups.awayTeam.manager,
                    substitutes: matchData.lineup.lineups.awayTeam.substitutesActualLineup,
                    discipline: matchData.event.statsDetails.discipline.awayTeam,
                    substitutions: matchData.event.statsDetails.substitutions.awayTeam,
                },
                summary: matchData.summary.commentaries,
                narration: matchData.narration.commentaries
            }
            return eventStats
        }
    } catch (error) {
        console.error(error);
    }
    return null;
}

export function getImagesForCommentaries(comment) {

    for (let index = 0; index < COMMENTARIES.length; index++) {
        if (comment.commentary.includes(COMMENTARIES[index])) {
            return {
                url: `../src/assets/${IMAGES[index]}-icon.svg`,
                name: IMAGES[index]
            };
        }
    }

    return { url: null, name: null };
}

export function getValuesOfStatistics(statistics) {
    const arrayStatistics = [
        statistics.goals,
        statistics.shotsOnGoal,
        statistics.shots,
        statistics.possPercentage,
        statistics.successPass,
        statistics.lostPass,
        statistics.ballsLost,
        statistics.ballsRecovery,
        statistics.duelsWon,
        statistics.totalOffsides,
        statistics.wonCorners,
        statistics.fouls,
        statistics.yellowCards,
        statistics.redCards
    ];

    return arrayStatistics;
}

export function getEventDetails(events) {

    if (events) {
        let eventDetails = {
            event: events.sportEvent.name.replace('Fútbol Liga Mexicana Clausura ', ''),
            status: events.sportEvent.status.name,
            week: events.sportEvent.matchDay,
            name: {
                home: {
                    full: events.sportEvent.competitors.homeTeam.fullName,
                    abb: events.sportEvent.competitors.homeTeam.abbName,
                },
                away: {
                    full: events.sportEvent.competitors.awayTeam.fullName,
                    abb: events.sportEvent.competitors.awayTeam.abbName,
                }
            },
            logo: {
                home: events.sportEvent.competitors.homeTeam.images.urlLogo[0],
                away: events.sportEvent.competitors.awayTeam.images.urlLogo[0],
            },
            date: getLocalDate(events.startDate)[0],
            time: getLocalDate(events.startDate)[1],
            location: {
                city: events.sportEvent.location.address,
                stadium: events.sportEvent.location.name,
            }

        }
        return eventDetails
    }

    return null
}

function getLocalDate(date) {
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: 'numeric' };
    const DATE = new Date(date).toLocaleDateString('es-MX', optionsDate);
    const HOUR = new Date(date).getHours();
    const MINUTES = new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes();
    const TIME = HOUR + ':' + MINUTES;
    const DATE_FULL = DATE.charAt(0).toUpperCase() + DATE.slice(1);

    return [DATE_FULL, TIME];
}