import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/captiongrit-terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | CaptionGrit" },
      { name: "description", content: "Terms of Service for CaptionGrit by Flogrit" },
    ],
  }),
  component: CaptiongritTerms,
});

function CaptiongritTerms() {
  return (
    <div className="captiongrit-container min-h-screen bg-black text-white py-20 px-6 sm:px-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/captiongrit" className="text-gray-400 hover:text-white transition-colors">
          &larr; Back to CaptionGrit
        </Link>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-8">
          Terms of Service
        </h1>
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-sm text-gray-500">Last updated: July 12, 2026</p>
          
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Acceptance of Terms</h2>
          <p>
            These Terms of Service ("Terms", "Agreement") form a legally binding contract between you ("User", "you", or "your") and Flogrit ("Company", "we", "us", or "our"), the owner and operator of the CaptionGrit digital product and platform (the "Service"). By creating an account, accessing, browsing, or otherwise using CaptionGrit, you explicitly acknowledge that you have read, understood, and agree to be fully bound by these Terms. 
          </p>
          <p>
            If you are entering into these Terms on behalf of a company, business, or other legal entity, you represent that you have the authority to bind such entity and its affiliates to these Terms, in which case the terms "User", "you", or "your" shall refer to such entity and its affiliates. If you do not have such authority, or if you do not agree with the terms and conditions of this Agreement, you must not accept this Agreement and may not use the Service.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Eligibility</h2>
          <p>
            You must be at least 18 years of age to use this Service. By using the Service and agreeing to these Terms, you represent and warrant that you are at least 18 years of age and that you have the right, authority, and capacity to enter into this Agreement and to abide by all of its terms and conditions. If you are under the age of 18, you are strictly prohibited from using the Service. We reserve the right to refuse service, terminate accounts, or cancel subscriptions in our sole discretion if we discover that a user is under the required age limit.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. User Accounts</h2>
          <p>
            To utilize the core functionalities of CaptionGrit, you may be required to register for an account. When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p>
            You are entirely responsible for safeguarding the password and credentials that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account. You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar, or obscene. Account sharing is strictly prohibited and will result in immediate termination without refund.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Subscription & Payments</h2>
          <p>
            Some parts of the Service are billed on a subscription basis or as one-time purchases ("Paid Services"). You will be billed in advance on a recurring and periodic basis (such as monthly or annually), depending on the type of subscription plan you select when purchasing a Subscription.
          </p>
          <p>
            At the end of each period, your Subscription will automatically renew under the exact same conditions unless you cancel it or we cancel it. You may cancel your Subscription renewal either through your online account management page or by contacting our customer support team. All payments are processed securely through established third-party payment providers (e.g., Razorpay). We do not store your complete credit card information on our servers.
          </p>
          <p>
            Please note that as defined in our Refund Policy, all sales are final, and there are no refunds for unused subscriptions, accidental purchases, or dissatisfaction with AI-generated content.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. License to Use CaptionGrit</h2>
          <p>
            Subject to your continuous compliance with these Terms and the payment of any applicable fees, Flogrit grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the CaptionGrit platform for your personal and commercial content creation purposes. This license is strictly limited to the intended functionality of the platform as presented through our user interface.
          </p>
          <p>
            This license does not include any resale or commercial distribution of the software itself; any collection and use of any product listings, descriptions, or prices; any derivative use of the Service or its contents; any downloading, copying, or other use of account information for the benefit of any third party; or any use of data mining, robots, or similar data gathering and extraction tools. All rights not expressly granted to you in these Terms are reserved and retained by Flogrit or its licensors, suppliers, publishers, or other content providers.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">6. Acceptable Use Policy</h2>
          <p>
            You agree to use CaptionGrit only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the platform. You must conduct yourself in a polite, respectful, and professional manner when interacting with our support staff and other users of the Service.
          </p>
          <p>
            You are entirely responsible for the data, media, text, audio, video, and other content ("User Inputs") that you upload or submit to the platform for captioning or processing. You represent and warrant that you hold the necessary rights, permissions, and licenses to use such User Inputs and that processing them through our AI systems does not violate any third-party copyrights, privacy rights, or other legal protections.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">7. Prohibited Activities</h2>
          <p>
            You are strictly prohibited from engaging in any of the following activities while using the Service:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Reverse Engineering:</strong> Decompiling, reverse engineering, disassembling, or attempting to derive the source code, underlying ideas, algorithms, structure, or organization of the Service.</li>
            <li><strong>Scraping and Automation:</strong> Using automated scripts, bots, spiders, or web crawlers to access, scrape, copy, or monitor the Service without our prior written consent.</li>
            <li><strong>Abuse and Overload:</strong> Taking any action that imposes, or may impose, in our sole discretion, an unreasonable or disproportionately large load on our infrastructure.</li>
            <li><strong>Illegal Content:</strong> Uploading or processing content that is illegal, defamatory, obscene, threatening, infringing of intellectual property rights, invasive of privacy, or otherwise injurious to third parties.</li>
            <li><strong>Spam and Malware:</strong> Uploading files that contain viruses, Trojan horses, worms, time bombs, cancelbots, corrupted files, or any other similar software or programs that may damage the operation of another's computer or property.</li>
            <li><strong>Bypassing Security:</strong> Attempting to bypass any measures we may use to prevent or restrict access to the Service, including without limitation bypassing paywalls or subscription checks.</li>
          </ul>
          <p>
            Engaging in any prohibited activities will result in immediate termination of your account, forfeiture of any remaining subscription balance, and potential legal action.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">8. AI-Generated Content Disclaimer</h2>
          <p>
            CaptionGrit utilizes advanced artificial intelligence and machine learning models to generate captions, text, and other outputs ("Outputs") based on the media and prompts you provide. By using the Service, you acknowledge and agree that artificial intelligence systems are probabilistic by nature and can occasionally produce incorrect, inaccurate, inappropriate, or nonsensical results.
          </p>
          <p>
            <strong>User Responsibility:</strong> It is your strict obligation to thoroughly review, edit, and verify all AI-generated captions and outputs before publishing, distributing, or relying upon them. Flogrit is not responsible for any errors, omissions, offensive content, or misrepresentations generated by the AI models.
          </p>
          <p>
            <strong>No Guarantees:</strong> Flogrit makes absolutely no guarantees or warranties regarding the accuracy, completeness, contextual correctness, or suitability of the AI-generated content. Furthermore, we explicitly state that CaptionGrit does not guarantee any specific business results, including but not limited to increased engagement, wider reach, virality, follower growth, or sales conversions resulting from the use of our generated captions.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">9. Intellectual Property</h2>
          <p>
            The Service and its original content (excluding User Inputs and generated Outputs as defined in Section 10), features, and functionality are and will remain the exclusive property of Flogrit and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks, trade dress, logos, brand names, software, design, and user interface may not be used in connection with any product or service without the prior written consent of Flogrit.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">10. User Content Ownership</h2>
          <p>
            We respect your intellectual property rights. You retain all of your ownership rights in your User Inputs (the media, videos, audio, and text you upload).
          </p>
          <p>
            Furthermore, <strong>you fully own the final captions and Outputs generated by the Service based on your inputs.</strong> You are free to use, distribute, sell, and modify these generated captions for both personal and commercial purposes without paying any royalties to Flogrit. We do not claim any copyright ownership over the final text outputs generated specifically for you.
          </p>
          <p>
            By submitting User Inputs to the Service, you grant us a temporary, limited license solely to process, host, and analyze that content for the express purpose of generating the requested Outputs and providing the Service to you. We do not use your proprietary media to train our foundational models.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">11. Service Availability</h2>
          <p>
            We strive to ensure that CaptionGrit is available 24/7. However, the Service may be interrupted for scheduled maintenance, updates, or emergency repairs, or due to failure of telecommunications links, cloud infrastructure providers, or AI API endpoints that are beyond our control. We will not be liable to you for any modification, suspension, or discontinuation of the Service, or the loss of any content. You acknowledge that you are responsible for maintaining independent backups of your media and generated captions.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">12. Disclaimer of Warranties</h2>
          <p>
            YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. THE SERVICE IS PROVIDED WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
          </p>
          <p>
            FLOGRIT, ITS SUBSIDIARIES, AFFILIATES, AND ITS LICENSORS DO NOT WARRANT THAT a) THE SERVICE WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; b) ANY ERRORS OR DEFECTS WILL BE CORRECTED; c) THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR d) THE RESULTS OF USING THE SERVICE WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">13. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL FLOGRIT, ITS AFFILIATES, DIRECTORS, EMPLOYEES, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, THAT RESULT FROM THE USE OF, OR INABILITY TO USE, THIS SERVICE.
          </p>
          <p>
            UNDER NO CIRCUMSTANCES WILL FLOGRIT BE RESPONSIBLE FOR ANY DAMAGE, LOSS, OR INJURY RESULTING FROM HACKING, TAMPERING, OR OTHER UNAUTHORIZED ACCESS OR USE OF THE SERVICE OR YOUR ACCOUNT OR THE INFORMATION CONTAINED THEREIN. IN NO EVENT SHALL FLOGRIT'S TOTAL CUMULATIVE LIABILITY TO YOU FOR ALL CLAIMS RELATING TO THE SERVICE EXCEED THE AMOUNT YOU PAID TO FLOGRIT IN THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">14. Account Suspension & Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of these Terms, failure to pay subscription fees, or suspected fraudulent, abusive, or illegal activity.
          </p>
          <p>
            If you wish to terminate your account, you may simply discontinue using the Service and cancel your active subscriptions via your billing dashboard. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">15. Changes to the Service and Terms</h2>
          <p>
            We reserve the right to withdraw or amend our Service, and any service or material we provide via the platform, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Service is unavailable at any time or for any period.
          </p>
          <p>
            We also reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">16. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding the Service.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">17. Contact Information</h2>
          <p>
            If you have any questions or require further clarification regarding these Terms of Service, please contact us at:
            <br />
            <a href="mailto:support.flogrit@gmail.com" className="text-blue-400 hover:underline mt-2 inline-block font-semibold">support.flogrit@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
