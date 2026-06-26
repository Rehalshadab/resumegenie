import { Router } from "express";
import crypto from "crypto";

const router = Router();

const UPI_VPA = process.env.UPI_VPA || "BHARATPE2J0N0R6Y6R92963@unitype";

const plans = {
  basic: { amount: 49, label: "Resume Only" },
  pro: { amount: 79, label: "Resume + Cover Letter" },
};

router.post("/create-upi-order", async (req, res) => {
  try {
    const { plan, name } = req.body;
    const config = plans[plan] || plans.basic;

    const orderId = `RG${Date.now()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const upiIntent = `upi://pay?pa=${UPI_VPA}&pn=ResumeGenie&am=${config.amount}&tn=${orderId}&cu=INR`;

    res.json({
      success: true,
      orderId,
      amount: config.amount,
      plan: plan,
      label: config.label,
      upiIntent,
      upiVpa: UPI_VPA,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiIntent)}`,
    });
  } catch (error) {
    console.error("UPI order error:", error.message);
    res.status(500).json({ success: false, error: "Failed to create payment" });
  }
});

router.post("/verify-upi", async (req, res) => {
  try {
    const { orderId, utr } = req.body;
    if (!orderId) {
      res.status(400).json({ success: false, error: "Missing order ID" });
      return;
    }
    res.json({ success: true, message: "Payment recorded", orderId, utr: utr || null });
  } catch (error) {
    console.error("UPI verify error:", error.message);
    res.status(500).json({ success: false, error: "Verification failed" });
  }
});

export { router as paymentRouter };
