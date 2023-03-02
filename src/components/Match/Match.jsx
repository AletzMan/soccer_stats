import './Match.css'

function Match({ team, eventData }) {
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const DATE = new Date(eventData['start-date-time']).toLocaleDateString('es-MX', optionsDate);
    const HOUR = new Date(eventData['start-date-time']).getHours();
    const MINUTES = new Date(eventData['start-date-time']).getMinutes() < 10 ? '0' + new Date(eventData['start-date-time']).getMinutes():new Date(eventData['start-date-time']).getMinutes();
    const TIME = HOUR + ':' + MINUTES;
    const DATE_FULL = DATE.charAt(0).toUpperCase() + DATE.slice(1);
    return (
        <div className='match'>
            <div className='match__teams'>
                <img className='match__teams--home team__logo' src={team[0]['team-metadata']['sports-property'][0].value} />
                <span className='match__teams--name' >{eventData['event-name']}</span>
                <img className='match__teams--away team__logo' src={team[1]['team-metadata']['sports-property'][0].value} />
                <span className='match__date'>{DATE_FULL}</span>
                <span className='match__hour'>{eventData.site['site-metadata']['home-location'].city + ' ' + TIME}</span>
                <span className='match__site'>{eventData.site['site-metadata'].name.full}</span>
            </div>
        </div>
    )
}

export { Match };