const gasUrl = "https://script.google.com/macros/s/AKfycbzcduRbPRxFLYLMOB5oOXPZqazf4_xlqwWz3zBjKG-R6h3QSSdhI7aZvv2a7ALHvLxn/exec";
const gasSecret = "anand@2802";

async function testWebhook() {
  const payload = {
    secret: gasSecret,
    action: "paid_signup",
    data: {
      paymentId: "pay_TEST_SCRIPT_" + Date.now(),
      orderId: "order_TEST_SCRIPT_" + Date.now(),
      email: "test.audit@flogrit.com",
      name: "Audit Test User",
      plan: "basic",
      licenseKey: "CG-TEST-KEY",
      amount: 1500,
      currency: "INR",
      timestamp: new Date().toISOString(),
      status: "success"
    }
  };

  console.log("Testing GAS Webhook...");
  console.log("URL:", gasUrl);
  
  try {
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log("\n=== GAS RESPONSE ===");
    console.log("HTTP Status:", response.status);
    const text = await response.text();
    console.log("Response Body:", text);
    
  } catch (err) {
    console.error("\n=== NETWORK ERROR ===");
    console.error(err);
  }
}

testWebhook();
