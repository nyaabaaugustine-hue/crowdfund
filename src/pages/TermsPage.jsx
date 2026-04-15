import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: April 15, 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using Nkabom Fund ("we," "our," or "us"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-600">
                Nkabom Fund is a crowdfunding platform that enables individuals and organizations in Ghana to raise funds 
                for personal, charitable, and business purposes. We facilitate donations between donors and campaign organizers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility</h2>
              <p className="text-gray-600 mb-4">To use Nkabom Fund, you must:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Be at least 18 years old</li>
                <li>Have a valid Ghanaian phone number (for Mobile Money)</li>
                <li>Have a valid email address</li>
                <li>Not be prohibited from using our services under applicable law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Campaign Guidelines</h2>
              <p className="text-gray-600 mb-4">Campaigns must:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Be legal and comply with Ghanaian law</li>
                <li>Not involve fraud, scams, or misleading information</li>
                <li>Not promote hate speech, violence, or illegal activities</li>
                <li>Have accurate and honest descriptions</li>
                <li>Use funds only for the stated purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Fees and Charges</h2>
              <p className="text-gray-600">
                Nkabom Fund charges a platform fee of 5% on successful donations. Payment processing fees 
                (typically 1.5% + GHS 0.30 for Mobile Money) are also deducted. These fees are clearly 
                displayed before you complete a donation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payouts</h2>
              <p className="text-gray-600">
                Campaign organizers can request withdrawals once they reach a minimum of GHS 100. 
                Withdrawals are processed within 3-5 business days to Mobile Money wallets or bank accounts. 
                We may require identity verification before processing large withdrawals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Refund Policy</h2>
              <p className="text-gray-600">
                All donations are final and non-refundable once processed. However, if you believe a donation 
                was made in error or to a fraudulent campaign, please contact us immediately at 
                <a href="mailto:support@nkabomfund.com" className="text-green-700 ml-1">support@nkabomfund.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. User Responsibilities</h2>
              <p className="text-gray-600">
                Users are responsible for maintaining the confidentiality of their account credentials and for 
                all activities under their account. You agree to notify us immediately of any unauthorized use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-600">
                Nkabom Fund is not responsible for the completion of campaigns or the use of funds by organizers. 
                We do not guarantee that campaigns will achieve their goals. Users donate at their own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Intellectual Property</h2>
              <p className="text-gray-600">
                Users retain ownership of content they submit. By posting content on Nkabom Fund, you grant us 
                a non-exclusive license to use, display, and distribute it for platform purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-600">
                We reserve the right to suspend or terminate accounts that violate these terms or engage in 
                prohibited activities. We may also cancel campaigns that breach our guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-600">
                We may update these terms from time to time. Continued use of the platform after changes 
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-600">
                For questions about these Terms of Service, please contact us at:<br />
                <strong>Email:</strong> <a href="mailto:legal@nkabomfund.com" className="text-green-700">legal@nkabomfund.com</a><br />
                <strong>Phone:</strong> +233 50 123 4567<br />
                <strong>Address:</strong> Accra, Ghana
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
