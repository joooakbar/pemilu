import "../../public/css/stats.css"

type StatsBarProps = {
    totalDPT?: number
    voted?: number
    kandidat?: number
    participation?: number
}

export default function StatsBar({
    totalDPT = 2847,
    voted = 1204,
    kandidat = 3,
    participation = 42,
}: StatsBarProps) {
    return(
        <section className="stats-bar">
            <div className="stat-item">
                <div className="stat-num">
                    {totalDPT.toLocaleString('id-ID')}
                </div>
                <div className="stat-lbl">Total DPT</div>
            </div>
            <div className="stat-item">
                <div className="stat-num">
                    <span>{voted.toLocaleString('id-ID')}</span>
                </div>
                <div className="stat-lbl">Sudah Memilih</div>
            </div>
            <div className="stat-item">
                <div className="stat-num">
                    {kandidat}
                </div>
                <div className="stat-lbl">Paslon</div>
            </div>
            <div className="stat-item">
                <div className="stat-num">
                    <span>{participation}</span>
                    <span></span>
                </div>
                <div className="stat-lbl">Partisipasi</div>
            </div>
        </section>
    )
}