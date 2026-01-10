// priority: -1000

/*
const tier_recipes = [
    ['tfc:crafting/metal/anvil/copper'],
    ['tfc:crafting/metal/anvil/bronze', 'tfc:crafting/metal/anvil/bismuth_bronze', 'tfc:crafting/metal/anvil/black_bronze'],
    ['tfc:crafting/metal/anvil/wrought_iron'],
    ['tfc:crafting/metal/anvil/steel'],
    ['tfc:crafting/metal/anvil/black_steel'],
    ['tfc:crafting/metal/anvil/red_steel', 'tfc:crafting/metal/anvil/blue_steel'],
    ['gtceu:shaped/lv_machine_hull', 'gtceu:assembler/hull_lv'],//['gtceu:basic_electronic_circuit'],
    ['gtceu:shaped/mv_machine_hull', 'gtceu:assembler/hull_mv', 'gtceu:assembler/hull_mv_annealed'],//['gtceu:good_electronic_circuit'],
    ['gtceu:shaped/hv_machine_hull', 'gtceu:assembler/hull_hv', 'gtceu:assembler/hull_hv_annealed'],//['gtceu:advanced_integrated_circuit'],
    ['gtceu:shaped/ev_machine_hull', 'gtceu:assembler/hull_ev'],//['gtceu:micro_processor_computer],
    ['gtceu:shaped/iv_machine_hull', 'gtceu:assembler/hull_iv'],//['gtceu:micro_processor_mainframe'],
    ['gtceu:shaped/luv_machine_hull', 'gtceu:assembler/hull_luv'],//['gtceu:nano_processor_mainframe'],
    ['gtceu:shaped/zpm_machine_hull', 'gtceu:assembler/hull_zpm'],//['gtceu:quantum_processor_mainframe']
    ['gtceu:shaped/uv_machine_hull', 'gtceu:assembler/hull_uv'],
    ['gtceu:shaped/uhv_machine_hull', 'gtceu:assembler/hull_uhv']
]
*/

global.tier_items = [
    ['tfc:metal/anvil/copper'],
    ['tfc:metal/anvil/bronze', 'tfc:metal/anvil/bismuth_bronze', 'tfc:metal/anvil/black_bronze'],
    ['tfc:metal/anvil/wrought_iron'],
    ['tfc:metal/anvil/steel'],
    ['tfc:metal/anvil/black_steel'],
    ['tfc:metal/anvil/red_steel', 'tfc:metal/anvil/blue_steel'],
    ['gtceu:lv_machine_hull'],
    ['gtceu:mv_machine_hull'],
    ['gtceu:hv_machine_hull'],
    ['gtceu:ev_machine_hull'],
    ['gtceu:iv_machine_hull'],
    ['gtceu:luv_machine_hull'],
    ['gtceu:zpm_machine_hull'],
    ['gtceu:uv_machine_hull'],
    ['gtceu:uhv_machine_hull']
]


global.progression_tiers = {
    copper: 0,
    bronze: 1,
    iron: 2,
    steel: 3,
    black_steel: 4,
    red_steel: 5,
    LV: 6,
    MV: 7,
    HV: 8,
    EV: 9,
    IV: 10,
    LuV: 11,
    ZPM: 12,
    UV: 13,
    UHV: 14
}

// Variable for the current tech tier
global.currentTier = global.progression_tiers.MV


// Delete recipes up to the desired tier
ServerEvents.recipes(event => {
    //const tiers = global.progression_tiers.reverse()
    console.log(global.currentTier)

    global.tier_items.slice(global.currentTier).forEach((tier) => {
        tier.forEach(item => {
            console.log("removed " + item)
            event.remove({ output: item });
        })
    })
})



// Register Tier command
ServerEvents.commandRegistry(event => {
    const {commands: Commands, arguments: Arguments } = event

    event.register(
    Commands.literal('tier')

    // Runs with no arguments
    .executes(ctx => {
        const sender = ctx.source.entity;
        const server = ctx.source.server;
                
        if(sender) sender.tell("Current tier is: " + Object.keys(global.progression_tiers)[parseInt(global.currentTier)]);
        else server.tell("Current tier is: " + Object.keys(global.progression_tiers)[parseInt(global.currentTier)]);
        
        return 1
    })
    )
})
