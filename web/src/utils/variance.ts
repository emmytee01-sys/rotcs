export const calculateVariance = (taxDue: number, taxPaid: number): number => {
  if (taxDue === 0) return 0;
  // Variance = ratio of tax due to tax paid
  // As clarified: |(taxPaid / taxDue) - 1|
  return Math.abs((taxPaid / taxDue) - 1);
};
