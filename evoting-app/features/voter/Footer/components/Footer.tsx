import type { FooterProps } from '../types/footer.types'

const Footer = ({
  brand = 'E-VOTIS',
  description = 'Sistem E-Voting Terenkripsi. Pilgub Provinsi X 2026',
  copyright = '© 2025 Panitia Penyelenggara · Dilindungi enkripsi AES-256',
}: FooterProps) => {

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-brand">
            {brand}
          </div>
          <p className="footer-desc">
            {description}
          </p>
        </div>
        <div className="footer-right">
          {copyright}
        </div>
      </div>
    </footer>
  )
}

export default Footer