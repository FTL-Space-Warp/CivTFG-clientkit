ServerEvents.recipes(event => {
  // Remove the existing anvil recipe (replace with the actual recipe id)
  event.remove({ output: 'alekiships:oarlock' })

  // Re-add it with a new tier
  event.custom({
    type: 'tfc:anvil',
    input: { item: '#forge:double_ingots/bronze' },
    result: { item: 'alekiships:oarlock' },
    tier: 2, // 👈 new anvil tier (lower = easier)
    rules: [ 'bend_last', 'hit_second_last', 'hit_third_last' ]
  });

   event.remove({ output: 'alekiships:cleat' })

  // Re-add it with a new tier
  event.custom({
    type: 'tfc:anvil',
    input: { item: '#forge:double_ingots/wrought_iron' },
    result: { item: 'alekiships:cleat' },
    tier: 3, // 👈 new anvil tier (lower = easier)
    rules: [ 'bend_last', 'bend_second_last', 'bend_third_last' ]
  });

   event.remove({ output: 'alekiships:anchor' })

  // Re-add it with a new tier
  event.custom({
    type: 'tfc:anvil',
    input: { item: '#forge:double_plates/wrought_iron' },
    result: { item: 'alekiships:anchor' },
    tier: 3, // 👈 new anvil tier (lower = easier)
    rules: [ 'hit_last', 'punch_second_last', 'bend_third_last' ]
  });
})

