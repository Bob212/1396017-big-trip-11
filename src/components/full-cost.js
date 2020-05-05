export const createFullCostTemplate = (points) => {
  const allPointsCost = points.reduce((acc, curr) => {
    let offersCost = 0;

    // if we have offers - calculate their prices
    if (curr.offers && curr.offers.length > 0) {
      offersCost = curr.offers.reduce((offerAcc, offerCurrent) => {
        return offerAcc + offerCurrent.price;
      }, 0);
    }

    return acc + curr.price + offersCost;
  }, 0);

  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${allPointsCost}</span>
    </p>
  `;
};
