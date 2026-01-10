
ServerEvents.recipes(event => {

	// Add Pocket GPS recipe
	event.recipes.gtceu.shaped('civ_tfg:pocket_gps', [
		'ABH',
		'CDE',
		'FGF'
	], {
		A: 'gtceu:hv_sensor',
		B: 'gtceu:mercury_barium_calcium_cuprate_single_wire',
		C: '#gtceu:batteries/hv',
		D: 'gtceu:computer_monitor_cover',
		E: 'gtceu:hv_emitter',
		F: '#gtceu:circuits/hv',
		G: '#forge:plates/titanium',
		H: 'gtceu:exquisite_certus_quartz_gem'
	})

	event.remove({ type: "map_atlases:crafting_atlas" })

	// This recipe is unused, its just to make it show up in EMI
	event.shapeless(
		Item.of('map_atlases:atlas', 1),
		[
			"tfc:glue",
			"firmaciv:sextant",
			"firmaciv:nav_clock",
			"minecraft:book",
			"create:precision_mechanism",
			"minecraft:filled_map"
		]
	)

	// Adding the atlas recipe, it doesn't show up in the EMI
	event.custom({
		"type": "map_atlases:crafting_atlas",
		"ingredients": [
			{
			"item": "tfc:glue"
			},
			{
			"item": "firmaciv:sextant"
			},
			{
			"item": "firmaciv:nav_clock"
			},
			{
			"item": "minecraft:book"
			},
			{
			"item": "create:precision_mechanism"
			}
		]
	})
})

// Enable map when Pocket GPS is equipped
PlayerEvents.inventoryChanged(event=> {
	const player = event.player

	// Initialize minimap flag
	if(player.persistentData.minimap == null) player.persistentData.minimap = true
	
	// Loop trough the hotbar
	for (let slot = 0; slot < 9; slot++) {
		let item = player.inventory.getItem(slot);

		if (item.is('civ_tfg:pocket_gps' )) {
			if (!player.persistentData.minimap) {
				player.tell("§r§e§s§e§t§x§a§e§r§o") // Reset xaero settings
				player.persistentData.minimap = true
			}
			return 1
		}
	}
	if (player.persistentData.minimap) {
		player.tell("§n§o§m§i§n§i§m§a§p") // Lock the minimap
		player.persistentData.minimap = false
	}
	return 1
})

// Disable map on login if persistent flag is not set
PlayerEvents.loggedIn(event => {
	const player = event.player
	if (player.persistentData.minimap == null) {
		player.tell("§n§o§m§i§n§i§m§a§p") // Lock the minimap
		player.persistentData.minimap = false
	}
	return 1
})