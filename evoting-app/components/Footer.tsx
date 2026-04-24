import '../public/css/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-left">
                <div className="footer-brand">
                    E-VOTIS
                </div>
                <p className="footer-desc">
                    Sistem E-Voting Terenkripsi. Pilgub Provinsi X 2026
                </p>
            </div>

            <div className="footer-right">
                © 2025 Panitia Penyelenggara · Dilindungi enkripsi AES-256
            </div>
        </div>
    </footer>
  )
}

export default Footer