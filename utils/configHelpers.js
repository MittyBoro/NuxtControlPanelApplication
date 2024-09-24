export const coinsToRub = (coins) => {
  const { currencies } = useApiAttributes().value
  return Math.floor(coins / currencies.RUB.coins)
}
