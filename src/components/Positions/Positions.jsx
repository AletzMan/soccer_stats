//https://api.unidadeditorial.es/sports/v1/classifications/current/?site=2&type=10&tournament=0168
//import dataStats from '../../services/data.json';
import { getTablePositions } from '../../services/getData';
import loadingIcon from '../../assets/loading-icon.svg';
import { Stats } from '../Stats/Stats';
import { Team } from '../Team/Team';
import './Positions.css'
import { Loading } from '../Loading/Loading';

function Positions() {
    const { positions, loading } = getTablePositions();
    if (positions !== undefined) {
        console.log(positions?.data)
    }

    return (
        <main className='positions'>
            {!loading && <section className='table'>
                <div className="table__teams">
                    <div className="teams__title">
                        <span className="teams__title--pos">Pos</span>
                        <span className="teams__title--team">Club</span>
                    </div>
                    {!loading && positions?.data[0]?.rank?.map(({ _id, name, standing, images }) => (
                        <Team key={_id} props={{ name, standing, images }} />
                    ))}
                </div>
                <div className="container__stats">
                    <div className='table__stats'>
                        <div className="stats__title">
                            <span className="stats__title--played">JJ</span>
                            <span className="stats__title--won">JG</span>
                            <span className="stats__title--drawn">JE</span>
                            <span className="stats__title--lost">JP</span>
                            <span className="stats__title--points">Pts</span>
                            <span className="stats__title--for">GF</span>
                            <span className="stats__title--against">GC</span>
                            <span className="stats__title--dif">DG</span>
                        </div>
                        {!loading && positions?.data[0]?.rank.map(({ id, standing }) => (
                            <Stats key={id} props={{ standing }} />
                        ))}
                    </div>
                </div>
                        </section>}
            {loading && <Loading />}
        </main>
    )
}

export { Positions };