// client/src/services/mockApi.js

/**
 * Mock API Adapter for LARPER OR CODER pair registration.
 * Used when the backend server endpoint is not yet deployed or unreachable.
 */

export async function mockRegister(payload) {
  // Simulate network latency (600ms)
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Basic validation check
  if (!payload || !Array.isArray(payload.members) || payload.members.length !== 2) {
    throw new Error("Registration requires exactly 2 members.");
  }

  const randomSuffix = Math.floor(10000 + Math.random() * 90000);

  return {
    success: true,
    message: "Successfully locked in as a pair for LARPER OR CODER",
    registration: {
      id: `LOC-PAIR-${randomSuffix}`,
      pairName: payload.pairName || null,
      members: payload.members,
      amount: 298, // Server-computed fee (₹149 * 2)
      createdAt: new Date().toISOString(),
    },
  };
}

export async function mockCheckHealth() {
  return {
    success: true,
    message: "Mock API adapter healthy",
    mock: true,
  };
}
