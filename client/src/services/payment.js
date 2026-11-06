// client/src/services/payment.js

/**
 * Teammate: implement Razorpay here. Called after a successful registration.
 *
 * Current behavior: Returns { status: "skipped" } since payments are handled in a later phase.
 *
 * Expected future flow:
 * 1. Initialize Razorpay SDK using public key from environment.
 * 2. Launch checkout with registration details (registration.id, email, phone).
 * 3. Verify server-side payment signature.
 * 4. Return { status: "success" | "cancelled" | "failed", transactionId?: string }.
 *
 * @param {Object} registration - Successful registration object returned from API
 * @returns {Promise<{ status: string, transactionId?: string }>}
 */
export async function startPayment(registration) {
  // Teammate: implement Razorpay here. Called after a successful registration.
  return Promise.resolve({
    status: "skipped",
  });
}
