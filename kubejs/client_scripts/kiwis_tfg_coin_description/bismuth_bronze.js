ItemEvents.tooltip(event => {
  event.addAdvanced('kubejs:bismuth_bronze_coin', (item, advanced, text) => {
    const creator = item.nbt?.creator
    if (creator) {
      text.add(Text.gray(`Created by ${creator}`))
    }
  })
});