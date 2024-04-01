
async function getCode() {
  try {
    const referralCodes = await import('referral-codes');
    const code = referralCodes.generate({
      length: 8,
      count: 1,
    });
    return code[0];
  } catch (error) {
    console.error('Failed to dynamically import referral-codes:', error);
    throw error; // Propagate the error if needed
  }
}

module.exports = getCode