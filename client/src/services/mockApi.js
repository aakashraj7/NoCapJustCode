// client/src/services/mockApi.js

/**
 * Mock API Adapter for LARPER OR CODER registration.
 * Used when the backend server endpoint is not yet deployed or unreachable.
 */

export async function mockRegister(payload) {
  // Simulate network latency (800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Basic validation check
  if (!payload || !payload.fullName || !payload.email || !payload.phone) {
    throw new Error("Missing required registration details.");
  }

  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const prefix = payload.event === "tle" ? "TLE" : "ARC";

  return {
    success: true,
    message: "Successfully locked in for LARPER OR CODER",
    registration: {
      id: `LOC-${prefix}-${randomSuffix}`,
      event: payload.event,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      college: payload.college,
      department: payload.department,
      year: payload.year,
      teamName: payload.teamDetails?.teamName || null,
      teamSize: payload.teamDetails?.teamSize || 1,
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
