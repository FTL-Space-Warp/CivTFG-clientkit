ItemEvents.tooltip(event => {
  event.addAdvanced('kubejs:black_steel_coin', (item, advanced, text) => {
    const creator = item.nbt?.creator
    if (creator) {
      text.add(Text.gray(`Created by ${creator}`))
    }
  })
});