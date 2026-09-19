import Razorpay from 'razorpay';

const instance = new Razorpay({
  key_id: 'rzp_test_THml5any22RaPV',
  key_secret: 'vRkVay5zAZViZvVaiQ4UZ3Oq',
});

async function run() {
  try {
    const paymentId = 'pay_TZ2kDK3Jvb2TfR';
    const payment = await instance.payments.fetch(paymentId);
    
    // We want to log the keys available
    console.log("=== Razorpay Payment Object Fields ===");
    console.log("Keys available:", Object.keys(payment).join(', '));
    
    console.log("\n=== Checking Specific Fields ===");
    console.log("contact present:", !!payment.contact, "->", typeof payment.contact === 'string' ? "String" : typeof payment.contact);
    if (payment.notes) {
      console.log("notes fields:", Object.keys(payment.notes).join(', '));
    } else {
      console.log("notes: none");
    }
    
    console.log("email field present:", !!payment.email);
    
  } catch (error) {
    console.error("Error fetching payment:", error);
  }
}

run();
