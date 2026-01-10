ItemEvents.tooltip(event => {
  event.addAdvanced('createdeco:industrial_iron_coin', (item, advanced, text) => {
    const creator = item.nbt?.creator
    if (creator) {
      text.add(Text.gray(`Created by ${creator}`))
    }
  })
});