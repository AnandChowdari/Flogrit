import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/captiongrit-privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | CaptionGrit" },
      { name: "description", content: "Privacy Policy for CaptionGrit by Flogrit" },
    ],
  }),
  component: CaptiongritPrivacy,
});

function CaptiongritPrivacy() {
  return (
    <div className="captiongrit-container min-h-screen bg-black text-white py-20 px-6 sm:px-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/captiongrit" className="text-gray-400 hover:text-white transition-colors">
          &larr; Back to CaptionGrit
        </Link>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-sm text-gray-500">Last updated: July 12, 2026</p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Introduction</h2>
          <p>
            Welcome to CaptionGrit, an AI-powered caption generation platform ("Service", "Platform", "we", "us", or "our"), owned and operated by Flogrit, located in India. This Privacy Policy governs your visit to and use of our platform. It outlines how we collect, use, maintain, and disclose information from our users ("User", "you", or "your").
          </p>
          <p>
            By accessing or using CaptionGrit, you agree to the collection and use of information in accordance with this policy. We prioritize your privacy and are committed to ensuring your personal information is protected. We will never sell your personal information.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Information We Collect</h2>
          <p>
            To provide you with our AI-powered captioning service, we collect various types of information, including information that identifies you as an individual.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">2.1 Personal Information</h3>
          <p>
            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, which may include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your full name</li>
            <li>Your email address</li>
            <li>Billing address or location information (if required for tax purposes)</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">2.2 Account Information</h3>
          <p>
            When you register for an account, we collect the details necessary to create and manage your profile. This includes authentication credentials, subscription status, and usage history linked to your account.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">2.3 Payment Information</h3>
          <p>
            CaptionGrit offers paid products and subscriptions. All payment processing is securely handled through authorized third-party payment providers, such as Razorpay. <strong>CaptionGrit does not collect or store your complete credit card details or payment information.</strong> We only receive confirmation of payment, transaction IDs, and limited billing details to manage your subscription.
          </p>


          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. How We Use Information</h2>
          <p>
            CaptionGrit uses the collected data for various professional and operational purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">

            <li><strong>To notify you about changes:</strong> Sending transaction receipts, service updates, and administrative messages.</li>
            <li><strong>To provide customer care and support:</strong> Responding to your inquiries and resolving issues.</li>
            <li><strong>To analyze usage:</strong> Understanding how our users interact with the platform to improve the user interface and features.</li>
            <li><strong>To detect, prevent, and address technical issues:</strong> Safeguarding the platform against malicious activity, fraud, or abuse.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Third-Party Services</h2>
          <p>
            We may employ third-party companies and individuals ("Service Providers") to facilitate our Service, provide the Service on our behalf, perform Service-related operations, or assist us in analyzing how our Service is used.
          </p>
          <p>
            These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. Categories of third-party services include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment processors (e.g., Razorpay)</li>
            <li>Cloud hosting and infrastructure providers</li>
            <li>Artificial Intelligence API providers</li>
            <li>Analytics and tracking tools</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Data Security</h2>
          <p>
            The security of your data is important to us. We implement commercially reasonable, industry-standard security measures, including encryption and secure socket layer (SSL) technology, to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">6. Data Retention</h2>
          <p>
            We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies. Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">7. User Rights</h2>
          <p>
            Depending on your jurisdiction, you may have the following data protection rights:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>The right to access:</strong> You can request a copy of the personal data we hold about you.</li>
            <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
            <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at the support email provided below.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">8. Children's Privacy</h2>
          <p>
            Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children have provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers immediately.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">9. International Users</h2>
          <p>
            Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those from your jurisdiction. If you are located outside India and choose to provide information to us, please note that we transfer the data, including Personal Data, to India and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">10. Changes to this Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this document. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">11. Contact Information</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact Flogrit support at:
            <br />
            <a href="mailto:support.flogrit@gmail.com" className="text-blue-400 hover:underline mt-2 inline-block font-semibold">support.flogrit@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
